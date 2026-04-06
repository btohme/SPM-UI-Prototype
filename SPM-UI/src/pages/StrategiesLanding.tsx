import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Layers, ChevronDown, Target, BarChart2, TrendingUp, Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';
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
      <div className="pure-dashboard-wrapper">

        {/* Header */}
        <div className="pure-flex-between">

          <div>
            <h2 className="pure-title-main">{t('الاستراتيجيات', 'Strategies')}</h2>
            <p className="pure-subtitle">{t('إطار الأهداف والمؤشرات الاستراتيجية', 'Strategic objectives and KPI framework')}</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/add?modulekey=Strategies')} className="pure-btn-primary">
            <Plus size={18} />
            {t('إضافة استراتيجية', 'Add Strategy')}
          </motion.button>
        </div>
        {/* Top KPIs */}
        <div className="pure-grid-3">
          {[
            { label: t('الاستراتيجيات', 'Strategies'), value: strategies.length, color: '#147a6d', icon: <Layers size={20} /> },
            { label: t('الأهداف', 'Objectives'), value: objectives.length, color: '#006064', icon: <Target size={20} /> },
            { label: t('مؤشرات الأداء', 'KPIs'), value: kpis.length, color: '#283593', icon: <BarChart2 size={20} /> },
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

        {/* Strategy → Objectives accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {strategies.map((str, i) => {
            const linkedObjectives = objectives.filter(o => o.strategyId === str.id);
            const linkedKPIs = kpis.filter(k => linkedObjectives.some(o => o.id === k.objectiveId));
            const avgCompletion = linkedObjectives.length > 0 ? Math.round(linkedObjectives.reduce((acc, o) => acc + Number(o.completion || 0), 0) / linkedObjectives.length) : 0;
            const isOpen = expanded === String(str.id);

            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="pure-card" style={{ padding: 0, overflow: 'hidden' }}>

                {/* Header Row */}
                <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: isOpen ? '#f9fafb' : 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => setExpanded(isOpen ? null : String(str.id))}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#e6f2f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Layers size={18} color="#147a6d" />
                  </div>
                  <div style={{ flex: 1, textAlign: 'start' }}>
                    <p style={{ fontWeight: '700', color: '#111827', fontSize: '14px', margin: '0 0 2px 0' }}>{t(String(str.nameAr), String(str.nameEn || str.nameAr))}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{String(str.code)}</p>
                  </div>

                  <div className="pure-flex-start" style={{ gap: '24px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 2px 0' }}>{t('الأهداف', 'Objectives')}</p>
                      <p style={{ fontWeight: '700', color: '#1f2937', margin: 0 }}>{linkedObjectives.length}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 2px 0' }}>{t('المؤشرات', 'KPIs')}</p>
                      <p style={{ fontWeight: '700', color: '#1f2937', margin: 0 }}>{linkedKPIs.length}</p>
                    </div>
                    <div style={{ width: '96px' }}>
                      <div className="pure-flex-between" style={{ marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{t('الإنجاز', 'Progress')}</span>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#147a6d' }}>{avgCompletion}%</span>
                      </div>
                      <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${avgCompletion}%` }} transition={{ duration: 0.8, delay: 0.2 }} style={{ height: '100%', background: '#147a6d', borderRadius: '999px' }} />
                      </div>
                    </div>
                    <Badge label={t(str.pillar === 'economic' ? 'اقتصادي' : str.pillar === 'social' ? 'اجتماعي' : str.pillar === 'digital' ? 'رقمي' : String(str.pillar || ''), String(str.pillar || ''))} color="#147a6d" />
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={18} color="#9ca3af" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded: Objectives */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ borderTop: '1px solid #f3f4f6', background: '#f9fafb', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {linkedObjectives.length === 0 ? (
                          <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center', margin: '16px 0' }}>{t('لا توجد أهداف مرتبطة', 'No linked objectives')}</p>
                        ) : (
                          linkedObjectives.map((obj, j) => {
                            const objKPIs = kpis.filter(k => k.objectiveId === obj.id);
                            return (
                              <motion.button key={j} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.05 }} onClick={() => navigate(`/view?modulekey=Objectives&itemid=${obj.id}`)} className="pure-list-item" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <Target size={14} color="#15803d" />
                                </div>
                                <div style={{ flex: 1, margin: '0 16px' }}>
                                  <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px', margin: '0 0 2px 0' }}>{t(String(obj.nameAr), String(obj.nameEn || obj.nameAr))}</p>
                                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{String(obj.code)}</p>
                                </div>
                                <div className="pure-flex-start" style={{ gap: '16px', flexShrink: 0 }}>
                                  <div className="pure-flex-start" style={{ gap: '4px', fontSize: '12px', color: '#6b7280' }}>
                                    <TrendingUp size={12} color="#3b82f6" /> <span>{objKPIs.length} {t('مؤشر', 'KPIs')}</span>
                                  </div>
                                  <div style={{ width: '80px' }}>
                                    <div className="pure-flex-between" style={{ marginBottom: '4px' }}>
                                      <span style={{ fontSize: '11px', color: '#9ca3af' }}>{String(obj.completion)}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden' }}>
                                      <div style={{ height: '100%', borderRadius: '999px', background: '#0d9488', width: `${obj.completion}%` }} />
                                    </div>
                                  </div>
                                  <Badge label={t(obj.status === 'on-track' ? 'في المسار' : obj.status === 'at-risk' ? 'في خطر' : obj.status === 'delayed' ? 'متأخر' : String(obj.status), String(obj.status))} color={obj.status === 'on-track' ? '#2E7D32' : obj.status === 'at-risk' ? '#F57F17' : '#B71C1C'} />
                                </div>
                              </motion.button>
                            );
                          })
                        )}
                        <button onClick={() => navigate(`/list?modulekey=Objectives&strategyId=${str.id}`)} className="pure-btn-link" style={{ justifyContent: 'center', marginTop: '8px' }}>
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
        <div className="pure-card">
          <div className="pure-card-header">
            <span className="pure-card-title">{t('مؤشرات الأداء الرئيسية', 'Key Performance Indicators')}</span>
            <span className="pure-badge pure-badge-gray">{kpis.length} {t('مؤشر', 'KPIs')}</span>
          </div>
          <div className="pure-grid-3">
            {kpis.map((kpi, i) => (
              <motion.button key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} onClick={() => navigate(`/view?modulekey=KPIs&itemid=${kpi.id}`)} className="pure-list-item" style={{ border: '1px solid #f3f4f6' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BarChart2 size={14} color="#1d4ed8" />
                </div>
                <div style={{ flex: 1, margin: '0 12px', minWidth: 0 }}>
                  <p className="pure-text-truncate" style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px', margin: '0 0 2px 0' }}>{t(String(kpi.nameAr), String(kpi.nameEn || kpi.nameAr))}</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{String(kpi.code)}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#147a6d', margin: '0 0 2px 0' }}>{String(kpi.currentValue || 0)}</p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>/ {String(kpi.targetValue || 100)}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}