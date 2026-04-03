import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import DataTable from '../components/ui/DataTable';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';
import { getModuleConfig } from '../data/moduleConfigs';
import { MODULE_MAP } from '../data/modules';

export default function ListingPage() {
  const { t, language } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const moduleKey = searchParams.get('modulekey') || '';
  const _itemId = searchParams.get('itemid') || '';
  void _itemId;
  const projectCode = searchParams.get('projectCode') || '';
  const initiativeCode = searchParams.get('initiativeCode') || '';

  const config = getModuleConfig(moduleKey);
  const _mod = MODULE_MAP[moduleKey];
  void _mod;

  // Build workspace param for child routes
  const workspaceParam = projectCode
    ? `projectCode=${projectCode}`
    : initiativeCode
    ? `initiativeCode=${initiativeCode}`
    : '';

  // Get data
  const allData = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const filteredData = allData.filter(item => {
    // filter by project/initiative if in workspace
    if (projectCode) {
      const code = String(item.projectCode || '');
      if (code && !code.includes(projectCode.replace('SC-26-', ''))) {
        // loose match
      }
    }
    if (search) {
      const searchLower = search.toLowerCase();
      return Object.values(item).some(v =>
        String(v || '').toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [moduleKey]);

  if (!moduleKey) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">{t('الرجاء تحديد الوحدة', 'Please specify a module')}</p>
        </div>
      </Layout>
    );
  }

  const filterBar = (
    <div className="flex items-center gap-2 flex-wrap flex-1">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="pr-9 pl-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-200 bg-white transition-all"
          placeholder={t('بحث في السجلات...', 'Search records...')}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Filter dropdowns */}
      {[t('الحالة', 'Status'), t('النوع', 'Type'), t('القسم', 'Division'), t('الفترة', 'Period')].map((label, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all font-medium"
        >
          <Filter size={12} className="text-gray-400" />
          {label}
          <ChevronDown size={12} className="text-gray-400" />
        </motion.button>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="space-y-4">
        {/* Page header */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-black text-gray-900">
                {language === 'ar' ? config.nameAr : config.nameEn}
              </h2>
              <span className="bg-primary-100 text-primary-800 text-xs font-bold px-2.5 py-1 rounded-full">
                {filteredData.length}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {projectCode && (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block" />
                  {t('مشروع', 'Project')}: <span className="text-primary-700 font-medium">{projectCode}</span>
                </span>
              )}
              {initiativeCode && (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                  {t('مبادرة', 'Initiative')}: <span className="text-teal-700 font-medium">{initiativeCode}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <DataTable
          moduleKey={moduleKey}
          columns={config.columns}
          data={filteredData}
          loading={loading}
          workspaceParam={workspaceParam}
          onAdd={() => {
            let route = `/add?modulekey=${moduleKey}`;
            if (workspaceParam) route += `&${workspaceParam}`;
            navigate(route);
          }}
          filterComponent={filterBar}
        />
      </div>
    </Layout>
  );
}
