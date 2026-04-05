import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Layers, Target, BarChart2, Save, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search, Maximize2, Minimize2, Edit, HelpCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Modal from '../components/ui/Modal';
import FormField from '../components/forms/FormField';
import { useApp } from '../context/AppContext';
import { getModuleConfig } from '../data/moduleConfigs';
import { MOCK_DATA, persistData } from '../data/mockData';
import type { HubHierarchy } from '../types';
import { showToast } from '../components/ui/Toast';

// --- Recursive Component for Children ---
function HierarchyNode({
  node, parentId, level = 1, globalExpand, searchQuery, onDataChange,
  isTourStep2 = false, onNextTourStep, onSkipTour, parentName
}: {
  node: HubHierarchy; parentId: string; level?: number; globalExpand: boolean; searchQuery: string; onDataChange: () => void;
  isTourStep2?: boolean; onNextTourStep?: () => void; onSkipTour?: () => void; parentName?: string;
}) {
  const { t, language } = useApp();
  const config = getModuleConfig(node.moduleKey);

  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [expandedItems, setExpandedRows] = useState<Set<string>>(new Set());

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const allData = (MOCK_DATA[node.moduleKey] as Record<string, unknown>[]) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const linkedData = allData.filter((item: any) => item[node.foreignKey] === parentId);
    setItems(linkedData);
  }, [node, parentId, node.moduleKey, onDataChange]);

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

  const handleOpenAddModal = () => {
    setActiveTab(0);
    setFormData({});
    setEditingItemId(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: Record<string, unknown>) => {
    setActiveTab(0);
    setFormData({ ...item });
    setEditingItemId(String(item.id || item.code));
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingItemId) {
      const updatedItem = { ...formData, [node.foreignKey]: parentId };
      if (MOCK_DATA[node.moduleKey]) {
        const dataIndex = MOCK_DATA[node.moduleKey].findIndex((i: any) => String(i.id) === editingItemId || String(i.code) === editingItemId);
        if (dataIndex > -1) {
          MOCK_DATA[node.moduleKey][dataIndex] = { ...MOCK_DATA[node.moduleKey][dataIndex], ...updatedItem };
        }
      }
      setItems(prev => prev.map(i => (String(i.id) === editingItemId || String(i.code) === editingItemId) ? { ...i, ...updatedItem } : i));
    } else {
      const uniqueId = Math.floor(1000 + Math.random() * 9000);
      const newItem = { ...formData, id: Date.now().toString(), code: `${config.codePrefix}-NEW-${uniqueId}`, [node.foreignKey]: parentId };
      if (!MOCK_DATA[node.moduleKey]) MOCK_DATA[node.moduleKey] = [];
      MOCK_DATA[node.moduleKey].push(newItem);
      setItems(prev => [...prev, newItem]);
    }
    persistData();
    showToast('تم حفظ البيانات بنجاح', 'Data saved successfully');
    setModalOpen(false);
    setEditingItemId(null);
    setFormData({});
    onDataChange();
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
      <div className="pure-flex-between" style={{ marginBottom: '12px' }}>
        <div className="pure-flex-start">
          <LevelIcon size={18} color={indentColor} />
          <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111827', margin: 0 }}>
            {t(config.nameAr, config.nameEn)}
          </h4>
          <span className="pure-badge pure-badge-gray" style={{ background: '#e5e7eb', color: '#374151' }}>{filteredItems.length}</span>
        </div>

        {/* TOUR STEP 2: Highlight the Add Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={handleOpenAddModal}
            className={`pure-btn-primary ${isTourStep2 ? 'tour-highlight' : ''}`}
            style={{ padding: '6px 12px', fontSize: '12px', background: isTourStep2 ? '#111827' : indentColor }}
          >
            <Plus size={14} /> {t('إضافة', 'Add')} {t(config.nameAr, config.nameEn)}
          </button>

          {isTourStep2 && (
            <div className="pure-tour-tooltip" style={{ top: '130%', left: language === 'ar' ? 0 : 'auto', right: language === 'ar' ? 'auto' : 0 }}>                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{t('إضافة مستوى جديد', 'Add New Level')}</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>
                  {t(`اضغط هنا لإضافة أول [${config.nameAr}]. بمجرد الإضافة، يمكنك النقر عليها لإضافة العناصر الفرعية.`, `Click here to add your first [${config.nameEn}]. Once added, you can click it to add child items.`)}
                </p>
                <div className="pure-flex-between">
                   <button onClick={onSkipTour} className="pure-btn-link" style={{ fontSize: '12px', color: '#6b7280' }}>{t('تخطي', 'Skip')}</button>
                   <button onClick={onNextTourStep} className="pure-btn-primary" style={{ padding: '4px 12px', fontSize: '12px' }}>{t('التالي', 'Next')}</button>
                </div>
             </div>
          )}
        </div>
      </div>


      {/* ... (rest of the child list and modal rendering exactly as before) ... */}
      {items.length === 0 ? (
        <div style={{ padding: '16px', border: '2px dashed #d1d5db', borderRadius: '12px', textAlign: 'center', backgroundColor: '#f9fafb' }}>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0, fontWeight: '600' }}>
            {t('لا توجد بيانات مرتبطة بعد.', 'No linked data yet.')}
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ padding: '8px', color: '#9ca3af', fontSize: '12px', fontStyle: 'italic' }}>
          {t('لا توجد نتائج تطابق البحث.', 'No results match the search.')}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredItems.map((item, idx) => {
            const id = String(item.id || item.code || idx);
            const isExpanded = expandedItems.has(id);
            const hasChildren = node.children && node.children.length > 0;

            return (
              <div key={id} style={{
                padding: '16px', border: '1px solid #d1d5db', borderInlineStart: `5px solid ${indentColor}`,
                borderRadius: '12px', backgroundColor: `${indentColor}0A`,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.04)'
              }}>
                <div className="pure-flex-between">
                  <div>
                    <p style={{ fontWeight: '800', color: '#111827', fontSize: '15px', margin: '0 0 4px 0' }}>
                      {t(String(item.nameAr || item.titleAr || ''), String(item.nameEn || item.nameAr || ''))}
                    </p>
                    <p style={{ fontSize: '12px', color: '#4b5563', margin: 0, fontWeight: '600' }}>
                      {t('الكود', 'Code')}: <span style={{ fontFamily: 'monospace', background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>{String(item.code || '---')}</span>
                    </p>
                  </div>

                  <div className="pure-flex-start" style={{ gap: '12px' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpenEditModal(item); }}
                      className="pure-table-action-btn edit"
                      style={{ background: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                      title={t('تعديل', 'Edit')}
                    >
                      <Edit size={16} />
                    </button>

                    {hasChildren && (
                      <button
                        onClick={() => toggleExpand(id)}
                        className="pure-btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '12px', background: '#ffffff', borderColor: '#d1d5db', color: '#374151' }}
                      >
                        {t('المحتوى المرتبط', 'Linked Content')}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && hasChildren && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{
                        marginTop: '16px', padding: '20px', border: '1px solid #d1d5db',
                        borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                      }}>
                        {node.children!.map((childNode, childIdx) => (
                          <HierarchyNode key={childIdx} node={childNode} parentId={id} level={level + 1} globalExpand={globalExpand} searchQuery={searchQuery} onDataChange={onDataChange} />
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

      {/* Edit Modal (Truncated for brevity, stays exactly the same) */}
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
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
              <button onClick={handleSave} className="pure-btn-primary" style={{ background: indentColor }}>
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
  const { t, language } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const moduleKey = searchParams.get('modulekey') || '';
  const itemId = searchParams.get('itemid') || '';

  const config = getModuleConfig(moduleKey);
  const hierarchy = config.setupHub?.hierarchy || [];

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const allItems = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const parentItem = allItems.find(i => String(i.id) === itemId || String(i.code) === itemId) || { nameAr: '', nameEn: '', code: itemId };

  const [globalExpand, setGlobalExpand] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- TOUR STATE & DYNAMIC NAMING ---
  const [tourStep, setTourStep] = useState(0); // 0 = inactive

  const parentName = t(config.nameAr, config.nameEn);
  const childConfig = hierarchy[0] ? getModuleConfig(hierarchy[0].moduleKey) : null;
  const childName = childConfig ? t(childConfig.nameAr, childConfig.nameEn) : t('عنصر', 'Item');

  // --- PARENT EDIT STATE ---
  const [isParentModalOpen, setParentModalOpen] = useState(false);
  const [parentFormData, setParentFormData] = useState<Record<string, unknown>>({});
  const [parentActiveTab, setParentActiveTab] = useState(0);

  const handleOpenParentEdit = () => {
    setParentActiveTab(0);
    setParentFormData({ ...parentItem });
    setParentModalOpen(true);
  };

  const handleSaveParent = () => {
    if (MOCK_DATA[moduleKey]) {
      const dataIndex = MOCK_DATA[moduleKey].findIndex((i: any) => String(i.id) === itemId || String(i.code) === itemId);
      if (dataIndex > -1) {
        MOCK_DATA[moduleKey][dataIndex] = { ...MOCK_DATA[moduleKey][dataIndex], ...parentFormData };
        persistData();
        showToast('تم تعديل البيانات بنجاح', 'Parent updated successfully');
        setRefreshTrigger(r => r + 1);
      }
    }
    setParentModalOpen(false);
  };

  const getHierarchyPath = () => {
    const path = [config];
    let currentLevel = hierarchy[0];
    while (currentLevel) {
      path.push(getModuleConfig(currentLevel.moduleKey));
      currentLevel = currentLevel.children?.[0];
    }
    return path;
  };

  if (!config.setupHub?.enabled) {
    return <Layout><p style={{ padding: '48px', textAlign: 'center' }}>{t('هذه الوحدة لا تدعم الإعداد المتقدم.', 'This module does not support advanced setup.')}</p></Layout>;
  }

  const parentTabs = config.tabs || [];
  const currentParentTab = parentTabs[parentActiveTab];
  const parentFieldsForTab = config.fields.filter(f => f.tab === currentParentTab?.key);

  return (
    <Layout>
      {/* Background Dimmer for Tour */}
      {tourStep > 0 && <div className="pure-tour-overlay" onClick={() => setTourStep(0)} />}

      <div className="pure-page-container">

        {/* Header with Breadcrumb and Contextual Help */}
        <div className="pure-flex-between" style={{ marginBottom: '16px' }}>
          <nav className="pure-breadcrumb" style={{ margin: 0 }}>
            <button onClick={() => navigate(`/list?modulekey=${moduleKey}`)} className="pure-breadcrumb-link">
              {t(config.nameAr, config.nameEn)}
            </button>
            <ChevronLeft size={14} color="#d1d5db" />
            <span className="pure-breadcrumb-current">{t('مركز الإعداد', 'Setup Hub')}</span>
          </nav>

          <button onClick={() => setTourStep(1)} className="pure-btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', background: '#f8fafc', borderColor: '#e2e8f0' }}>
            <HelpCircle size={15} color="#0277BD" />
            {t('كيف تعمل هذه الصفحة؟', 'How does this page work?')}
          </button>
        </div>

        <div className="pure-hero-banner primary" style={{ marginBottom: '24px', overflow: 'visible' }}>          <div>
            <div className="pure-flex-start" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '999px', fontFamily: 'monospace' }}>
                {String(parentItem.code)}
              </span>
            </div>

            <div className="pure-flex-start">
              <h2 className="pure-hero-title" style={{ margin: 0 }}>
                {t(
                  (String(parentItem.nameAr || parentItem.titleAr) === 'undefined' || !parentItem.nameAr && !parentItem.titleAr)
                    ? String(parentItem.code || 'مسودة جديدة')
                    : String(parentItem.nameAr || parentItem.titleAr),

                  (String(parentItem.nameEn || parentItem.titleEn) === 'undefined' || !parentItem.nameEn && !parentItem.titleEn)
                    ? String(parentItem.code || 'New Draft')
                    : String(parentItem.nameEn || parentItem.titleEn)
                )}
              </h2>
              <button
                onClick={handleOpenParentEdit}
                style={{
                  background: 'rgba(255,255,255,0.15)', border: 'none', color: '#ffffff',
                  padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: '0.2s'
                }}
                title={t('تعديل البيانات الأساسية', 'Edit Main Data')}
              >
                <Edit size={16} />
              </button>
            </div>

            <p className="pure-hero-subtitle">{t('قم ببناء الهيكل المرتبط أدناه.', 'Build the related hierarchy below.')}</p>

            {/* TOUR STEP 1: Highlight the Legend Brief */}
            <div
              className={`pure-flex-start ${tourStep === 1 ? 'tour-highlight' : ''}`}
              style={{
                marginTop: '16px', gap: '8px', flexWrap: 'wrap',
                padding: tourStep === 1 ? '8px 12px' : 0,
                background: tourStep === 1 ? '#ffffff' : 'transparent',
                borderRadius: '12px'
              }}
            >
              {getHierarchyPath().map((step, index, arr) => (
                <div key={step.key} className="pure-flex-start" style={{ gap: '8px' }}>
                  <div style={{
                    /* Color adapts safely depending on if it's highlighted over white, or normal over green */
                    background: index === 0 ? (tourStep === 1 ? '#e8f5ee' : '#ffffff') : (tourStep === 1 ? '#f3f4f6' : 'rgba(255,255,255,0.15)'),
                    color: index === 0 ? '#1B5E3B' : (tourStep === 1 ? '#374151' : '#ffffff'),
                    border: tourStep === 1 ? '1px solid #d1d5db' : '1px solid rgba(255,255,255,0.3)',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {t(step.nameAr, step.nameEn)}
                  </div>
                  {index < arr.length - 1 && (
                    <div style={{ color: tourStep === 1 ? '#9ca3af' : 'rgba(255,255,255,0.5)' }}>
                      {language === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </div>
                  )}
                </div>
              ))}

              {/* Tooltip for Step 1 */}
              {tourStep === 1 && (
                 <div className="pure-tour-tooltip" style={{ top: '115%', left: language === 'ar' ? 'auto' : 0, right: language === 'ar' ? 0 : 'auto' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{t('خريطة الهيكل', 'Hierarchy Map')}</h4>
                    <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>
                      {t(`توضح هذه الخريطة تسلسل البيانات. ستبدأ من [${parentName}] وتتفرع للأسفل لتعبئة [${childName}].`, `This map shows the data sequence. You start from [${parentName}] and branch down to [${childName}].`)}
                    </p>
                    <div className="pure-flex-between">
                       <button onClick={() => setTourStep(0)} className="pure-btn-link" style={{ fontSize: '12px', color: '#6b7280' }}>{t('تخطي', 'Skip')}</button>
                       <button onClick={() => setTourStep(2)} className="pure-btn-primary" style={{ padding: '4px 12px', fontSize: '12px' }}>{t('التالي', 'Next')}</button>
                    </div>
                 </div>
              )}
            </div>

          </div>

          {/* TOUR STEP 3: Highlight the Finish Setup Button */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
             <button
                onClick={() => navigate(`/list?modulekey=${moduleKey}`)}
                className={`pure-btn-primary ${tourStep === 3 ? 'tour-highlight' : ''}`}
                style={{ background: tourStep === 3 ? '#111827' : '#ffffff', color: tourStep === 3 ? '#ffffff' : '#1B5E3B' }}
              >
               <CheckCircle size={18} /> {t('إنهاء الإعداد', 'Finish Setup')}
             </button>

             {tourStep === 3 && (
                <div className="pure-tour-tooltip" style={{ top: '130%', left: '50%', marginLeft: '-140px' }}>                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{t('حفظ وإنهاء', 'Save & Finish')}</h4>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>
                    {t(`عند الانتهاء من بناء الهيكل، اضغط هنا لبدء إجراء العمل لإعتماد هيكلية [${parentName}]. يمكنك دائماً العودة إلى هنا عبر أيقونة الإعداد من القائمة.`, `When you finish building the structure, click here to start the workflow to approve the [${parentName}] structure. You can always return here via the Setup icon in the menu.`)}
                  </p>
                  <div className="pure-flex-between" style={{ justifyContent: 'flex-end' }}>
                     <button onClick={() => setTourStep(0)} className="pure-btn-primary" style={{ padding: '4px 12px', fontSize: '12px' }}>{t('إنهاء الجولة', 'End Tour')}</button>
                  </div>
               </div>
            )}
          </div>
        </div>

        <div className="pure-content-card" style={{ padding: '24px', overflow: 'visible' }}>
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
            <HierarchyNode
              key={idx}
              node={node}
              parentId={String(parentItem.id || parentItem.code)}
              globalExpand={globalExpand}
              searchQuery={searchQuery}
              onDataChange={() => setRefreshTrigger(r => r + 1)}

              /* Pass Tour Props down to the first root node */
              isTourStep2={tourStep === 2 && idx === 0}
              onNextTourStep={() => setTourStep(3)}
              onSkipTour={() => setTourStep(0)}
              parentName={parentName}
            />
          ))}
        </div>

        {/* Parent Edit Modal */}
        <Modal
          open={isParentModalOpen}
          onClose={() => setParentModalOpen(false)}
          titleAr={`تعديل ${config.nameAr}`}
          titleEn={`Edit ${config.nameEn}`}
          size="xl"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setParentActiveTab(t => Math.max(0, t - 1))} disabled={parentActiveTab === 0} className="pure-btn-secondary" style={{ opacity: parentActiveTab === 0 ? 0.5 : 1 }}>
                  <ChevronRight size={16} /> {t('السابق', 'Previous')}
                </button>
                {parentActiveTab < parentTabs.length - 1 && (
                  <button onClick={() => setParentActiveTab(t => t + 1)} className="pure-btn-secondary" style={{ background: '#e8f5ee', color: '#1B5E3B', borderColor: '#a7f3d0' }}>
                    {t('التالي', 'Next')} <ChevronLeft size={16} />
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setParentModalOpen(false)} className="pure-btn-secondary">{t('إلغاء', 'Cancel')}</button>
                <button onClick={handleSaveParent} className="pure-btn-primary">
                  <Save size={16} /> {t('حفظ التعديلات', 'Save Changes')}
                </button>
              </div>
            </div>
          }
        >
          <div style={{ margin: '-24px -24px 24px -24px' }}>
            <div className="pure-tabs-header custom-scrollbar">
              {parentTabs.map((tab, idx) => (
                <button key={tab.key} onClick={() => setParentActiveTab(idx)} className={`pure-tab-btn ${parentActiveTab === idx ? 'active' : ''}`}>{t(tab.labelAr, tab.labelEn)}</button>
              ))}
            </div>
          </div>
          <motion.div key={currentParentTab?.key} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            {parentFieldsForTab.length === 0 ? (
              <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '48px 0' }}>{t('لا توجد حقول في هذا التبويب', 'No fields in this tab')}</p>
            ) : (
              <div className="pure-form-grid">
                {parentFieldsForTab.map(field => (
                  <FormField key={field.key} field={field} value={parentFormData[field.key] ?? ''} onChange={(k, v) => setParentFormData(p => ({ ...p, [k]: v }))} />
                ))}
              </div>
            )}
          </motion.div>
        </Modal>

      </div>
    </Layout>
  );
}