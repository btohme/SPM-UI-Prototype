import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import FormField from '../components/forms/FormField';
import { useApp } from '../context/AppContext';
import { getModuleConfig } from '../data/moduleConfigs';
import { MOCK_DATA } from '../data/mockData';

export default function EditPage() {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [_loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const moduleKey = searchParams.get('modulekey') || '';
  const itemId = searchParams.get('itemid') || '';
  const projectCode = searchParams.get('projectCode') || '';
  const initiativeCode = searchParams.get('initiativeCode') || '';

  const config = getModuleConfig(moduleKey);
  const workspaceParam = projectCode ? `projectCode=${projectCode}` : initiativeCode ? `initiativeCode=${initiativeCode}` : '';

  // Load existing item
  const allItems = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const item = allItems.find(i => String(i.id) === itemId || String(i.code) === itemId) || allItems[0] || {};

  useEffect(() => {
    setFormData({ ...item });
    setLoading(false);
  }, [moduleKey, itemId]);

  const tabs = config.tabs;
  const currentTab = tabs[activeTab];
  const fieldsForTab = config.fields.filter(f => f.tab === currentTab?.key);

  const handleChange = (key: string, value: unknown) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(res => setTimeout(res, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      let viewRoute = `/view?modulekey=${moduleKey}&itemid=${itemId}`;
      if (workspaceParam) viewRoute += `&${workspaceParam}`;
      navigate(viewRoute);
    }, 1200);
  };

  const handleCancel = () => {
    let viewRoute = `/view?modulekey=${moduleKey}&itemid=${itemId}`;
    if (workspaceParam) viewRoute += `&${workspaceParam}`;
    navigate(viewRoute);
  };

  if (!moduleKey) return <Layout><div style={{ padding: '64px', textAlign: 'center' }}><p style={{ color: '#9ca3af' }}>{t('الرجاء تحديد الوحدة', 'Please specify a module')}</p></div></Layout>;

  return (
    <Layout>
      <div className="pure-page-container">

        {/* Breadcrumb */}
        <nav className="pure-breadcrumb">
          <button onClick={() => navigate(`/list?modulekey=${moduleKey}${workspaceParam ? `&${workspaceParam}` : ''}`)} className="pure-breadcrumb-link">
            {t(config.nameAr, config.nameEn)}
          </button>
          <ChevronLeft size={14} color="#d1d5db" />
          <button onClick={handleCancel} className="pure-breadcrumb-link">{t('تفاصيل', 'Details')}</button>
          <ChevronLeft size={14} color="#d1d5db" />
          <span className="pure-breadcrumb-current">{t('تعديل', 'Edit')}</span>
        </nav>

        <div className="pure-content-card">
          {/* Tabs */}
          <div className="pure-tabs-header no-scrollbar">
            {tabs.map((tab, idx) => (
              <button key={tab.key} onClick={() => setActiveTab(idx)} className={`pure-tab-btn ${activeTab === idx ? 'active' : ''}`}>
                {t(tab.labelAr, tab.labelEn)}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="pure-card-body">
            <motion.div key={currentTab?.key} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              {fieldsForTab.length === 0 ? (
                <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '48px 0' }}>{t('لا توجد حقول في هذا التبويب', 'No fields in this tab')}</p>
              ) : (
                <div className="pure-form-grid">
                  {fieldsForTab.map(field => (
                    <FormField key={field.key} field={field} value={formData[field.key] ?? ''} onChange={handleChange} />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Tab navigation */}
            <div className="pure-footer-actions" style={{ justifyContent: 'space-between' }}>
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
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pure-footer-actions" style={{ borderTop: 'none', justifyContent: 'flex-start' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving || saved} className="pure-btn-primary" style={{ opacity: (saving || saved) ? 0.7 : 1 }}>
            {saving ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} /> : <Save size={16} />}
            {saved ? t('تم الحفظ!', 'Saved!') : t('حفظ التغييرات', 'Save Changes')}
          </motion.button>

          <button onClick={handleCancel} className="pure-btn-secondary">
            <X size={16} /> {t('إلغاء', 'Cancel')}
          </button>
        </div>
      </div>
    </Layout>
  );
}