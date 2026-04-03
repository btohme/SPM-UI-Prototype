import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Layers, ChevronDown, Target, BarChart2, TrendingUp } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

export default function StrategiesLanding() {
  const { t } = useApp();
  const navigate = useNavigate();
  const strategies = (MOCK_DATA.Strategies as Record<string, unknown>[]) || [];
  const objectives = (MOCK_DATA.Objectives as Record<string, unknown>[]) || [];
  const kpis = (MOCK_DATA.KPIs as Record<string, unknown>[]) || [];
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{t('الاستراتيجيات', 'Strategies')}</h2>
            <p className="text-sm text-gray-500 mt-1">{t('إطار الأهداف والمؤشرات الاستراتيجية', 'Strategic objectives and KPI framework')}</p>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: t('الاستراتيجيات', 'Strategies'), value: strategies.length, color: '#1B5E3B', icon: <Layers size={20} /> },
            { label: t('الأهداف', 'Objectives'), value: objectives.length, color: '#006064', icon: <Target size={20} /> },
            { label: t('مؤشرات الأداء', 'KPIs'), value: kpis.length, color: '#283593', icon: <BarChart2 size={20} /> },
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

        {/* Strategy → Objectives accordion */}
        <div className="space-y-4">
          {strategies.map((str, i) => {
            const linkedObjectives = objectives.filter(o => o.strategyId === str.id);
            const linkedKPIs = kpis.filter(k => linkedObjectives.some(o => o.id === k.objectiveId));
            const avgCompletion = linkedObjectives.length > 0
              ? Math.round(linkedObjectives.reduce((acc, o) => acc + Number(o.completion || 0), 0) / linkedObjectives.length)
              : 0;
            const isOpen = expanded === String(str.id);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Header Row */}
                <button
                  className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : String(str.id))}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Layers size={18} className="text-primary-700" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="font-bold text-gray-900 text-sm">{t(String(str.nameAr), String(str.nameEn || str.nameAr))}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{String(str.code)}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">{t('الأهداف', 'Objectives')}</p>
                      <p className="font-bold text-gray-800">{linkedObjectives.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">{t('المؤشرات', 'KPIs')}</p>
                      <p className="font-bold text-gray-800">{linkedKPIs.length}</p>
                    </div>
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">{t('الإنجاز', 'Progress')}</span>
                        <span className="text-xs font-bold text-primary-700">{avgCompletion}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary-700 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${avgCompletion}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    <Badge
                      label={t(
                        str.pillar === 'economic' ? 'اقتصادي' : str.pillar === 'social' ? 'اجتماعي' : str.pillar === 'digital' ? 'رقمي' : String(str.pillar || ''),
                        String(str.pillar || '')
                      )}
                      color="#1B5E3B"
                    />
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={18} className="text-gray-400" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded: Objectives */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-3">
                        {linkedObjectives.length === 0 ? (
                          <p className="text-sm text-gray-400 text-center py-4">{t('لا توجد أهداف مرتبطة', 'No linked objectives')}</p>
                        ) : (
                          linkedObjectives.map((obj, j) => {
                            const objKPIs = kpis.filter(k => k.objectiveId === obj.id);
                            return (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                                className="bg-white rounded-lg p-4 border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-primary-200 transition-colors"
                                onClick={() => navigate(`/view?modulekey=Objectives&itemid=${obj.id}`)}
                              >
                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                                  <Target size={14} className="text-teal-700" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-800 text-sm">{t(String(obj.nameAr), String(obj.nameEn || obj.nameAr))}</p>
                                  <p className="text-xs text-gray-400">{String(obj.code)}</p>
                                </div>
                                <div className="flex items-center gap-4 shrink-0 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <TrendingUp size={12} className="text-blue-500" />
                                    <span>{objKPIs.length} {t('مؤشر', 'KPIs')}</span>
                                  </div>
                                  <div className="w-20">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs text-gray-400">{String(obj.completion)}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                      <div
                                        className="h-full rounded-full bg-teal-600"
                                        style={{ width: `${obj.completion}%` }}
                                      />
                                    </div>
                                  </div>
                                  <Badge
                                    label={t(
                                      obj.status === 'on-track' ? 'في المسار' : obj.status === 'at-risk' ? 'في خطر' : obj.status === 'delayed' ? 'متأخر' : String(obj.status),
                                      String(obj.status)
                                    )}
                                    color={obj.status === 'on-track' ? '#2E7D32' : obj.status === 'at-risk' ? '#F57F17' : '#B71C1C'}
                                  />
                                </div>
                              </motion.div>
                            );
                          })
                        )}
                        <button
                          onClick={() => navigate(`/list?modulekey=Objectives&strategyId=${str.id}`)}
                          className="text-xs text-primary-700 hover:underline w-full text-center mt-1"
                        >
                          {t('عرض جميع الأهداف المرتبطة', 'View all linked objectives')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* KPI Summary Cards */}
        <Card>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">{t('مؤشرات الأداء الرئيسية', 'Key Performance Indicators')}</h3>
            <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">{kpis.length} {t('مؤشر', 'KPIs')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => navigate(`/view?modulekey=KPIs&itemid=${kpi.id}`)}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <BarChart2 size={14} className="text-blue-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {t(String(kpi.nameAr), String(kpi.nameEn || kpi.nameAr))}
                  </p>
                  <p className="text-xs text-gray-400">{String(kpi.code)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary-700">{String(kpi.currentValue || 0)}</p>
                  <p className="text-xs text-gray-400">/ {String(kpi.targetValue || 100)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
