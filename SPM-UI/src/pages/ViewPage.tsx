import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2, X, FileDown, ChevronLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import FormField from '../components/forms/FormField';
import { useApp } from '../context/AppContext';
import { getModuleConfig } from '../data/moduleConfigs';
import { MOCK_DATA } from '../data/mockData';

export default function ViewPage() {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const moduleKey = searchParams.get('modulekey') || '';
  const itemId = searchParams.get('itemid') || '';
  const projectCode = searchParams.get('projectCode') || '';
  const initiativeCode = searchParams.get('initiativeCode') || '';

  const config = getModuleConfig(moduleKey);
  const workspaceParam = projectCode ? `projectCode=${projectCode}` : initiativeCode ? `initiativeCode=${initiativeCode}` : '';

  const allItems = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const item: Record<string, unknown> = allItems.find(i => String(i.id) === itemId || String(i.code) === itemId) || allItems[0] || {};

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [moduleKey, itemId]);

  const tabs = config.tabs;
  const currentTab = tabs[activeTab];
  const fieldsForTab = config.fields.filter(f => f.tab === currentTab?.key);

  const handleEdit = () => navigate(`/edit?modulekey=${moduleKey}&itemid=${itemId || String(item.id)}${workspaceParam ? `&${workspaceParam}` : ''}`);
  const handleBack = () => navigate(`/list?modulekey=${moduleKey}${workspaceParam ? `&${workspaceParam}` : ''}`);

  if (!moduleKey) return <Layout><div style={{ padding: '64px', textAlign: 'center' }}><p style={{ color: '#9ca3af' }}>{t('الرجاء تحديد الوحدة', 'Please specify a module')}</p></div></Layout>;

  if (loading) {
    return (
      <Layout>
        <div className="pure-page-container">
          <p style={{ color: '#9ca3af', textAlign: 'center', padding: '64px' }}>{t('جاري التحميل...', 'Loading...')}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pure-page-container">
        {/* Header & Export */}
        <div className="pure-flex-between" style={{ marginBottom: '24px' }}>
          <nav className="pure-breadcrumb" style={{ margin: 0 }}>
            <button onClick={handleBack} className="pure-breadcrumb-link">{t(config.nameAr, config.nameEn)}</button>
            <ChevronLeft size={14} color="#d1d5db" />
            <span className="pure-breadcrumb-current">{t('تفاصيل', 'Details')}</span>
          </nav>
          <button className="pure-btn-secondary">
            <FileDown size={15} /> {t('تصدير PDF', 'Export PDF')}
          </button>
        </div>

        <div className="pure-content-card">
          {/* Tabs */}
          <div className="pure-tabs-header no-scrollbar">
            {tabs.map((tab, idx) => (
              <button key={tab.key} onClick={() => setActiveTab(idx)} className={`pure-tab-btn ${activeTab === idx ? 'active' : ''}`}>
                {t(tab.labelAr, tab.labelEn)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="pure-card-body">
            <motion.div key={currentTab?.key} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>

              <div className="pure-section-header">
                <h3 className="pure-section-title">{t(currentTab?.labelAr || '', currentTab?.labelEn || '')}</h3>
                <span className="pure-badge pure-badge-gray">{t('عرض التفاصيل', 'View Details')}</span>
              </div>

              {fieldsForTab.length === 0 ? (
                <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '48px 0' }}>{t('لا توجد بيانات في هذا التبويب', 'No data in this tab')}</p>
              ) : (
                <div className="pure-form-grid">
                  {fieldsForTab.map(field => (
                    <div key={field.key} className="pure-field-read-only" style={{ gridColumn: field.columnSpan === 2 ? 'span 2' : 'span 1' }}>
                      <p className="pure-field-label">{t(field.labelAr, field.labelEn)}</p>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <FormField field={field} value={item[field.key] as any} onChange={() => {}} readOnly={true} />
                    </div>
                  ))}
                </div>
              )}

              {/* Attachments */}
              {Boolean(item.attachments) && Array.isArray(item.attachments) && (item.attachments as unknown[]).length > 0 && currentTab?.key !== 'docs' && currentTab?.key !== 'action' && (
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563', margin: '0 0 8px 0' }}>{t('مرفقات :', 'Attachments:')}</p>
                  <div className="pure-attachment-list">
                    {(item.attachments as string[]).map((a, i) => (
                      <div key={i} className="pure-attachment-badge">
                        <span style={{ color: '#3b82f6' }}>ℹ</span>
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pure-flex-between" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
          <div className="pure-flex-start">
            <button onClick={handleEdit} className="pure-btn-primary">
              <Edit size={16} /> {t('التعديل', 'Edit')}
            </button>
            <button onClick={handleBack} className="pure-btn-secondary">
              <X size={16} /> {t('إلغاء', 'Cancel')}
            </button>
          </div>
          <button className="pure-btn-danger">
            <Trash2 size={16} /> {t('حذف البيانات', 'Delete Data')}
          </button>
        </div>

      </div>
    </Layout>
  );
}