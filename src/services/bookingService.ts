import { SiteVisitRequest } from '../types/quote';

const VISITS_STORAGE_KEY = 'ssi_site_visits';

export const getStoredSiteVisits = (): SiteVisitRequest[] => {
  try {
    const raw = localStorage.getItem(VISITS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to get site visits', e);
    return [];
  }
};

export const saveSiteVisit = (request: Omit<SiteVisitRequest, 'id' | 'status' | 'createdAt'>): SiteVisitRequest => {
  const newVisit: SiteVisitRequest = {
    ...request,
    id: `SSI-VISIT-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  const current = getStoredSiteVisits();
  const updated = [newVisit, ...current];
  try {
    localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to persist site visit', e);
  }
  return newVisit;
};
