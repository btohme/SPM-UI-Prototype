import type { ModuleDefinition, NavItem } from '../types';

// ─── All Modules Registry ─────────────────────────────────────────────────
export const MODULES: ModuleDefinition[] = [
  // ── Global Modules ──
  { key: 'Strategies',         nameAr: 'الاستراتيجيات',          nameEn: 'Strategies',          icon: 'Target',          workspace: 'global', codePrefix: 'ST',  color: '#147a6d' },
  { key: 'SubStrategy',   nameAr: 'الاستراتيجية الفرعية',   nameEn: 'Sub Strategy',   icon: 'Columns',         workspace: 'global', codePrefix: 'SP',  color: '#4E7D51' },
  { key: 'StrategicPillars',   nameAr: 'الركائز الاستراتيجية',   nameEn: 'Strategic Pillars',   icon: 'Columns',         workspace: 'global', codePrefix: 'SP',  color: '#2E7D52' },
  { key: 'Objectives',         nameAr: 'الأهداف',                 nameEn: 'Objectives',          icon: 'Crosshair',       workspace: 'global', codePrefix: 'OB',  color: '#147a6d' },
  { key: 'KPIs',               nameAr: 'المؤشرات',                nameEn: 'KPIs',                icon: 'BarChart2',       workspace: 'global', codePrefix: 'KP',  color: '#0277BD' },
  { key: 'KPIResults',         nameAr: 'نتائج المؤشرات',          nameEn: 'KPI Results',         icon: 'TrendingUp',      workspace: 'global', codePrefix: 'KR',  color: '#0277BD' },
  { key: 'KPIEquations',       nameAr: 'معادلات المؤشرات',        nameEn: 'KPI Equations',       icon: 'Calculator',      workspace: 'global', codePrefix: 'KE',  color: '#0277BD' },
  { key: 'KPIIssues',          nameAr: 'قضايا المؤشرات',          nameEn: 'KPI Issues',          icon: 'AlertCircle',     workspace: 'global', codePrefix: 'KI',  color: '#E65100' },
  { key: 'KPIRisks',           nameAr: 'مخاطر المؤشرات',          nameEn: 'KPI Risks',           icon: 'Shield',          workspace: 'global', codePrefix: 'KK',  color: '#B71C1C' },
  { key: 'KPIsUsedInBenefitsCalc', nameAr: 'المؤشرات المستخدمة في حساب الفوائد', nameEn: 'KPIs Used in Benefits Calc', icon: 'Calculator', workspace: 'global', codePrefix: 'KB', color: '#0277BD' },
  { key: 'KPIWhatIfAnalysis',  nameAr: 'تحليل What-If للمؤشرات', nameEn: 'KPI What-If Analysis',icon: 'FlaskConical',    workspace: 'global', codePrefix: 'KW',  color: '#0277BD' },
  { key: 'Portfolios',         nameAr: 'المحافظ',                 nameEn: 'Portfolios',          icon: 'Briefcase',       workspace: 'global', codePrefix: 'PF',  color: '#4A148C' },
  { key: 'Programs',           nameAr: 'البرامج',                 nameEn: 'Programs',            icon: 'Layout',          workspace: 'global', codePrefix: 'PR',  color: '#1A237E' },
  { key: 'Projects',           nameAr: 'المشاريع',                nameEn: 'Projects',            icon: 'FolderOpen',      workspace: 'global', codePrefix: 'SC',  color: '#147a6d' },
  { key: 'Initiatives',        nameAr: 'المبادرات',               nameEn: 'Initiatives',         icon: 'Rocket',          workspace: 'global', codePrefix: 'IN',  color: '#006064' },
  { key: 'Benefits',           nameAr: 'الفوائد',                 nameEn: 'Benefits',            icon: 'Gift',            workspace: 'global', codePrefix: 'BN',  color: '#4CAF50' },
  { key: 'Stakeholders',       nameAr: 'أصحاب المصلحة',           nameEn: 'Stakeholders',        icon: 'Users',           workspace: 'global', codePrefix: 'SH',  color: '#37474F' },
  { key: 'Tasks',              nameAr: 'المهام',                  nameEn: 'Tasks',               icon: 'CheckSquare',     workspace: 'global', codePrefix: 'TA',  color: '#F57F17' },
  { key: 'Notifications',      nameAr: 'الإشعارات',               nameEn: 'Notifications',       icon: 'Bell',            workspace: 'global', codePrefix: 'NO',  color: '#E65100' },
  { key: 'KnowledgeBase',      nameAr: 'قاعدة المعرفة',           nameEn: 'Knowledge Base',      icon: 'BookOpen',        workspace: 'global', codePrefix: 'KB2', color: '#5D4037' },
  { key: 'LessonsLearned',     nameAr: 'الدروس المستفادة',        nameEn: 'Lessons Learned',     icon: 'Lightbulb',       workspace: 'global', codePrefix: 'LL',  color: '#827717' },
  { key: 'Configurations',     nameAr: 'الإعدادات',               nameEn: 'Configurations',      icon: 'Settings',        workspace: 'global', codePrefix: 'CF',  color: '#546E7A' },
  { key: 'EmailHistory',       nameAr: 'سجل البريد',              nameEn: 'Email History',       icon: 'Mail',            workspace: 'global', codePrefix: 'EH',  color: '#546E7A' },
  { key: 'EmailTemplates',     nameAr: 'قوالب البريد',            nameEn: 'Email Templates',     icon: 'FileText',        workspace: 'global', codePrefix: 'ET',  color: '#546E7A' },
  { key: 'EventLogging',       nameAr: 'سجل الأحداث',             nameEn: 'Event Logging',       icon: 'Activity',        workspace: 'global', codePrefix: 'EL',  color: '#546E7A' },
  { key: 'SLAConfiguration',   nameAr: 'إعدادات SLA',             nameEn: 'SLA Configuration',   icon: 'Gauge',           workspace: 'global', codePrefix: 'SC2', color: '#546E7A' },
  { key: 'SLAHistory',         nameAr: 'سجل SLA',                 nameEn: 'SLA History',         icon: 'History',         workspace: 'global', codePrefix: 'SH2', color: '#546E7A' },
  { key: 'SLAUsers',           nameAr: 'مستخدمو SLA',             nameEn: 'SLA Users',           icon: 'UserCheck',       workspace: 'global', codePrefix: 'SU',  color: '#546E7A' },
  { key: 'TasksConfiguration', nameAr: 'إعدادات المهام',          nameEn: 'Tasks Configuration', icon: 'Settings2',       workspace: 'global', codePrefix: 'TC',  color: '#546E7A' },
  { key: 'UserActivityConfiguration', nameAr: 'إعدادات نشاط المستخدم', nameEn: 'User Activity Configuration', icon: 'UserCog', workspace: 'global', codePrefix: 'UA', color: '#546E7A' },
  { key: 'SideNavigation',     nameAr: 'التنقل الجانبي',          nameEn: 'Side Navigation',     icon: 'Menu',            workspace: 'global', codePrefix: 'SN',  color: '#546E7A' },

  // ── Project Workspace Modules ──
  { key: 'ProjectRisks',       nameAr: 'مخاطر المشروع',           nameEn: 'Project Risks',       icon: 'ShieldAlert',     workspace: 'project', codePrefix: 'PRI', color: '#B71C1C' },
  { key: 'ProjectIssues',      nameAr: 'قضايا المشروع',           nameEn: 'Project Issues',      icon: 'AlertOctagon',    workspace: 'project', codePrefix: 'PIS', color: '#E65100' },
  { key: 'ProjectMilestones',  nameAr: 'معالم المشروع',           nameEn: 'Project Milestones',  icon: 'Flag',            workspace: 'project', codePrefix: 'PML', color: '#147a6d' },
  { key: 'ProjectDeliverables',nameAr: 'مخرجات المشروع',          nameEn: 'Project Deliverables',icon: 'Package',         workspace: 'project', codePrefix: 'PDL', color: '#147a6d' },
  { key: 'ProjectDeliverablesSupportBenefits', nameAr: 'مخرجات داعمة للفوائد', nameEn: 'Project Deliverables Support Benefits', icon: 'PackageCheck', workspace: 'project', codePrefix: 'PDB', color: '#4CAF50' },
  { key: 'ProjectMOMs',        nameAr: 'محاضر اجتماعات المشروع',  nameEn: 'Project MOMs',        icon: 'ClipboardList',   workspace: 'project', codePrefix: 'PMO', color: '#0277BD' },
  { key: 'ProjectMOMsAttendees', nameAr: 'حضور محاضر المشروع',   nameEn: 'Project MOMs Attendees', icon: 'UserCheck',    workspace: 'project', codePrefix: 'PMA', color: '#0277BD' },
  { key: 'ProjectMOMsTasks',   nameAr: 'مهام محاضر المشروع',      nameEn: 'Project MOMs Tasks',  icon: 'ListChecks',      workspace: 'project', codePrefix: 'PMT', color: '#F57F17' },
  { key: 'ChangeRequests',     nameAr: 'طلبات التغيير',           nameEn: 'Change Requests',     icon: 'GitBranch',       workspace: 'project', codePrefix: 'CR',  color: '#6A1B9A' },
  { key: 'CommunicationPlans', nameAr: 'خطط التواصل',             nameEn: 'Communication Plans', icon: 'MessageSquare',   workspace: 'project', codePrefix: 'CP',  color: '#0277BD' },
  { key: 'Contracts',          nameAr: 'العقود',                  nameEn: 'Contracts',           icon: 'FileCheck',       workspace: 'project', codePrefix: 'CO',  color: '#37474F' },
  { key: 'Deliveries',         nameAr: 'التسليمات',               nameEn: 'Deliveries',          icon: 'Truck',           workspace: 'project', codePrefix: 'DL',  color: '#147a6d' },
  { key: 'COCs',               nameAr: 'شهادات الإنجاز',          nameEn: 'COCs',                icon: 'Award',           workspace: 'project', codePrefix: 'CC',  color: '#F57F17' },
  { key: 'ProjectDependencies',nameAr: 'تبعيات المشروع',          nameEn: 'Project Dependencies',icon: 'GitMerge',        workspace: 'project', codePrefix: 'PD',  color: '#4A148C' },
  { key: 'ProjectUpdatesRegister', nameAr: 'سجل تحديثات المشروع', nameEn: 'Project Updates Register', icon: 'RefreshCw', workspace: 'project', codePrefix: 'PUR', color: '#0277BD' },
  { key: 'ProjectClosureForms',nameAr: 'نماذج إغلاق المشروع',    nameEn: 'Project Closure Forms',icon: 'FileX',          workspace: 'project', codePrefix: 'PCF', color: '#546E7A' },

  // ── Initiative Workspace Modules ──
  { key: 'InitiativeRisks',    nameAr: 'مخاطر المبادرة',          nameEn: 'Initiative Risks',    icon: 'ShieldAlert',     workspace: 'initiative', codePrefix: 'IRI', color: '#B71C1C' },
  { key: 'InitiativeIssues',   nameAr: 'قضايا المبادرة',          nameEn: 'Initiative Issues',   icon: 'AlertOctagon',    workspace: 'initiative', codePrefix: 'IIS', color: '#E65100' },
  { key: 'InitiativeMilestones', nameAr: 'معالم المبادرة',        nameEn: 'Initiative Milestones',icon: 'Flag',           workspace: 'initiative', codePrefix: 'IML', color: '#006064' },
  { key: 'InitiativeDeliverables', nameAr: 'مخرجات المبادرة',     nameEn: 'Initiative Deliverables', icon: 'Package',     workspace: 'initiative', codePrefix: 'IDL', color: '#006064' },
  { key: 'InitiativeMOMs',     nameAr: 'محاضر اجتماعات المبادرة', nameEn: 'Initiative MOMs',     icon: 'ClipboardList',   workspace: 'initiative', codePrefix: 'IMO', color: '#0277BD' },
  { key: 'InitiativeMOMsAttendees', nameAr: 'حضور محاضر المبادرة', nameEn: 'Initiative MOMs Attendees', icon: 'UserCheck', workspace: 'initiative', codePrefix: 'IMA', color: '#0277BD' },
  { key: 'InitiativeMOMsTasks',nameAr: 'مهام محاضر المبادرة',     nameEn: 'Initiative MOMs Tasks',icon: 'ListChecks',     workspace: 'initiative', codePrefix: 'IMT', color: '#F57F17' },
  { key: 'InitiativesSupportObjectives', nameAr: 'مبادرات داعمة للأهداف', nameEn: 'Initiatives Support Objectives', icon: 'Target', workspace: 'initiative', codePrefix: 'ISO', color: '#147a6d' },
  { key: 'InitiativeUpdatesRegister', nameAr: 'سجل تحديثات المبادرة', nameEn: 'Initiative Updates Register', icon: 'RefreshCw', workspace: 'initiative', codePrefix: 'IUR', color: '#0277BD' },
  { key: 'InitiativeClosureForms', nameAr: 'نماذج إغلاق المبادرة', nameEn: 'Initiative Closure Forms', icon: 'FileX',   workspace: 'initiative', codePrefix: 'ICF', color: '#546E7A' },
];

// ─── Module Map ────────────────────────────────────────────────────────────
export const MODULE_MAP: Record<string, ModuleDefinition> = Object.fromEntries(
  MODULES.map(m => [m.key, m])
);

// ─── Side Navigation Structure ─────────────────────────────────────────────
export const SIDE_NAV_ITEMS: NavItem[] = [
  {
    key: 'home',
    labelAr: 'الرئيسية',
    labelEn: 'Home',
    icon: 'Home',
    route: '/',
  },
  {
    key: 'strategies',
    labelAr: 'الاستراتيجيات',
    labelEn: 'Strategies',
    icon: 'Target',
    route: '/strategies',
  },
  {
    key: 'initiatives',
    labelAr: 'المبادرات',
    labelEn: 'Initiatives',
    icon: 'Rocket',
    route: '/initiatives',
  },
  {
    key: 'projects',
    labelAr: 'المشاريع',
    labelEn: 'Projects',
    icon: 'FolderOpen',
    route: '/projects',
  },
  {
    key: 'portfolios',
    labelAr: 'المحافظ',
    labelEn: 'Portfolio',
    icon: 'Briefcase',
    route: '/list?modulekey=Portfolios',
  },
  {
    key: 'programs',
    labelAr: 'البرامج',
    labelEn: 'Programs',
    icon: 'Layout',
    route: '/list?modulekey=Programs',
  },
  {
    key: 'planning',
    labelAr: 'التخطيط وإدارة الأداء الاستراتيجي',
    labelEn: 'Planning & Strategic Performance',
    icon: 'BarChart2',
    isSection: true,
    children: [
      { key: 'manage-strategies', labelAr: 'إدارة الاستراتيجيات', labelEn: 'Strategies Management', icon: 'Target', route: '/list?modulekey=Strategies' },
      { key: 'manage-objectives', labelAr: 'إدارة الأهداف', labelEn: 'Objectives Management', icon: 'Crosshair', route: '/list?modulekey=Objectives' },
      { key: 'manage-kpis', labelAr: 'إدارة المؤشرات', labelEn: 'KPIs Management', icon: 'BarChart2', route: '/list?modulekey=KPIs' },
      { key: 'targets-actuals', labelAr: 'الاستهدافات | القيم الفعلية', labelEn: 'Targets | Actual Values', icon: 'TrendingUp', route: '/list?modulekey=KPIResults' },
    ],
  },
  {
    key: 'execution',
    labelAr: 'التنفيذ',
    labelEn: 'Execution',
    icon: 'Settings',
    isSection: true,
    children: [
      { key: 'exec-initiatives', labelAr: 'إدارة المبادرات', labelEn: 'Initiatives Management', icon: 'Rocket', route: '/list?modulekey=Initiatives' },
      { key: 'exec-projects', labelAr: 'إدارة المشاريع', labelEn: 'Projects Management', icon: 'FolderOpen', route: '/list?modulekey=Projects' },
      { key: 'exec-changes', labelAr: 'إدارة التغيير', labelEn: 'Change Management', icon: 'GitBranch', route: '/list?modulekey=ChangeRequests' },
    ],
  },
  {
    key: 'followup',
    labelAr: 'المتابعة',
    labelEn: 'Follow-up',
    icon: 'BookOpen',
    isSection: true,
    children: [
      { key: 'tasks', labelAr: 'المهام', labelEn: 'Tasks', icon: 'CheckSquare', route: '/list?modulekey=Tasks' },
      { key: 'risks', labelAr: 'المخاطر', labelEn: 'Risks', icon: 'ShieldAlert', route: '/list?modulekey=KPIRisks' },
      { key: 'lessons', labelAr: 'الدروس المستفادة', labelEn: 'Lessons Learned', icon: 'Lightbulb', route: '/list?modulekey=LessonsLearned' },
    ],
  },
];

// ─── Project Workspace Horizontal Nav ─────────────────────────────────────
export const PROJECT_WORKSPACE_NAV = (projectCode: string): HorizontalNavItem[] => [
  { key: 'pw-dashboard', labelAr: 'لوحة التحكم', labelEn: 'Dashboard', icon: 'LayoutDashboard', route: `/workspace/project?projectCode=${projectCode}` },
  { key: 'pw-details', labelAr: 'التفاصيل', labelEn: 'Details', icon: 'Info', moduleKey: 'Projects', route: `/view?modulekey=Projects&itemid=${projectCode}&projectCode=${projectCode}` },
  { key: 'pw-risks', labelAr: 'المخاطر', labelEn: 'Risks', icon: 'ShieldAlert', moduleKey: 'ProjectRisks', route: `/list?modulekey=ProjectRisks&projectCode=${projectCode}` },
  { key: 'pw-issues', labelAr: 'التحديات', labelEn: 'Issues', icon: 'AlertOctagon', moduleKey: 'ProjectIssues', route: `/list?modulekey=ProjectIssues&projectCode=${projectCode}` },
  { key: 'pw-milestones', labelAr: 'المعالم', labelEn: 'Milestones', icon: 'Flag', moduleKey: 'ProjectMilestones', route: `/list?modulekey=ProjectMilestones&projectCode=${projectCode}` },
  { key: 'pw-deliverables', labelAr: 'المخرجات', labelEn: 'Deliverables', icon: 'Package', moduleKey: 'ProjectDeliverables', route: `/list?modulekey=ProjectDeliverables&projectCode=${projectCode}` },
  { key: 'pw-moms', labelAr: 'محاضر الاجتماعات', labelEn: 'MOMs', icon: 'ClipboardList', moduleKey: 'ProjectMOMs', route: `/list?modulekey=ProjectMOMs&projectCode=${projectCode}` },
  { key: 'pw-changes', labelAr: 'طلبات التغيير', labelEn: 'Change Requests', icon: 'GitBranch', moduleKey: 'ChangeRequests', route: `/list?modulekey=ChangeRequests&projectCode=${projectCode}` },
  { key: 'pw-communication', labelAr: 'خطط التواصل', labelEn: 'Communication', icon: 'MessageSquare', moduleKey: 'CommunicationPlans', route: `/list?modulekey=CommunicationPlans&projectCode=${projectCode}` },
  { key: 'pw-contracts', labelAr: 'العقود', labelEn: 'Contracts', icon: 'FileCheck', moduleKey: 'Contracts', route: `/list?modulekey=Contracts&projectCode=${projectCode}` },
  { key: 'pw-dependencies', labelAr: 'التبعيات', labelEn: 'Dependencies', icon: 'GitMerge', moduleKey: 'ProjectDependencies', route: `/list?modulekey=ProjectDependencies&projectCode=${projectCode}` },
  { key: 'pw-lessons', labelAr: 'الدروس المستفادة', labelEn: 'Lessons Learned', icon: 'Lightbulb', moduleKey: 'LessonsLearned', route: `/list?modulekey=LessonsLearned&projectCode=${projectCode}` },
  { key: 'pw-updates', labelAr: 'سجل التحديثات', labelEn: 'Updates Register', icon: 'RefreshCw', moduleKey: 'ProjectUpdatesRegister', route: `/list?modulekey=ProjectUpdatesRegister&projectCode=${projectCode}` },
  { key: 'pw-closure', labelAr: 'نموذج الإغلاق', labelEn: 'Closure Form', icon: 'FileX', moduleKey: 'ProjectClosureForms', route: `/list?modulekey=ProjectClosureForms&projectCode=${projectCode}` },
];

import type { HorizontalNavItem } from '../types';

// ─── Initiative Workspace Horizontal Nav ──────────────────────────────────
export const INITIATIVE_WORKSPACE_NAV = (initiativeCode: string): HorizontalNavItem[] => [
  { key: 'iw-dashboard', labelAr: 'لوحة التحكم', labelEn: 'Dashboard', icon: 'LayoutDashboard', route: `/workspace/initiative?initiativeCode=${initiativeCode}` },
  { key: 'iw-details', labelAr: 'التفاصيل', labelEn: 'Details', icon: 'Info', moduleKey: 'Initiatives', route: `/view?modulekey=Initiatives&itemid=${initiativeCode}&initiativeCode=${initiativeCode}` },
  { key: 'iw-risks', labelAr: 'المخاطر', labelEn: 'Risks', icon: 'ShieldAlert', moduleKey: 'InitiativeRisks', route: `/list?modulekey=InitiativeRisks&initiativeCode=${initiativeCode}` },
  { key: 'iw-issues', labelAr: 'التحديات', labelEn: 'Issues', icon: 'AlertOctagon', moduleKey: 'InitiativeIssues', route: `/list?modulekey=InitiativeIssues&initiativeCode=${initiativeCode}` },
  { key: 'iw-milestones', labelAr: 'المعالم', labelEn: 'Milestones', icon: 'Flag', moduleKey: 'InitiativeMilestones', route: `/list?modulekey=InitiativeMilestones&initiativeCode=${initiativeCode}` },
  { key: 'iw-deliverables', labelAr: 'المخرجات', labelEn: 'Deliverables', icon: 'Package', moduleKey: 'InitiativeDeliverables', route: `/list?modulekey=InitiativeDeliverables&initiativeCode=${initiativeCode}` },
  { key: 'iw-moms', labelAr: 'محاضر الاجتماعات', labelEn: 'MOMs', icon: 'ClipboardList', moduleKey: 'InitiativeMOMs', route: `/list?modulekey=InitiativeMOMs&initiativeCode=${initiativeCode}` },
  { key: 'iw-objectives', labelAr: 'الأهداف الداعمة', labelEn: 'Support Objectives', icon: 'Target', moduleKey: 'InitiativesSupportObjectives', route: `/list?modulekey=InitiativesSupportObjectives&initiativeCode=${initiativeCode}` },
  { key: 'iw-updates', labelAr: 'سجل التحديثات', labelEn: 'Updates Register', icon: 'RefreshCw', moduleKey: 'InitiativeUpdatesRegister', route: `/list?modulekey=InitiativeUpdatesRegister&initiativeCode=${initiativeCode}` },
  { key: 'iw-closure', labelAr: 'نموذج الإغلاق', labelEn: 'Closure Form', icon: 'FileX', moduleKey: 'InitiativeClosureForms', route: `/list?modulekey=InitiativeClosureForms&initiativeCode=${initiativeCode}` },
];
