import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, Flag, Users, CheckCircle, Activity, TrendingUp } from 'lucide-react';
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
      <HorizontalNav
        items={navItems}
        workspaceParam={`code=${code}`}
        workspaceTitle={t(String(initiative?.nameAr || ''), String(initiative?.nameEn || initiative?.nameAr || ''))}
        workspaceCode={code || String(initiative?.code || '')}
        workspaceType="initiative"
      />

      <div className="space-y-6">
        {/* Initiative Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-l from-teal-800 to-teal-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-mono">{code || String(initiative?.code)}</span>
                <Badge
                  label={t(
                    initiative?.status === 'in-progress' ? 'قيد التنفيذ' : initiative?.status === 'planned' ? 'مخطط' : String(initiative?.status || ''),
                    String(initiative?.status || '')
                  )}
                  color="#FFFFFF"
                  variant="outline"
                />
              </div>
              <h2 className="text-xl font-black">{t(String(initiative?.nameAr || 'مبادرة'), String(initiative?.nameEn || initiative?.nameAr || 'Initiative'))}</h2>
              <p className="text-sm text-white/70">{t(String(initiative?.organizationAr || ''), String(initiative?.organizationEn || initiative?.organizationAr || ''))}</p>
              <div className="flex items-center gap-2 mt-1">
                <Avatar name={String(initiative?.ownerAr || 'م')} size="sm" />
                <span className="text-sm">{t(String(initiative?.ownerAr || ''), String(initiative?.ownerEn || initiative?.ownerAr || ''))}</span>
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
                    strokeDasharray={`${initiative?.completion || 0}, 100`}
                    initial={{ strokeDasharray: '0, 100' }}
                    animate={{ strokeDasharray: `${initiative?.completion || 0}, 100` }}
                    transition={{ duration: 1.2 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black">{String(initiative?.completion || 0)}%</span>
                  <span className="text-xs opacity-70">{t('إنجاز', 'Done')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: t('المخاطر', 'Risks'), value: risks.length, color: '#B71C1C', icon: <AlertTriangle size={18} />, key: 'InitiativeRisks' },
            { label: t('الإشكاليات', 'Issues'), value: issues.length, color: '#E65100', icon: <Activity size={18} />, key: 'InitiativeIssues' },
            { label: t('المعالم', 'Milestones'), value: milestones.length, color: '#283593', icon: <Flag size={18} />, key: 'InitiativeMilestones' },
            { label: t('المهام', 'Tasks'), value: tasks.length, color: '#1B5E3B', icon: <CheckCircle size={18} />, key: 'Tasks' },
            { label: t('أصحاب المصلحة', 'Stakeholders'), value: stakeholders.length, color: '#006064', icon: <Users size={18} />, key: 'Stakeholders' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              onClick={() => navigate(`/list?modulekey=${s.key}&initiativeCode=${code}`)}
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
              <h3 className="font-bold text-gray-800 text-sm">{t('الفوائد المخططة مقابل الفعلية', 'Planned vs Actual Benefits')}</h3>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">{benefits.length} {t('فائدة', 'benefits')}</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={benefitData.length > 0 ? benefitData : [{ name: '-', planned: 0, actual: 0 }]} barSize={20}>
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

        {/* Risks & Milestones */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('أحدث المخاطر', 'Latest Risks')}</h3>
              <button
                onClick={() => navigate(`/list?modulekey=InitiativeRisks&initiativeCode=${code}`)}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {t('عرض الكل', 'View All')}
              </button>
            </div>
            <div className="space-y-2">
              {risks.slice(0, 3).map((r, i) => (
                <div key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/view?modulekey=InitiativeRisks&itemid=${r.id}&initiativeCode=${code}`)}>
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <AlertTriangle size={14} className="text-red-700" />
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
              {risks.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">{t('لا توجد مخاطر', 'No risks')}</p>
              )}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('أحدث المعالم', 'Latest Milestones')}</h3>
              <button
                onClick={() => navigate(`/list?modulekey=InitiativeMilestones&initiativeCode=${code}`)}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {t('عرض الكل', 'View All')}
              </button>
            </div>
            <div className="space-y-2">
              {milestones.slice(0, 4).map((m, i) => (
                <div key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/view?modulekey=InitiativeMilestones&itemid=${m.id}&initiativeCode=${code}`)}>
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
                </div>
              ))}
              {milestones.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">{t('لا توجد معالم', 'No milestones')}</p>
              )}
            </div>
          </Card>
        </div>

        {/* Stakeholders & Benefits */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('أصحاب المصلحة', 'Stakeholders')}</h3>
              <button
                onClick={() => navigate(`/list?modulekey=Stakeholders&initiativeCode=${code}`)}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {t('عرض الكل', 'View All')}
              </button>
            </div>
            <div className="space-y-2">
              {stakeholders.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Avatar name={String(s.nameAr)} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{t(String(s.nameAr), String(s.nameEn || s.nameAr))}</p>
                    <p className="text-xs text-gray-400">{t(String(s.role || ''), String(s.role || ''))}</p>
                  </div>
                  <Badge label={t(String(s.influenceLevel || ''), String(s.influenceLevel || ''))} color="#006064" />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('الفوائد', 'Benefits')}</h3>
              <button
                onClick={() => navigate(`/list?modulekey=Benefits&initiativeCode=${code}`)}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {t('عرض الكل', 'View All')}
              </button>
            </div>
            <div className="space-y-3">
              {benefits.map((b, i) => (
                <div key={i} className="p-3 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">{t(String(b.nameAr), String(b.nameEn || b.nameAr))}</p>
                    <TrendingUp size={14} className="text-teal-600 mt-0.5" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{t('مخطط', 'Planned')}: <b className="text-gray-700">{String(b.plannedValue || 0)}</b></span>
                    <span>•</span>
                    <span>{t('فعلي', 'Actual')}: <b className="text-teal-700">{String(b.actualValue || 0)}</b></span>
                  </div>
                </div>
              ))}
              {benefits.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">{t('لا توجد فوائد', 'No benefits')}</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
