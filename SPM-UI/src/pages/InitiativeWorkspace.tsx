import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, Flag, Users, CheckCircle, Activity } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import Layout from '../components/layout/Layout';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

const STATUS_PIE = ['#147a6d', '#f29221', '#B71C1C', '#283593'];

export default function InitiativeWorkspace() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Standardized URL Parameter!
  const code = searchParams.get('initiativeCode') || searchParams.get('code') || '';

  const initiatives = (MOCK_DATA.Initiatives as Record<string, unknown>[]) || [];
  const initiative = initiatives.find(i => i.code === code) || initiatives[0];

  const risks = (MOCK_DATA.InitiativeRisks as Record<string, unknown>[]) || [];
  const issues = (MOCK_DATA.InitiativeIssues as Record<string, unknown>[]) || [];
  const milestones = (MOCK_DATA.InitiativeMilestones as Record<string, unknown>[]) || [];
  const tasks = (MOCK_DATA.Tasks as Record<string, unknown>[]) || [];
  const stakeholders = (MOCK_DATA.Stakeholders as Record<string, unknown>[]) || [];
  const benefits = (MOCK_DATA.Benefits as Record<string, unknown>[]) || [];

  const taskStatusData = [
    { name: t('مكتملة', 'Done'), value: tasks.filter(t => t.status === 'completed').length },
    { name: t('جارية', 'Active'), value: tasks.filter(t => t.status === 'in-progress').length },
    { name: t('معلقة', 'Pending'), value: tasks.filter(t => t.status === 'pending').length },
    { name: t('ملغاة', 'Cancelled'), value: tasks.filter(t => t.status === 'cancelled').length },
  ];

  const benefitData = benefits.map(b => ({
    name: t(String(b.nameAr).substring(0, 14), String(b.nameEn || b.nameAr).substring(0, 14)),
    planned: Number(b.plannedValue || 0),
    actual: Number(b.actualValue || 0),
  }));

  return (
    <Layout>
      <div className="pure-dashboard-wrapper">

        {/* Initiative Hero Banner */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pure-hero-banner">
          <div>
            <div className="pure-flex-start" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '999px', fontFamily: 'monospace' }}>{code || String(initiative?.code)}</span>
              <Badge label={t(initiative?.status === 'in-progress' ? 'قيد التنفيذ' : initiative?.status === 'planned' ? 'مخطط' : String(initiative?.status || ''), String(initiative?.status || ''))} color="#FFFFFF" variant="outline" />
            </div>
            <h2 className="pure-hero-title">{t(String(initiative?.nameAr || 'مبادرة'), String(initiative?.nameEn || initiative?.nameAr || 'Initiative'))}</h2>
            <p className="pure-hero-subtitle">{t(String(initiative?.organizationAr || ''), String(initiative?.organizationEn || initiative?.organizationAr || ''))}</p>
            <div className="pure-flex-start" style={{ marginTop: '12px', gap: '8px' }}>
              <Avatar name={String(initiative?.ownerAr || 'م')} size="sm" />
              <span style={{ fontSize: '14px' }}>{t(String(initiative?.ownerAr || ''), String(initiative?.ownerEn || initiative?.ownerAr || ''))}</span>
            </div>
          </div>

          <div className="pure-circle-wrapper">
            <svg viewBox="0 0 36 36" className="pure-circle-svg">
              <circle cx="18" cy="18" r="15.915" className="pure-circle-bg" />
              <motion.circle cx="18" cy="18" r="15.915" className="pure-circle-fg" strokeDasharray={`${initiative?.completion || 0}, 100`} initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: `${initiative?.completion || 0}, 100` }} transition={{ duration: 1.2 }} />
            </svg>
            <div className="pure-circle-text">
              <span className="pure-circle-value" style={{ fontSize: '24px', fontWeight: '900' }}>{String(initiative?.completion || 0)}%</span>
              <span className="pure-circle-label" style={{ fontSize: '11px', opacity: 0.8 }}>{t('إنجاز', 'Done')}</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="pure-grid-5">
          {[
            { label: t('المخاطر', 'Risks'), value: risks.length, color: '#B71C1C', icon: <AlertTriangle size={18} />, key: 'InitiativeRisks' },
            { label: t('الإشكاليات', 'Issues'), value: issues.length, color: '#E65100', icon: <Activity size={18} />, key: 'InitiativeIssues' },
            { label: t('المعالم', 'Milestones'), value: milestones.length, color: '#283593', icon: <Flag size={18} />, key: 'InitiativeMilestones' },
            { label: t('المهام', 'Tasks'), value: tasks.length, color: '#147a6d', icon: <CheckCircle size={18} />, key: 'Tasks' },
            { label: t('أصحاب المصلحة', 'Stakeholders'), value: stakeholders.length, color: '#006064', icon: <Users size={18} />, key: 'Stakeholders' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} onClick={() => navigate(`/list?modulekey=${s.key}&initiativeCode=${code}`)} className="pure-stat-card">
              <div style={{ height: '4px', width: '100%', backgroundColor: s.color }} />
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', margin: '0 auto 10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${s.color}15`, color: s.color }}>{s.icon}</div>
                <p style={{ fontSize: '24px', fontWeight: '900', margin: '0', color: s.color, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: '6px 0 0 0' }}>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="pure-grid-3">
          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('حالة المهام', 'Task Status')}</span>
              <span className="pure-badge pure-badge-gray">{tasks.length} {t('مهمة', 'tasks')}</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={taskStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {taskStatusData.map((_, i) => <Cell key={i} fill={STATUS_PIE[i]} />)}
                </Pie>
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="pure-card pure-col-span-2">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('الفوائد المخططة مقابل الفعلية', 'Planned vs Actual Benefits')}</span>
              <span className="pure-badge pure-badge-gray">{benefits.length} {t('فائدة', 'benefits')}</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={benefitData.length > 0 ? benefitData : [{ name: '-', planned: 0, actual: 0 }]} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="planned" fill="#147a6d" radius={[3, 3, 0, 0]} name={t('مخطط', 'Planned')} />
                <Bar dataKey="actual" fill="#f29221" radius={[3, 3, 0, 0]} name={t('فعلي', 'Actual')} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lists */}
        <div className="pure-grid-2">
          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('أحدث المخاطر', 'Latest Risks')}</span>
              <button onClick={() => navigate(`/list?modulekey=InitiativeRisks&initiativeCode=${code}`)} className="pure-btn-link">{t('عرض الكل', 'View All')}</button>
            </div>
            <div className="pure-mini-list">
              {risks.slice(0, 3).map((r, i) => (
                <button key={i} onClick={() => navigate(`/view?modulekey=InitiativeRisks&itemid=${r.id}&initiativeCode=${code}`)} className="pure-mini-item">
                  <div className="pure-mini-icon" style={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}><AlertTriangle size={14} /></div>
                  <div className="pure-mini-text">
                    <p className="pure-mini-title">{t(String(r.nameAr), String(r.nameEn || r.nameAr))}</p>
                  </div>
                  <Badge label={t(r.level === 'high' ? 'مرتفع' : r.level === 'medium' ? 'متوسط' : 'منخفض', String(r.level))} color={r.level === 'high' ? '#B71C1C' : r.level === 'medium' ? '#E65100' : '#2E7D32'} />
                </button>
              ))}
            </div>
          </div>

          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('أحدث المعالم', 'Latest Milestones')}</span>
              <button onClick={() => navigate(`/list?modulekey=InitiativeMilestones&initiativeCode=${code}`)} className="pure-btn-link">{t('عرض الكل', 'View All')}</button>
            </div>
            <div className="pure-mini-list">
              {milestones.slice(0, 4).map((m, i) => (
                <button key={i} onClick={() => navigate(`/view?modulekey=InitiativeMilestones&itemid=${m.id}&initiativeCode=${code}`)} className="pure-mini-item">
                  <div className="pure-mini-icon" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}><Flag size={14} /></div>
                  <div className="pure-mini-text">
                    <p className="pure-mini-title">{t(String(m.nameAr), String(m.nameEn || m.nameAr))}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}