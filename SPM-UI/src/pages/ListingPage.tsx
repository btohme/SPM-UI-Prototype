import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import DataTable from '../components/ui/DataTable';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';
import { getModuleConfig } from '../data/moduleConfigs';

export default function ListingPage() {
  const { t, language } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const moduleKey = searchParams.get('modulekey') || '';
  const projectCode = searchParams.get('projectCode') || '';
  const initiativeCode = searchParams.get('initiativeCode') || '';

  const config = getModuleConfig(moduleKey);
  const workspaceParam = projectCode ? `projectCode=${projectCode}` : initiativeCode ? `initiativeCode=${initiativeCode}` : '';

  const allData = (MOCK_DATA[moduleKey] as Record<string, unknown>[]) || [];
  const filteredData = allData.filter(item => {
    if (search) {
      const searchLower = search.toLowerCase();
      return Object.values(item).some(v => String(v || '').toLowerCase().includes(searchLower));
    }
    return true;
  });

  useEffect(() => {
    setLoading(true);
    const tmr = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(tmr);
  }, [moduleKey]);

  if (!moduleKey) return <Layout><div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}><p style={{ color: '#9ca3af' }}>{t('الرجاء تحديد الوحدة', 'Please specify a module')}</p></div></Layout>;

  const filterBar = (
    <div className="pure-filter-bar">
      <div className="pure-search-wrapper">
        <Search size={14} className="pure-search-icon" />
        <input
          className="pure-search-input"
          placeholder={t('بحث في السجلات...', 'Search records...')}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {[t('الحالة', 'Status'), t('النوع', 'Type'), t('القسم', 'Division'), t('الفترة', 'Period')].map((label, i) => (
        <motion.button key={i} whileHover={{ scale: 1.02 }} className="pure-filter-btn">
          <Filter size={12} color="#9ca3af" /> {label} <ChevronDown size={12} color="#9ca3af" />
        </motion.button>
      ))}
    </div>
  );

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Header */}
        <div className="pure-flex-between" style={{ alignItems: 'flex-end' }}>
          <div>
            <div className="pure-flex-start" style={{ marginBottom: '4px' }}>
              <h2 className="pure-title-main">{language === 'ar' ? config.nameAr : config.nameEn}</h2>
              <span className="pure-badge pure-badge-primary" style={{ fontSize: '14px', padding: '4px 12px' }}>{filteredData.length}</span>
            </div>

            <div className="pure-flex-start" style={{ fontSize: '14px', color: '#6b7280' }}>
              {projectCode && (
                <span className="pure-flex-start" style={{ gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#147a6d' }} />
                  {t('مشروع', 'Project')}: <span style={{ color: '#147a6d', fontWeight: '600' }}>{projectCode}</span>
                </span>
              )}
              {initiativeCode && (
                <span className="pure-flex-start" style={{ gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0d9488' }} />
                  {t('مبادرة', 'Initiative')}: <span style={{ color: '#0f766e', fontWeight: '600' }}>{initiativeCode}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          moduleKey={moduleKey}
          columns={config.columns}
          data={filteredData}
          loading={loading}
          workspaceParam={workspaceParam}
          onAdd={() => navigate(`/add?modulekey=${moduleKey}${workspaceParam ? `&${workspaceParam}` : ''}`)}
          filterComponent={filterBar}
        />
      </div>
    </Layout>
  );
}