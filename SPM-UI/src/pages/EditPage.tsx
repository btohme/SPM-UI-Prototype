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
  const workspaceParam = projectCode
    ? `projectCode=${projectCode}`
    : initiativeCode
    ? `initiativeCode=${initiativeCode}`
    : '';

  // Load existing item
  const allItems = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const item = allItems.find(
    i => String(i.id) === itemId || String(i.code) === itemId
  ) || allItems[0] || {};

  useEffect(() => {
    setFormData({ ...item });
    setLoading(false);
  }, [moduleKey, itemId]);

  const tabs = config.tabs;
  const currentTab = tabs[activeTab];
  const fieldsForTab = config.fields.filter(f => f.tab === currentTab?.key);

  const handleChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

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

  if (!moduleKey) {
    return (
      <Layout>
        <p className="text-gray-400">{t('الرجاء تحديد الوحدة', 'Please specify a module')}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm">
          <button
            onClick={() => navigate(`/list?modulekey=${moduleKey}${workspaceParam ? `&${workspaceParam}` : ''}`)}
            className="text-gray-400 hover:text-primary-700 transition-colors font-medium"
          >
            {t(config.nameAr, config.nameEn)}
          </button>
          <ChevronLeft size={14} className="text-gray-300" />
          <button onClick={handleCancel} className="text-gray-400 hover:text-primary-700 transition-colors font-medium">
            {t('تفاصيل', 'Details')}
          </button>
          <ChevronLeft size={14} className="text-gray-300" />
          <span className="text-gray-800 font-semibold">{t('تعديل', 'Edit')}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 overflow-x-auto bg-gray-50/50">
            <div className="flex min-w-max px-6">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(idx)}
                  className={`
                    px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-all duration-200
                    ${activeTab === idx
                      ? 'border-primary-700 text-primary-700 bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                    }
                  `}
                >
                  {t(tab.labelAr, tab.labelEn)}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-7">
            <motion.div
              key={currentTab?.key}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {fieldsForTab.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">
                  {t('لا توجد حقول في هذا التبويب', 'No fields in this tab')}
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {fieldsForTab.map(field => (
                    <FormField
                      key={field.key}
                      field={field}
                      value={formData[field.key] ?? ''}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Tab navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setActiveTab(t => Math.max(0, t - 1))}
                disabled={activeTab === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={16} />
                {t('السابق', 'Previous')}
              </button>
              {activeTab < tabs.length - 1 && (
                <button
                  onClick={() => setActiveTab(t => t + 1)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-50 text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  {t('التالي', 'Next')}
                  <ChevronLeft size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving || saved}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-700 text-white rounded-xl font-medium hover:bg-primary-800 disabled:opacity-60 transition-all shadow-sm"
          >
            {saving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <Save size={16} />
            )}
            {saved ? t('تم الحفظ!', 'Saved!') : t('حفظ التغييرات', 'Save Changes')}
          </motion.button>

          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <X size={16} />
            {t('إلغاء', 'Cancel')}
          </button>
        </div>
      </div>
    </Layout>
  );
}
