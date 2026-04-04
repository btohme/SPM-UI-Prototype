import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Layers, Target, BarChart2, Save, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Modal from '../components/ui/Modal';
import FormField from '../components/forms/FormField';
import { useApp } from '../context/AppContext';
import { getModuleConfig } from '../data/moduleConfigs';
import { MOCK_DATA } from '../data/mockData';
import type { HubHierarchy } from '../types';

// --- Recursive Component for N-Level Hierarchies ---
function HierarchyNode({ node, parentId, level = 1 }: { node: HubHierarchy; parentId: string; level?: number }) {
  const { t } = useApp();
  const config = getModuleConfig(node.moduleKey);

  // Local state
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [expandedItems, setExpandedRows] = useState<Set<string>>(new Set());
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // THE FIX: Added Tab State
  const [activeTab, setActiveTab] = useState(0);

  // Load initial mock data
  useEffect(() => {
    const allData = (MOCK_DATA[node.moduleKey] as Record<string, unknown>[]) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const linkedData = allData.filter((item: any) => item[node.foreignKey] === parentId);
    setItems(linkedData);
  }, [node, parentId, node.moduleKey]);

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleOpenModal = () => {
    setActiveTab(0); // Reset to first tab
    setFormData({}); // Clear old data
    setModalOpen(true);
  };

  const handleSave = () => {
    // Auto-inject the foreign key to link it to the parent!
    const newItem = { ...formData, id: Date.now().toString(), code: `${config.codePrefix}-NEW`, [node.foreignKey]: parentId };
    setItems(prev => [...prev, newItem]);
    setModalOpen(false);
  };

  // Tab Logic
  const tabs = config.tabs || [];
  const currentTab = tabs[activeTab];
  const fieldsForTab = config.fields.filter(f => f.tab === currentTab?.key);

  const LevelIcon = level === 1 ? Layers : level === 2 ? Target : BarChart2;
  const indentColor = level === 1 ? '#1B5E3B' : level === 2 ? '#0277BD' : '#E8A020';

  return (
    <div style={{ marginTop: '16px' }}>

      {/* Section Header */}
      <div className="pure-flex-between" style={{ marginBottom: '12px', paddingInlineStart: `${(level - 1) * 16}px` }}>
        <div className="pure-flex-start">
          <LevelIcon size={18} color={indentColor} />
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#374151', margin: 0 }}>
            {t(config.nameAr, config.nameEn)}
          </h4>
          <span className="pure-badge pure-badge-gray">{items.length}</span>
        </div>
        <button onClick={handleOpenModal} className="pure-btn-link" style={{ color: indentColor }}>
          <Plus size={14} /> {t('إضافة', 'Add')} {t(config.nameAr, config.nameEn)}
        </button>
      </div>

      {/* Render Items */}
      {items.length === 0 ? (
        <div style={{ padding: '24px', border: '1px dashed #d1d5db', borderRadius: '12px', textAlign: 'center', marginInlineStart: `${(level - 1) * 16}px` }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            {t('لا توجد بيانات مرتبطة بعد.', 'No linked data yet.')}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginInlineStart: `${(level - 1) * 16}px` }}>
          {items.map((item, idx) => {
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

                  {hasChildren && (
                    <button onClick={() => toggleExpand(id)} className="pure-btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                      {t('المحتوى المرتبط', 'Linked Content')}
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && hasChildren && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                        {node.children!.map((childNode, childIdx) => (
                          <HierarchyNode key={childIdx} node={childNode} parentId={id} level={level + 1} />
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

      {/* THE FIX: The XL Tabbed Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        titleAr={`إضافة ${config.nameAr}`}
        titleEn={`Add ${config.nameEn}`}
        size="xl" // Increased size for complex forms
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            {/* Left side: Tab Navigation */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setActiveTab(t => Math.max(0, t - 1))}
                disabled={activeTab === 0}
                className="pure-btn-secondary"
                style={{ opacity: activeTab === 0 ? 0.5 : 1 }}
              >
                <ChevronRight size={16} /> {t('السابق', 'Previous')}
              </button>
              {activeTab < tabs.length - 1 && (
                <button
                  onClick={() => setActiveTab(t => t + 1)}
                  className="pure-btn-secondary"
                  style={{ background: '#e8f5ee', color: '#1B5E3B', borderColor: '#a7f3d0' }}
                >
                  {t('التالي', 'Next')} <ChevronLeft size={16} />
                </button>
              )}
            </div>

            {/* Right side: Save/Cancel */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setModalOpen(false)} className="pure-btn-secondary">
                {t('إلغاء', 'Cancel')}
              </button>
              <button onClick={handleSave} className="pure-btn-primary">
                <Save size={16} /> {t('حفظ وربط', 'Save & Link')}
              </button>
            </div>
          </div>
        }
      >
        {/* Render Tabs Header inside the Modal body (Negative margin to stretch it flush) */}
        <div style={{ margin: '-24px -24px 24px -24px' }}>
          <div className="pure-tabs-header custom-scrollbar">
            {tabs.map((tab, idx) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(idx)}
                className={`pure-tab-btn ${activeTab === idx ? 'active' : ''}`}
              >
                {t(tab.labelAr, tab.labelEn)}
              </button>
            ))}
          </div>
        </div>

        {/* Render the Active Tab's Fields */}
        <motion.div
          key={currentTab?.key}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {fieldsForTab.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '48px 0' }}>
              {t('لا توجد حقول في هذا التبويب', 'No fields in this tab')}
            </p>
          ) : (
            <div className="pure-form-grid">
              {fieldsForTab.map(field => (
                <FormField
                  key={field.key}
                  field={field}
                  value={formData[field.key] ?? ''}
                  onChange={(k, v) => setFormData(p => ({ ...p, [k]: v }))}
                />
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

  // Find parent item (e.g. The Strategy)
  const allItems = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const parentItem = allItems.find(i => String(i.id) === itemId || String(i.code) === itemId) || { nameAr: 'مسودة استراتيجية جديدة', nameEn: 'New Strategy Draft', code: itemId };

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
              <span style={{ fontSize: '12px', border: '1px solid rgba(255,255,255,0.4)', padding: '2px 10px', borderRadius: '999px' }}>
                {t('مسودة الإعداد', 'Setup Draft')}
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
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', margin: '0 0 8px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
            {t('منشئ الهيكل', 'Hierarchy Builder')}
          </h3>

          {/* Initiate the recursive rendering! */}
          {hierarchy.map((node, idx) => (
            <HierarchyNode key={idx} node={node} parentId={String(parentItem.id || parentItem.code)} />
          ))}
        </div>

      </div>
    </Layout>
  );
}