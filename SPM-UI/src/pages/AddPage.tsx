import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import FormField from '../components/forms/FormField';
import { useApp } from '../context/AppContext';
import { getModuleConfig } from '../data/moduleConfigs';
import type { FieldConfig } from '../types';
import { MOCK_DATA, persistData } from '../data/mockData';
import { showToast } from '../components/ui/Toast';

export default function AddPage() {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const moduleKey = searchParams.get('modulekey') || '';
  const projectCode = searchParams.get('projectCode') || '';
  const initiativeCode = searchParams.get('initiativeCode') || '';

  const config = getModuleConfig(moduleKey);
  const workspaceParam = projectCode ? `projectCode=${projectCode}` : initiativeCode ? `initiativeCode=${initiativeCode}` : '';

  const tabs = config.tabs;
  const currentTab = tabs[activeTab];
  const fieldsForTab = config.fields.filter(f => f.tab === currentTab?.key);

  const handleChange = (key: string, value: unknown) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate network request
    await new Promise(res => setTimeout(res, 1200));

    // THE FIX: Generate a UNIQUE code for drafts so they don't collide in LocalStorage!
    const uniqueId = Math.floor(1000 + Math.random() * 9000);
    const newItemCode = formData.code ? String(formData.code) : `${config.codePrefix}-NEW-${uniqueId}`;

    // Add to MOCK_DATA array
    if (!MOCK_DATA[moduleKey]) MOCK_DATA[moduleKey] = [];
    MOCK_DATA[moduleKey].push({
      ...formData,
      id: Date.now().toString(),
      code: newItemCode
    });

    // Persist and Toast
    persistData();
    showToast('تم الإنشاء بنجاح', 'Created successfully');
    setLoading(false);
    setSubmitted(true);

    setTimeout(() => {
      if (config.setupHub?.enabled) {
        navigate(`/setup-hub?modulekey=${moduleKey}&itemid=${newItemCode}`);
      } else {
        // Normal behavior for standard modules
        let listRoute = `/list?modulekey=${moduleKey}`;
        if (workspaceParam) listRoute += `&${workspaceParam}`;
        navigate(listRoute);
      }
    }, 1500);
  };

  const handleCancel = () => {
    let listRoute = `/list?modulekey=${moduleKey}`;
    if (workspaceParam) listRoute += `&${workspaceParam}`;
    navigate(listRoute);
  };

  if (!moduleKey) {
    return <Layout><p style={{ color: '#9ca3af' }}>{t('الرجاء تحديد الوحدة', 'Please specify a module')}</p></Layout>;
  }

  return (
    <Layout>
      <div className="pure-page-container">

        {/* Breadcrumb */}
        <nav className="pure-breadcrumb">
          <button onClick={handleCancel} className="pure-breadcrumb-link">{t(config.nameAr, config.nameEn)}</button>
          <ChevronLeft size={14} color="#d1d5db" />
          <span className="pure-breadcrumb-current">{t('إضافة جديد', 'New Record')}</span>
        </nav>

        <div className="pure-content-card">
          {/* Tabs */}
          <div className="pure-tabs-header no-scrollbar">
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

          {/* Form Body */}
          <div className="pure-card-body">
            <motion.div key={currentTab?.key} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              {fieldsForTab.length === 0 ? (
                <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '48px 0' }}>
                  {t('لا توجد حقول في هذا التبويب', 'No fields in this tab')}
                </p>
              ) : (
                <div className="pure-form-grid">
                  {fieldsForTab.map((field: FieldConfig) => (
                    <FormField key={field.key} field={field} value={formData[field.key] ?? ''} onChange={handleChange} />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Tab Navigation & Submit */}
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

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={handleCancel} className="pure-btn-secondary">
                  <X size={16} /> {t('إلغاء', 'Cancel')}
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={loading || submitted} className="pure-btn-primary" style={{ opacity: (loading || submitted) ? 0.7 : 1 }}>
                  {loading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} /> : submitted ? <span>✓</span> : <Send size={16} />}
                  {submitted ? t('تم الإرسال!', 'Submitted!') : t('إرسال', 'Submit')}
                </motion.button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}