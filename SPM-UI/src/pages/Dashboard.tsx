import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { FolderOpen, Eye, Lightbulb, Target, BarChart2, TrendingUp } from 'lucide-react';
// import { ChevronDown, ChevronUp, FolderOpen, Eye, ExternalLink, Lightbulb, Target, BarChart2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Badge from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

// ─── Chart Data ────────────────────────────────────────────────────────────
const RISK_DATA = [
  { name: 'منخفض', nameEn: 'Low',    value: 35, color: '#2E7D52' },
  { name: 'متوسط', nameEn: 'Medium', value: 40, color: '#f29221' },
  { name: 'مرتفع', nameEn: 'High',   value: 25, color: '#B71C1C' },
];

const COMPLETION_DATA = [
  { name: 'لم يبدأ',    nameEn: 'Not Started',  value: 12, color: '#78909C' },
  { name: 'مكتمل',      nameEn: 'Completed',    value: 5,  color: '#2E7D52' },
  { name: 'على المسار', nameEn: 'On Track',     value: 8,  color: '#0277BD' },
  { name: 'متأخر',      nameEn: 'Delayed',      value: 6,  color: '#E65100' },
  { name: 'متأخر جدا',  nameEn: 'Very Delayed', value: 3,  color: '#B71C1C' },
];

const PHASE_DATA = [
  { name: 'إنشاء مبلغ الشروع', nameEn: 'Project Initiation', value: 2, color: '#f29221' },
  { name: 'الإعداد',            nameEn: 'Preparation',        value: 8, color: '#283593' },
  { name: 'التخطيط',           nameEn: 'Planning',           value: 12, color: '#006064' },
  { name: 'التنفيذ',           nameEn: 'Execution',          value: 51, color: '#147a6d' },
  { name: 'الأقفال',           nameEn: 'Closure',            value: 3, color: '#37474F' },
];

// const ACTION_ITEMS = [
//   { key: 'approvals', labelAr: 'اعتمادات', labelEn: 'Approvals', count: 5 },
//   { key: 'obstacles', labelAr: 'عوائق', labelEn: 'Obstacles', count: 3 },
//   { key: 'risks',     labelAr: 'مخاطر', labelEn: 'Risks', count: 8 },
// ];

// function ActionAccordion() {
//   const { t } = useApp();
//   const [expanded, setExpanded] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const detailsByKey: Record<string, { titleAr: string; titleEn: string; link: string }[]> = {
//     approvals: [
//       { titleAr: 'طلب تغيير: إضافة وحدة الأتمتة', titleEn: 'CR: Add Automation Module', link: '/list?modulekey=ChangeRequests' },
//       { titleAr: 'اعتماد نموذج إغلاق المشروع', titleEn: 'Approve Project Closure Form', link: '/list?modulekey=ProjectClosureForms' },
//     ],
//     obstacles: [
//       { titleAr: 'تأخر في استلام التراخيص', titleEn: 'License Approval Delay', link: '/list?modulekey=ProjectIssues' },
//     ],
//     risks: [
//       { titleAr: 'خطر التأخر في التسليم', titleEn: 'Delivery Delay Risk', link: '/list?modulekey=ProjectRisks' },
//       { titleAr: 'خطر تجاوز الميزانية', titleEn: 'Budget Overrun Risk', link: '/list?modulekey=ProjectRisks' },
//     ],
//   };

//   return (
//     <div>
//       {ACTION_ITEMS.map(item => (
//         <div key={item.key} className="pure-accordion-wrapper">
//           <button onClick={() => setExpanded(e => e === item.key ? null : item.key)} className="pure-accordion-btn">
//             <div className="pure-flex-start" style={{ gap: '8px' }}>
//               {expanded === item.key ? <ChevronUp size={16} color="#6b7280" /> : <ChevronDown size={16} color="#6b7280" />}
//               <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>{t(item.labelAr, item.labelEn)}</span>
//             </div>
//             <span className="pure-badge pure-badge-gray">{item.count}</span>
//           </button>
//           <AnimatePresence>
//             {expanded === item.key && (
//               <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
//                 <div style={{ padding: '8px', background: '#fff' }}>
//                   {detailsByKey[item.key]?.map((d, i) => (
//                     <button key={i} onClick={() => navigate(d.link)} className="pure-list-item">
//                       <span style={{ fontSize: '13px', color: '#374151' }}>{t(d.titleAr, d.titleEn)}</span>
//                       <ExternalLink size={14} color="#9ca3af" />
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       ))}
//     </div>
//   );
// }

function ProjectListCard() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'internal' | 'development'>('internal');
  const projects = (MOCK_DATA.Projects as Record<string, unknown>[]) || [];
  const filtered = projects.filter((p) => tab === 'internal' ? String(p.categoryAr) === 'استراتيجي' : String(p.categoryAr) === 'تشغيلي');

  const statusColor = (s: unknown) => {
    const map: Record<string, string> = { execution: '#147a6d', planning: '#006064', preparation: '#283593', completed: '#2E7D32', cancelled: '#B71C1C' };
    return map[String(s)] || '#78909C';
  };

  return (
    <div>
      <div className="pure-flex-between" style={{ marginBottom: '16px' }}>
        <div className="pure-flex-start">
          <span className="pure-card-title">{t('المشاريع', 'Projects')}</span>
          <span className="pure-badge pure-badge-primary">{projects.length}</span>
        </div>
        <button onClick={() => navigate('/projects')} className="pure-btn-link">
          <Eye size={14} /> {t('عرض الكل', 'View All')}
        </button>
      </div>

      <div className="pure-tabs">
        {(['internal', 'development'] as const).map(key => (
          <button key={key} onClick={() => setTab(key)} className={`pure-tab ${tab === key ? 'active' : ''}`}>
            {key === 'internal' ? t('استراتيجي', 'Internal') : t('تشغيلي', 'Development')}
            <span style={{ marginInlineStart: '4px', fontSize: '12px', opacity: 0.7 }}>
              ({projects.filter(p => (key === 'internal' ? String(p.categoryAr) === 'استراتيجي' : String(p.categoryAr) === 'تشغيلي')).length})
            </span>
          </button>
        ))}
      </div>

      <div>
        {filtered.slice(0, 4).map((p, i) => (
          <motion.button key={i} onClick={() => navigate(`/workspace/project?projectCode=${p.code}`)} className="pure-list-item">
            <div className="pure-flex-start">
              <div className="pure-list-icon" style={{ backgroundColor: statusColor(p.status) }}>
                <FolderOpen size={16} />
              </div>
              <div style={{ textAlign: 'start' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>{t(String(p.nameAr), String(p.nameEn || p.nameAr))}</p>
                <div className="pure-flex-start" style={{ gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280' }}>{t('الإنجاز', 'Completion')}:</span>
                  <div style={{ width: '80px', height: '6px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.completion}%`, backgroundColor: statusColor(p.status) }} />
                  </div>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 'bold' }}>{String(p.completion)}%</span>
                </div>
              </div>
            </div>
            <Badge label={t(String(p.status === 'execution' ? 'تنفيذ' : p.status === 'planning' ? 'تخطيط' : p.status === 'preparation' ? 'إعداد' : 'مكتمل'), String(p.status))} color={statusColor(p.status)} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { t } = useApp();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="pure-dashboard-wrapper">

        {/* Stats row */}
        <div className="pure-grid-stats">
          {[
            { titleAr: 'الأهداف', titleEn: 'Objectives', value: 64, sub: t('هدف استراتيجي', 'Strategic'), color: '#7B1FA2', icon: <Target size={24} />, moduleKey: 'Objectives' },
            { titleAr: 'المؤشرات', titleEn: 'KPIs', value: 156, sub: t('مؤشر أداء', 'Indicators'), color: '#E65100', icon: <BarChart2 size={24} />, moduleKey: 'KPIs' },
            { titleAr: 'المبادرات', titleEn: 'Initiatives', value: 89, sub: t('مبادرة نشطة', 'Active'), color: '#0277BD', icon: <Lightbulb size={24} />, moduleKey: 'Initiatives' },
            { titleAr: 'المشاريع', titleEn: 'Projects', value: 420, sub: t('مشروع مسجل', 'Registered'), color: '#147a6d', icon: <FolderOpen size={24} />, moduleKey: 'Projects' },
          ].map((s) => (
            <div key={s.titleAr} onClick={() => navigate(`/list?modulekey=${s.moduleKey}`)} className="pure-stat-card">
              <div style={{ height: '6px', width: '100%', backgroundColor: s.color }} />
              <div style={{ padding: '24px' }}>
                <div className="pure-flex-between">
                  <div className="pure-stat-icon-wrapper" style={{ backgroundColor: `${s.color}18`, color: s.color }}>{s.icon}</div>
                  <TrendingUp size={16} color="#d1d5db" />
                </div>
                <p className="pure-stat-value" style={{ color: s.color }}>{s.value}</p>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#374151', margin: '0 0 2px 0' }}>{t(s.titleAr, s.titleEn)}</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="pure-grid-3">
          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('المخاطر', 'Risks')}</span>
              <span className="pure-badge pure-badge-gray">{t('حسب التأثير', 'By Severity')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={RISK_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={82} dataKey="value">
                  {RISK_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v, _n, p) => [v, t(p.payload.name, p.payload.nameEn)]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('حالة الإنجاز', 'Completion')}</span>
              <span className="pure-badge pure-badge-gray">{t('المشاريع', 'Projects')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={COMPLETION_DATA} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {COMPLETION_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('المراحل', 'Phase Distribution')}</span>
              <span className="pure-badge pure-badge-gray">{t('المشاريع', 'Projects')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={PHASE_DATA} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={90} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {PHASE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pure-grid-bottom">
          {/* <div className="pure-card">
            <div className="pure-card-header">
              <span className="pure-card-title">{t('الإجراء المطلوب', 'Required Actions')}</span>
              <span className="pure-badge pure-badge-red">71</span>
            </div>
            <ActionAccordion />
          </div> */}

          <div className="pure-card pure-col-span-2">
            <ProjectListCard />
          </div>
        </div>

      </div>
    </Layout>
  );
}