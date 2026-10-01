export interface AnalyticsEvent {
  id?: string;
  type: 'page_view' | 'whatsapp_click' | 'call_click' | 'quote_click' | 'site_visit_click' | 'catalog_click' | 'button_click';
  label: string;
  path: string;
  device?: string;
  timestamp?: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  uniqueVisitors: number;
  todayVisitors: number;
  totalClicks: number;
  todayClicks: number;
  lastUpdated: string;
  clickBreakdown: {
    whatsapp: number;
    call: number;
    quote: number;
    site_visit: number;
    catalog: number;
    [key: string]: number;
  };
  topPages: Array<{
    path: string;
    title: string;
    views: number;
  }>;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  dailyStats: Array<{
    date: string;
    visitors: number;
    pageViews: number;
    clicks: number;
  }>;
  recentEvents: Array<{
    id: string;
    type: string;
    label: string;
    path: string;
    device: string;
    timestamp: string;
  }>;
}

const STORAGE_KEY = 'ssi_analytics_cache';
const VISITOR_ID_KEY = 'ssi_visitor_id';

const DEFAULT_ANALYTICS: AnalyticsData = {
  totalVisitors: 0,
  uniqueVisitors: 0,
  todayVisitors: 0,
  totalClicks: 0,
  todayClicks: 0,
  lastUpdated: new Date().toISOString(),
  clickBreakdown: {
    whatsapp: 0,
    call: 0,
    quote: 0,
    site_visit: 0,
    catalog: 0
  },
  topPages: [],
  deviceBreakdown: {
    mobile: 100,
    desktop: 0,
    tablet: 0
  },
  dailyStats: [
    { date: new Date().toISOString().split('T')[0], visitors: 0, pageViews: 0, clicks: 0 }
  ],
  recentEvents: []
};

function getVisitorId(): string {
  try {
    let vid = localStorage.getItem(VISITOR_ID_KEY);
    if (!vid) {
      vid = `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(VISITOR_ID_KEY, vid);
    }
    return vid;
  } catch (_) {
    return 'guest_visitor';
  }
}

function detectDevice(): 'Mobile' | 'Tablet' | 'Desktop' {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

function getLocalAnalytics(): AnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.totalVisitors === 'number') {
        return parsed;
      }
    }
  } catch (_) {}
  return DEFAULT_ANALYTICS;
}

function saveLocalAnalytics(data: AnalyticsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

export const analyticsService = {
  getVisitorId,
  detectDevice,

  // Retrieve current aggregated analytics data
  async getAnalytics(): Promise<AnalyticsData> {
    try {
      const res = await fetch('/api/analytics', { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const remote = await res.json();
        if (remote && typeof remote.totalVisitors === 'number') {
          saveLocalAnalytics(remote);
          return remote;
        }
      }
    } catch (_) {
      // Offline or network error - use local cache
    }
    return getLocalAnalytics();
  },

  // Record a page view
  trackPageView(path: string, label?: string) {
    if (path.startsWith('/admin')) return; // Ignore admin dashboard views

    const device = detectDevice();
    const event: AnalyticsEvent = {
      type: 'page_view',
      label: label || (path === '/' ? 'Home Page' : path),
      path,
      device,
      timestamp: new Date().toISOString()
    };

    // Update local cache immediately
    const local = getLocalAnalytics();
    local.totalVisitors = (local.totalVisitors || 0) + 1;
    local.todayVisitors = (local.todayVisitors || 0) + 1;
    local.lastUpdated = new Date().toISOString();

    const todayStr = new Date().toISOString().split('T')[0];
    let todayRow = local.dailyStats.find((d) => d.date === todayStr);
    if (!todayRow) {
      todayRow = { date: todayStr, visitors: 0, pageViews: 0, clicks: 0 };
      local.dailyStats.push(todayRow);
    }
    todayRow.visitors += 1;
    todayRow.pageViews += 1;

    // Update top pages
    const pageIndex = local.topPages.findIndex((p) => p.path === path);
    if (pageIndex >= 0) {
      local.topPages[pageIndex].views += 1;
    } else {
      local.topPages.push({ path, title: event.label, views: 1 });
    }

    // Add to recent events
    local.recentEvents.unshift({
      id: `evt-${Date.now()}`,
      type: 'page_view',
      label: event.label,
      path,
      device,
      timestamp: new Date().toISOString()
    });
    local.recentEvents = local.recentEvents.slice(0, 40);
    saveLocalAnalytics(local);

    // Asynchronously dispatch to backend
    this.sendEventToBackend(event);
  },

  // Record any user click or conversion action
  trackClick(
    type: 'whatsapp_click' | 'call_click' | 'quote_click' | 'site_visit_click' | 'catalog_click' | 'button_click',
    label: string,
    path: string = window.location.pathname
  ) {
    const device = detectDevice();
    const event: AnalyticsEvent = {
      type,
      label,
      path,
      device,
      timestamp: new Date().toISOString()
    };

    // Update local cache immediately
    const local = getLocalAnalytics();
    local.totalClicks = (local.totalClicks || 0) + 1;
    local.todayClicks = (local.todayClicks || 0) + 1;
    local.lastUpdated = new Date().toISOString();

    if (!local.clickBreakdown) {
      local.clickBreakdown = { whatsapp: 0, call: 0, quote: 0, site_visit: 0, catalog: 0 };
    }

    if (type.includes('whatsapp')) {
      local.clickBreakdown.whatsapp = (local.clickBreakdown.whatsapp || 0) + 1;
    } else if (type.includes('call')) {
      local.clickBreakdown.call = (local.clickBreakdown.call || 0) + 1;
    } else if (type.includes('quote')) {
      local.clickBreakdown.quote = (local.clickBreakdown.quote || 0) + 1;
    } else if (type.includes('site_visit')) {
      local.clickBreakdown.site_visit = (local.clickBreakdown.site_visit || 0) + 1;
    } else {
      local.clickBreakdown.catalog = (local.clickBreakdown.catalog || 0) + 1;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    let todayRow = local.dailyStats.find((d) => d.date === todayStr);
    if (!todayRow) {
      todayRow = { date: todayStr, visitors: 0, pageViews: 0, clicks: 0 };
      local.dailyStats.push(todayRow);
    }
    todayRow.clicks += 1;

    local.recentEvents.unshift({
      id: `evt-${Date.now()}`,
      type,
      label,
      path,
      device,
      timestamp: new Date().toISOString()
    });
    local.recentEvents = local.recentEvents.slice(0, 40);
    saveLocalAnalytics(local);

    // Asynchronously dispatch to backend
    this.sendEventToBackend(event);
  },

  // Helper to send beacon or background POST to backend
  sendEventToBackend(event: AnalyticsEvent) {
    try {
      const payload = JSON.stringify({
        ...event,
        visitorId: getVisitorId()
      });

      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
      } else {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(() => null);
      }
    } catch (_) {}
  },

  // Reset analytics data back to pure zero
  async resetAnalytics(): Promise<AnalyticsData> {
    const clean: AnalyticsData = {
      ...DEFAULT_ANALYTICS,
      lastUpdated: new Date().toISOString()
    };
    saveLocalAnalytics(clean);
    try {
      await fetch('/api/analytics/reset', { method: 'POST' });
    } catch (_) {}
    return clean;
  }
};

