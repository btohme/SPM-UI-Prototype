import type { ModuleConfig, SelectOption } from '../types';

// ─── Common Option Sets ────────────────────────────────────────────────────
const STATUS_OPTIONS: SelectOption[] = [
  { value: 'active',       labelAr: 'نشط',          labelEn: 'Active',       color: '#2E7D52' },
  { value: 'draft',        labelAr: 'مسودة',         labelEn: 'Draft',        color: '#78909C' },
  { value: 'inactive',     labelAr: 'غير نشط',       labelEn: 'Inactive',     color: '#B0BEC5' },
];

const PROJECT_STATUS_OPTIONS: SelectOption[] = [
  { value: 'new',          labelAr: 'جديد',           labelEn: 'New',          color: '#1565C0' },
  { value: 'preparation',  labelAr: 'الإعداد',        labelEn: 'Preparation',  color: '#283593' },
  { value: 'planning',     labelAr: 'التخطيط',        labelEn: 'Planning',     color: '#006064' },
  { value: 'execution',    labelAr: 'التنفيذ',        labelEn: 'Execution',    color: '#1B5E3B' },
  { value: 'monitoring',   labelAr: 'المراقبة',       labelEn: 'Monitoring',   color: '#F57F17' },
  { value: 'completed',    labelAr: 'مكتمل',          labelEn: 'Completed',    color: '#2E7D32' },
  { value: 'cancelled',    labelAr: 'ملغى',           labelEn: 'Cancelled',    color: '#B71C1C' },
  { value: 'on_hold',      labelAr: 'معلق',           labelEn: 'On Hold',      color: '#E65100' },
];

const COMPLETION_STATUS_OPTIONS: SelectOption[] = [
  { value: 'not_started',  labelAr: 'لم يبدأ',        labelEn: 'Not Started',  color: '#78909C' },
  { value: 'in_progress',  labelAr: 'جاري',           labelEn: 'In Progress',  color: '#1565C0' },
  { value: 'on_track',     labelAr: 'على المسار',     labelEn: 'On Track',     color: '#2E7D52' },
  { value: 'delayed',      labelAr: 'متأخر',          labelEn: 'Delayed',      color: '#E65100' },
  { value: 'very_delayed', labelAr: 'متأخر جدا',      labelEn: 'Very Delayed', color: '#B71C1C' },
  { value: 'completed',    labelAr: 'مكتمل',          labelEn: 'Completed',    color: '#2E7D32' },
];

const RISK_LEVEL_OPTIONS: SelectOption[] = [
  { value: 'low',    labelAr: 'منخفض', labelEn: 'Low',    color: '#2E7D52' },
  { value: 'medium', labelAr: 'متوسط', labelEn: 'Medium', color: '#F57F17' },
  { value: 'high',   labelAr: 'مرتفع', labelEn: 'High',   color: '#B71C1C' },
];

const PROBABILITY_OPTIONS: SelectOption[] = [
  { value: 'very_low',  labelAr: 'منخفض جداً', labelEn: 'Very Low',  color: '#2E7D52' },
  { value: 'low',       labelAr: 'منخفض',      labelEn: 'Low',       color: '#66BB6A' },
  { value: 'medium',    labelAr: 'متوسط',      labelEn: 'Medium',    color: '#F57F17' },
  { value: 'high',      labelAr: 'مرتفع',      labelEn: 'High',      color: '#EF5350' },
  { value: 'very_high', labelAr: 'مرتفع جداً', labelEn: 'Very High', color: '#B71C1C' },
];

const PRIORITY_OPTIONS: SelectOption[] = [
  { value: 'low',    labelAr: 'منخفض',  labelEn: 'Low',    color: '#78909C' },
  { value: 'medium', labelAr: 'متوسط',  labelEn: 'Medium', color: '#F57F17' },
  { value: 'high',   labelAr: 'عالي',   labelEn: 'High',   color: '#B71C1C' },
  { value: 'urgent', labelAr: 'عاجل',   labelEn: 'Urgent', color: '#880E4F' },
];

const YES_NO_OPTIONS: SelectOption[] = [
  { value: 'yes', labelAr: 'نعم', labelEn: 'Yes' },
  { value: 'no',  labelAr: 'لا',  labelEn: 'No'  },
];

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'internal',    labelAr: 'داخلي',   labelEn: 'Internal'    },
  { value: 'development', labelAr: 'تنموي',   labelEn: 'Development' },
  { value: 'technical',   labelAr: 'تقني',    labelEn: 'Technical'   },
  { value: 'social',      labelAr: 'اجتماعي', labelEn: 'Social'      },
];

const OBJECTIVE_LEVEL_OPTIONS: SelectOption[] = [
  { value: 'main',          labelAr: 'رئيسي',              labelEn: 'Main'            },
  { value: 'sub_level1',    labelAr: 'فرعي مستوى أول',     labelEn: 'Sub Level 1'     },
  { value: 'sub_level2',    labelAr: 'فرعي مستوى ثاني',    labelEn: 'Sub Level 2'     },
  { value: 'sub_level3',    labelAr: 'فرعي مستوى ثالث',    labelEn: 'Sub Level 3'     },
];

const OBJECTIVE_TYPE_OPTIONS: SelectOption[] = [
  { value: 'strategic',    labelAr: 'استراتيجي',  labelEn: 'Strategic'   },
  { value: 'operational',  labelAr: 'تشغيلي',     labelEn: 'Operational' },
  { value: 'tactical',     labelAr: 'تكتيكي',     labelEn: 'Tactical'    },
];

const KPI_TYPE_OPTIONS: SelectOption[] = [
  { value: 'strategic',   labelAr: 'استراتيجي',  labelEn: 'Strategic'   },
  { value: 'operational', labelAr: 'تشغيلي',     labelEn: 'Operational' },
];

const KPI_CLASSIFICATION_OPTIONS: SelectOption[] = [
  { value: 'growth',      labelAr: 'النمو (القدرات الرئيسية)', labelEn: 'Growth (Core Capabilities)' },
  { value: 'performance', labelAr: 'الأداء',   labelEn: 'Performance' },
  { value: 'quality',     labelAr: 'الجودة',   labelEn: 'Quality'     },
  { value: 'efficiency',  labelAr: 'الكفاءة',  labelEn: 'Efficiency'  },
  { value: 'productivity',labelAr: 'الإنتاجية',labelEn: 'Productivity'},
];

const FREQUENCY_OPTIONS: SelectOption[] = [
  { value: 'monthly',    labelAr: 'شهري',      labelEn: 'Monthly'    },
  { value: 'quarterly',  labelAr: 'ربع سنوي',  labelEn: 'Quarterly'  },
  { value: 'semi_annual',labelAr: 'نصف سنوي',  labelEn: 'Semi-Annual'},
  { value: 'annual',     labelAr: 'سنوي',      labelEn: 'Annual'     },
];

const TASK_STATUS_OPTIONS: SelectOption[] = [
  { value: 'pending',     labelAr: 'معلق',     labelEn: 'Pending',      color: '#F57F17' },
  { value: 'in_progress', labelAr: 'جاري',     labelEn: 'In Progress',  color: '#1565C0' },
  { value: 'completed',   labelAr: 'مكتمل',    labelEn: 'Completed',    color: '#2E7D32' },
  { value: 'cancelled',   labelAr: 'ملغى',     labelEn: 'Cancelled',    color: '#B71C1C' },
];

const SEVERITY_OPTIONS: SelectOption[] = [
  { value: 'low',      labelAr: 'منخفض', labelEn: 'Low',      color: '#2E7D52' },
  { value: 'medium',   labelAr: 'متوسط', labelEn: 'Medium',   color: '#F57F17' },
  { value: 'high',     labelAr: 'مرتفع', labelEn: 'High',     color: '#EF5350' },
  { value: 'critical', labelAr: 'حرج',   labelEn: 'Critical', color: '#B71C1C' },
];

const ISSUE_STATUS_OPTIONS: SelectOption[] = [
  { value: 'open',        labelAr: 'مفتوح',       labelEn: 'Open',        color: '#B71C1C' },
  { value: 'in_progress', labelAr: 'قيد المعالجة',labelEn: 'In Progress', color: '#1565C0' },
  { value: 'resolved',    labelAr: 'محلول',       labelEn: 'Resolved',    color: '#2E7D32' },
  { value: 'closed',      labelAr: 'مغلق',        labelEn: 'Closed',      color: '#78909C' },
];

const MILESTONE_STATUS_OPTIONS: SelectOption[] = [
  { value: 'not_started',  labelAr: 'لم يبدأ',   labelEn: 'Not Started',  color: '#78909C' },
  { value: 'in_progress',  labelAr: 'جاري',      labelEn: 'In Progress',  color: '#1565C0' },
  { value: 'completed',    labelAr: 'مكتمل',     labelEn: 'Completed',    color: '#2E7D32' },
  { value: 'delayed',      labelAr: 'متأخر',     labelEn: 'Delayed',      color: '#B71C1C' },
];

const YEAR_OPTIONS: SelectOption[] = Array.from({ length: 20 }, (_, i) => {
  const y = (2020 + i).toString();
  return { value: y, labelAr: y, labelEn: y };
});

// ─── Module Configurations ─────────────────────────────────────────────────

const MODULE_CONFIGS: Record<string, ModuleConfig> = {

  // ── Projects ──────────────────────────────────────────────────────────────
  Projects: {
    key: 'Projects',
    nameAr: 'المشاريع',
    nameEn: 'Projects',
    icon: 'FolderOpen',
    workspace: null,
    codePrefix: 'SC',
    tabs: [
      { key: 'details',      labelAr: 'التفاصيل',            labelEn: 'Details'           },
      { key: 'org',          labelAr: 'الهيكل التنظيمي',     labelEn: 'Org Structure'     },
      { key: 'approvals',    labelAr: 'المشاريع الاعتمادية', labelEn: 'Approvals'         },
      { key: 'world',        labelAr: 'بيانات للعالم',       labelEn: 'World Data'        },
      { key: 'outputs',      labelAr: 'بيانات الخرجات',      labelEn: 'Output Data'       },
      { key: 'risks',        labelAr: 'بيانات الخاطر',       labelEn: 'Risk Data'         },
      { key: 'stakeholders', labelAr: 'بيانات أصحاب العلاقة',labelEn: 'Stakeholders'      },
      { key: 'docs',         labelAr: 'الوثائق الداعمة',     labelEn: 'Supporting Docs'   },
    ],
    fields: [
      { key: 'nameAr',      labelAr: 'اسم المشروع',               labelEn: 'Project Name',       type: 'text',   required: true,  tab: 'details',    columnSpan: 1, maxLength: 255 },
      { key: 'categoryAr',  labelAr: 'فئة المشروع',               labelEn: 'Project Category',   type: 'select', required: true,  tab: 'details',    columnSpan: 1, options: CATEGORY_OPTIONS },
      { key: 'isDraft',     labelAr: 'هل ترغب في جعل هذا المشروع كمسودة في الوقت الحالي؟', labelEn: 'Save as Draft?', type: 'radio', required: true, tab: 'details', columnSpan: 2, options: YES_NO_OPTIONS },
      { key: 'code',        labelAr: 'رمز المشروع',               labelEn: 'Project Code',       type: 'text',   required: false, tab: 'details',    columnSpan: 1 },
      { key: 'descriptionAr',labelAr: 'وصف المشروع',              labelEn: 'Project Description',type: 'textarea',required: true, tab: 'details',    columnSpan: 2, maxLength: 5000 },
      { key: 'startDate',   labelAr: 'تاريخ بداية المشروع المخطط',labelEn: 'Planned Start Date', type: 'date',   required: true,  tab: 'details',    columnSpan: 1 },
      { key: 'endDate',     labelAr: 'تاريخ نهاية المشروع المخطط',labelEn: 'Planned End Date',   type: 'date',   required: true,  tab: 'details',    columnSpan: 1 },
      { key: 'scope',       labelAr: 'نطاق العمل',                labelEn: 'Scope of Work',      type: 'select', required: true,  tab: 'details',    columnSpan: 2, options: CATEGORY_OPTIONS },
      { key: 'budget',      labelAr: 'الميزانية المعتمدة',        labelEn: 'Approved Budget',    type: 'currency',required: false, tab: 'details',   columnSpan: 1 },
      { key: 'status',      labelAr: 'الحالة',                    labelEn: 'Status',             type: 'select', required: true,  tab: 'details',    columnSpan: 1, options: PROJECT_STATUS_OPTIONS },
      { key: 'ownerAr',     labelAr: 'مدير المشروع',              labelEn: 'Project Manager',    type: 'people', required: true,  tab: 'org',        columnSpan: 1 },
      { key: 'departmentAr',labelAr: 'الإدارة العامة',            labelEn: 'General Department', type: 'text',   required: false, tab: 'org',        columnSpan: 1 },
      { key: 'unitAr',      labelAr: 'الوحدة',                    labelEn: 'Unit',               type: 'text',   required: false, tab: 'org',        columnSpan: 1 },
      { key: 'programAr',   labelAr: 'البرنامج',                  labelEn: 'Program',            type: 'select', required: false, tab: 'org',        columnSpan: 1, options: [] },
      { key: 'riskLevel',   labelAr: 'مستوى الخاطر',              labelEn: 'Risk Level',         type: 'select', required: false, tab: 'risks',      columnSpan: 1, options: RISK_LEVEL_OPTIONS },
      { key: 'riskDescription',labelAr: 'وصف المخاطر',           labelEn: 'Risk Description',   type: 'textarea',required: false, tab: 'risks',     columnSpan: 2 },
      { key: 'attachments', labelAr: 'المرفقات',                  labelEn: 'Attachments',        type: 'file',   required: false, tab: 'docs',       columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',             labelEn: 'Code',             type: 'link',     sortable: true,  width: '140px' },
      { key: 'nameAr',      labelAr: 'اسم المشروع',       labelEn: 'Project Name',     type: 'text',     sortable: true },
      { key: 'typeAr',      labelAr: 'نوع المشروع',       labelEn: 'Project Type',     type: 'text' },
      { key: 'departmentAr',labelAr: 'الإدارة العامة',    labelEn: 'Department',       type: 'text' },
      { key: 'unitAr',      labelAr: 'الوحدة',            labelEn: 'Unit',             type: 'badge',    statusColors: { 'لا يوجد': '#E8A020', 'N/A': '#E8A020' } },
      { key: 'programAr',   labelAr: 'القسم',             labelEn: 'Division',         type: 'badge',    statusColors: { 'لا يوجد': '#E8A020', 'N/A': '#E8A020' } },
      { key: 'status',      labelAr: 'حالة الإنجاز',      labelEn: 'Completion Status',type: 'badge',    statusColors: { execution: '#2E7D52', preparation: '#283593', planning: '#006064', completed: '#1B5E3B', cancelled: '#B71C1C' } },
      { key: 'riskLevel',   labelAr: 'مستوى الهدف',       labelEn: 'Objective Level',  type: 'badge',    statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52', 'رئيسي': '#E8A020', 'فرعي مستوى ثاني': '#E8A020' } },
    ],
  },

  // ── Initiatives ───────────────────────────────────────────────────────────
  Initiatives: {
    key: 'Initiatives',
    nameAr: 'المبادرات',
    nameEn: 'Initiatives',
    icon: 'Rocket',
    workspace: null,
    codePrefix: 'IN',
    tabs: [
      { key: 'details',      labelAr: 'التفاصيل',            labelEn: 'Details'        },
      { key: 'org',          labelAr: 'الهيكل التنظيمي',     labelEn: 'Org Structure'  },
      { key: 'linkage',      labelAr: 'الربط الاستراتيجي',   labelEn: 'Strategic Link' },
      { key: 'outputs',      labelAr: 'بيانات الخرجات',      labelEn: 'Output Data'    },
      { key: 'risks',        labelAr: 'بيانات الخاطر',       labelEn: 'Risk Data'      },
      { key: 'docs',         labelAr: 'الوثائق الداعمة',     labelEn: 'Supporting Docs'},
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم المبادرة',          labelEn: 'Initiative Name',  type: 'text',   required: true,  tab: 'details', columnSpan: 1, maxLength: 255 },
      { key: 'categoryAr',   labelAr: 'فئة المبادرة',          labelEn: 'Initiative Category', type: 'select', required: true, tab: 'details', columnSpan: 1, options: CATEGORY_OPTIONS },
      { key: 'code',         labelAr: 'رمز المبادرة',          labelEn: 'Initiative Code',  type: 'text',   required: false, tab: 'details', columnSpan: 1 },
      { key: 'descriptionAr',labelAr: 'وصف المبادرة',          labelEn: 'Initiative Description', type: 'textarea', required: true, tab: 'details', columnSpan: 2, maxLength: 5000 },
      { key: 'startDate',    labelAr: 'تاريخ البداية المخطط', labelEn: 'Planned Start Date', type: 'date',  required: true,  tab: 'details', columnSpan: 1 },
      { key: 'endDate',      labelAr: 'تاريخ النهاية المخطط', labelEn: 'Planned End Date',  type: 'date',  required: true,  tab: 'details', columnSpan: 1 },
      { key: 'budget',       labelAr: 'الميزانية',             labelEn: 'Budget',           type: 'currency',required: false, tab: 'details', columnSpan: 1 },
      { key: 'status',       labelAr: 'الحالة',                labelEn: 'Status',           type: 'select', required: true,  tab: 'details', columnSpan: 1, options: PROJECT_STATUS_OPTIONS },
      { key: 'ownerAr',      labelAr: 'مسؤول المبادرة',        labelEn: 'Initiative Owner', type: 'people', required: true,  tab: 'org',     columnSpan: 1 },
      { key: 'departmentAr', labelAr: 'الإدارة العامة',        labelEn: 'Department',       type: 'text',   required: false, tab: 'org',     columnSpan: 1 },
      { key: 'strategyAr',   labelAr: 'الاستراتيجية المرتبطة', labelEn: 'Linked Strategy',  type: 'select', required: false, tab: 'linkage', columnSpan: 1, options: [] },
      { key: 'objectiveAr',  labelAr: 'الهدف المرتبط',         labelEn: 'Linked Objective', type: 'select', required: false, tab: 'linkage', columnSpan: 1, options: [] },
      { key: 'riskLevel',    labelAr: 'مستوى الخاطر',          labelEn: 'Risk Level',       type: 'select', required: false, tab: 'risks',   columnSpan: 1, options: RISK_LEVEL_OPTIONS },
      { key: 'attachments',  labelAr: 'المرفقات',              labelEn: 'Attachments',      type: 'file',   required: false, tab: 'docs',    columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true,  width: '140px' },
      { key: 'nameAr',       labelAr: 'اسم المبادرة',   labelEn: 'Initiative Name',type: 'text',  sortable: true },
      { key: 'categoryAr',   labelAr: 'الفئة',          labelEn: 'Category',      type: 'badge' },
      { key: 'ownerAr',      labelAr: 'المسؤول',        labelEn: 'Owner',         type: 'people' },
      { key: 'strategyAr',   labelAr: 'الاستراتيجية',   labelEn: 'Strategy',      type: 'text' },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { execution: '#2E7D52', preparation: '#283593', planning: '#006064', completed: '#1B5E3B', cancelled: '#B71C1C' } },
      { key: 'completion',   labelAr: 'الإنجاز',        labelEn: 'Completion',    type: 'progress' },
      { key: 'riskLevel',    labelAr: 'مستوى الخاطر',   labelEn: 'Risk Level',    type: 'badge',  statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52' } },
    ],
  },

  // ── Objectives ────────────────────────────────────────────────────────────
  Objectives: {
    key: 'Objectives',
    nameAr: 'الأهداف',
    nameEn: 'Objectives',
    icon: 'Crosshair',
    workspace: null,
    codePrefix: 'OB',
    tabs: [
      { key: 'main',    labelAr: 'البيانات الرئيسية', labelEn: 'Main Data'     },
      { key: 'linkage', labelAr: 'الربط',             labelEn: 'Linkage'       },
      { key: 'kpis',    labelAr: 'المؤشرات',          labelEn: 'KPIs'          },
      { key: 'docs',    labelAr: 'الوثائق',           labelEn: 'Documents'     },
    ],
    fields: [
      { key: 'nameAr',   labelAr: 'اسم الهدف',           labelEn: 'Objective Name', type: 'text',   required: true,  tab: 'main',    columnSpan: 1 },
      { key: 'typeAr',   labelAr: 'نوع الهدف',           labelEn: 'Objective Type', type: 'select', required: true,  tab: 'main',    columnSpan: 1, options: OBJECTIVE_TYPE_OPTIONS },
      { key: 'levelAr',  labelAr: 'مستوى الهدف',         labelEn: 'Objective Level',type: 'select', required: true,  tab: 'main',    columnSpan: 1, options: OBJECTIVE_LEVEL_OPTIONS },
      { key: 'status',   labelAr: 'الحالة',              labelEn: 'Status',         type: 'select', required: true,  tab: 'main',    columnSpan: 1, options: STATUS_OPTIONS },
      { key: 'ownerAr',  labelAr: 'مالك الهدف',          labelEn: 'Objective Owner',type: 'people', required: true,  tab: 'main',    columnSpan: 1 },
      { key: 'strategyAr',labelAr: 'الاستراتيجية المرتبطة',labelEn: 'Linked Strategy', type: 'select', required: false, tab: 'linkage', columnSpan: 1, options: [] },
      { key: 'parentObjective', labelAr: 'الهدف الأب',  labelEn: 'Parent Objective',type: 'select', required: false, tab: 'linkage', columnSpan: 1, options: [] },
      { key: 'attachments',labelAr: 'المرفقات',          labelEn: 'Attachments',    type: 'file',   required: false, tab: 'docs',    columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',              labelEn: 'Code',            type: 'link',  sortable: true, width: '140px' },
      { key: 'nameAr',      labelAr: 'اسم الهدف',          labelEn: 'Objective Name',  type: 'text',  sortable: true },
      { key: 'typeAr',      labelAr: 'نوع الهدف',          labelEn: 'Type',            type: 'badge', statusColors: { استراتيجي: '#1B5E3B', تشغيلي: '#0277BD', Strategic: '#1B5E3B', Operational: '#0277BD' } },
      { key: 'ownerAr',     labelAr: 'المالك',             labelEn: 'Owner',           type: 'people' },
      { key: 'unitAr',      labelAr: 'الوحدة',             labelEn: 'Unit',            type: 'badge', statusColors: { 'لا يوجد': '#E8A020', 'N/A': '#E8A020' } },
      { key: 'departmentAr',labelAr: 'الإدارة العامة',     labelEn: 'Department',      type: 'badge', statusColors: { 'لا يوجد': '#E8A020', 'N/A': '#E8A020' } },
      { key: 'relatedStrategyAr', labelAr: 'الاستراتيجية للربيط', labelEn: 'Linked Strategy', type: 'badge', statusColors: { 'لا يوجد': '#E8A020', 'N/A': '#E8A020' } },
      { key: 'levelAr',     labelAr: 'مستوى الهدف',        labelEn: 'Level',           type: 'badge', statusColors: { 'رئيسي': '#E8A020', 'فرعي مستوى ثاني': '#E8A020', Main: '#E8A020', 'Sub Level 2': '#E8A020' } },
    ],
  },

  // ── KPIs ──────────────────────────────────────────────────────────────────
  KPIs: {
    key: 'KPIs',
    nameAr: 'المؤشرات',
    nameEn: 'KPIs',
    icon: 'BarChart2',
    workspace: null,
    codePrefix: 'KP',
    tabs: [
      { key: 'main',       labelAr: 'البيانات الرئيسية',   labelEn: 'Main Data'         },
      { key: 'measurement',labelAr: 'بيانات القياس',        labelEn: 'Measurement Data'  },
      { key: 'operational',labelAr: 'البيانات التشغيلية',   labelEn: 'Operational Data'  },
      { key: 'source',     labelAr: 'مصدر البيانات',        labelEn: 'Data Source'       },
      { key: 'last_value', labelAr: 'آخر قيمة مدخلة',      labelEn: 'Last Input Value'  },
      { key: 'portfolio',  labelAr: 'بيانات المحفظة',       labelEn: 'Portfolio Data'    },
      { key: 'risks',      labelAr: 'بيانات الخاطر',        labelEn: 'Risk Data'         },
      { key: 'challenges', labelAr: 'بيانات التحديات',      labelEn: 'Challenges Data'   },
      { key: 'action',     labelAr: 'إجراء العمل',          labelEn: 'Work Action'       },
    ],
    fields: [
      { key: 'nameAr',           labelAr: 'اسم المؤشر',             labelEn: 'KPI Name',             type: 'text',    required: true,  tab: 'main',       columnSpan: 1 },
      { key: 'code',             labelAr: 'رمز المؤشر',             labelEn: 'KPI Code',             type: 'text',    required: false, tab: 'main',       columnSpan: 1 },
      { key: 'typeAr',           labelAr: 'نوع المؤشر',             labelEn: 'KPI Type',             type: 'select',  required: true,  tab: 'main',       columnSpan: 1, options: KPI_TYPE_OPTIONS },
      { key: 'classificationAr', labelAr: 'تصنيف المؤشر',           labelEn: 'Classification',       type: 'select',  required: true,  tab: 'main',       columnSpan: 1, options: KPI_CLASSIFICATION_OPTIONS },
      { key: 'fromYear',         labelAr: 'من سنة',                 labelEn: 'From Year',            type: 'select',  required: true,  tab: 'main',       columnSpan: 1, options: YEAR_OPTIONS },
      { key: 'toYear',           labelAr: 'إلى سنة',                labelEn: 'To Year',              type: 'select',  required: true,  tab: 'main',       columnSpan: 1, options: YEAR_OPTIONS },
      { key: 'descriptionAr',    labelAr: 'وصف المؤشر',             labelEn: 'KPI Description',      type: 'textarea',required: false, tab: 'main',       columnSpan: 2, maxLength: 5000 },
      { key: 'externalFactorsAr',labelAr: 'العوامل الخارجية',       labelEn: 'External Factors',     type: 'textarea',required: false, tab: 'main',       columnSpan: 2 },
      { key: 'ownerAr',          labelAr: 'مالك المؤشر',            labelEn: 'KPI Owner',            type: 'people',  required: true,  tab: 'main',       columnSpan: 1 },
      { key: 'linkedObjectiveAr',labelAr: 'المؤشر الرابط',          labelEn: 'Linked Objective',     type: 'select',  required: false, tab: 'main',       columnSpan: 1, options: [] },
      { key: 'changeFrequency',  labelAr: 'تغيير تكرار القياس',     labelEn: 'Change Measurement Frequency', type: 'radio', required: true, tab: 'measurement', columnSpan: 1, options: YES_NO_OPTIONS },
      { key: 'frequency',        labelAr: 'تكرار القياس',           labelEn: 'Measurement Frequency',type: 'select',  required: true,  tab: 'measurement',columnSpan: 1, options: FREQUENCY_OPTIONS },
      { key: 'unit',             labelAr: 'وحدة القياس',            labelEn: 'Measurement Unit',     type: 'text',    required: true,  tab: 'measurement',columnSpan: 1 },
      { key: 'baselineValue',    labelAr: 'القيمة الأساسية',        labelEn: 'Baseline Value',       type: 'number',  required: false, tab: 'measurement',columnSpan: 1 },
      { key: 'targetValue',      labelAr: 'القيمة المستهدفة',       labelEn: 'Target Value',         type: 'number',  required: true,  tab: 'measurement',columnSpan: 1 },
      { key: 'performanceOwnerAr',labelAr: 'رائد الأداء الأول',     labelEn: 'Performance Owner 1',  type: 'people',  required: false, tab: 'main',       columnSpan: 1 },
      { key: 'ownerAr2',         labelAr: 'رائد الأداء الثاني',     labelEn: 'Performance Owner 2',  type: 'people',  required: false, tab: 'main',       columnSpan: 1 },
      { key: 'status',           labelAr: 'الحالة',                 labelEn: 'Status',               type: 'select',  required: true,  tab: 'operational',columnSpan: 1, options: STATUS_OPTIONS },
      { key: 'attachments',      labelAr: 'مرفقات',                 labelEn: 'Attachments',          type: 'file',    required: false, tab: 'action',     columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',             labelAr: 'رمز المؤشر',     labelEn: 'KPI Code',     type: 'link',   sortable: true, width: '150px' },
      { key: 'nameAr',           labelAr: 'اسم المؤشر',     labelEn: 'KPI Name',     type: 'text',   sortable: true },
      { key: 'typeAr',           labelAr: 'نوع المؤشر',     labelEn: 'Type',         type: 'badge',  statusColors: { استراتيجي: '#1B5E3B', تشغيلي: '#0277BD' } },
      { key: 'classificationAr', labelAr: 'التصنيف',        labelEn: 'Classification',type: 'text' },
      { key: 'ownerAr',          labelAr: 'المالك',         labelEn: 'Owner',        type: 'people' },
      { key: 'targetValue',      labelAr: 'المستهدف',       labelEn: 'Target',       type: 'number' },
      { key: 'actualValue',      labelAr: 'الفعلي',         labelEn: 'Actual',       type: 'number' },
      { key: 'status',           labelAr: 'الحالة',         labelEn: 'Status',       type: 'badge',  statusColors: { active: '#2E7D52', inactive: '#B71C1C', draft: '#78909C' } },
    ],
  },

  // ── Strategies ────────────────────────────────────────────────────────────
  Strategies: {
    key: 'Strategies',
    nameAr: 'الاستراتيجيات',
    nameEn: 'Strategies',
    icon: 'Target',
    workspace: null,
    codePrefix: 'ST',
    tabs: [
      { key: 'main',   labelAr: 'البيانات الرئيسية', labelEn: 'Main Data'  },
      { key: 'pillars',labelAr: 'الركائز',            labelEn: 'Pillars'    },
      { key: 'kpis',   labelAr: 'المؤشرات',          labelEn: 'KPIs'       },
      { key: 'docs',   labelAr: 'الوثائق',           labelEn: 'Documents'  },
    ],
    fields: [
      { key: 'nameAr',      labelAr: 'اسم الاستراتيجية',   labelEn: 'Strategy Name',   type: 'text',     required: true,  tab: 'main',   columnSpan: 1 },
      { key: 'pillarAr',    labelAr: 'الركيزة',             labelEn: 'Pillar',          type: 'select',   required: false, tab: 'main',   columnSpan: 1, options: [] },
      { key: 'fromYear',    labelAr: 'من سنة',              labelEn: 'From Year',       type: 'select',   required: true,  tab: 'main',   columnSpan: 1, options: YEAR_OPTIONS },
      { key: 'toYear',      labelAr: 'إلى سنة',             labelEn: 'To Year',         type: 'select',   required: true,  tab: 'main',   columnSpan: 1, options: YEAR_OPTIONS },
      { key: 'status',      labelAr: 'الحالة',              labelEn: 'Status',          type: 'select',   required: true,  tab: 'main',   columnSpan: 1, options: STATUS_OPTIONS },
      { key: 'ownerAr',     labelAr: 'المسؤول',             labelEn: 'Owner',           type: 'people',   required: true,  tab: 'main',   columnSpan: 1 },
      { key: 'descriptionAr',labelAr: 'الوصف',             labelEn: 'Description',     type: 'textarea', required: false, tab: 'main',   columnSpan: 2 },
      { key: 'attachments', labelAr: 'المرفقات',            labelEn: 'Attachments',     type: 'file',     required: false, tab: 'docs',   columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',           labelEn: 'Code',         type: 'link',   sortable: true, width: '140px' },
      { key: 'nameAr',      labelAr: 'الاستراتيجية',    labelEn: 'Strategy',     type: 'text',   sortable: true },
      { key: 'pillarAr',    labelAr: 'الركيزة',         labelEn: 'Pillar',       type: 'text' },
      { key: 'ownerAr',     labelAr: 'المسؤول',         labelEn: 'Owner',        type: 'people' },
      { key: 'fromYear',    labelAr: 'من سنة',          labelEn: 'From',         type: 'text',  width: '80px' },
      { key: 'toYear',      labelAr: 'إلى سنة',         labelEn: 'To',           type: 'text',  width: '80px' },
      { key: 'completion',  labelAr: 'الإنجاز',         labelEn: 'Completion',   type: 'progress' },
      { key: 'status',      labelAr: 'الحالة',          labelEn: 'Status',       type: 'badge',  statusColors: { active: '#2E7D52', draft: '#78909C', inactive: '#B71C1C' } },
    ],

    // 👇 ADD THIS NEW BLOCK RIGHT HERE 👇
    setupHub: {
      enabled: true,
      hierarchy: [
        {
          moduleKey: 'SubStrategy',
          foreignKey: 'strategyAr',
          children: [{
            moduleKey: 'StrategicPillars',
            foreignKey: 'strategyAr',
            children: [
              {
                moduleKey: 'Objectives',
                foreignKey: 'strategyAr', // Matches the field key in Objectives module
                children: [
                  {
                    moduleKey: 'KPIs',
                    foreignKey: 'linkedObjectiveAr' // Matches the field key in KPIs module
                  }
                ]
              }
            ]
          }]
        }
      ]
    }
  },

  // ── Tasks ─────────────────────────────────────────────────────────────────
  Tasks: {
    key: 'Tasks',
    nameAr: 'المهام',
    nameEn: 'Tasks',
    icon: 'CheckSquare',
    workspace: null,
    codePrefix: 'TA',
    tabs: [
      { key: 'details', labelAr: 'التفاصيل', labelEn: 'Details' },
      { key: 'tracking',labelAr: 'المتابعة',  labelEn: 'Tracking'},
    ],
    fields: [
      { key: 'titleAr',     labelAr: 'عنوان المهمة',  labelEn: 'Task Title',    type: 'text',   required: true,  tab: 'details', columnSpan: 2 },
      { key: 'assigneeAr',  labelAr: 'المُعيَّن إليه', labelEn: 'Assignee',     type: 'people', required: true,  tab: 'details', columnSpan: 1 },
      { key: 'assignedByAr',labelAr: 'المُعيِّن',      labelEn: 'Assigned By',  type: 'people', required: false, tab: 'details', columnSpan: 1 },
      { key: 'dueDate',     labelAr: 'تاريخ الاستحقاق',labelEn: 'Due Date',     type: 'date',   required: true,  tab: 'details', columnSpan: 1 },
      { key: 'priority',    labelAr: 'الأولوية',       labelEn: 'Priority',     type: 'select', required: true,  tab: 'details', columnSpan: 1, options: PRIORITY_OPTIONS },
      { key: 'status',      labelAr: 'الحالة',         labelEn: 'Status',       type: 'select', required: true,  tab: 'tracking',columnSpan: 1, options: TASK_STATUS_OPTIONS },
      { key: 'completionRate',labelAr: 'نسبة الإنجاز', labelEn: 'Completion %', type: 'percentage',required: false, tab: 'tracking',columnSpan: 1 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',           labelEn: 'Code',       type: 'text',  sortable: true, width: '120px' },
      { key: 'titleAr',      labelAr: 'عنوان المهمة',    labelEn: 'Task Title', type: 'text',  sortable: true },
      { key: 'assigneeAr',   labelAr: 'المُعيَّن إليه',  labelEn: 'Assignee',   type: 'people' },
      { key: 'dueDate',      labelAr: 'الاستحقاق',       labelEn: 'Due Date',   type: 'date',  sortable: true },
      { key: 'priority',     labelAr: 'الأولوية',        labelEn: 'Priority',   type: 'badge', statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#78909C', urgent: '#880E4F' } },
      { key: 'status',       labelAr: 'الحالة',          labelEn: 'Status',     type: 'badge', statusColors: { pending: '#F57F17', in_progress: '#1565C0', completed: '#2E7D32', cancelled: '#B71C1C' } },
      { key: 'completionRate',labelAr: 'الإنجاز',        labelEn: 'Completion', type: 'progress' },
    ],
  },

  // ── Project Risks ─────────────────────────────────────────────────────────
  ProjectRisks: {
    key: 'ProjectRisks',
    nameAr: 'مخاطر المشروع',
    nameEn: 'Project Risks',
    icon: 'ShieldAlert',
    workspace: 'project',
    codePrefix: 'PRI',
    tabs: [
      { key: 'main',       labelAr: 'بيانات المخاطرة',  labelEn: 'Risk Data'         },
      { key: 'mitigation', labelAr: 'خطة التخفيف',      labelEn: 'Mitigation Plan'   },
      { key: 'monitoring', labelAr: 'المتابعة',          labelEn: 'Monitoring'        },
    ],
    fields: [
      { key: 'nameAr',          labelAr: 'اسم المخاطرة',     labelEn: 'Risk Name',         type: 'text',    required: true,  tab: 'main',       columnSpan: 1 },
      { key: 'probability',     labelAr: 'الاحتمالية',       labelEn: 'Probability',       type: 'select',  required: true,  tab: 'main',       columnSpan: 1, options: PROBABILITY_OPTIONS },
      { key: 'impact',          labelAr: 'التأثير',          labelEn: 'Impact',            type: 'select',  required: true,  tab: 'main',       columnSpan: 1, options: PROBABILITY_OPTIONS },
      { key: 'riskLevel',       labelAr: 'مستوى الخاطر',     labelEn: 'Risk Level',        type: 'select',  required: false, tab: 'main',       columnSpan: 1, options: RISK_LEVEL_OPTIONS },
      { key: 'ownerAr',         labelAr: 'مالك المخاطرة',    labelEn: 'Risk Owner',        type: 'people',  required: true,  tab: 'main',       columnSpan: 1 },
      { key: 'identifiedDate',  labelAr: 'تاريخ التحديد',    labelEn: 'Identified Date',   type: 'date',    required: true,  tab: 'main',       columnSpan: 1 },
      { key: 'mitigationPlanAr',labelAr: 'خطة التخفيف',      labelEn: 'Mitigation Plan',   type: 'textarea',required: false, tab: 'mitigation', columnSpan: 2 },
      { key: 'dueDate',         labelAr: 'تاريخ الاستحقاق',  labelEn: 'Due Date',          type: 'date',    required: false, tab: 'monitoring', columnSpan: 1 },
      { key: 'statusAr',        labelAr: 'الحالة',           labelEn: 'Status',            type: 'select',  required: true,  tab: 'monitoring', columnSpan: 1, options: ISSUE_STATUS_OPTIONS },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',        labelEn: 'Code',      type: 'text',  sortable: true, width: '130px' },
      { key: 'nameAr',      labelAr: 'المخاطرة',     labelEn: 'Risk',      type: 'text',  sortable: true },
      { key: 'probability', labelAr: 'الاحتمالية',   labelEn: 'Probability',type: 'badge', statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52', very_high: '#880E4F', very_low: '#4CAF50' } },
      { key: 'impact',      labelAr: 'التأثير',      labelEn: 'Impact',    type: 'badge', statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52', very_high: '#880E4F', very_low: '#4CAF50' } },
      { key: 'riskLevel',   labelAr: 'المستوى',      labelEn: 'Level',     type: 'badge', statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52' } },
      { key: 'ownerAr',     labelAr: 'المالك',       labelEn: 'Owner',     type: 'people' },
      { key: 'statusAr',    labelAr: 'الحالة',       labelEn: 'Status',    type: 'badge', statusColors: { مفتوح: '#B71C1C', 'قيد المعالجة': '#1565C0', محلول: '#2E7D32', مغلق: '#78909C' } },
    ],
  },

  // ── Project Issues ────────────────────────────────────────────────────────
  ProjectIssues: {
    key: 'ProjectIssues',
    nameAr: 'قضايا المشروع',
    nameEn: 'Project Issues',
    icon: 'AlertOctagon',
    workspace: 'project',
    codePrefix: 'PIS',
    tabs: [
      { key: 'main',       labelAr: 'بيانات القضية',  labelEn: 'Issue Data'     },
      { key: 'resolution', labelAr: 'الحل',           labelEn: 'Resolution'     },
    ],
    fields: [
      { key: 'titleAr',      labelAr: 'عنوان القضية',    labelEn: 'Issue Title',     type: 'text',    required: true,  tab: 'main',       columnSpan: 2 },
      { key: 'severity',     labelAr: 'درجة الخطورة',    labelEn: 'Severity',        type: 'select',  required: true,  tab: 'main',       columnSpan: 1, options: SEVERITY_OPTIONS },
      { key: 'ownerAr',      labelAr: 'مالك القضية',     labelEn: 'Issue Owner',     type: 'people',  required: true,  tab: 'main',       columnSpan: 1 },
      { key: 'identifiedDate',labelAr: 'تاريخ التحديد',  labelEn: 'Identified Date', type: 'date',    required: true,  tab: 'main',       columnSpan: 1 },
      { key: 'statusAr',     labelAr: 'الحالة',          labelEn: 'Status',          type: 'select',  required: true,  tab: 'main',       columnSpan: 1, options: ISSUE_STATUS_OPTIONS },
      { key: 'descriptionAr',labelAr: 'وصف القضية',      labelEn: 'Issue Description',type: 'textarea',required: false, tab: 'main',      columnSpan: 2 },
      { key: 'resolutionAr', labelAr: 'الحل',            labelEn: 'Resolution',      type: 'textarea',required: false, tab: 'resolution', columnSpan: 2 },
      { key: 'resolvedDate', labelAr: 'تاريخ الحل',      labelEn: 'Resolved Date',   type: 'date',    required: false, tab: 'resolution', columnSpan: 1 },
    ],
    columns: [
      { key: 'code',          labelAr: 'الكود',       labelEn: 'Code',     type: 'text',  sortable: true, width: '130px' },
      { key: 'titleAr',       labelAr: 'القضية',      labelEn: 'Issue',    type: 'text',  sortable: true },
      { key: 'severity',      labelAr: 'الخطورة',     labelEn: 'Severity', type: 'badge', statusColors: { critical: '#880E4F', high: '#B71C1C', medium: '#F57F17', low: '#2E7D52' } },
      { key: 'ownerAr',       labelAr: 'المالك',      labelEn: 'Owner',    type: 'people' },
      { key: 'identifiedDate',labelAr: 'تاريخ التحديد',labelEn: 'Date',   type: 'date' },
      { key: 'statusAr',      labelAr: 'الحالة',      labelEn: 'Status',   type: 'badge', statusColors: { مفتوح: '#B71C1C', 'قيد المعالجة': '#1565C0', محلول: '#2E7D32', مغلق: '#78909C' } },
    ],
  },

  // ── Project Milestones ────────────────────────────────────────────────────
  ProjectMilestones: {
    key: 'ProjectMilestones',
    nameAr: 'معالم المشروع',
    nameEn: 'Project Milestones',
    icon: 'Flag',
    workspace: 'project',
    codePrefix: 'PML',
    tabs: [
      { key: 'main', labelAr: 'بيانات المعلم', labelEn: 'Milestone Data' },
    ],
    fields: [
      { key: 'nameAr',      labelAr: 'اسم المعلم',       labelEn: 'Milestone Name',   type: 'text',  required: true,  tab: 'main', columnSpan: 2 },
      { key: 'plannedDate', labelAr: 'التاريخ المخطط',   labelEn: 'Planned Date',     type: 'date',  required: true,  tab: 'main', columnSpan: 1 },
      { key: 'actualDate',  labelAr: 'التاريخ الفعلي',   labelEn: 'Actual Date',      type: 'date',  required: false, tab: 'main', columnSpan: 1 },
      { key: 'ownerAr',     labelAr: 'المسؤول',          labelEn: 'Owner',            type: 'people',required: true,  tab: 'main', columnSpan: 1 },
      { key: 'status',      labelAr: 'الحالة',           labelEn: 'Status',           type: 'select',required: true,  tab: 'main', columnSpan: 1, options: MILESTONE_STATUS_OPTIONS },
      { key: 'descriptionAr',labelAr: 'الوصف',           labelEn: 'Description',      type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',          labelEn: 'Code',         type: 'text',  sortable: true, width: '130px' },
      { key: 'nameAr',      labelAr: 'المعلم',         labelEn: 'Milestone',    type: 'text',  sortable: true },
      { key: 'plannedDate', labelAr: 'المخطط',         labelEn: 'Planned',      type: 'date',  sortable: true },
      { key: 'actualDate',  labelAr: 'الفعلي',         labelEn: 'Actual',       type: 'date' },
      { key: 'ownerAr',     labelAr: 'المسؤول',        labelEn: 'Owner',        type: 'people' },
      { key: 'status',      labelAr: 'الحالة',         labelEn: 'Status',       type: 'badge', statusColors: { not_started: '#78909C', in_progress: '#1565C0', completed: '#2E7D32', delayed: '#B71C1C' } },
    ],
  },

  // ── Project MOMs ──────────────────────────────────────────────────────────
  ProjectMOMs: {
    key: 'ProjectMOMs',
    nameAr: 'محاضر الاجتماعات',
    nameEn: 'Project MOMs',
    icon: 'ClipboardList',
    workspace: 'project',
    codePrefix: 'PMO',
    tabs: [
      { key: 'main',      labelAr: 'بيانات الاجتماع', labelEn: 'Meeting Data'   },
      { key: 'attendees', labelAr: 'الحضور',          labelEn: 'Attendees'      },
      { key: 'tasks',     labelAr: 'المهام',          labelEn: 'Tasks'          },
      { key: 'docs',      labelAr: 'المرفقات',        labelEn: 'Attachments'    },
    ],
    fields: [
      { key: 'titleAr',     labelAr: 'عنوان الاجتماع',  labelEn: 'Meeting Title',   type: 'text',    required: true,  tab: 'main', columnSpan: 2 },
      { key: 'meetingDate', labelAr: 'تاريخ الاجتماع',  labelEn: 'Meeting Date',    type: 'date',    required: true,  tab: 'main', columnSpan: 1 },
      { key: 'locationAr',  labelAr: 'مكان الاجتماع',   labelEn: 'Location',        type: 'text',    required: false, tab: 'main', columnSpan: 1 },
      { key: 'chairAr',     labelAr: 'رئيس الاجتماع',   labelEn: 'Chair',           type: 'people',  required: true,  tab: 'main', columnSpan: 1 },
      { key: 'status',      labelAr: 'الحالة',          labelEn: 'Status',          type: 'select',  required: true,  tab: 'main', columnSpan: 1, options: [{ value: 'open', labelAr: 'مفتوح', labelEn: 'Open' }, { value: 'closed', labelAr: 'مغلق', labelEn: 'Closed' }] },
      { key: 'agendaAr',    labelAr: 'جدول الأعمال',    labelEn: 'Agenda',          type: 'richtext',required: false, tab: 'main', columnSpan: 2 },
      { key: 'attendees',   labelAr: 'الحضور',          labelEn: 'Attendees',       type: 'people',  required: false, tab: 'attendees', columnSpan: 2, multiple: true },
      { key: 'attachments', labelAr: 'المرفقات',        labelEn: 'Attachments',     type: 'file',    required: false, tab: 'docs', columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',        labelEn: 'Code',        type: 'text',  sortable: true, width: '130px' },
      { key: 'titleAr',     labelAr: 'الاجتماع',     labelEn: 'Meeting',     type: 'text',  sortable: true },
      { key: 'meetingDate', labelAr: 'التاريخ',      labelEn: 'Date',        type: 'date',  sortable: true },
      { key: 'chairAr',     labelAr: 'الرئيس',       labelEn: 'Chair',       type: 'people' },
      { key: 'attendeesCount',labelAr: 'الحضور',     labelEn: 'Attendees',   type: 'number' },
      { key: 'tasksCount',  labelAr: 'المهام',       labelEn: 'Tasks',       type: 'number' },
      { key: 'status',      labelAr: 'الحالة',       labelEn: 'Status',      type: 'badge', statusColors: { open: '#1565C0', closed: '#2E7D32' } },
    ],
  },

  // ── Change Requests ───────────────────────────────────────────────────────
  ChangeRequests: {
    key: 'ChangeRequests',
    nameAr: 'طلبات التغيير',
    nameEn: 'Change Requests',
    icon: 'GitBranch',
    workspace: 'project',
    codePrefix: 'CR',
    tabs: [
      { key: 'main',     labelAr: 'بيانات الطلب',  labelEn: 'Request Data'  },
      { key: 'impact',   labelAr: 'التأثير',        labelEn: 'Impact'        },
      { key: 'approval', labelAr: 'الاعتماد',       labelEn: 'Approval'      },
    ],
    fields: [
      { key: 'titleAr',       labelAr: 'عنوان الطلب',        labelEn: 'Request Title',     type: 'text',    required: true,  tab: 'main',    columnSpan: 2 },
      { key: 'requesterAr',   labelAr: 'مقدم الطلب',         labelEn: 'Requester',         type: 'people',  required: true,  tab: 'main',    columnSpan: 1 },
      { key: 'requestDate',   labelAr: 'تاريخ الطلب',        labelEn: 'Request Date',      type: 'date',    required: true,  tab: 'main',    columnSpan: 1 },
      { key: 'priority',      labelAr: 'الأولوية',           labelEn: 'Priority',          type: 'select',  required: true,  tab: 'main',    columnSpan: 1, options: PRIORITY_OPTIONS },
      { key: 'status',        labelAr: 'الحالة',             labelEn: 'Status',            type: 'select',  required: true,  tab: 'main',    columnSpan: 1, options: [{ value: 'pending_approval', labelAr: 'قيد الاعتماد', labelEn: 'Pending Approval', color: '#F57F17' }, { value: 'approved', labelAr: 'معتمد', labelEn: 'Approved', color: '#2E7D32' }, { value: 'rejected', labelAr: 'مرفوض', labelEn: 'Rejected', color: '#B71C1C' }] },
      { key: 'impactAr',      labelAr: 'التأثير',            labelEn: 'Impact',            type: 'textarea',required: false, tab: 'impact',  columnSpan: 2 },
      { key: 'estimatedCost', labelAr: 'التكلفة التقديرية',  labelEn: 'Estimated Cost',    type: 'currency',required: false, tab: 'impact',  columnSpan: 1 },
      { key: 'estimatedDays', labelAr: 'الأيام التقديرية',   labelEn: 'Estimated Days',    type: 'number',  required: false, tab: 'impact',  columnSpan: 1 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',       type: 'text',  sortable: true, width: '120px' },
      { key: 'titleAr',      labelAr: 'الطلب',          labelEn: 'Request',    type: 'text',  sortable: true },
      { key: 'requesterAr',  labelAr: 'مقدم الطلب',     labelEn: 'Requester',  type: 'people' },
      { key: 'requestDate',  labelAr: 'التاريخ',        labelEn: 'Date',       type: 'date',  sortable: true },
      { key: 'priority',     labelAr: 'الأولوية',       labelEn: 'Priority',   type: 'badge', statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#78909C' } },
      { key: 'estimatedCost',labelAr: 'التكلفة',        labelEn: 'Cost',       type: 'currency' },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',     type: 'badge', statusColors: { pending_approval: '#F57F17', approved: '#2E7D32', rejected: '#B71C1C' } },
    ],
  },

  // ── Portfolios ────────────────────────────────────────────────────────────
  Portfolios: {
    key: 'Portfolios',
    nameAr: 'الحوافظ',
    nameEn: 'Portfolios',
    icon: 'Briefcase',
    workspace: null,
    codePrefix: 'PF',
    tabs: [
      { key: 'main',  labelAr: 'البيانات الرئيسية', labelEn: 'Main Data' },
      { key: 'items', labelAr: 'العناصر',            labelEn: 'Items'     },
    ],
    fields: [
      { key: 'nameAr',      labelAr: 'اسم الحافظة',   labelEn: 'Portfolio Name',  type: 'text',     required: true,  tab: 'main', columnSpan: 1 },
      { key: 'ownerAr',     labelAr: 'المسؤول',       labelEn: 'Owner',           type: 'people',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'fromYear',    labelAr: 'من سنة',        labelEn: 'From Year',       type: 'select',   required: true,  tab: 'main', columnSpan: 1, options: YEAR_OPTIONS },
      { key: 'toYear',      labelAr: 'إلى سنة',       labelEn: 'To Year',         type: 'select',   required: true,  tab: 'main', columnSpan: 1, options: YEAR_OPTIONS },
      { key: 'budget',      labelAr: 'الميزانية',     labelEn: 'Budget',          type: 'currency', required: false, tab: 'main', columnSpan: 1 },
      { key: 'status',      labelAr: 'الحالة',        labelEn: 'Status',          type: 'select',   required: true,  tab: 'main', columnSpan: 1, options: STATUS_OPTIONS },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',         labelEn: 'Code',         type: 'text',     sortable: true, width: '130px' },
      { key: 'nameAr',      labelAr: 'الحافظة',       labelEn: 'Portfolio',    type: 'text',     sortable: true },
      { key: 'ownerAr',     labelAr: 'المسؤول',       labelEn: 'Owner',        type: 'people' },
      { key: 'programsCount',labelAr: 'البرامج',      labelEn: 'Programs',     type: 'number' },
      { key: 'projectsCount',labelAr: 'المشاريع',     labelEn: 'Projects',     type: 'number' },
      { key: 'budget',      labelAr: 'الميزانية',     labelEn: 'Budget',       type: 'currency' },
      { key: 'completion',  labelAr: 'الإنجاز',       labelEn: 'Completion',   type: 'progress' },
      { key: 'status',      labelAr: 'الحالة',        labelEn: 'Status',       type: 'badge',    statusColors: { active: '#2E7D52', draft: '#78909C', inactive: '#B71C1C' } },
    ],
  },

  // ── Programs ──────────────────────────────────────────────────────────────
  Programs: {
    key: 'Programs',
    nameAr: 'البرامج',
    nameEn: 'Programs',
    icon: 'Layout',
    workspace: null,
    codePrefix: 'PR',
    tabs: [
      { key: 'main',  labelAr: 'البيانات الرئيسية', labelEn: 'Main Data' },
      { key: 'projects',labelAr: 'المشاريع',         labelEn: 'Projects'  },
    ],
    fields: [
      { key: 'nameAr',      labelAr: 'اسم البرنامج',    labelEn: 'Program Name',  type: 'text',     required: true,  tab: 'main', columnSpan: 1 },
      { key: 'portfolioAr', labelAr: 'الحافظة',         labelEn: 'Portfolio',     type: 'select',   required: false, tab: 'main', columnSpan: 1, options: [] },
      { key: 'ownerAr',     labelAr: 'المسؤول',         labelEn: 'Owner',         type: 'people',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'fromDate',    labelAr: 'تاريخ البدء',     labelEn: 'Start Date',    type: 'date',     required: true,  tab: 'main', columnSpan: 1 },
      { key: 'toDate',      labelAr: 'تاريخ الانتهاء',  labelEn: 'End Date',      type: 'date',     required: true,  tab: 'main', columnSpan: 1 },
      { key: 'budget',      labelAr: 'الميزانية',       labelEn: 'Budget',        type: 'currency', required: false, tab: 'main', columnSpan: 1 },
      { key: 'status',      labelAr: 'الحالة',          labelEn: 'Status',        type: 'select',   required: true,  tab: 'main', columnSpan: 1, options: PROJECT_STATUS_OPTIONS },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',       labelEn: 'Code',     type: 'text',     sortable: true, width: '130px' },
      { key: 'nameAr',      labelAr: 'البرنامج',    labelEn: 'Program',  type: 'text',     sortable: true },
      { key: 'portfolioAr', labelAr: 'الحافظة',     labelEn: 'Portfolio',type: 'text' },
      { key: 'ownerAr',     labelAr: 'المسؤول',     labelEn: 'Owner',    type: 'people' },
      { key: 'projectsCount',labelAr: 'المشاريع',   labelEn: 'Projects', type: 'number' },
      { key: 'budget',      labelAr: 'الميزانية',   labelEn: 'Budget',   type: 'currency' },
      { key: 'completion',  labelAr: 'الإنجاز',     labelEn: 'Completion',type: 'progress' },
      { key: 'status',      labelAr: 'الحالة',      labelEn: 'Status',   type: 'badge',    statusColors: { execution: '#2E7D52', planning: '#006064', completed: '#1B5E3B', cancelled: '#B71C1C' } },
    ],
  },

  // ── KPI Results ───────────────────────────────────────────────────────────
  KPIResults: {
    key: 'KPIResults',
    nameAr: 'نتائج المؤشرات',
    nameEn: 'KPI Results',
    icon: 'TrendingUp',
    workspace: null,
    codePrefix: 'KR',
    tabs: [
      { key: 'main', labelAr: 'البيانات', labelEn: 'Data' },
    ],
    fields: [
      { key: 'kpiNameAr',      labelAr: 'المؤشر',          labelEn: 'KPI',           type: 'select', required: true,  tab: 'main', columnSpan: 1, options: [] },
      { key: 'periodAr',       labelAr: 'الفترة',          labelEn: 'Period',        type: 'text',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'targetValue',    labelAr: 'المستهدف',        labelEn: 'Target',        type: 'number', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'actualValue',    labelAr: 'الفعلي',          labelEn: 'Actual',        type: 'number', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'entryDate',      labelAr: 'تاريخ الإدخال',   labelEn: 'Entry Date',    type: 'date',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'enteredBy',      labelAr: 'أُدخل بواسطة',   labelEn: 'Entered By',    type: 'people', required: false, tab: 'main', columnSpan: 1 },
    ],
    columns: [
      { key: 'code',           labelAr: 'الكود',          labelEn: 'Code',          type: 'text',   sortable: true, width: '130px' },
      { key: 'kpiNameAr',      labelAr: 'المؤشر',         labelEn: 'KPI',           type: 'text',   sortable: true },
      { key: 'periodAr',       labelAr: 'الفترة',         labelEn: 'Period',        type: 'text' },
      { key: 'targetValue',    labelAr: 'المستهدف',       labelEn: 'Target',        type: 'number' },
      { key: 'actualValue',    labelAr: 'الفعلي',         labelEn: 'Actual',        type: 'number' },
      { key: 'achievementRate',labelAr: 'نسبة الإنجاز',   labelEn: 'Achievement %', type: 'percentage' },
      { key: 'status',         labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { exceeded: '#4CAF50', achieved: '#2E7D32', below: '#B71C1C' } },
    ],
  },

  // ── Benefits ──────────────────────────────────────────────────────────────
  Benefits: {
    key: 'Benefits',
    nameAr: 'الفوائد',
    nameEn: 'Benefits',
    icon: 'Gift',
    workspace: null,
    codePrefix: 'BN',
    tabs: [
      { key: 'main',     labelAr: 'البيانات الرئيسية', labelEn: 'Main Data'  },
      { key: 'tracking', labelAr: 'المتابعة',           labelEn: 'Tracking'   },
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم الفائدة',      labelEn: 'Benefit Name',  type: 'text',    required: true,  tab: 'main',    columnSpan: 1 },
      { key: 'type',         labelAr: 'النوع',            labelEn: 'Type',          type: 'select',  required: true,  tab: 'main',    columnSpan: 1, options: [{ value: 'financial', labelAr: 'مالي', labelEn: 'Financial' }, { value: 'non_financial', labelAr: 'غير مالي', labelEn: 'Non-Financial' }] },
      { key: 'ownerAr',      labelAr: 'المسؤول',          labelEn: 'Owner',         type: 'people',  required: true,  tab: 'main',    columnSpan: 1 },
      { key: 'fromDate',     labelAr: 'من تاريخ',         labelEn: 'From Date',     type: 'date',    required: true,  tab: 'main',    columnSpan: 1 },
      { key: 'toDate',       labelAr: 'إلى تاريخ',        labelEn: 'To Date',       type: 'date',    required: true,  tab: 'main',    columnSpan: 1 },
      { key: 'baselineValue',labelAr: 'القيمة الأساسية',  labelEn: 'Baseline',      type: 'number',  required: false, tab: 'tracking',columnSpan: 1 },
      { key: 'targetValue',  labelAr: 'المستهدف',         labelEn: 'Target',        type: 'number',  required: true,  tab: 'tracking',columnSpan: 1 },
      { key: 'actualValue',  labelAr: 'الفعلي',           labelEn: 'Actual',        type: 'number',  required: false, tab: 'tracking',columnSpan: 1 },
      { key: 'unit',         labelAr: 'الوحدة',           labelEn: 'Unit',          type: 'text',    required: true,  tab: 'tracking',columnSpan: 1 },
      { key: 'status',       labelAr: 'الحالة',           labelEn: 'Status',        type: 'select',  required: true,  tab: 'tracking',columnSpan: 1, options: [{ value: 'planned', labelAr: 'مخطط', labelEn: 'Planned' }, { value: 'realizing', labelAr: 'قيد التحقق', labelEn: 'Realizing' }, { value: 'realized', labelAr: 'تم التحقق', labelEn: 'Realized' }] },
    ],
    columns: [
      { key: 'code',       labelAr: 'الكود',       labelEn: 'Code',    type: 'text',     sortable: true, width: '130px' },
      { key: 'nameAr',     labelAr: 'الفائدة',     labelEn: 'Benefit', type: 'text',     sortable: true },
      { key: 'type',       labelAr: 'النوع',       labelEn: 'Type',    type: 'badge',    statusColors: { financial: '#0277BD', non_financial: '#6A1B9A' } },
      { key: 'ownerAr',    labelAr: 'المسؤول',     labelEn: 'Owner',   type: 'people' },
      { key: 'targetValue',labelAr: 'المستهدف',    labelEn: 'Target',  type: 'number' },
      { key: 'actualValue',labelAr: 'الفعلي',      labelEn: 'Actual',  type: 'number' },
      { key: 'status',     labelAr: 'الحالة',      labelEn: 'Status',  type: 'badge',    statusColors: { planned: '#78909C', realizing: '#F57F17', realized: '#2E7D32' } },
    ],
  },

  // ── Stakeholders ──────────────────────────────────────────────────────────
  Stakeholders: {
    key: 'Stakeholders',
    nameAr: 'أصحاب المصلحة',
    nameEn: 'Stakeholders',
    icon: 'Users',
    workspace: null,
    codePrefix: 'SH',
    tabs: [
      { key: 'main',      labelAr: 'البيانات الرئيسية', labelEn: 'Main Data'    },
      { key: 'engagement',labelAr: 'استراتيجية التعامل',labelEn: 'Engagement'   },
    ],
    fields: [
      { key: 'nameAr',           labelAr: 'الاسم',              labelEn: 'Name',              type: 'text',   required: true,  tab: 'main',       columnSpan: 1 },
      { key: 'type',             labelAr: 'النوع',              labelEn: 'Type',              type: 'select', required: true,  tab: 'main',       columnSpan: 1, options: [{ value: 'government', labelAr: 'حكومي', labelEn: 'Government' }, { value: 'internal', labelAr: 'داخلي', labelEn: 'Internal' }, { value: 'external', labelAr: 'خارجي', labelEn: 'External' }, { value: 'private', labelAr: 'خاص', labelEn: 'Private' }] },
      { key: 'roleAr',           labelAr: 'الدور',              labelEn: 'Role',              type: 'text',   required: false, tab: 'main',       columnSpan: 1 },
      { key: 'contactPerson',    labelAr: 'شخص التواصل',        labelEn: 'Contact Person',    type: 'people', required: false, tab: 'main',       columnSpan: 1 },
      { key: 'email',            labelAr: 'البريد الإلكتروني',  labelEn: 'Email',             type: 'email',  required: false, tab: 'main',       columnSpan: 1 },
      { key: 'interestLevel',    labelAr: 'مستوى الاهتمام',     labelEn: 'Interest Level',    type: 'select', required: false, tab: 'engagement', columnSpan: 1, options: RISK_LEVEL_OPTIONS },
      { key: 'influenceLevel',   labelAr: 'مستوى التأثير',      labelEn: 'Influence Level',   type: 'select', required: false, tab: 'engagement', columnSpan: 1, options: RISK_LEVEL_OPTIONS },
      { key: 'engagementStrategy',labelAr: 'استراتيجية التعامل',labelEn: 'Engagement Strategy',type: 'textarea',required: false,tab: 'engagement', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',          labelAr: 'الكود',         labelEn: 'Code',      type: 'text',  sortable: true, width: '120px' },
      { key: 'nameAr',        labelAr: 'الاسم',         labelEn: 'Name',      type: 'text',  sortable: true },
      { key: 'type',          labelAr: 'النوع',         labelEn: 'Type',      type: 'badge', statusColors: { government: '#0277BD', internal: '#1B5E3B', external: '#6A1B9A', private: '#37474F' } },
      { key: 'roleAr',        labelAr: 'الدور',         labelEn: 'Role',      type: 'text' },
      { key: 'interestLevel', labelAr: 'الاهتمام',      labelEn: 'Interest',  type: 'badge', statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52' } },
      { key: 'influenceLevel',labelAr: 'التأثير',       labelEn: 'Influence', type: 'badge', statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52' } },
    ],
  },

  // ── Lessons Learned ───────────────────────────────────────────────────────
  LessonsLearned: {
    key: 'LessonsLearned',
    nameAr: 'الدروس المستفادة',
    nameEn: 'Lessons Learned',
    icon: 'Lightbulb',
    workspace: null,
    codePrefix: 'LL',
    tabs: [
      { key: 'main', labelAr: 'البيانات', labelEn: 'Data' },
    ],
    fields: [
      { key: 'titleAr',        labelAr: 'العنوان',         labelEn: 'Title',            type: 'text',     required: true,  tab: 'main', columnSpan: 2 },
      { key: 'category',       labelAr: 'الفئة',           labelEn: 'Category',         type: 'select',   required: false, tab: 'main', columnSpan: 1, options: [{ value: 'risk', labelAr: 'مخاطر', labelEn: 'Risk' }, { value: 'process', labelAr: 'عملية', labelEn: 'Process' }, { value: 'technical', labelAr: 'تقني', labelEn: 'Technical' }, { value: 'management', labelAr: 'إدارة', labelEn: 'Management' }] },
      { key: 'addedBy',        labelAr: 'أُضيف بواسطة',   labelEn: 'Added By',         type: 'people',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'addedDate',      labelAr: 'تاريخ الإضافة',   labelEn: 'Added Date',       type: 'date',     required: true,  tab: 'main', columnSpan: 1 },
      { key: 'lessonsAr',      labelAr: 'الدروس المستفادة',labelEn: 'Lessons Learned',  type: 'textarea', required: true,  tab: 'main', columnSpan: 2 },
      { key: 'recommendation', labelAr: 'التوصية',         labelEn: 'Recommendation',   type: 'textarea', required: false, tab: 'main', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',      labelAr: 'الكود',     labelEn: 'Code',          type: 'text',  sortable: true, width: '120px' },
      { key: 'titleAr',   labelAr: 'العنوان',   labelEn: 'Title',         type: 'text',  sortable: true },
      { key: 'category',  labelAr: 'الفئة',     labelEn: 'Category',      type: 'badge', statusColors: { risk: '#B71C1C', process: '#0277BD', technical: '#1B5E3B', management: '#6A1B9A' } },
      { key: 'addedBy',   labelAr: 'المضيف',    labelEn: 'Added By',      type: 'people' },
      { key: 'addedDate', labelAr: 'التاريخ',   labelEn: 'Date',          type: 'date',  sortable: true },
    ],
  },
};

// ─── Fallback config for modules without specific config ──────────────────
const FALLBACK_CONFIG = (key: string, nameAr: string, nameEn: string, workspace: import('../types').WorkspaceType): ModuleConfig => ({
  key,
  nameAr,
  nameEn,
  icon: 'FileText',
  workspace,
  codePrefix: key.slice(0, 2).toUpperCase(),
  tabs: [{ key: 'main', labelAr: 'البيانات الرئيسية', labelEn: 'Main Data' }],
  fields: [
    { key: 'nameAr',   labelAr: 'الاسم',        labelEn: 'Name',        type: 'text',  required: true,  tab: 'main', columnSpan: 2 },
    { key: 'status',   labelAr: 'الحالة',       labelEn: 'Status',      type: 'select',required: true,  tab: 'main', columnSpan: 1, options: STATUS_OPTIONS },
    { key: 'descriptionAr',labelAr: 'الوصف',    labelEn: 'Description', type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
    { key: 'attachments',labelAr: 'المرفقات',   labelEn: 'Attachments', type: 'file',  required: false, tab: 'main', columnSpan: 2, multiple: true },
  ],
  columns: [
    { key: 'code',   labelAr: 'الكود',    labelEn: 'Code',   type: 'text', sortable: true, width: '130px' },
    { key: 'nameAr', labelAr: 'الاسم',    labelEn: 'Name',   type: 'text', sortable: true },
    { key: 'status', labelAr: 'الحالة',   labelEn: 'Status', type: 'badge', statusColors: { active: '#2E7D52', inactive: '#B71C1C', draft: '#78909C' } },
  ],
});

import { MODULES } from './modules';

export function getModuleConfig(key: string): ModuleConfig {
  if (MODULE_CONFIGS[key]) return MODULE_CONFIGS[key];
  const mod = MODULES.find(m => m.key === key);
  if (mod) return FALLBACK_CONFIG(key, mod.nameAr, mod.nameEn, mod.workspace);
  return FALLBACK_CONFIG(key, key, key, null);
}

export { COMPLETION_STATUS_OPTIONS, PROJECT_STATUS_OPTIONS, RISK_LEVEL_OPTIONS, TASK_STATUS_OPTIONS, SEVERITY_OPTIONS, ISSUE_STATUS_OPTIONS, MILESTONE_STATUS_OPTIONS, STATUS_OPTIONS };
export default MODULE_CONFIGS;
