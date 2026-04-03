import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Plus, TrendingUp, AlertTriangle, Flag, CheckCircle } from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
} from 'recharts';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

const STATUS_COLORS: Record<string, string> = {
  'in-progress': '#1B5E3B',
  completed: '#2E7D32',
  delayed: '#B71C1C',
  planned: '#283593',
  cancelled: '#455A64',
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
    { subject: t('استراتيجي', 'Strategic'), A: 80 },
    { subject: t('تشغيلي', 'Operational'), A: 65 },
    { subject: t('مالي', 'Financial'), A: 70 },
    { subject: t('مخاطر', 'Risks'), A: 40 },
    { subject: t('جودة', 'Quality'), A: 85 },
  ];

  const barData = [
    { name: t('مخطط', 'Planned'), value: 2 },
    { name: t('جاري', 'Active'), value: 3 },
    { name: t('متأخر', 'Delayed'), value: 1 },
    { name: t('مكتمل', 'Done'), value: 1 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{t('المبادرات', 'Initiatives')}</h2>
            <p className="text-sm text-gray-500 mt-1">{t('إدارة ومتابعة جميع المبادرات', 'Manage and track all initiatives')}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/add?modulekey=Initiatives')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-700 text-white rounded-xl font-medium shadow-sm hover:bg-primary-800 transition-all"
          >
            <Plus size={18} />
            {t('إضافة مبادرة', 'Add Initiative')}
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: t('إجمالي المبادرات', 'Total Initiatives'), value: stats.total, color: '#1B5E3B', icon: <Lightbulb size={20} /> },
            { label: t('قيد التنفيذ', 'Active'), value: stats.active, color: '#006064', icon: <TrendingUp size={20} /> },
            { label: t('مكتملة', 'Completed'), value: stats.completed, color: '#2E7D32', icon: <CheckCircle size={20} /> },
            { label: t('متأخرة', 'Delayed'), value: stats.delayed, color: '#B71C1C', icon: <AlertTriangle size={20} /> },
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
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('مؤشرات الأداء', 'Performance Indicators')}</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <Radar name="score" dataKey="A" stroke="#1B5E3B" fill="#1B5E3B" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="col-span-2">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">{t('توزيع حسب الحالة', 'Distribution by Status')}</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={['#283593', '#1B5E3B', '#B71C1C', '#2E7D32'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Initiatives Grid */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 text-lg">{t('قائمة المبادرات', 'Initiatives List')}</h3>
            <button
              onClick={() => navigate('/list?modulekey=Initiatives')}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {t('عرض الكل', 'View All')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initiatives.map((ini, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                onClick={() => navigate(`/workspace/initiative?code=${ini.code}`)}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: STATUS_COLORS[String(ini.status)] || '#78909C' }}
                    >
                      <Lightbulb size={16} />
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{String(ini.code)}</span>
                  </div>
                  <Badge
                    label={t(
                      ini.status === 'in-progress' ? 'جاري' : ini.status === 'completed' ? 'مكتمل' : ini.status === 'planned' ? 'مخطط' : String(ini.status),
                      String(ini.status)
                    )}
                    color={STATUS_COLORS[String(ini.status)] || '#78909C'}
                  />
                </div>

                <h4 className="font-bold text-gray-900 mb-1 line-clamp-2 text-sm">
                  {t(String(ini.nameAr), String(ini.nameEn || ini.nameAr))}
                </h4>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${ini.completion}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                        style={{ backgroundColor: STATUS_COLORS[String(ini.status)] || '#78909C' }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-600">{String(ini.completion)}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Avatar name={String(ini.ownerAr)} size="xs" />
                      <span>{String(ini.ownerAr)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-0.5 text-red-500">
                        <AlertTriangle size={11} /> {String(ini.risksCount || 0)}
                      </span>
                      <span className="flex items-center gap-0.5 text-blue-500">
                        <Flag size={11} /> {String(ini.milestonesCount || 0)}
                      </span>
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
