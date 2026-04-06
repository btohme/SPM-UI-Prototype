import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Plus, TrendingUp, AlertTriangle, Flag, CheckCircle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Legend,
} from 'recharts';
import Layout from '../components/layout/Layout';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

const PHASE_COLORS: Record<string, string> = {
  execution: '#147a6d', planning: '#006064', preparation: '#283593',
  completed: '#2E7D32', cancelled: '#B71C1C', monitoring: '#F57F17',
};

const BUDGET_DATA = [
  { month: 'يناير', planned: 420, actual: 380 },
  { month: 'فبراير', planned: 520, actual: 510 },
  { month: 'مارس', planned: 610, actual: 590 },
  { month: 'أبريل', planned: 700, actual: 680 },
];

export default function ProjectsLanding() {
  const { t } = useApp();
  const navigate = useNavigate();
  const projects = (MOCK_DATA.Projects as Record<string, unknown>[]) || [];

  const stats = {
    total: projects.length,
    execution: projects.filter(p => p.status === 'execution').length,
    completed: projects.filter(p => p.status === 'completed').length,
    delayed: projects.filter(p => (p.completion as number) < 30 && p.status !== 'preparation').length,
  };

  return (
    <Layout>
      <div className="pure-dashboard-wrapper">

        {/* Header */}
        <div className="pure-flex-between">
          <div>
            <h2 className="pure-title-main">{t('المشاريع', 'Projects')}</h2>
            <p className="pure-subtitle">{t('إدارة ومتابعة جميع المشاريع', 'Manage and track all projects')}</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/add?modulekey=Projects')} className="pure-btn-primary">
            <Plus size={18} />
            {t('إضافة مشروع', 'Add Project')}
          </motion.button>
        </div>

        {/* Stats */}
        <div className="pure-grid-4">
          {[
            { label: t('إجمالي المشاريع', 'Total Projects'), value: stats.total, color: '#147a6d', icon: <FolderOpen size={20} /> },
            { label: t('قيد التنفيذ', 'In Execution'), value: stats.execution, color: '#006064', icon: <TrendingUp size={20} /> },
            { label: t('مكتملة', 'Completed'), value: stats.completed, color: '#2E7D32', icon: <CheckCircle size={20} /> },
            { label: t('تحتاج انتباه', 'Needs Attention'), value: stats.delayed, color: '#B71C1C', icon: <AlertTriangle size={20} /> },
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
          <div className="pure-card pure-col-span-2">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('الميزانية المخططة مقابل الفعلية', 'Planned vs Actual Budget')}</span>
              <span className="pure-badge pure-badge-gray">2026</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={BUDGET_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="planned" stroke="#147a6d" strokeWidth={2} dot={{ r: 4 }} name={t('مخطط', 'Planned')} />
                <Line type="monotone" dataKey="actual" stroke="#f29221" strokeWidth={2} dot={{ r: 4 }} name={t('فعلي', 'Actual')} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('توزيع حسب الحالة', 'Status Distribution')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[{ name: t('إعداد', 'Prep'), value: 2 }, { name: t('تخطيط', 'Plan'), value: 2 }, { name: t('تنفيذ', 'Exec'), value: 3 }, { name: t('مكتمل', 'Done'), value: 0 }]} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {[0, 1, 2, 3].map(i => <Cell key={i} fill={['#283593', '#006064', '#147a6d', '#2E7D32'][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          <div className="pure-flex-between" style={{ paddingBottom: '12px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 className="pure-title-main" style={{ fontSize: '18px' }}>{t('قائمة المشاريع', 'Projects List')}</h3>
            <button onClick={() => navigate('/list?modulekey=Projects')} className="pure-btn-link">{t('عرض الكل', 'View All')}</button>
          </div>
          <div className="pure-grid-3">
            {projects.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} onClick={() => navigate(`/workspace/project?projectCode=${p.code}`)} className="pure-item-card">
                <div className="pure-flex-between" style={{ marginBottom: '12px' }}>
                  <div className="pure-flex-start" style={{ gap: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: PHASE_COLORS[String(p.status)] || '#78909C' }}>
                      <FolderOpen size={16} />
                    </div>
                    <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'monospace' }}>{String(p.code)}</span>
                  </div>
                  <Badge label={t(p.status === 'execution' ? 'تنفيذ' : p.status === 'planning' ? 'تخطيط' : p.status === 'preparation' ? 'إعداد' : String(p.status), String(p.status))} color={PHASE_COLORS[String(p.status)] || '#78909C'} />
                </div>

                <h4 className="pure-item-title">{t(String(p.nameAr), String(p.nameEn || p.nameAr))}</h4>

                <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                  <div className="pure-progress-bar-container">
                    <div className="pure-progress-bar-bg">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${p.completion}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }} style={{ height: '100%', borderRadius: '999px', backgroundColor: PHASE_COLORS[String(p.status)] || '#78909C' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>{String(p.completion)}%</span>
                  </div>

                  <div className="pure-flex-between" style={{ marginTop: '12px' }}>
                    <div className="pure-flex-start" style={{ gap: '4px', fontSize: '12px', color: '#6b7280' }}>
                      <Avatar name={String(p.ownerAr)} size="xs" />
                      <span>{String(p.ownerAr)}</span>
                    </div>
                    <div className="pure-flex-start" style={{ gap: '8px', fontSize: '12px' }}>
                      {Number(p.risksCount) > 0 && <span className="pure-flex-start" style={{ gap: '2px', color: '#dc2626' }}><AlertTriangle size={12} /> {String(p.risksCount)}</span>}
                      {Number(p.milestonesCount) > 0 && <span className="pure-flex-start" style={{ gap: '2px', color: '#2563eb' }}><Flag size={12} /> {String(p.milestonesCount)}</span>}
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