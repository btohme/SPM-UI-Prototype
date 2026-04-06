import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Plus, TrendingUp, AlertTriangle, Flag, CheckCircle } from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
} from 'recharts';
import Layout from '../components/layout/Layout';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

const STATUS_COLORS: Record<string, string> = {
  'in-progress': '#147a6d', completed: '#2E7D32', delayed: '#B71C1C', planned: '#283593', cancelled: '#455A64',
};

export default function InitiativesLanding() {
  const { t } = useApp();
  const navigate = useNavigate();
  const initiatives = (MOCK_DATA.Initiatives as Record<string, unknown>[]) || [];

  const stats = {
    total: initiatives.length,
    active: initiatives.filter(p => p.status === 'in-progress').length,
    completed: initiatives.filter(p => p.status === 'completed').length,
    delayed: initiatives.filter(p => p.status === 'delayed').length,
  };

  const radarData = [
    { subject: t('استراتيجي', 'Strategic'), A: 80 }, { subject: t('تشغيلي', 'Operational'), A: 65 },
    { subject: t('مالي', 'Financial'), A: 70 }, { subject: t('مخاطر', 'Risks'), A: 40 }, { subject: t('جودة', 'Quality'), A: 85 },
  ];

  const barData = [
    { name: t('مخطط', 'Planned'), value: 2 }, { name: t('جاري', 'Active'), value: 3 },
    { name: t('متأخر', 'Delayed'), value: 1 }, { name: t('مكتمل', 'Done'), value: 1 },
  ];

  return (
    <Layout>
      <div className="pure-dashboard-wrapper">

        {/* Header */}
        <div className="pure-flex-between">
          <div>
            <h2 className="pure-title-main">{t('المبادرات', 'Initiatives')}</h2>
            <p className="pure-subtitle">{t('إدارة ومتابعة جميع المبادرات', 'Manage and track all initiatives')}</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/add?modulekey=Initiatives')} className="pure-btn-primary">
            <Plus size={18} />
            {t('إضافة مبادرة', 'Add Initiative')}
          </motion.button>
        </div>

        {/* Stats */}
        <div className="pure-grid-4">
          {[
            { label: t('إجمالي المبادرات', 'Total Initiatives'), value: stats.total, color: '#147a6d', icon: <Lightbulb size={20} /> },
            { label: t('قيد التنفيذ', 'Active'), value: stats.active, color: '#006064', icon: <TrendingUp size={20} /> },
            { label: t('مكتملة', 'Completed'), value: stats.completed, color: '#2E7D32', icon: <CheckCircle size={20} /> },
            { label: t('متأخرة', 'Delayed'), value: stats.delayed, color: '#B71C1C', icon: <AlertTriangle size={20} /> },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="pure-stat-card">
              <div style={{ height: '6px', width: '100%', backgroundColor: s.color }} />
              <div style={{ padding: '20px' }}>
                <div className="pure-flex-between" style={{ marginBottom: '16px' }}>
                  <div className="pure-stat-icon-wrapper" style={{ backgroundColor: `${s.color}15`, color: s.color }}>{s.icon}</div>
                </div>
                <p className="pure-stat-value" style={{ color: s.color }}>{s.value}</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563', margin: 0 }}>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="pure-grid-3">
          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('مؤشرات الأداء', 'Performance Indicators')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <Radar name="score" dataKey="A" stroke="#147a6d" fill="#147a6d" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pure-card pure-col-span-2">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('توزيع حسب الحالة', 'Distribution by Status')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {barData.map((_, i) => <Cell key={i} fill={['#283593', '#147a6d', '#B71C1C', '#2E7D32'][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Initiatives Grid */}
        <div>
          <div className="pure-flex-between" style={{ paddingBottom: '12px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 className="pure-title-main" style={{ fontSize: '18px' }}>{t('قائمة المبادرات', 'Initiatives List')}</h3>
            <button onClick={() => navigate('/list?modulekey=Initiatives')} className="pure-btn-link">{t('عرض الكل', 'View All')}</button>
          </div>
          <div className="pure-grid-3">
            {initiatives.map((ini, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} onClick={() => navigate(`/workspace/initiative?initiativeCode=${ini.code}`)} className="pure-item-card">
                <div className="pure-flex-between" style={{ marginBottom: '12px' }}>
                  <div className="pure-flex-start" style={{ gap: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: STATUS_COLORS[String(ini.status)] || '#78909C' }}>
                      <Lightbulb size={16} />
                    </div>
                    <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'monospace' }}>{String(ini.code)}</span>
                  </div>
                  <Badge label={t(ini.status === 'in-progress' ? 'جاري' : ini.status === 'completed' ? 'مكتمل' : ini.status === 'planned' ? 'مخطط' : String(ini.status), String(ini.status))} color={STATUS_COLORS[String(ini.status)] || '#78909C'} />
                </div>

                <h4 className="pure-item-title">{t(String(ini.nameAr), String(ini.nameEn || ini.nameAr))}</h4>

                <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                  <div className="pure-progress-bar-container">
                    <div className="pure-progress-bar-bg">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${ini.completion}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }} style={{ height: '100%', borderRadius: '999px', backgroundColor: STATUS_COLORS[String(ini.status)] || '#78909C' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>{String(ini.completion)}%</span>
                  </div>

                  <div className="pure-flex-between" style={{ marginTop: '12px' }}>
                    <div className="pure-flex-start" style={{ gap: '4px', fontSize: '12px', color: '#6b7280' }}>
                      <Avatar name={String(ini.ownerAr)} size="xs" />
                      <span>{String(ini.ownerAr)}</span>
                    </div>
                    <div className="pure-flex-start" style={{ gap: '8px', fontSize: '12px' }}>
                      <span className="pure-flex-start" style={{ gap: '2px', color: '#dc2626' }}><AlertTriangle size={12} /> {String(ini.risksCount || 0)}</span>
                      <span className="pure-flex-start" style={{ gap: '2px', color: '#2563eb' }}><Flag size={12} /> {String(ini.milestonesCount || 0)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}