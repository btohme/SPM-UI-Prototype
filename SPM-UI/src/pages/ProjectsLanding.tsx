import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Plus, TrendingUp, AlertTriangle, Flag, CheckCircle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Legend,
} from 'recharts';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

const PHASE_COLORS: Record<string, string> = {
  execution: '#1B5E3B', planning: '#006064', preparation: '#283593',
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{t('المشاريع', 'Projects')}</h2>
            <p className="text-sm text-gray-500 mt-1">{t('إدارة ومتابعة جميع المشاريع', 'Manage and track all projects')}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/add?modulekey=Projects')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-700 text-white rounded-xl font-medium shadow-sm hover:bg-primary-800 transition-all"
          >
            <Plus size={18} />
            {t('إضافة مشروع', 'Add Project')}
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: t('إجمالي المشاريع', 'Total Projects'), value: stats.total, color: '#1B5E3B', icon: <FolderOpen size={20} /> },
            { label: t('قيد التنفيذ', 'In Execution'), value: stats.execution, color: '#006064', icon: <TrendingUp size={20} /> },
            { label: t('مكتملة', 'Completed'), value: stats.completed, color: '#2E7D32', icon: <CheckCircle size={20} /> },
            { label: t('تحتاج انتباه', 'Needs Attention'), value: stats.delayed, color: '#B71C1C', icon: <AlertTriangle size={20} /> },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: s.color }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                </div>
                <p className="text-4xl font-black leading-none tracking-tight" style={{ color: s.color }}>{s.value}</p>
                <p className="text-sm font-semibold text-gray-600 mt-2">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('الميزانية المخططة مقابل الفعلية', 'Planned vs Actual Budget')}</h3>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">2026</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={BUDGET_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="planned" stroke="#1B5E3B" strokeWidth={2} dot={{ r: 4 }} name={t('مخطط', 'Planned')} />
                <Line type="monotone" dataKey="actual" stroke="#E8A020" strokeWidth={2} dot={{ r: 4 }} name={t('فعلي', 'Actual')} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('توزيع حسب الحالة', 'Status Distribution')}</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={[
                  { name: t('إعداد', 'Prep'), value: 2, color: '#283593' },
                  { name: t('تخطيط', 'Plan'), value: 2, color: '#006064' },
                  { name: t('تنفيذ', 'Exec'), value: 3, color: '#1B5E3B' },
                  { name: t('مكتمل', 'Done'), value: 0, color: '#2E7D32' },
                ]}
                barSize={32}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {[0, 1, 2, 3].map(i => (
                    <Cell key={i} fill={['#283593', '#006064', '#1B5E3B', '#2E7D32'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Projects Grid */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">{t('قائمة المشاريع', 'Projects List')}</h3>
            <button
              onClick={() => navigate('/list?modulekey=Projects')}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {t('عرض الكل', 'View All')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                onClick={() => navigate(`/workspace/project?code=${p.code}`)}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: PHASE_COLORS[String(p.status)] || '#78909C' }}
                    >
                      <FolderOpen size={16} />
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{String(p.code)}</span>
                  </div>
                  <Badge
                    label={t(
                      p.status === 'execution' ? 'تنفيذ' : p.status === 'planning' ? 'تخطيط' : p.status === 'preparation' ? 'إعداد' : String(p.status),
                      String(p.status)
                    )}
                    color={PHASE_COLORS[String(p.status)] || '#78909C'}
                  />
                </div>

                <h4 className="font-bold text-gray-900 mb-1 line-clamp-2 text-sm">
                  {t(String(p.nameAr), String(p.nameEn || p.nameAr))}
                </h4>

                <div className="mt-3 space-y-2">
                  {/* Progress */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${p.completion}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                        style={{ backgroundColor: PHASE_COLORS[String(p.status)] || '#78909C' }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-600">{String(p.completion)}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Avatar name={String(p.ownerAr)} size="xs" />
                      <span>{String(p.ownerAr)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {Number(p.risksCount) > 0 && (
                        <span className="flex items-center gap-0.5 text-red-600">
                          <AlertTriangle size={11} /> {String(p.risksCount)}
                        </span>
                      )}
                      {Number(p.milestonesCount) > 0 && (
                        <span className="flex items-center gap-0.5 text-blue-600">
                          <Flag size={11} /> {String(p.milestonesCount)}
                        </span>
                      )}
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
