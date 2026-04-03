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
  const workspaceParam = projectCode
    ? `projectCode=${projectCode}`
    : initiativeCode
    ? `initiativeCode=${initiativeCode}`
    : '';

  // Find the item
  const allItems = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const item: Record<string, unknown> = allItems.find(
    i => String(i.id) === itemId || String(i.code) === itemId
  ) || allItems[0] || {};

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [moduleKey, itemId]);

  const tabs = config.tabs;
  const currentTab = tabs[activeTab];
  const fieldsForTab = config.fields.filter(f => f.tab === currentTab?.key);

  const handleEdit = () => {
    let route = `/edit?modulekey=${moduleKey}&itemid=${itemId || String(item.id)}`;
    if (workspaceParam) route += `&${workspaceParam}`;
    navigate(route);
  };

  const handleBack = () => {
    let listRoute = `/list?modulekey=${moduleKey}`;
    if (workspaceParam) listRoute += `&${workspaceParam}`;
    navigate(listRoute);
  };

  if (!moduleKey) {
    return (
      <Layout>
        <p className="text-gray-400">{t('الرجاء تحديد الوحدة', 'Please specify a module')}</p>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="space-y-4 max-w-4xl">
          <div className="shimmer h-8 w-48 rounded-lg" />
          <div className="shimmer h-12 w-full rounded-xl" />
          <div className="shimmer h-64 w-full rounded-xl" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl">
        {/* Breadcrumb + Export */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={handleBack} className="text-gray-400 hover:text-primary-700 transition-colors font-medium">
              {t(config.nameAr, config.nameEn)}
            </button>
            <ChevronLeft size={14} className="text-gray-300" />
            <span className="text-gray-800 font-semibold">{t('تفاصيل', 'Details')}</span>
          </nav>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <FileDown size={15} />
            {t('تصدير PDF', 'Export PDF')}
          </button>
        </div>

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

          {/* Content */}
          <div className="p-7">
            <motion.div
              key={currentTab?.key}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Section title */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-base">
                  {t(currentTab?.labelAr || '', currentTab?.labelEn || '')}
                </h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                  {t('عرض التفاصيل', 'View Details')}
                </span>
              </div>

              {fieldsForTab.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">
                  {t('لا توجد بيانات في هذا التبويب', 'No data in this tab')}
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {fieldsForTab.map(field => (
                    <div
                      key={field.key}
                      className={`${field.columnSpan === 2 ? 'col-span-2' : 'col-span-1'} pb-4 border-b border-gray-50`}
                    >
                      <p className="text-xs text-accent-600 font-semibold mb-1">
                        {t(field.labelAr, field.labelEn)}
                      </p>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <FormField
                        field={field}
                        value={item[field.key] as any}
                        onChange={() => {}}
                        readOnly={true}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Attachments if any */}
              {Boolean(item.attachments) && Array.isArray(item.attachments) && (item.attachments as unknown[]).length > 0 && currentTab?.key !== 'docs' && currentTab?.key !== 'action' && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-2">{t('مرفقات :', 'Attachments:')}</p>
                  <div className="flex flex-wrap gap-2">
                    {(item.attachments as string[]).map((a, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-primary-50 text-primary-700 rounded-lg px-3 py-1.5 text-sm">
                        <span className="text-blue-500">ℹ</span>
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
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-700 text-white rounded-xl text-sm font-medium hover:bg-primary-800 transition-all shadow-sm"
            >
              <Edit size={16} />
              {t('التعديل', 'Edit')}
            </button>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              <X size={16} />
              {t('إلغاء', 'Cancel')}
            </button>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all shadow-sm">
            <Trash2 size={16} />
            {t('حذف البيانات', 'Delete Data')}
          </button>
        </div>
      </div>
    </Layout>
  );
}
