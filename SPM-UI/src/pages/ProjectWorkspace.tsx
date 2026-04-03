import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, Flag, Users, FileText, CheckCircle, Clock, Activity } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import Layout from '../components/layout/Layout';
import HorizontalNav from '../components/layout/HorizontalNav';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';
import { PROJECT_WORKSPACE_NAV } from '../data/modules';

const RISK_COLORS = ['#B71C1C', '#E65100', '#F57F17'];
const STATUS_PIE = ['#1B5E3B', '#F57F17', '#B71C1C', '#283593', '#455A64'];

export default function ProjectWorkspace() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') || '';

  const projects = (MOCK_DATA.Projects as Record<string, unknown>[]) || [];
  const project = projects.find(p => p.code === code) || projects[0];

  const risks = (MOCK_DATA.ProjectRisks as Record<string, unknown>[]) || [];
  const issues = (MOCK_DATA.ProjectIssues as Record<string, unknown>[]) || [];
  const milestones = (MOCK_DATA.ProjectMilestones as Record<string, unknown>[]) || [];
  const tasks = (MOCK_DATA.Tasks as Record<string, unknown>[]) || [];
  const moms = (MOCK_DATA.ProjectMOMs as Record<string, unknown>[]) || [];

  const navItems = PROJECT_WORKSPACE_NAV(code);

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
      {/* Horizontal Nav */}
      <HorizontalNav
        items={navItems}
        workspaceParam={`code=${code}`}
        workspaceTitle={t(String(project?.nameAr || ''), String(project?.nameEn || project?.nameAr || ''))}
        workspaceCode={code || String(project?.code || '')}
        workspaceType="project"
      />

      <div className="space-y-6">
        {/* Project Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-l from-primary-800 to-primary-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-mono">{code || String(project?.code)}</span>
                <Badge
                  label={t(
                    project?.status === 'execution' ? 'قيد التنفيذ' : project?.status === 'planning' ? 'تخطيط' : String(project?.status || ''),
                    String(project?.status || '')
                  )}
                  color="#FFFFFF"
                  variant="outline"
                />
              </div>
              <h2 className="text-xl font-black">{t(String(project?.nameAr || 'مشروع'), String(project?.nameEn || project?.nameAr || 'Project'))}</h2>
              <p className="text-sm text-white/70">{t(String(project?.organizationAr || ''), String(project?.organizationEn || project?.organizationAr || ''))}</p>
              <div className="flex items-center gap-2 mt-1">
                <Avatar name={String(project?.ownerAr || 'م')} size="sm" />
                <span className="text-sm">{t(String(project?.ownerAr || ''), String(project?.ownerEn || project?.ownerAr || ''))}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                  <motion.circle
                    cx="18" cy="18" r="15.915"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${project?.completion || 0}, 100`}
                    initial={{ strokeDasharray: '0, 100' }}
                    animate={{ strokeDasharray: `${project?.completion || 0}, 100` }}
                    transition={{ duration: 1.2 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black">{String(project?.completion || 0)}%</span>
                  <span className="text-xs opacity-70">{t('إنجاز', 'Done')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: t('المخاطر', 'Risks'), value: risks.length, color: '#B71C1C', icon: <AlertTriangle size={18} />, key: 'ProjectRisks' },
            { label: t('الإشكاليات', 'Issues'), value: issues.length, color: '#E65100', icon: <Activity size={18} />, key: 'ProjectIssues' },
            { label: t('المعالم', 'Milestones'), value: milestones.length, color: '#283593', icon: <Flag size={18} />, key: 'ProjectMilestones' },
            { label: t('المهام', 'Tasks'), value: tasks.length, color: '#1B5E3B', icon: <CheckCircle size={18} />, key: 'Tasks' },
            { label: t('الاجتماعات', 'MOMs'), value: moms.length, color: '#006064', icon: <Users size={18} />, key: 'ProjectMOMs' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              onClick={() => navigate(`/list?modulekey=${s.key}&projectCode=${code}`)}
              className="bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer transition-all overflow-hidden"
            >
              <div className="h-1 w-full" style={{ backgroundColor: s.color }} />
              <div className="p-4 text-center">
                <div className="w-10 h-10 rounded-xl mx-auto mb-2.5 flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <span style={{ color: s.color }}>{s.icon}</span>
                </div>
                <p className="text-2xl font-black leading-none" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-1.5 font-medium">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('حالة المهام', 'Task Status')}</h3>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">{tasks.length} {t('مهمة', 'tasks')}</span>
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
          </Card>

          <Card className="col-span-2">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('تقدم المعالم', 'Milestones Progress')}</h3>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">{milestones.length} {t('معلم', 'milestones')}</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={milestoneData} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="planned" fill="#1B5E3B" radius={[3, 3, 0, 0]} name={t('مخطط', 'Planned')} />
                <Bar dataKey="actual" fill="#E8A020" radius={[3, 3, 0, 0]} name={t('فعلي', 'Actual')} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Items */}
        <div className="grid grid-cols-2 gap-4">
          {/* Latest Risks */}
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('أحدث المخاطر', 'Latest Risks')}</h3>
              <button
                onClick={() => navigate(`/list?modulekey=ProjectRisks&projectCode=${code}`)}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {t('عرض الكل', 'View All')}
              </button>
            </div>
            <div className="space-y-2">
              {risks.slice(0, 3).map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/view?modulekey=ProjectRisks&itemid=${r.id}&projectCode=${code}`)}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: RISK_COLORS[i % 3] + '20' }}>
                    <AlertTriangle size={14} style={{ color: RISK_COLORS[i % 3] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{t(String(r.nameAr), String(r.nameEn || r.nameAr))}</p>
                    <p className="text-xs text-gray-400">{t(String(r.ownerAr), String(r.ownerEn || r.ownerAr))}</p>
                  </div>
                  <Badge
                    label={t(r.level === 'high' ? 'مرتفع' : r.level === 'medium' ? 'متوسط' : 'منخفض', String(r.level))}
                    color={r.level === 'high' ? '#B71C1C' : r.level === 'medium' ? '#E65100' : '#2E7D32'}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Latest Milestones */}
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('أحدث المعالم', 'Latest Milestones')}</h3>
              <button
                onClick={() => navigate(`/list?modulekey=ProjectMilestones&projectCode=${code}`)}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {t('عرض الكل', 'View All')}
              </button>
            </div>
            <div className="space-y-2">
              {milestones.slice(0, 4).map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/view?modulekey=ProjectMilestones&itemid=${m.id}&projectCode=${code}`)}>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Flag size={14} className="text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{t(String(m.nameAr), String(m.nameEn || m.nameAr))}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${m.completion}%` }} />
                      </div>
                      <span className="text-xs text-gray-400">{String(m.completion)}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={11} />
                    <span>{String(m.plannedDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Latest MOMs */}
        <Card>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">{t('آخر محاضر الاجتماعات', 'Latest Meeting Minutes')}</h3>
            <button
              onClick={() => navigate(`/list?modulekey=ProjectMOMs&projectCode=${code}`)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {t('عرض الكل', 'View All')}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {moms.slice(0, 2).map((m, i) => (
              <div key={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary-200 cursor-pointer transition-all"
                onClick={() => navigate(`/view?modulekey=ProjectMOMs&itemid=${m.id}&projectCode=${code}`)}>
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-teal-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{t(String(m.nameAr), String(m.nameEn || m.nameAr))}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{String(m.date)}</p>
                  <p className="text-xs text-gray-500 mt-1">{String(m.location || '')}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
