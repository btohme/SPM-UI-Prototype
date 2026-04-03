import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, Flag, Users, CheckCircle, Activity, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import Layout from '../components/layout/Layout';
import HorizontalNav from '../components/layout/HorizontalNav';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';
import { INITIATIVE_WORKSPACE_NAV } from '../data/modules';

const STATUS_PIE = ['#1B5E3B', '#E8A020', '#B71C1C', '#283593'];

export default function InitiativeWorkspace() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') || '';

  const initiatives = (MOCK_DATA.Initiatives as Record<string, unknown>[]) || [];
  const initiative = initiatives.find(i => i.code === code) || initiatives[0];

  const risks = (MOCK_DATA.InitiativeRisks as Record<string, unknown>[]) || [];
  const issues = (MOCK_DATA.InitiativeIssues as Record<string, unknown>[]) || [];
  const milestones = (MOCK_DATA.InitiativeMilestones as Record<string, unknown>[]) || [];
  const tasks = (MOCK_DATA.Tasks as Record<string, unknown>[]) || [];
  const stakeholders = (MOCK_DATA.Stakeholders as Record<string, unknown>[]) || [];
  const benefits = (MOCK_DATA.Benefits as Record<string, unknown>[]) || [];

  const navItems = INITIATIVE_WORKSPACE_NAV(code);

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
      <HorizontalNav items={navItems} workspaceParam={`code=${code}`} workspaceTitle={t(String(initiative?.nameAr || ''), String(initiative?.nameEn || initiative?.nameAr || ''))} workspaceCode={code || String(initiative?.code || '')} workspaceType="initiative" />

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
            { label: t('المهام', 'Tasks'), value: tasks.length, color: '#1B5E3B', icon: <CheckCircle size={18} />, key: 'Tasks' },
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
                <Bar dataKey="planned" fill="#1B5E3B" radius={[3, 3, 0, 0]} name={t('مخطط', 'Planned')} />
                <Bar dataKey="actual" fill="#E8A020" radius={[3, 3, 0, 0]} name={t('فعلي', 'Actual')} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risks & Milestones */}
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
                    <p className="pure-mini-sub">{t(String(r.ownerAr), String(r.ownerEn || r.ownerAr))}</p>
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
                    <div className="pure-progress-bar-container" style={{ marginTop: '4px' }}>
                      <div className="pure-progress-bar-bg" style={{ height: '6px' }}><div style={{ height: '100%', width: `${m.completion}%`, backgroundColor: '#2563eb' }} /></div>
                      <span style={{ fontSize: '11px', color: '#9ca3af' }}>{String(m.completion)}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stakeholders & Benefits */}
        <div className="pure-grid-2">
          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('أصحاب المصلحة', 'Stakeholders')}</span>
              <button onClick={() => navigate(`/list?modulekey=Stakeholders&initiativeCode=${code}`)} className="pure-btn-link">{t('عرض الكل', 'View All')}</button>
            </div>
            <div className="pure-mini-list">
              {stakeholders.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                  <Avatar name={String(s.nameAr)} size="sm" />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{t(String(s.nameAr), String(s.nameEn || s.nameAr))}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0 0' }}>{t(String(s.role || ''), String(s.role || ''))}</p>
                  </div>
                  <Badge label={t(String(s.influenceLevel || ''), String(s.influenceLevel || ''))} color="#006064" />
                </div>
              ))}
            </div>
          </div>

          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('الفوائد', 'Benefits')}</span>
              <button onClick={() => navigate(`/list?modulekey=Benefits&initiativeCode=${code}`)} className="pure-btn-link">{t('عرض الكل', 'View All')}</button>
            </div>
            <div className="pure-mini-list">
              {benefits.map((b, i) => (
                <div key={i} style={{ padding: '12px', border: '1px solid #f3f4f6', borderRadius: '8px' }}>
                  <div className="pure-flex-between" style={{ marginBottom: '8px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{t(String(b.nameAr), String(b.nameEn || b.nameAr))}</p>
                    <TrendingUp size={14} color="#0d9488" />
                  </div>
                  <div className="pure-flex-start" style={{ gap: '12px', fontSize: '12px', color: '#6b7280' }}>
                    <span>{t('مخطط', 'Planned')}: <b style={{ color: '#374151' }}>{String(b.plannedValue || 0)}</b></span>
                    <span>•</span>
                    <span>{t('فعلي', 'Actual')}: <b style={{ color: '#0f766e' }}>{String(b.actualValue || 0)}</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}