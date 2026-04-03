import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, Flag, Users, FileText, CheckCircle, Clock, Activity } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

const RISK_COLORS = ['#B71C1C', '#E65100', '#F57F17'];
const STATUS_PIE = ['#1B5E3B', '#F57F17', '#B71C1C', '#283593', '#455A64'];

export default function ProjectWorkspace() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Standardized URL Parameter!
  const code = searchParams.get('projectCode') || searchParams.get('code') || '';

  const projects = (MOCK_DATA.Projects as Record<string, unknown>[]) || [];
  const project = projects.find(p => p.code === code) || projects[0];

  const risks = (MOCK_DATA.ProjectRisks as Record<string, unknown>[]) || [];
  const issues = (MOCK_DATA.ProjectIssues as Record<string, unknown>[]) || [];
  const milestones = (MOCK_DATA.ProjectMilestones as Record<string, unknown>[]) || [];
  const tasks = (MOCK_DATA.Tasks as Record<string, unknown>[]) || [];
  const moms = (MOCK_DATA.ProjectMOMs as Record<string, unknown>[]) || [];

  const taskStatusData = [
    { name: t('مكتملة', 'Completed'), value: tasks.filter(t => t.status === 'completed').length },
    { name: t('جارية', 'In Progress'), value: tasks.filter(t => t.status === 'in-progress').length },
    { name: t('معلقة', 'Pending'), value: tasks.filter(t => t.status === 'pending').length },
    { name: t('ملغاة', 'Cancelled'), value: tasks.filter(t => t.status === 'cancelled').length },
  ];

  const milestoneData = milestones.map(m => ({
    name: t(String(m.nameAr).substring(0, 12) + '...', String(m.nameEn || m.nameAr).substring(0, 12) + '...'),
    planned: Number(m.plannedDate ? 80 : 0),
    actual: Number(m.actualDate ? Number(m.completion) : 0),
  }));

  return (
    <Layout>
      <div className="pure-dashboard-wrapper">

        {/* Project Hero Banner */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pure-hero-banner primary">
          <div>
            <div className="pure-flex-start" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '999px', fontFamily: 'monospace' }}>{code || String(project?.code)}</span>
              <Badge label={t(project?.status === 'execution' ? 'قيد التنفيذ' : project?.status === 'planning' ? 'تخطيط' : String(project?.status || ''), String(project?.status || ''))} color="#FFFFFF" variant="outline" />
            </div>
            <h2 className="pure-hero-title">{t(String(project?.nameAr || 'مشروع'), String(project?.nameEn || project?.nameAr || 'Project'))}</h2>
            <p className="pure-hero-subtitle">{t(String(project?.organizationAr || ''), String(project?.organizationEn || project?.organizationAr || ''))}</p>
            <div className="pure-flex-start" style={{ marginTop: '12px', gap: '8px' }}>
              <Avatar name={String(project?.ownerAr || 'م')} size="sm" />
              <span style={{ fontSize: '14px' }}>{t(String(project?.ownerAr || ''), String(project?.ownerEn || project?.ownerAr || ''))}</span>
            </div>
          </div>

          <div className="pure-circle-wrapper">
            <svg viewBox="0 0 36 36" className="pure-circle-svg">
              <circle cx="18" cy="18" r="15.915" className="pure-circle-bg" />
              <motion.circle cx="18" cy="18" r="15.915" className="pure-circle-fg" strokeDasharray={`${project?.completion || 0}, 100`} initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: `${project?.completion || 0}, 100` }} transition={{ duration: 1.2 }} />
            </svg>
            <div className="pure-circle-text">
              <span className="pure-circle-value" style={{ fontSize: '24px', fontWeight: '900' }}>{String(project?.completion || 0)}%</span>
              <span className="pure-circle-label" style={{ fontSize: '11px', opacity: 0.8 }}>{t('إنجاز', 'Done')}</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="pure-grid-5">
          {[
            { label: t('المخاطر', 'Risks'), value: risks.length, color: '#B71C1C', icon: <AlertTriangle size={18} />, key: 'ProjectRisks' },
            { label: t('الإشكاليات', 'Issues'), value: issues.length, color: '#E65100', icon: <Activity size={18} />, key: 'ProjectIssues' },
            { label: t('المعالم', 'Milestones'), value: milestones.length, color: '#283593', icon: <Flag size={18} />, key: 'ProjectMilestones' },
            { label: t('المهام', 'Tasks'), value: tasks.length, color: '#1B5E3B', icon: <CheckCircle size={18} />, key: 'Tasks' },
            { label: t('الاجتماعات', 'MOMs'), value: moms.length, color: '#006064', icon: <Users size={18} />, key: 'ProjectMOMs' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} onClick={() => navigate(`/list?modulekey=${s.key}&projectCode=${code}`)} className="pure-stat-card">
              <div style={{ height: '4px', width: '100%', backgroundColor: s.color }} />
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', margin: '0 auto 10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${s.color}15`, color: s.color }}>{s.icon}</div>
                <p style={{ fontSize: '24px', fontWeight: '900', margin: '0', color: s.color, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: '6px 0 0 0' }}>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
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
              <span className="pure-card-title">{t('تقدم المعالم', 'Milestones Progress')}</span>
              <span className="pure-badge pure-badge-gray">{milestones.length} {t('معلم', 'milestones')}</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={milestoneData} barSize={18}>
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

        {/* Mini Lists Row */}
        <div className="pure-grid-2">
          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('أحدث المخاطر', 'Latest Risks')}</span>
              <button onClick={() => navigate(`/list?modulekey=ProjectRisks&projectCode=${code}`)} className="pure-btn-link">{t('عرض الكل', 'View All')}</button>
            </div>
            <div className="pure-mini-list">
              {risks.slice(0, 3).map((r, i) => (
                <button key={i} onClick={() => navigate(`/view?modulekey=ProjectRisks&itemid=${r.id}&projectCode=${code}`)} className="pure-mini-item">
                  <div className="pure-mini-icon" style={{ backgroundColor: RISK_COLORS[i % 3] + '20', color: RISK_COLORS[i % 3] }}><AlertTriangle size={14} /></div>
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
              <button onClick={() => navigate(`/list?modulekey=ProjectMilestones&projectCode=${code}`)} className="pure-btn-link">{t('عرض الكل', 'View All')}</button>
            </div>
            <div className="pure-mini-list">
              {milestones.slice(0, 4).map((m, i) => (
                <button key={i} onClick={() => navigate(`/view?modulekey=ProjectMilestones&itemid=${m.id}&projectCode=${code}`)} className="pure-mini-item">
                  <div className="pure-mini-icon" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}><Flag size={14} /></div>
                  <div className="pure-mini-text">
                    <p className="pure-mini-title">{t(String(m.nameAr), String(m.nameEn || m.nameAr))}</p>
                    <div className="pure-progress-bar-container" style={{ marginTop: '4px' }}>
                      <div className="pure-progress-bar-bg" style={{ height: '6px' }}><div style={{ height: '100%', width: `${m.completion}%`, backgroundColor: '#2563eb' }} /></div>
                      <span style={{ fontSize: '11px', color: '#9ca3af' }}>{String(m.completion)}%</span>
                    </div>
                  </div>
                  <div className="pure-flex-start" style={{ gap: '4px', fontSize: '11px', color: '#9ca3af' }}><Clock size={11} /><span>{String(m.plannedDate)}</span></div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}