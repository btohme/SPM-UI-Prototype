import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { ChevronDown, ChevronUp, FolderOpen, Eye, ExternalLink, Lightbulb, Target, BarChart2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { MOCK_DATA } from '../data/mockData';

// ─── Chart Data ────────────────────────────────────────────────────────────
const RISK_DATA = [
  { name: 'منخفض', nameEn: 'Low',    value: 35, color: '#2E7D52' },
  { name: 'متوسط', nameEn: 'Medium', value: 40, color: '#E8A020' },
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
  { name: 'إنشاء مبلغ الشروع', nameEn: 'Project Initiation', value: 2, color: '#E8A020' },
  { name: 'الإعداد',            nameEn: 'Preparation',        value: 8, color: '#283593' },
  { name: 'التخطيط',           nameEn: 'Planning',           value: 12, color: '#006064' },
  { name: 'التنفيذ',           nameEn: 'Execution',          value: 51, color: '#1B5E3B' },
  { name: 'الأقفال',           nameEn: 'Closure',            value: 3, color: '#37474F' },
];

const ACTION_ITEMS = [
  { key: 'approvals', labelAr: 'اعتمادات', labelEn: 'Approvals', count: 5 },
  { key: 'obstacles', labelAr: 'عوائق', labelEn: 'Obstacles', count: 3 },
  { key: 'risks',     labelAr: 'مخاطر', labelEn: 'Risks', count: 8 },
];

function ActionAccordion() {
  const { t } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);
  const navigate = useNavigate();

  const detailsByKey: Record<string, { titleAr: string; titleEn: string; link: string }[]> = {
    approvals: [
      { titleAr: 'طلب تغيير: إضافة وحدة الأتمتة', titleEn: 'CR: Add Automation Module', link: '/list?modulekey=ChangeRequests' },
      { titleAr: 'اعتماد نموذج إغلاق المشروع', titleEn: 'Approve Project Closure Form', link: '/list?modulekey=ProjectClosureForms' },
      { titleAr: 'اعتماد عقد التطوير الجديد', titleEn: 'Approve New Development Contract', link: '/list?modulekey=Contracts' },
    ],
    obstacles: [
      { titleAr: 'تأخر في استلام التراخيص', titleEn: 'License Approval Delay', link: '/list?modulekey=ProjectIssues' },
      { titleAr: 'نقص في الموارد التقنية', titleEn: 'Technical Resources Shortage', link: '/list?modulekey=ProjectIssues' },
    ],
    risks: [
      { titleAr: 'خطر التأخر في التسليم', titleEn: 'Delivery Delay Risk', link: '/list?modulekey=ProjectRisks' },
      { titleAr: 'خطر تجاوز الميزانية', titleEn: 'Budget Overrun Risk', link: '/list?modulekey=ProjectRisks' },
      { titleAr: 'خطر نقص الكفاءات التقنية', titleEn: 'Technical Skills Shortage', link: '/list?modulekey=ProjectRisks' },
    ],
  };

  return (
    <div className="space-y-2">
      {ACTION_ITEMS.map(item => (
        <div key={item.key} className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpanded(e => e === item.key ? null : item.key)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              {expanded === item.key
                ? <ChevronUp size={16} className="text-gray-500" />
                : <ChevronDown size={16} className="text-gray-500" />
              }
              <span className="text-sm font-medium text-gray-700">{t(item.labelAr, item.labelEn)}</span>
            </div>
            <span className="text-xs text-gray-500">{item.count}</span>
          </button>
          <AnimatePresence>
            {expanded === item.key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3 space-y-1 bg-white">
                  {detailsByKey[item.key]?.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(d.link)}
                      className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-primary-50 text-right transition-colors group"
                    >
                      <span className="text-sm text-gray-700 group-hover:text-primary-700">{t(d.titleAr, d.titleEn)}</span>
                      <ExternalLink size={13} className="text-gray-400 group-hover:text-primary-600" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ProjectListCard() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'internal' | 'development'>('internal');
  const projects = (MOCK_DATA.Projects as Record<string, unknown>[]) || [];
  const filtered = projects.filter((p) =>
    tab === 'internal'
      ? String(p.categoryAr) === 'داخلي'
      : String(p.categoryAr) === 'تنموي'
  );

  const statusColor = (s: unknown) => {
    const map: Record<string, string> = { execution: '#1B5E3B', planning: '#006064', preparation: '#283593', completed: '#2E7D32', cancelled: '#B71C1C' };
    return map[String(s)] || '#78909C';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-800">{t('المشاريع', 'Projects')}</span>
          <span className="bg-primary-100 text-primary-700 text-xs rounded-full px-2 py-0.5 font-bold">
            {projects.length}
          </span>
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="text-xs text-primary-700 hover:underline flex items-center gap-1"
        >
          <Eye size={12} /> {t('عرض الكل', 'View All')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3 border-b border-gray-100">
        {(['internal', 'development'] as const).map(key => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              tab === key
                ? 'border-primary-700 text-primary-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {key === 'internal' ? t('داخلي', 'Internal') : t('تنموي', 'Development')}
            <span className="mr-1.5 text-xs text-gray-400">
              ({projects.filter(p => (key === 'internal' ? String(p.categoryAr) === 'داخلي' : String(p.categoryAr) === 'تنموي')).length})
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.slice(0, 4).map((p, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/workspace/project?code=${p.code}`)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-right group border border-transparent hover:border-gray-100"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-xs font-bold"
              style={{ backgroundColor: statusColor(p.status) }}
            >
              <FolderOpen size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate group-hover:text-primary-700 transition-colors">
                {t(String(p.nameAr), String(p.nameEn || p.nameAr))}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-accent-600 font-medium">{t('حالة الإنجاز', 'Completion')}:</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-20">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${p.completion}%`, backgroundColor: statusColor(p.status) }}
                  />
                </div>
                <span className="text-xs text-gray-500">{String(p.completion)}%</span>
              </div>
            </div>
            <Badge
              label={t(String(p.status === 'execution' ? 'تنفيذ' : p.status === 'planning' ? 'تخطيط' : p.status === 'preparation' ? 'إعداد' : 'مكتمل'), String(p.status))}
              color={statusColor(p.status)}
            />
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
      <div className="space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { titleAr: 'المشاريع', titleEn: 'Projects', value: 420, sub: t('مشروع مسجل', 'Registered'), color: '#1B5E3B', icon: <FolderOpen size={22} />, moduleKey: 'Projects' },
            { titleAr: 'المبادرات', titleEn: 'Initiatives', value: 89, sub: t('مبادرة نشطة', 'Active'), color: '#0277BD', icon: <Lightbulb size={22} />, moduleKey: 'Initiatives' },
            { titleAr: 'الأهداف', titleEn: 'Objectives', value: 64, sub: t('هدف استراتيجي', 'Strategic'), color: '#7B1FA2', icon: <Target size={22} />, moduleKey: 'Objectives' },
            { titleAr: 'المؤشرات', titleEn: 'KPIs', value: 156, sub: t('مؤشر أداء', 'Indicators'), color: '#E65100', icon: <BarChart2 size={22} />, moduleKey: 'KPIs' },
          ].map((s, i) => (
            <motion.div
              key={s.titleAr}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/list?modulekey=${s.moduleKey}`)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all overflow-hidden group"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: s.color }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}18` }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <TrendingUp size={15} className="text-gray-200 group-hover:text-gray-300 transition-colors mt-1" />
                </div>
                <p className="text-4xl font-black leading-none tracking-tight" style={{ color: s.color }}>{s.value}</p>
                <p className="text-sm font-semibold text-gray-700 mt-2">{t(s.titleAr, s.titleEn)}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Risk Donut */}
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <span className="font-bold text-gray-800 text-sm">{t('المخاطر', 'Risks')}</span>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{t('حسب الخطورة', 'By Severity')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={RISK_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={82}
                  dataKey="value"
                  animationBegin={200}
                >
                  {RISK_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, _n, p) => [v, t(p.payload.name, p.payload.nameEn)]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
              {RISK_DATA.map(d => (
                <div key={d.name} className="flex items-center gap-1 text-xs text-gray-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  {t(d.name, d.nameEn)}
                </div>
              ))}
            </div>
          </Card>

          {/* Completion Status Bar */}
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <span className="font-bold text-gray-800 text-sm">{t('حالة الإنجاز', 'Completion')}</span>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{t('المشاريع', 'Projects')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={COMPLETION_DATA} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 8 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  {COMPLETION_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Phase Bar */}
          <Card>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <span className="font-bold text-gray-800 text-sm">{t('توزيع المراحل', 'Phase Distribution')}</span>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{t('المشاريع', 'Projects')}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={PHASE_DATA} layout="vertical" barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 9 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} width={80} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                  {PHASE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-5 gap-4">
          {/* Action Items */}
          <Card className="col-span-2">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <span className="font-bold text-gray-800">{t('الإجراء المطلوب', 'Required Actions')}</span>
              <span className="bg-red-100 text-red-700 text-xs rounded-full px-2.5 py-0.5 font-bold">71</span>
            </div>
            <ActionAccordion />
          </Card>

          {/* Projects */}
          <Card className="col-span-3">
            <ProjectListCard />
          </Card>
        </div>
      </div>
    </Layout>
  );
}
