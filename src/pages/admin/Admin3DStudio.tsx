import React, { useState, useEffect } from 'react';
import { Palette, Box, Layers, SunMedium, Wrench, IndianRupee, Plus, Trash2, Edit2, Save, Check, RefreshCw } from 'lucide-react';
import { apiService, ConfiguratorData, WallFinish, CabinetFinish, FlooringFinish, LightingMood, HardwarePackage } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const Admin3DStudio: React.FC = () => {
  const [data, setData] = useState<ConfiguratorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'wall' | 'cabinet' | 'flooring' | 'lighting' | 'hardware' | 'substrates'>('wall');

  // Modal / Editing states
  const [editingItem, setEditingItem] = useState<{ type: string; item: any } | null>(null);
  const [isNew, setIsNew] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    loadConfigurator();
  }, []);

  const loadConfigurator = async () => {
    try {
      setLoading(true);
      const res = await apiService.getConfigurator();
      setData(res);
    } catch {
      showToast('Failed to load 3D studio configurator data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    if (!data) return;
    try {
      setSaving(true);
      await apiService.updateConfigurator(data);
      showToast('3D Studio finishes and pricing saved live!', 'success');
    } catch {
      showToast('Failed to save 3D Studio data', 'error');
    } finally {
      setSaving(false);
    }
  };

  const hexToInt = (hex: string): number => {
    const clean = hex.replace('#', '');
    return parseInt(clean, 16) || 0xffffff;
  };

  const intToHex = (num: number): string => {
    return '#' + num.toString(16).padStart(6, '0');
  };

  // Delete helpers
  const handleDeleteWall = (id: string) => {
    if (!data || !confirm('Are you sure you want to remove this wall finish?')) return;
    setData({
      ...data,
      wallFinishes: data.wallFinishes.filter((w) => w.id !== id)
    });
  };

  const handleDeleteCabinet = (id: string) => {
    if (!data || !confirm('Are you sure you want to remove this cabinet material?')) return;
    setData({
      ...data,
      cabinetFinishes: data.cabinetFinishes.filter((c) => c.id !== id)
    });
  };

  const handleDeleteFlooring = (id: string) => {
    if (!data || !confirm('Are you sure you want to remove this flooring option?')) return;
    setData({
      ...data,
      flooringFinishes: data.flooringFinishes.filter((f) => f.id !== id)
    });
  };

  const handleDeleteLighting = (id: string) => {
    if (!data || !confirm('Are you sure you want to remove this lighting mood?')) return;
    setData({
      ...data,
      lightingMoods: data.lightingMoods.filter((l) => l.id !== id)
    });
  };

  const handleDeleteHardware = (id: string) => {
    if (!data || !confirm('Are you sure you want to remove this hardware package?')) return;
    setData({
      ...data,
      hardwarePackages: data.hardwarePackages.filter((h) => h.id !== id)
    });
  };

  // Modal submit
  const handleSaveModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !data) return;

    const { type, item } = editingItem;

    if (type === 'wall') {
      const updatedThreeColor = hexToInt(item.hex);
      const fullItem: WallFinish = { ...item, threeColor: updatedThreeColor };
      let updatedList = [...data.wallFinishes];
      if (isNew) {
        updatedList.push(fullItem);
      } else {
        updatedList = updatedList.map((w) => (w.id === fullItem.id ? fullItem : w));
      }
      setData({ ...data, wallFinishes: updatedList });
    } else if (type === 'cabinet') {
      const updatedThreeColor = hexToInt(item.hex);
      const fullItem: CabinetFinish = {
        ...item,
        threeColor: updatedThreeColor,
        roughness: parseFloat(item.roughness) || 0.5,
        metalness: parseFloat(item.metalness) || 0.05
      };
      let updatedList = [...data.cabinetFinishes];
      if (isNew) {
        updatedList.push(fullItem);
      } else {
        updatedList = updatedList.map((c) => (c.id === fullItem.id ? fullItem : c));
      }
      setData({ ...data, cabinetFinishes: updatedList });
    } else if (type === 'flooring') {
      const updatedThreeColor = hexToInt(item.hex);
      const fullItem: FlooringFinish = {
        ...item,
        threeColor: updatedThreeColor,
        roughness: parseFloat(item.roughness) || 0.2
      };
      let updatedList = [...data.flooringFinishes];
      if (isNew) {
        updatedList.push(fullItem);
      } else {
        updatedList = updatedList.map((f) => (f.id === fullItem.id ? fullItem : f));
      }
      setData({ ...data, flooringFinishes: updatedList });
    } else if (type === 'lighting') {
      const fullItem: LightingMood = {
        ...item,
        coveColor: typeof item.coveColor === 'string' ? hexToInt(item.coveColor) : item.coveColor,
        ambientColor: typeof item.ambientColor === 'string' ? hexToInt(item.ambientColor) : item.ambientColor,
        ambientIntensity: parseFloat(item.ambientIntensity) || 1.0
      };
      let updatedList = [...data.lightingMoods];
      if (isNew) {
        updatedList.push(fullItem);
      } else {
        updatedList = updatedList.map((l) => (l.id === fullItem.id ? fullItem : l));
      }
      setData({ ...data, lightingMoods: updatedList });
    } else if (type === 'hardware') {
      const fullItem: HardwarePackage = { ...item };
      let updatedList = [...data.hardwarePackages];
      if (isNew) {
        updatedList.push(fullItem);
      } else {
        updatedList = updatedList.map((h) => (h.id === fullItem.id ? fullItem : h));
      }
      setData({ ...data, hardwarePackages: updatedList });
    }

    setEditingItem(null);
    showToast('Finish updated locally! Click "Save Changes" to publish.', 'success');
  };

  if (loading || !data) {
    return (
      <div className="py-20 text-center text-charcoal-400">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-forest-600" />
        Loading 3D Studio Configurator & Finishes...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
              3D Studio Configurator & Finishes
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive 3D Engine
            </span>
          </div>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Full control over Wall Finishes, Cabinet Laminates, Flooring, Lighting Moods, Hardware Packages, and Turnkey Substrate Pricing
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 font-medium text-xs shadow-md transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cream-200 dark:border-forest-800 text-xs">
        <button
          onClick={() => setActiveTab('wall')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'wall'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <Palette className="w-4 h-4" />
          Wall Finishes ({data.wallFinishes.length})
        </button>

        <button
          onClick={() => setActiveTab('cabinet')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'cabinet'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <Box className="w-4 h-4" />
          Cabinet Materials ({data.cabinetFinishes.length})
        </button>

        <button
          onClick={() => setActiveTab('flooring')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'flooring'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <Layers className="w-4 h-4" />
          Flooring Finishes ({data.flooringFinishes.length})
        </button>

        <button
          onClick={() => setActiveTab('lighting')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'lighting'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <SunMedium className="w-4 h-4" />
          Lighting Moods ({data.lightingMoods.length})
        </button>

        <button
          onClick={() => setActiveTab('hardware')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'hardware'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <Wrench className="w-4 h-4" />
          Hardware Packages ({data.hardwarePackages.length})
        </button>

        <button
          onClick={() => setActiveTab('substrates')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'substrates'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <IndianRupee className="w-4 h-4" />
          Room Substrates & Labor
        </button>
      </div>

      {/* TAB 1: WALL FINISHES */}
      {activeTab === 'wall' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
                Wall Finishes & Architectural Paneling
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-cream-200/60">
                Rendered on main walls & accent backdrops in the 3D room visualizer
              </p>
            </div>
            <button
              onClick={() => {
                setIsNew(true);
                setEditingItem({
                  type: 'wall',
                  item: {
                    id: `wall-${Date.now()}`,
                    name: 'New Designer Finish',
                    category: 'Luxury Emulsion Paint',
                    brand: 'Asian Paints Royale',
                    hex: '#D9C8B4',
                    cost: 6500,
                    description: 'Premium washable texture finish.'
                  }
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Wall Finish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.wallFinishes.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg shadow-inner border border-cream-300 dark:border-forest-700 shrink-0"
                      style={{ backgroundColor: w.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-xs text-forest-950 dark:text-cream-50 truncate">
                        {w.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 dark:text-cream-200/60">
                        {w.brand} • {w.hex}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-600 dark:text-cream-200/80 line-clamp-2">
                    {w.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-100 dark:border-forest-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-forest-900 dark:text-cream-100">
                    ₹{w.cost.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({ type: 'wall', item: { ...w } });
                      }}
                      className="p-1.5 text-charcoal-500 hover:text-forest-900 dark:hover:text-cream-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteWall(w.id)}
                      className="p-1.5 text-charcoal-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CABINET FINISHES */}
      {activeTab === 'cabinet' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
                Cabinet Laminates, Veneers & Acrylics
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-cream-200/60">
                Materials for modular kitchen shutters, wardrobes, vanity units, and consoles
              </p>
            </div>
            <button
              onClick={() => {
                setIsNew(true);
                setEditingItem({
                  type: 'cabinet',
                  item: {
                    id: `cabinet-${Date.now()}`,
                    name: 'New Matte Acrylic',
                    category: 'High-Gloss Acrylic',
                    brand: 'Merino Luvih',
                    hex: '#334155',
                    metalness: 0.1,
                    roughness: 0.3,
                    cost: 29000,
                    description: 'Anti-scratch 1.5mm acrylic with seamless edgebanding.'
                  }
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Cabinet Finish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.cabinetFinishes.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg shadow-inner border border-cream-300 dark:border-forest-700 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-xs text-forest-950 dark:text-cream-50 truncate">
                        {c.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 dark:text-cream-200/60">
                        {c.brand} • Roughness: {c.roughness}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-600 dark:text-cream-200/80 line-clamp-2">
                    {c.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-100 dark:border-forest-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-forest-900 dark:text-cream-100">
                    ₹{c.cost.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({ type: 'cabinet', item: { ...c } });
                      }}
                      className="p-1.5 text-charcoal-500 hover:text-forest-900 dark:hover:text-cream-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCabinet(c.id)}
                      className="p-1.5 text-charcoal-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FLOORING FINISHES */}
      {activeTab === 'flooring' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
                Flooring Materials & Tiles
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-cream-200/60">
                Italian marble, vitrified large format slabs, hardwood parquet, and anti-skid stones
              </p>
            </div>
            <button
              onClick={() => {
                setIsNew(true);
                setEditingItem({
                  type: 'flooring',
                  item: {
                    id: `floor-${Date.now()}`,
                    name: 'New Vitrified Tile',
                    category: 'Vitrified Slab',
                    brand: 'Kajaria Eternity',
                    hex: '#D1CDCE',
                    roughness: 0.15,
                    cost: 22000,
                    description: 'Large slab 800x1600mm nano-polished mirror tiles.'
                  }
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Flooring
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.flooringFinishes.map((f) => (
              <div
                key={f.id}
                className="p-4 rounded-xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg shadow-inner border border-cream-300 dark:border-forest-700 shrink-0"
                      style={{ backgroundColor: f.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-xs text-forest-950 dark:text-cream-50 truncate">
                        {f.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 dark:text-cream-200/60">
                        {f.brand} • {f.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-600 dark:text-cream-200/80 line-clamp-2">
                    {f.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-100 dark:border-forest-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-forest-900 dark:text-cream-100">
                    ₹{f.cost.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({ type: 'flooring', item: { ...f } });
                      }}
                      className="p-1.5 text-charcoal-500 hover:text-forest-900 dark:hover:text-cream-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFlooring(f.id)}
                      className="p-1.5 text-charcoal-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LIGHTING MOODS */}
      {activeTab === 'lighting' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
                Architectural Lighting Moods & Kelvins
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-cream-200/60">
                Calibrated false ceiling cove LED strips, magnetic tracks, and ambient scenes
              </p>
            </div>
            <button
              onClick={() => {
                setIsNew(true);
                setEditingItem({
                  type: 'lighting',
                  item: {
                    id: `light-${Date.now()}`,
                    name: 'New Custom Lighting Scene',
                    coveColor: '#FFAA33',
                    ambientColor: '#FFF2E0',
                    ambientIntensity: 0.9,
                    cost: 16000,
                    description: 'Architectural magnetic track and dimmable cove glow.'
                  }
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Lighting Mood
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.lightingMoods.map((l) => (
              <div
                key={l.id}
                className="p-4 rounded-xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 shrink-0">
                      <div
                        className="w-7 h-7 rounded-full border-2 border-white dark:border-forest-900 shadow-sm"
                        style={{ backgroundColor: intToHex(l.coveColor) }}
                        title="Cove Color"
                      />
                      <div
                        className="w-7 h-7 rounded-full border-2 border-white dark:border-forest-900 shadow-sm"
                        style={{ backgroundColor: intToHex(l.ambientColor) }}
                        title="Ambient Color"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-xs text-forest-950 dark:text-cream-50 truncate">
                        {l.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 dark:text-cream-200/60">
                        Intensity: {l.ambientIntensity || 1.0}x
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-600 dark:text-cream-200/80 line-clamp-2">
                    {l.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-100 dark:border-forest-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-forest-900 dark:text-cream-100">
                    ₹{l.cost.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({
                          type: 'lighting',
                          item: {
                            ...l,
                            coveColor: intToHex(l.coveColor),
                            ambientColor: intToHex(l.ambientColor)
                          }
                        });
                      }}
                      className="p-1.5 text-charcoal-500 hover:text-forest-900 dark:hover:text-cream-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLighting(l.id)}
                      className="p-1.5 text-charcoal-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: HARDWARE PACKAGES */}
      {activeTab === 'hardware' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
                Fittings & Hardware Packages
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-cream-200/60">
                Tandem boxes, hydraulic soft-close hinges, and lift-ups from Häfele, Hettich, Blum
              </p>
            </div>
            <button
              onClick={() => {
                setIsNew(true);
                setEditingItem({
                  type: 'hardware',
                  item: {
                    id: `hw-${Date.now()}`,
                    name: 'New Soft-Close System',
                    brand: 'Häfele Germany',
                    cost: 10500,
                    description: 'Full extension soft-close drawer runners with damping.'
                  }
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Hardware
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.hardwarePackages.map((h) => (
              <div
                key={h.id}
                className="p-4 rounded-xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-cream-100 dark:bg-forest-800 text-forest-900 dark:text-cream-100 mb-1">
                      {h.brand}
                    </span>
                    <h4 className="font-medium text-xs text-forest-950 dark:text-cream-50">
                      {h.name}
                    </h4>
                  </div>
                  <p className="text-xs text-charcoal-600 dark:text-cream-200/80 line-clamp-2">
                    {h.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-100 dark:border-forest-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-forest-900 dark:text-cream-100">
                    ₹{h.cost.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingItem({ type: 'hardware', item: { ...h } });
                      }}
                      className="p-1.5 text-charcoal-500 hover:text-forest-900 dark:hover:text-cream-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteHardware(h.id)}
                      className="p-1.5 text-charcoal-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ROOM SUBSTRATES & LABOR */}
      {activeTab === 'substrates' && (
        <div className="p-6 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 space-y-6">
          <div>
            <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
              Base Carpentry Substrate Costs (710 BWP Marine Plywood)
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-cream-200/60 mt-0.5">
              Base fabrication structure cost calculated per room in the turnkey pricing estimator
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(data.roomSubstrates).map(([room, cost]) => (
              <div key={room} className="p-4 rounded-xl border border-cream-200 dark:border-forest-800 bg-cream-50/50 dark:bg-forest-950/40 space-y-1.5">
                <label className="text-xs font-medium text-forest-900 dark:text-cream-100 capitalize">
                  {room} Room Substrate (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-charcoal-400">₹</span>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) =>
                      setData({
                        ...data,
                        roomSubstrates: {
                          ...data.roomSubstrates,
                          [room]: parseInt(e.target.value) || 0
                        }
                      })
                    }
                    className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-900 text-xs font-semibold"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-cream-200 dark:border-forest-800 max-w-md">
            <label className="text-xs font-medium text-forest-900 dark:text-cream-100 block mb-1">
              Labor & Installation Rate Percentage (%)
            </label>
            <p className="text-[11px] text-charcoal-500 dark:text-cream-200/60 mb-2">
              Automatically added to the turnkey estimate for certified carpentry, surface bonding & electrical fitting
            </p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="50"
                value={data.laborRatePercentage}
                onChange={(e) =>
                  setData({
                    ...data,
                    laborRatePercentage: parseInt(e.target.value) || 0
                  })
                }
                className="w-24 px-3 py-1.5 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-900 text-xs font-semibold"
              />
              <span className="text-xs text-charcoal-600 dark:text-cream-200">% of materials subtotal</span>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / ADD MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-forest-900 rounded-2xl border border-cream-200 dark:border-forest-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-forest-800">
              <h3 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50 capitalize">
                {isNew ? 'Add' : 'Edit'} {editingItem.type} Finish
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-cream-200 text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModalItem} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-charcoal-600 dark:text-cream-200 mb-1">
                  Name / Finish Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.item.name || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, name: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs text-forest-950 dark:text-cream-100"
                />
              </div>

              {editingItem.type !== 'substrates' && (
                <div>
                  <label className="block text-[11px] font-medium text-charcoal-600 dark:text-cream-200 mb-1">
                    Brand / Manufacturer
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.item.brand || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, brand: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs text-forest-950 dark:text-cream-100"
                  />
                </div>
              )}

              {/* Color picker for wall, cabinet, flooring */}
              {(editingItem.type === 'wall' || editingItem.type === 'cabinet' || editingItem.type === 'flooring') && (
                <div>
                  <label className="block text-[11px] font-medium text-charcoal-600 dark:text-cream-200 mb-1">
                    Visual Swatch / Hex Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingItem.item.hex || '#ffffff'}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, hex: e.target.value }
                        })
                      }
                      className="w-10 h-8 rounded border border-cream-300 dark:border-forest-700 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={editingItem.item.hex || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          item: { ...editingItem.item, hex: e.target.value }
                        })
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono uppercase"
                    />
                  </div>
                </div>
              )}

              {/* Lighting colors */}
              {editingItem.type === 'lighting' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal-600 dark:text-cream-200 mb-1">
                      Cove Glow Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={typeof editingItem.item.coveColor === 'string' ? editingItem.item.coveColor : intToHex(editingItem.item.coveColor)}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            item: { ...editingItem.item, coveColor: e.target.value }
                          })
                        }
                        className="w-9 h-8 rounded border border-cream-300 dark:border-forest-700 cursor-pointer p-0.5"
                      />
                      <span className="text-[11px] font-mono text-charcoal-500">
                        {typeof editingItem.item.coveColor === 'string' ? editingItem.item.coveColor : intToHex(editingItem.item.coveColor)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-charcoal-600 dark:text-cream-200 mb-1">
                      Ambient Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={typeof editingItem.item.ambientColor === 'string' ? editingItem.item.ambientColor : intToHex(editingItem.item.ambientColor)}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            item: { ...editingItem.item, ambientColor: e.target.value }
                          })
                        }
                        className="w-9 h-8 rounded border border-cream-300 dark:border-forest-700 cursor-pointer p-0.5"
                      />
                      <span className="text-[11px] font-mono text-charcoal-500">
                        {typeof editingItem.item.ambientColor === 'string' ? editingItem.item.ambientColor : intToHex(editingItem.item.ambientColor)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-charcoal-600 dark:text-cream-200 mb-1">
                  Cost (₹ INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-charcoal-400">₹</span>
                  <input
                    type="number"
                    required
                    value={editingItem.item.cost || 0}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, cost: parseInt(e.target.value) || 0 }
                      })
                    }
                    className="w-full pl-7 pr-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-charcoal-600 dark:text-cream-200 mb-1">
                  Specification & Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.item.description || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, description: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs text-forest-950 dark:text-cream-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-cream-200 dark:border-forest-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-lg text-charcoal-500 hover:bg-cream-100 dark:hover:bg-forest-800 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-medium"
                >
                  <Check className="w-3.5 h-3.5" />
                  Apply Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
