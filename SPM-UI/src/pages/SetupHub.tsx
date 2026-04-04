import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Layers, Target, BarChart2, Save, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search, Maximize2, Minimize2, Edit } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Modal from '../components/ui/Modal';
import FormField from '../components/forms/FormField';
import { useApp } from '../context/AppContext';
import { getModuleConfig } from '../data/moduleConfigs';
import { MOCK_DATA } from '../data/mockData';
import type { HubHierarchy } from '../types';

// --- Recursive Component ---
function HierarchyNode({ node, parentId, level = 1, globalExpand, searchQuery }: { node: HubHierarchy; parentId: string; level?: number; globalExpand: boolean; searchQuery: string }) {
  const { t } = useApp();
  const config = getModuleConfig(node.moduleKey);

  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [expandedItems, setExpandedRows] = useState<Set<string>>(new Set());

  // THE FIX: Added tracking for Add vs Edit mode
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [activeTab, setActiveTab] = useState(0);

  // Load initial mock data
  useEffect(() => {
    const allData = (MOCK_DATA[node.moduleKey] as Record<string, unknown>[]) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const linkedData = allData.filter((item: any) => item[node.foreignKey] === parentId);
    setItems(linkedData);
  }, [node, parentId, node.moduleKey]);

  // Sync with global expand/collapse
  useEffect(() => {
    if (globalExpand) {
      setExpandedRows(new Set(items.map((_, idx) => String(items[idx].id || items[idx].code || idx))));
    } else {
      setExpandedRows(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalExpand]);

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Open modal for ADDING
  const handleOpenAddModal = () => {
    setActiveTab(0);
    setFormData({});
    setEditingItemId(null);
    setModalOpen(true);
  };

  // Open modal for EDITING
  const handleOpenEditModal = (item: Record<string, unknown>) => {
    setActiveTab(0);
    setFormData({ ...item }); // Pre-fill with existing data
    setEditingItemId(String(item.id || item.code));
    setModalOpen(true);
  };

  // Handle Save (Smart enough to know if it's an Add or Edit)
  const handleSave = () => {
    if (editingItemId) {
      // --- EDIT MODE ---
      const updatedItem = { ...formData, [node.foreignKey]: parentId };

      // Update MOCK_DATA
      if (MOCK_DATA[node.moduleKey]) {
        const dataIndex = MOCK_DATA[node.moduleKey].findIndex((i: any) => String(i.id || i.code) === editingItemId);
        if (dataIndex > -1) {
          MOCK_DATA[node.moduleKey][dataIndex] = { ...MOCK_DATA[node.moduleKey][dataIndex], ...updatedItem };
        }
      }

      // Update local state
      setItems(prev => prev.map(i => String(i.id || i.code) === editingItemId ? { ...i, ...updatedItem } : i));

    } else {
      // --- ADD MODE ---
      const newItem = { ...formData, id: Date.now().toString(), code: `${config.codePrefix}-NEW`, [node.foreignKey]: parentId };
      if (!MOCK_DATA[node.moduleKey]) MOCK_DATA[node.moduleKey] = [];
      MOCK_DATA[node.moduleKey].push(newItem);
      setItems(prev => [...prev, newItem]);
    }

    setModalOpen(false);
    setEditingItemId(null);
    setFormData({});
  };

  const tabs = config.tabs || [];
  const currentTab = tabs[activeTab];
  const fieldsForTab = config.fields.filter(f => f.tab === currentTab?.key);

  const LevelIcon = level === 1 ? Layers : level === 2 ? Target : BarChart2;
  const indentColor = level === 1 ? '#1B5E3B' : level === 2 ? '#0277BD' : '#E8A020';

  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    const nameAr = String(item.nameAr || '').toLowerCase();
    const nameEn = String(item.nameEn || '').toLowerCase();
    const code = String(item.code || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return nameAr.includes(query) || nameEn.includes(query) || code.includes(query);
  });

  return (
    <div style={{ marginTop: '16px' }}>
      <div className="pure-flex-between" style={{ marginBottom: '12px', paddingInlineStart: `${(level - 1) * 20}px` }}>
        <div className="pure-flex-start">
          <LevelIcon size={18} color={indentColor} />
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#374151', margin: 0 }}>
            {t(config.nameAr, config.nameEn)}
          </h4>
          <span className="pure-badge pure-badge-gray">{filteredItems.length}</span>
        </div>
        <button onClick={handleOpenAddModal} className="pure-btn-link" style={{ color: indentColor }}>
          <Plus size={14} /> {t('إضافة', 'Add')} {t(config.nameAr, config.nameEn)}
        </button>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '16px', border: '1px dashed #d1d5db', borderRadius: '12px', textAlign: 'center', marginInlineStart: `${(level - 1) * 20}px` }}>
          <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>
            {t('لا توجد بيانات مرتبطة بعد.', 'No linked data yet.')}
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ marginInlineStart: `${(level - 1) * 20}px`, padding: '8px', color: '#9ca3af', fontSize: '12px', fontStyle: 'italic' }}>
          {t('لا توجد نتائج تطابق البحث.', 'No results match the search.')}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginInlineStart: `${(level - 1) * 20}px` }}>
          {filteredItems.map((item, idx) => {
            const id = String(item.id || item.code || idx);
            const isExpanded = expandedItems.has(id);
            const hasChildren = node.children && node.children.length > 0;

            return (
              <div key={id} className="pure-card" style={{ padding: '16px', borderLeft: `4px solid ${indentColor}` }}>
                <div className="pure-flex-between">
                  <div>
                    <p style={{ fontWeight: '700', color: '#1f2937', fontSize: '14px', margin: '0 0 4px 0' }}>
                      {t(String(item.nameAr || item.titleAr || ''), String(item.nameEn || item.nameAr || ''))}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {t('الكود', 'Code')}: {String(item.code || '---')}
                    </p>
                  </div>

                  <div className="pure-flex-start" style={{ gap: '12px' }}>
                    {/* THE FIX: The new inline Edit Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpenEditModal(item); }}
                      className="pure-table-action-btn edit"
                      title={t('تعديل', 'Edit')}
                    >
                      <Edit size={16} />
                    </button>

                    {hasChildren && (
                      <button onClick={() => toggleExpand(id)} className="pure-btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        {t('المحتوى المرتبط', 'Linked Content')}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && hasChildren && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                        {node.children!.map((childNode, childIdx) => (
                          <HierarchyNode key={childIdx} node={childNode} parentId={id} level={level + 1} globalExpand={globalExpand} searchQuery={searchQuery} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* The XL Tabbed Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        // THE FIX: Dynamic Title based on Add vs Edit
        titleAr={editingItemId ? `تعديل ${config.nameAr}` : `إضافة ${config.nameAr}`}
        titleEn={editingItemId ? `Edit ${config.nameEn}` : `Add ${config.nameEn}`}
        size="xl"
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setActiveTab(t => Math.max(0, t - 1))} disabled={activeTab === 0} className="pure-btn-secondary" style={{ opacity: activeTab === 0 ? 0.5 : 1 }}>
                <ChevronRight size={16} /> {t('السابق', 'Previous')}
              </button>
              {activeTab < tabs.length - 1 && (
                <button onClick={() => setActiveTab(t => t + 1)} className="pure-btn-secondary" style={{ background: '#e8f5ee', color: '#1B5E3B', borderColor: '#a7f3d0' }}>
                  {t('التالي', 'Next')} <ChevronLeft size={16} />
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setModalOpen(false)} className="pure-btn-secondary">{t('إلغاء', 'Cancel')}</button>
              <button onClick={handleSave} className="pure-btn-primary">
                <Save size={16} /> {editingItemId ? t('حفظ التعديلات', 'Save Changes') : t('حفظ وربط', 'Save & Link')}
              </button>
            </div>
          </div>
        }
      >
        <div style={{ margin: '-24px -24px 24px -24px' }}>
          <div className="pure-tabs-header custom-scrollbar">
            {tabs.map((tab, idx) => (
              <button key={tab.key} onClick={() => setActiveTab(idx)} className={`pure-tab-btn ${activeTab === idx ? 'active' : ''}`}>{t(tab.labelAr, tab.labelEn)}</button>
            ))}
          </div>
        </div>
        <motion.div key={currentTab?.key} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
          {fieldsForTab.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '48px 0' }}>{t('لا توجد حقول في هذا التبويب', 'No fields in this tab')}</p>
          ) : (
            <div className="pure-form-grid">
              {fieldsForTab.map(field => (
                <FormField key={field.key} field={field} value={formData[field.key] ?? ''} onChange={(k, v) => setFormData(p => ({ ...p, [k]: v }))} />
              ))}
            </div>
          )}
        </motion.div>
      </Modal>
    </div>
  );
}

// --- Main Page Wrapper ---
export default function SetupHub() {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const moduleKey = searchParams.get('modulekey') || '';
  const itemId = searchParams.get('itemid') || '';

  const config = getModuleConfig(moduleKey);
  const hierarchy = config.setupHub?.hierarchy || [];

  const allItems = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const parentItem = allItems.find(i => String(i.id) === itemId || String(i.code) === itemId) || { nameAr: 'مسودة استراتيجية جديدة', nameEn: 'New Strategy Draft', code: itemId };

  const [globalExpand, setGlobalExpand] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!config.setupHub?.enabled) {
    return <Layout><p style={{ padding: '48px', textAlign: 'center' }}>{t('هذه الوحدة لا تدعم الإعداد المتقدم.', 'This module does not support advanced setup.')}</p></Layout>;
  }

  return (
    <Layout>
      <div className="pure-page-container">

        <nav className="pure-breadcrumb">
          <button onClick={() => navigate(`/list?modulekey=${moduleKey}`)} className="pure-breadcrumb-link">
            {t(config.nameAr, config.nameEn)}
          </button>
          <ChevronLeft size={14} color="#d1d5db" />
          <span className="pure-breadcrumb-current">{t('مركز الإعداد', 'Setup Hub')}</span>
        </nav>

        {/* Master Parent Banner */}
        <div className="pure-hero-banner primary" style={{ marginBottom: '24px' }}>
          <div>
            <div className="pure-flex-start" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '999px', fontFamily: 'monospace' }}>
                {String(parentItem.code)}
              </span>
            </div>
            <h2 className="pure-hero-title">{t(String(parentItem.nameAr), String(parentItem.nameEn || parentItem.nameAr))}</h2>
            <p className="pure-hero-subtitle">{t('قم ببناء الهيكل المرتبط أدناه.', 'Build the related hierarchy below.')}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
             <button onClick={() => navigate(`/list?modulekey=${moduleKey}`)} className="pure-btn-primary" style={{ background: '#ffffff', color: '#1B5E3B' }}>
               <CheckCircle size={18} /> {t('إنهاء الإعداد', 'Finish Setup')}
             </button>
          </div>
        </div>

        <div className="pure-content-card" style={{ padding: '24px' }}>

          <div className="pure-flex-between" style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', margin: 0 }}>
              {t('منشئ الهيكل', 'Hierarchy Builder')}
            </h3>

            <div className="pure-flex-start" style={{ gap: '12px' }}>
              <div className="pure-input-wrapper" style={{ width: '250px' }}>
                <Search size={16} className="pure-input-addon" />
                <input
                  type="text"
                  className="pure-input pure-input-with-addon"
                  placeholder={t('بحث سريع...', 'Quick Search...')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) setGlobalExpand(true);
                  }}
                  style={{ padding: '8px 16px 8px 40px' }}
                />
              </div>

              <button
                onClick={() => setGlobalExpand(!globalExpand)}
                className="pure-btn-secondary"
                style={{ padding: '8px 12px' }}
              >
                {globalExpand ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                {globalExpand ? t('طي الكل', 'Collapse All') : t('توسيع الكل', 'Expand All')}
              </button>
            </div>
          </div>

          {hierarchy.map((node, idx) => (
            <HierarchyNode key={idx} node={node} parentId={String(parentItem.id || parentItem.code)} globalExpand={globalExpand} searchQuery={searchQuery} />
          ))}
        </div>

      </div>
    </Layout>
  );
}