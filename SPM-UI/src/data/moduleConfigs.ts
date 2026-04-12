import type { ModuleConfig, SelectOption } from '../types';

// ─── Common Option Sets ────────────────────────────────────────────────────
const STATUS_OPTIONS: SelectOption[] = [
  { value: 'active',       labelAr: 'نشط',          labelEn: 'Active',       color: '#2E7D52' },
  { value: 'draft',        labelAr: 'مسودة',         labelEn: 'Draft',        color: '#78909C' },
  { value: 'inactive',     labelAr: 'غير نشط',       labelEn: 'Inactive',     color: '#B0BEC5' },
];

export const GENERIC_SELECT_OPTIONS: SelectOption[] = [
  { value: 'opt1', labelAr: 'خيار 1', labelEn: 'Option 1' },
  { value: 'opt2', labelAr: 'خيار 2', labelEn: 'Option 2' },
];

export const STRATEGY_TYPES: SelectOption[] = [
  { value: 'vision', labelAr: 'برامج الرؤية (VRO)', labelEn: 'Vision (VRO)' },
  { value: 'ministry', labelAr: 'استراتيجية الوزارة (EPMO)', labelEn: 'Ministry (EPMO)' },
  { value: 'lms', labelAr: 'استراتيجية سوق العمل (LMS)', labelEn: 'LMS (Sectorial)' },
  { value: 'sdss', labelAr: 'استراتيجية قطاعية (SDSS)', labelEn: 'SDSS (Sectorial)' },
  { value: 'sub', labelAr: 'استراتيجية فرعية', labelEn: 'Sub Strategy' },
];

export const OBJECTIVE_LEVELS: SelectOption[] = [
  { value: 'level1', labelAr: 'مستوى أول', labelEn: 'Level 1' },
  { value: 'level2', labelAr: 'مستوى ثان', labelEn: 'Level 2' },
  { value: 'level3', labelAr: 'مستوى ثالث', labelEn: 'Level 3' },
];

export const OBJECTIVE_RELATIONS: SelectOption[] = [
  { value: 'contribution', labelAr: 'مساهمة', labelEn: 'Contribution' },
  { value: 'ownership', labelAr: 'ملكية', labelEn: 'Ownership' },
];

export const KPI_TYPES: SelectOption[] = [
  { value: 'main', labelAr: 'رئيسي', labelEn: 'Main' },
  { value: 'level2', labelAr: 'فرعي مستوى ثاني', labelEn: 'Level 2' },
  { value: 'level3', labelAr: 'فرعي مستوى ثالث', labelEn: 'Level 3' },
];

export const PERIOD_TYPES: SelectOption[] = [
  { value: 'monthly', labelAr: 'شهري', labelEn: 'Monthly' },
  { value: 'quarterly', labelAr: 'ربع سنوي', labelEn: 'Quarterly' },
  { value: 'semi_annual', labelAr: 'نصف سنوي', labelEn: 'Semi-Annual' },
  { value: 'annual', labelAr: 'سنوي', labelEn: 'Annual' },
];

const PROJECT_STATUS_OPTIONS: SelectOption[] = [
  { value: 'new',          labelAr: 'جديد',           labelEn: 'New',          color: '#1565C0' },
  { value: 'preparation',  labelAr: 'الإعداد',        labelEn: 'Preparation',  color: '#283593' },
  { value: 'planning',     labelAr: 'التخطيط',        labelEn: 'Planning',     color: '#006064' },
  { value: 'execution',    labelAr: 'التنفيذ',        labelEn: 'Execution',    color: '#147a6d' },
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
  { value: 'internal',    labelAr: 'استراتيجي',   labelEn: 'Internal'    },
  { value: 'development', labelAr: 'تشغيلي',   labelEn: 'Development' },
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

export const MODULE_CONFIGS: Record<string, ModuleConfig> = {

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
      { key: 'org',          labelAr: 'القالب التنظيمي',     labelEn: 'Org Structure'     },
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
      { key: 'ownerAr',     labelAr: ' مدير المشروع',              labelEn: 'Project Manager',    type: 'people', required: true,  tab: 'org',        columnSpan: 1 },
      { key: 'departmentAr',labelAr: 'الإدارة العامة',            labelEn: 'General Department', type: 'text',   required: false, tab: 'org',        columnSpan: 1 },
      { key: 'unitAr',      labelAr: 'الوحدة',                    labelEn: 'Unit',               type: 'text',   required: false, tab: 'org',        columnSpan: 1 },
      { key: 'programAr',   labelAr: 'البرنامج',                  labelEn: 'Program',            type: 'select', required: false, tab: 'org',        columnSpan: 1, options: GENERIC_SELECT_OPTIONS },
      { key: 'riskLevel',   labelAr: 'مستوى الخاطر',              labelEn: 'Risk Level',         type: 'select', required: false, tab: 'risks',      columnSpan: 1, options: RISK_LEVEL_OPTIONS },
      { key: 'riskDescription',labelAr: 'وصف المخاطر',           labelEn: 'Risk Description',   type: 'textarea',required: false, tab: 'risks',     columnSpan: 2 },
      { key: 'attachments', labelAr: 'المرفقات',                  labelEn: 'Attachments',        type: 'file',   required: false, tab: 'docs',       columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',        labelAr: 'الكود',             labelEn: 'Code',             type: 'link',     sortable: true,  width: '140px' },
      { key: 'nameAr',      labelAr: 'اسم المشروع',       labelEn: 'Project Name',     type: 'text',     sortable: true },
      { key: 'typeAr',      labelAr: 'نوع المشروع',       labelEn: 'Project Type',     type: 'text' },
      { key: 'departmentAr',labelAr: 'الإدارة العامة',    labelEn: 'Department',       type: 'text' },
      { key: 'unitAr',      labelAr: 'الوحدة',            labelEn: 'Unit',             type: 'badge',    statusColors: { 'لا يوجد': '#f29221', 'N/A': '#f29221' } },
      { key: 'programAr',   labelAr: 'القسم',             labelEn: 'Division',         type: 'badge',    statusColors: { 'لا يوجد': '#f29221', 'N/A': '#f29221' } },
      { key: 'status',      labelAr: 'حالة الإنجاز',      labelEn: 'Completion Status',type: 'badge',    statusColors: { execution: '#2E7D52', preparation: '#283593', planning: '#006064', completed: '#147a6d', cancelled: '#B71C1C' } },
      { key: 'riskLevel',   labelAr: 'مستوى الهدف',       labelEn: 'Objective Level',  type: 'badge',    statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52', 'رئيسي': '#f29221', 'فرعي مستوى ثاني': '#f29221' } },
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
      { key: 'org',          labelAr: 'القالب التنظيمي',     labelEn: 'Org Structure'  },
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
      { key: 'strategyAr',   labelAr: 'الاستراتيجية المرتبطة', labelEn: 'Linked Strategy',  type: 'select', required: false, tab: 'linkage', columnSpan: 1, options: GENERIC_SELECT_OPTIONS },
      { key: 'objectiveAr',  labelAr: 'الهدف المرتبط',         labelEn: 'Linked Objective', type: 'select', required: false, tab: 'linkage', columnSpan: 1, options: GENERIC_SELECT_OPTIONS },
      { key: 'riskLevel',    labelAr: 'مستوى الخاطر',          labelEn: 'Risk Level',       type: 'select', required: false, tab: 'risks',   columnSpan: 1, options: RISK_LEVEL_OPTIONS },
      { key: 'attachments',  labelAr: 'المرفقات',              labelEn: 'Attachments',      type: 'file',   required: false, tab: 'docs',    columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true,  width: '140px' },
      { key: 'nameAr',       labelAr: 'اسم المبادرة',   labelEn: 'Initiative Name',type: 'text',  sortable: true },
      { key: 'categoryAr',   labelAr: 'الفئة',          labelEn: 'Category',      type: 'badge' },
      { key: 'ownerAr',      labelAr: 'المسؤول',        labelEn: 'Owner',         type: 'people' },
      { key: 'strategyAr',   labelAr: 'الاستراتيجية',   labelEn: 'Strategy',      type: 'text' },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { execution: '#2E7D52', preparation: '#283593', planning: '#006064', completed: '#147a6d', cancelled: '#B71C1C' } },
      { key: 'completion',   labelAr: 'الإنجاز',        labelEn: 'Completion',    type: 'progress' },
      { key: 'riskLevel',    labelAr: 'مستوى الخاطر',   labelEn: 'Risk Level',    type: 'badge',  statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52' } },
    ],
  },

  // ── Strategies ────────────────────────────────────────────────────────────
  Strategies: {
    key: 'Strategies',
    nameAr: 'الاستراتيجيات',
    nameEn: 'Strategies',
    tabs: [
      { key: 'main', labelAr: 'البيانات الرئيسية', labelEn: 'Basic Info' },
      { key: 'details', labelAr: 'التفاصيل', labelEn: 'Details' }
    ],
    fields: [
      { key: 'code', labelAr: 'رمز الاستراتيجية', labelEn: 'Strategy Code', type: 'text', required: true, tab: 'main', columnSpan: 1 },
      { key: 'nameAr', labelAr: 'اسم الإستراتيجية', labelEn: 'Strategy Name', type: 'text', required: true, tab: 'main', columnSpan: 1 },
      { key: 'description', labelAr: 'الوصف', labelEn: 'Description', type: 'textarea', required: false, tab: 'main', columnSpan: 2 },
      { key: 'strategyType', labelAr: 'نوع الاستراتيجية', labelEn: 'Strategy Type', type: 'select', options: STRATEGY_TYPES, required: true, tab: 'main', columnSpan: 1 },
      { key: 'vision', labelAr: 'الرؤية', labelEn: 'Vision', type: 'textarea', required: false, tab: 'details', columnSpan: 2 },
      { key: 'values', labelAr: 'القيم', labelEn: 'Values', type: 'textarea', required: false, tab: 'details', columnSpan: 2 },
      { key: 'mission', labelAr: 'الرسالة', labelEn: 'Mission', type: 'textarea', required: false, tab: 'details', columnSpan: 2 },
      { key: 'approvalDate', labelAr: 'تاريخ إعتماد الإستراتيجية', labelEn: 'Approval Date', type: 'date', required: true, tab: 'main', columnSpan: 1 },
      { key: 'sector', labelAr: 'القطاع المرتبط', labelEn: 'Related Sector', type: 'select', options: GENERIC_SELECT_OPTIONS, required: true, tab: 'main', columnSpan: 1 },
      { key: 'attachments', labelAr: 'الوثائق الداعمة', labelEn: 'Support Documents', type: 'file', required: false, tab: 'main', columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code', labelAr: 'الرمز', labelEn: 'Code', type: 'text', sortable: true, width: '120px' },
      { key: 'nameAr', labelAr: 'اسم الإستراتيجية', labelEn: 'Name', type: 'text', sortable: true },
      { key: 'strategyType', labelAr: 'النوع', labelEn: 'Type', type: 'text' },
      { key: 'sector', labelAr: 'القطاع', labelEn: 'Sector', type: 'text' },
      { key: 'approvalDate', labelAr: 'تاريخ الاعتماد', labelEn: 'Approval Date', type: 'date' },
    ],
  },

  // ── Objectives ────────────────────────────────────────────────────────────
  Objectives: {
    key: 'Objectives',
    nameAr: 'الأهداف الاستراتيجية',
    nameEn: 'Strategic Objectives',
    tabs: [
      { key: 'main', labelAr: 'البيانات الرئيسية', labelEn: 'Basic Info' },
      { key: 'owners', labelAr: 'المالك والمعنيين', labelEn: 'Owners & Stakeholders' }
    ],
    fields: [
      { key: 'code', labelAr: 'رمز الهدف (النظام)', labelEn: 'System Code', type: 'text', required: true, tab: 'main', columnSpan: 1 },
      { key: 'objectiveCode', labelAr: 'رمز الهدف اليدوي', labelEn: 'Manual Code', type: 'text', required: true, tab: 'main', columnSpan: 1 },
      { key: 'nameAr', labelAr: 'اسم الهدف', labelEn: 'Objective Name', type: 'text', required: true, tab: 'main', columnSpan: 2 },
      { key: 'level', labelAr: 'المستوى', labelEn: 'Level', type: 'select', options: OBJECTIVE_LEVELS, required: true, tab: 'main', columnSpan: 1 },
      { key: 'strategyType', labelAr: 'نوع الاستراتيجية', labelEn: 'Strategy Type', type: 'select', options: OBJECTIVE_TYPE_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'relatedStrategy', labelAr: 'الاستراتيجية المرتبطة', labelEn: 'Related Strategy', type: 'select', options: GENERIC_SELECT_OPTIONS, required: true, tab: 'main', columnSpan: 1 },
      { key: 'sector', labelAr: 'القطاع', labelEn: 'Sector', type: 'select', options: GENERIC_SELECT_OPTIONS, required: true, tab: 'main', columnSpan: 1 },
      { key: 'objectiveRelation', labelAr: 'علاقة الهدف بالوزارة', labelEn: 'Objective Relation', type: 'select', options: OBJECTIVE_RELATIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'externalEntities', labelAr: 'الجهات الشقيقة', labelEn: 'External Entities', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'parentObjective', labelAr: 'الهدف الرئيسي المرتبط', labelEn: 'Related Main Objective', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'relatedPortfolio', labelAr: 'المحفظة المرتبطة', labelEn: 'Related Portfolio', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'subsector', labelAr: 'الوكالة', labelEn: 'Subsector', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'department', labelAr: 'الإدارة', labelEn: 'Department', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'description', labelAr: 'وصف الهدف', labelEn: 'Description', type: 'textarea', required: false, tab: 'main', columnSpan: 2 },
      { key: 'objectiveOwner', labelAr: 'مالك الهدف', labelEn: 'Objective Owner', type: 'people', required: false, tab: 'owners', columnSpan: 1 },
      { key: 'externalOwner', labelAr: 'مالك الهدف الخارجي', labelEn: 'External Owner', type: 'text', required: false, tab: 'owners', columnSpan: 1 },
    ],
    columns: [
      { key: 'objectiveCode', labelAr: 'الرمز', labelEn: 'Code', type: 'text', sortable: true, width: '100px' },
      { key: 'nameAr', labelAr: 'اسم الهدف', labelEn: 'Objective Name', type: 'text', sortable: true },
      { key: 'level', labelAr: 'المستوى', labelEn: 'Level', type: 'badge' },
      { key: 'relatedStrategy', labelAr: 'الاستراتيجية', labelEn: 'Strategy', type: 'text' },
      { key: 'sector', labelAr: 'القطاع', labelEn: 'Sector', type: 'text' },
    ],
  },

  // ── KPIs ──────────────────────────────────────────────────────────────────
  KPIs: {
    key: 'KPIs',
    nameAr: 'إدارة المؤشرات',
    nameEn: 'KPIs Management',
    icon: 'BarChart2',
    workspace: 'global',
    codePrefix: 'KP',
    tabs: [
      { key: 'main', labelAr: 'البيانات الرئيسية', labelEn: 'Basic Info' },
      { key: 'details', labelAr: 'التفاصيل', labelEn: 'Details' },
      { key: 'owners', labelAr: 'المالك والمعنيين', labelEn: 'Owners' },
      { key: 'formula', labelAr: 'معادلة المؤشر', labelEn: 'Formula' }
    ],
    fields: [
      // Main Tab
      { key: 'code', labelAr: 'رمز المؤشر', labelEn: 'KPI Code', type: 'text', required: true, tab: 'main', columnSpan: 1 },
      { key: 'nameAr', labelAr: 'اسم المؤشر', labelEn: 'KPI Name', type: 'text', required: true, tab: 'main', columnSpan: 1 },
      { key: 'kpiType', labelAr: 'نوع المؤشر', labelEn: 'KPI Type', type: 'select', options: KPI_TYPES, required: true, tab: 'main', columnSpan: 1 },
      { key: 'relatedObjective', labelAr: 'الهدف المرتبط', labelEn: 'Related Objective', type: 'select', options: GENERIC_SELECT_OPTIONS, required: true, tab: 'main', columnSpan: 1 },
      { key: 'classification', labelAr: 'تصنيف المؤشر', labelEn: 'Classification', type: 'select', options: KPI_CLASSIFICATION_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'fromYear', labelAr: 'من سنة', labelEn: 'From Year', type: 'number', required: true, tab: 'main', columnSpan: 1 },
      { key: 'toYear', labelAr: 'الى سنة', labelEn: 'To Year', type: 'number', required: true, tab: 'main', columnSpan: 1 },
      { key: 'categoryKpi', labelAr: 'فئة المؤشر', labelEn: 'Category', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'periodType', labelAr: 'تكرار القياس', labelEn: 'Period Type', type: 'select', options: PERIOD_TYPES, required: true, tab: 'main', columnSpan: 1 },
      { key: 'description', labelAr: 'وصف المؤشر', labelEn: 'Description', type: 'textarea', required: false, tab: 'main', columnSpan: 2 },
      { key: 'attachments', labelAr: 'المرفقات', labelEn: 'Attachments', type: 'file', required: false, tab: 'main', columnSpan: 2, multiple: true },

      // Details Tab
      { key: 'issues', labelAr: 'التحديات', labelEn: 'Issues', type: 'textarea', required: false, tab: 'details', columnSpan: 2 },
      { key: 'risks', labelAr: 'المخاطر', labelEn: 'Risks', type: 'textarea', required: false, tab: 'details', columnSpan: 2 },
      { key: 'externalFactors', labelAr: 'عوامل خارجية', labelEn: 'External Factors', type: 'textarea', required: false, tab: 'details', columnSpan: 2 },
      { key: 'assumptions', labelAr: 'الافتراضات', labelEn: 'Assumptions', type: 'textarea', required: false, tab: 'details', columnSpan: 2 },
      { key: 'relatedMainKPIs', labelAr: 'المؤشرات الرئيسية المرتبطة', labelEn: 'Related Main KPIs', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'details', columnSpan: 1 },

      // Owners Tab
      { key: 'externalKpiOwner', labelAr: 'مالك المؤشر الخارجي', labelEn: 'External KPI Owner', type: 'text', required: false, tab: 'owners', columnSpan: 1 },
      { key: 'owner', labelAr: 'مالك المؤشر', labelEn: 'Owner', type: 'people', required: false, tab: 'owners', columnSpan: 1 },
      { key: 'performanceLeader', labelAr: 'قائد الأداء', labelEn: 'Performance Leader', type: 'people', required: false, tab: 'owners', columnSpan: 1 },
      { key: 'performanceLeader2', labelAr: 'قائد الأداء 2', labelEn: 'Performance Leader 2', type: 'people', required: false, tab: 'owners', columnSpan: 1 },
      { key: 'dataSource', labelAr: 'مصدر البيانات', labelEn: 'Data Source', type: 'text', required: false, tab: 'owners', columnSpan: 1 },
      { key: 'dataSourceResponsible', labelAr: 'المسؤول عن مصدر البيانات', labelEn: 'Data Source Responsible', type: 'people', required: false, tab: 'owners', columnSpan: 1 },
      { key: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', type: 'text', required: false, tab: 'owners', columnSpan: 1 },

      // Formula Tab
      { key: 'polarity', labelAr: 'القطبية (اتجاه المؤشر)', labelEn: 'Polarity', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'formula', columnSpan: 1 },
      { key: 'resultType', labelAr: 'نوع النتيجة', labelEn: 'Result Type', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'formula', columnSpan: 1 },
      { key: 'cumulative', labelAr: 'تراكمي', labelEn: 'Cumulative', type: 'select', options: YES_NO_OPTIONS, required: false, tab: 'formula', columnSpan: 1 },
      { key: 'weight', labelAr: 'الوزن', labelEn: 'Weight', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'baseline', labelAr: 'خط الأساس', labelEn: 'Baseline', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'measurePeriod', labelAr: 'فترة القياس', labelEn: 'Measure Period', type: 'text', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'measurableNow', labelAr: 'قابل للقياس حالياً', labelEn: 'Measurable Now', type: 'select', options: YES_NO_OPTIONS, required: false, tab: 'formula', columnSpan: 1 },
      { key: 'strategyClass', labelAr: 'نوع الاستراتيجية', labelEn: 'Strategy Type', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'formula', columnSpan: 1 },
      { key: 'relatedStrategyFormula', labelAr: 'الاستراتيجية المرتبطة', labelEn: 'Related Strategy', type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'formula', columnSpan: 1 },
      { key: 'commitmentKpi', labelAr: 'مؤشر التزام', labelEn: 'Commitment KPI', type: 'select', options: YES_NO_OPTIONS, required: false, tab: 'formula', columnSpan: 1 },
      { key: 'calculationMethod', labelAr: 'طريقة الاحتساب', labelEn: 'Calculation Method', type: 'textarea', required: false, tab: 'formula', columnSpan: 2 },
      { key: 'lagging', labelAr: 'تاريخ استحقاق إدخال البيانات', labelEn: 'Lagging Date', type: 'date', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'attlabel', labelAr: 'مسمى البيانات', labelEn: 'Att Label', type: 'text', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'formula', labelAr: 'معادلة المؤشر', labelEn: 'Formula', type: 'textarea', required: false, tab: 'formula', columnSpan: 2 },
      { key: 'item1', labelAr: 'المكون الأول', labelEn: 'Item 1', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'item2', labelAr: 'المكون الثاني', labelEn: 'Item 2', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'item3', labelAr: 'المكون الثالث', labelEn: 'Item 3', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'item4', labelAr: 'المكون الرابع', labelEn: 'Item 4', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'item5', labelAr: 'المكون الخامس', labelEn: 'Item 5', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'item6', labelAr: 'المكون السادس', labelEn: 'Item 6', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
      { key: 'item7', labelAr: 'المكون السابع', labelEn: 'Item 7', type: 'number', required: false, tab: 'formula', columnSpan: 1 },
    ],
    columns: [
      { key: 'code', labelAr: 'الرمز', labelEn: 'Code', type: 'text', sortable: true, width: '100px' },
      { key: 'nameAr', labelAr: 'اسم المؤشر', labelEn: 'KPI Name', type: 'text', sortable: true },
      { key: 'kpiType', labelAr: 'النوع', labelEn: 'Type', type: 'badge' },
      { key: 'periodType', labelAr: 'تكرار القياس', labelEn: 'Period', type: 'text' },
      { key: 'fromYear', labelAr: 'من سنة', labelEn: 'From Year', type: 'number' },
      { key: 'toYear', labelAr: 'الى سنة', labelEn: 'To Year', type: 'number' },
    ],
  },

  // ── Tasks ─────────────────────────────────────────────────────────────────
  Tasks: {
    key: 'Tasks',
    nameAr: 'المهام',
    nameEn: 'Tasks',
    icon: 'CheckSquare',
    workspace: null,
    codePrefix: 'TSK',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم المهمة',     labelEn: 'Task Name',      type: 'text',   required: true,  tab: 'main', columnSpan: 2, maxLength: 255 },
      { key: 'code',         labelAr: 'رمز المهمة',     labelEn: 'Task Code',      type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'descriptionAr',labelAr: 'الوصف',          labelEn: 'Description',    type: 'textarea',required: false, tab: 'main', columnSpan: 2, maxLength: 2000 },
      { key: 'assigneeAr',   labelAr: 'المسؤول',        labelEn: 'Assignee',       type: 'people', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'dueDate',      labelAr: 'تاريخ الاستحقاق',labelEn: 'Due Date',       type: 'date',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'priority',     labelAr: 'الأولوية',       labelEn: 'Priority',       type: 'select', required: true,  tab: 'main', columnSpan: 1, options: PRIORITY_OPTIONS },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',         type: 'select', required: true,  tab: 'main', columnSpan: 1, options: TASK_STATUS_OPTIONS },
      { key: 'relatedToType',labelAr: 'مرتبط بـ (النوع)',labelEn: 'Related To Type',type: 'select', required: false, tab: 'main', columnSpan: 1, options: [ {value:'project', labelAr:'مشروع', labelEn:'Project'}, {value:'initiative', labelAr:'مبادرة', labelEn:'Initiative'} ] },
      { key: 'relatedToId',  labelAr: 'مرتبط بـ (العنصر)',labelEn: 'Related To Item',type: 'select', options: GENERIC_SELECT_OPTIONS, required: false, tab: 'main', columnSpan: 1 },
      { key: 'completion',   labelAr: 'نسبة الإنجاز %', labelEn: 'Completion %',   type: 'number', required: false, tab: 'main', columnSpan: 1, min: 0, max: 100 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'اسم المهمة',     labelEn: 'Task Name',     type: 'text',   sortable: true },
      { key: 'assigneeAr',   labelAr: 'المسؤول',        labelEn: 'Assignee',      type: 'people' },
      { key: 'dueDate',      labelAr: 'تاريخ الاستحقاق',labelEn: 'Due Date',      type: 'date',   sortable: true },
      { key: 'priority',     labelAr: 'الأولوية',       labelEn: 'Priority',      type: 'badge',  statusColors: { high: '#B71C1C', urgent: '#880E4F', medium: '#F57F17', low: '#78909C' } },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { completed: '#2E7D32', in_progress: '#1565C0', pending: '#F57F17', cancelled: '#B71C1C' } },
      { key: 'completion',   labelAr: 'الإنجاز',        labelEn: 'Completion',    type: 'progress' },
    ],
  },

  // ── ProjectRisks ──────────────────────────────────────────────────────────
  ProjectRisks: {
    key: 'ProjectRisks',
    nameAr: 'مخاطر المشاريع',
    nameEn: 'Project Risks',
    icon: 'AlertTriangle',
    workspace: null,
    codePrefix: 'RSK',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' },
      { key: 'mitigation', labelAr: 'خطة التخفيف', labelEn: 'Mitigation Plan' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم المخاطرة',      labelEn: 'Risk Name',          type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',             labelEn: 'Code',               type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'projectId',    labelAr: 'المشروع المرتبط',   labelEn: 'Related Project',    type: 'select', options: GENERIC_SELECT_OPTIONS, required: true,  tab: 'main', columnSpan: 1 },
      { key: 'categoryAr',   labelAr: 'فئة المخاطرة',      labelEn: 'Risk Category',      type: 'select', required: true,  tab: 'main', columnSpan: 1, options: CATEGORY_OPTIONS },
      { key: 'probability',  labelAr: 'الاحتمالية',        labelEn: 'Probability',        type: 'select', required: true,  tab: 'main', columnSpan: 1, options: PROBABILITY_OPTIONS },
      { key: 'impact',       labelAr: 'التأثير',           labelEn: 'Impact',             type: 'select', required: true,  tab: 'main', columnSpan: 1, options: SEVERITY_OPTIONS },
      { key: 'riskLevel',    labelAr: 'مستوى المخاطرة',    labelEn: 'Risk Level',         type: 'select', required: true,  tab: 'main', columnSpan: 1, options: RISK_LEVEL_OPTIONS },
      { key: 'status',       labelAr: 'الحالة',            labelEn: 'Status',             type: 'select', required: true,  tab: 'main', columnSpan: 1, options: ISSUE_STATUS_OPTIONS },
      { key: 'ownerAr',      labelAr: 'مالك المخاطرة',     labelEn: 'Risk Owner',         type: 'people', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'descriptionAr',labelAr: 'وصف المخاطرة',      labelEn: 'Risk Description',   type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
      { key: 'mitigationPlanAr',labelAr: 'خطة التخفيف',    labelEn: 'Mitigation Plan',    type: 'textarea',required: true,  tab: 'mitigation', columnSpan: 2 },
      { key: 'contingencyPlanAr',labelAr:'خطة الطوارئ',    labelEn: 'Contingency Plan',   type: 'textarea',required: false, tab: 'mitigation', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'اسم المخاطرة',   labelEn: 'Risk Name',     type: 'text',   sortable: true },
      { key: 'projectId',    labelAr: 'المشروع',        labelEn: 'Project',       type: 'text' },
      { key: 'probability',  labelAr: 'الاحتمالية',     labelEn: 'Probability',   type: 'badge',  statusColors: { high: '#EF5350', very_high: '#B71C1C', medium: '#F57F17', low: '#66BB6A', very_low: '#2E7D52' } },
      { key: 'impact',       labelAr: 'التأثير',        labelEn: 'Impact',        type: 'badge',  statusColors: { critical: '#B71C1C', high: '#EF5350', medium: '#F57F17', low: '#2E7D52' } },
      { key: 'riskLevel',    labelAr: 'مستوى المخاطرة', labelEn: 'Risk Level',    type: 'badge',  statusColors: { high: '#B71C1C', medium: '#F57F17', low: '#2E7D52' } },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { open: '#B71C1C', in_progress: '#1565C0', resolved: '#2E7D32', closed: '#78909C' } },
    ],
  },

  // ── ProjectIssues ─────────────────────────────────────────────────────────
  ProjectIssues: {
    key: 'ProjectIssues',
    nameAr: 'قضايا المشاريع',
    nameEn: 'Project Issues',
    icon: 'XCircle',
    workspace: null,
    codePrefix: 'ISS',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' },
      { key: 'resolution', labelAr: 'الحل والتسوية', labelEn: 'Resolution' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم القضية',      labelEn: 'Issue Name',          type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',           labelEn: 'Code',                type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'projectId',    labelAr: 'المشروع المرتبط', labelEn: 'Related Project',     type: 'select', options: GENERIC_SELECT_OPTIONS, required: true,  tab: 'main', columnSpan: 1 },
      { key: 'severity',     labelAr: 'الخطورة',         labelEn: 'Severity',            type: 'select', required: true,  tab: 'main', columnSpan: 1, options: SEVERITY_OPTIONS },
      { key: 'status',       labelAr: 'الحالة',          labelEn: 'Status',              type: 'select', required: true,  tab: 'main', columnSpan: 1, options: ISSUE_STATUS_OPTIONS },
      { key: 'assigneeAr',   labelAr: 'المسؤول',         labelEn: 'Assignee',            type: 'people', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'dueDate',      labelAr: 'تاريخ الاستحقاق', labelEn: 'Due Date',            type: 'date',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'descriptionAr',labelAr: 'وصف القضية',      labelEn: 'Issue Description',   type: 'textarea',required: true,  tab: 'main', columnSpan: 2 },
      { key: 'resolutionAr', labelAr: 'خطوات الحل',      labelEn: 'Resolution Steps',    type: 'textarea',required: false, tab: 'resolution', columnSpan: 2 },
      { key: 'actualResolutionDate',labelAr:'تاريخ الحل الفعلي',labelEn:'Actual Resolution Date',type:'date',required:false,tab:'resolution',columnSpan:1 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'اسم القضية',     labelEn: 'Issue Name',    type: 'text',   sortable: true },
      { key: 'projectId',    labelAr: 'المشروع',        labelEn: 'Project',       type: 'text' },
      { key: 'severity',     labelAr: 'الخطورة',        labelEn: 'Severity',      type: 'badge',  statusColors: { critical: '#B71C1C', high: '#EF5350', medium: '#F57F17', low: '#2E7D52' } },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { open: '#B71C1C', in_progress: '#1565C0', resolved: '#2E7D32', closed: '#78909C' } },
      { key: 'assigneeAr',   labelAr: 'المسؤول',        labelEn: 'Assignee',      type: 'people' },
    ],
  },

  // ── ProjectMilestones ─────────────────────────────────────────────────────
  ProjectMilestones: {
    key: 'ProjectMilestones',
    nameAr: 'معالم المشاريع',
    nameEn: 'Project Milestones',
    icon: 'Flag',
    workspace: null,
    codePrefix: 'MIL',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم المعلم',      labelEn: 'Milestone Name',      type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',           labelEn: 'Code',                type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'projectId',    labelAr: 'المشروع المرتبط', labelEn: 'Related Project',     type: 'select', options: GENERIC_SELECT_OPTIONS, required: true,  tab: 'main', columnSpan: 1 },
      { key: 'dueDate',      labelAr: 'تاريخ الاستحقاق', labelEn: 'Due Date',            type: 'date',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'status',       labelAr: 'الحالة',          labelEn: 'Status',              type: 'select', required: true,  tab: 'main', columnSpan: 1, options: MILESTONE_STATUS_OPTIONS },
      { key: 'amount',       labelAr: 'المبلغ المرتبط',  labelEn: 'Associated Amount',   type: 'currency',required: false, tab: 'main', columnSpan: 1 },
      { key: 'weight',       labelAr: 'الوزن النسبي %',  labelEn: 'Relative Weight %',   type: 'number', required: false, tab: 'main', columnSpan: 1, min: 0, max: 100 },
      { key: 'descriptionAr',labelAr: 'الوصف',           labelEn: 'Description',         type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'اسم المعلم',     labelEn: 'Milestone Name',type: 'text',   sortable: true },
      { key: 'projectId',    labelAr: 'المشروع',        labelEn: 'Project',       type: 'text' },
      { key: 'dueDate',      labelAr: 'تاريخ الاستحقاق',labelEn: 'Due Date',      type: 'date',   sortable: true },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { completed: '#2E7D32', in_progress: '#1565C0', delayed: '#B71C1C', not_started: '#78909C' } },
      { key: 'weight',       labelAr: 'الوزن %',        labelEn: 'Weight %',      type: 'text' },
    ],
  },

  // ── ProjectMOMs ───────────────────────────────────────────────────────────
  ProjectMOMs: {
    key: 'ProjectMOMs',
    nameAr: 'محاضر الاجتماعات',
    nameEn: 'Meeting Minutes (MOM)',
    icon: 'FileText',
    workspace: null,
    codePrefix: 'MOM',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' },
      { key: 'attendees', labelAr: 'الحضور', labelEn: 'Attendees' },
      { key: 'decisions', labelAr: 'القرارات والمهام', labelEn: 'Decisions & Tasks' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'عنوان الاجتماع', labelEn: 'Meeting Title',        type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',                 type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'projectId',    labelAr: 'المشروع المرتبط',labelEn: 'Related Project',      type: 'select', options: GENERIC_SELECT_OPTIONS, required: true,  tab: 'main', columnSpan: 1 },
      { key: 'meetingDate',  labelAr: 'تاريخ الاجتماع', labelEn: 'Meeting Date',         type: 'date',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'location',     labelAr: 'المكان/الرابط',  labelEn: 'Location/Link',        type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'agendaAr',     labelAr: 'أجندة الاجتماع', labelEn: 'Meeting Agenda',       type: 'textarea',required: true,  tab: 'main', columnSpan: 2 },
      { key: 'attendeesList',labelAr: 'قائمة الحضور',   labelEn: 'Attendees List',       type: 'textarea',required: false, tab: 'attendees', columnSpan: 2 },
      { key: 'absenteesList',labelAr: 'المعتذرون والغياب',labelEn: 'Absentees',          type: 'textarea',required: false, tab: 'attendees', columnSpan: 2 },
      { key: 'decisionsAr',  labelAr: 'القرارات المتخذة',labelEn: 'Decisions Taken',     type: 'textarea',required: true,  tab: 'decisions', columnSpan: 2 },
      { key: 'actionItemsAr',labelAr: 'المهام (Action Items)',labelEn:'Action Items',    type: 'textarea',required: false, tab: 'decisions', columnSpan: 2 },
      { key: 'attachments',  labelAr: 'المرفقات',       labelEn: 'Attachments',          type: 'file',   required: false, tab: 'main', columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'عنوان الاجتماع', labelEn: 'Meeting Title', type: 'text',   sortable: true },
      { key: 'projectId',    labelAr: 'المشروع',        labelEn: 'Project',       type: 'text' },
      { key: 'meetingDate',  labelAr: 'تاريخ الاجتماع', labelEn: 'Meeting Date',  type: 'date',   sortable: true },
      { key: 'location',     labelAr: 'المكان',         labelEn: 'Location',      type: 'text' },
    ],
  },

  // ── ChangeRequests ────────────────────────────────────────────────────────
  ChangeRequests: {
    key: 'ChangeRequests',
    nameAr: 'طلبات التغيير',
    nameEn: 'Change Requests',
    icon: 'GitPullRequest',
    workspace: null,
    codePrefix: 'CR',
    tabs: [
      { key: 'main', labelAr: 'تفاصيل الطلب', labelEn: 'Request Details' },
      { key: 'impact', labelAr: 'تحليل الأثر', labelEn: 'Impact Analysis' },
      { key: 'approval', labelAr: 'الاعتماد', labelEn: 'Approval' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'عنوان طلب التغيير', labelEn: 'CR Title',            type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',             labelEn: 'Code',                type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'projectId',    labelAr: 'المشروع المرتبط',   labelEn: 'Related Project',     type: 'select', options: GENERIC_SELECT_OPTIONS, required: true,  tab: 'main', columnSpan: 1 },
      { key: 'requestDate',  labelAr: 'تاريخ الطلب',       labelEn: 'Request Date',        type: 'date',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'status',       labelAr: 'الحالة',            labelEn: 'Status',              type: 'select', required: true,  tab: 'main', columnSpan: 1, options: [
        {value:'submitted', labelAr:'مقدم', labelEn:'Submitted', color:'#1565C0'}, {value:'under_review', labelAr:'قيد المراجعة', labelEn:'Under Review', color:'#F57F17'}, {value:'approved', labelAr:'معتمد', labelEn:'Approved', color:'#2E7D32'}, {value:'rejected', labelAr:'مرفوض', labelEn:'Rejected', color:'#B71C1C'}
      ] },
      { key: 'reasonAr',     labelAr: 'مبررات التغيير',    labelEn: 'Reason for Change',   type: 'textarea',required: true,  tab: 'main', columnSpan: 2 },
      { key: 'scopeImpact',  labelAr: 'الأثر على النطاق',  labelEn: 'Impact on Scope',     type: 'textarea',required: false, tab: 'impact', columnSpan: 2 },
      { key: 'timeImpact',   labelAr: 'الأثر على الجدول الزمني',labelEn: 'Time Impact',    type: 'textarea',required: false, tab: 'impact', columnSpan: 1 },
      { key: 'costImpact',   labelAr: 'الأثر على التكلفة', labelEn: 'Cost Impact',         type: 'currency',required: false, tab: 'impact', columnSpan: 1 },
      { key: 'approvedByAr', labelAr: 'معتمد بواسطة',      labelEn: 'Approved By',         type: 'people', required: false, tab: 'approval', columnSpan: 1 },
      { key: 'approvalDate', labelAr: 'تاريخ الاعتماد',    labelEn: 'Approval Date',       type: 'date',   required: false, tab: 'approval', columnSpan: 1 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'عنوان الطلب',    labelEn: 'CR Title',      type: 'text',   sortable: true },
      { key: 'projectId',    labelAr: 'المشروع',        labelEn: 'Project',       type: 'text' },
      { key: 'requestDate',  labelAr: 'تاريخ الطلب',    labelEn: 'Request Date',  type: 'date' },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { approved: '#2E7D32', submitted: '#1565C0', under_review: '#F57F17', rejected: '#B71C1C' } },
    ],
  },

  // ── Portfolios ────────────────────────────────────────────────────────────
  Portfolios: {
    key: 'Portfolios',
    nameAr: 'المحافظ',
    nameEn: 'Portfolios',
    icon: 'Briefcase',
    workspace: null,
    codePrefix: 'PTF',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم المحفظة',    labelEn: 'Portfolio Name', type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',           type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'ownerAr',      labelAr: 'مالك المحفظة',   labelEn: 'Portfolio Owner',type: 'people', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',         type: 'select', required: true,  tab: 'main', columnSpan: 1, options: STATUS_OPTIONS },
      { key: 'descriptionAr',labelAr: 'الوصف',          labelEn: 'Description',    type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'اسم المحفظة',    labelEn: 'Portfolio Name',type: 'text',   sortable: true },
      { key: 'ownerAr',      labelAr: 'المالك',         labelEn: 'Owner',         type: 'people' },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { active: '#2E7D52', inactive: '#B71C1C', draft: '#78909C' } },
    ],
  },

  // ── Programs ──────────────────────────────────────────────────────────────
  Programs: {
    key: 'Programs',
    nameAr: 'البرامج',
    nameEn: 'Programs',
    icon: 'Layers',
    workspace: null,
    codePrefix: 'PRG',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم البرنامج',   labelEn: 'Program Name',   type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',           type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'portfolioId',  labelAr: 'المحفظة التابع لها',labelEn:'Parent Portfolio',type:'select', options: GENERIC_SELECT_OPTIONS, required: true,  tab: 'main', columnSpan: 1 },
      { key: 'ownerAr',      labelAr: 'مدير البرنامج',  labelEn: 'Program Manager',type: 'people', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',         type: 'select', required: true,  tab: 'main', columnSpan: 1, options: STATUS_OPTIONS },
      { key: 'descriptionAr',labelAr: 'الوصف',          labelEn: 'Description',    type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'اسم البرنامج',   labelEn: 'Program Name',  type: 'text',   sortable: true },
      { key: 'portfolioId',  labelAr: 'المحفظة',        labelEn: 'Portfolio',     type: 'text' },
      { key: 'ownerAr',      labelAr: 'المدير',         labelEn: 'Manager',       type: 'people' },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { active: '#2E7D52', inactive: '#B71C1C', draft: '#78909C' } },
    ],
  },

  // ── KPIResults ────────────────────────────────────────────────────────────
  KPIResults: {
    key: 'KPIResults',
    nameAr: 'نتائج المؤشرات',
    nameEn: 'KPI Results',
    icon: 'TrendingUp',
    workspace: null,
    codePrefix: 'KPR',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' }
    ],
    fields: [
      { key: 'kpiId',        labelAr: 'المؤشر المرتبط', labelEn: 'Related KPI',    type: 'select', options: GENERIC_SELECT_OPTIONS, required: true,  tab: 'main', columnSpan: 2 },
      { key: 'year',         labelAr: 'السنة',          labelEn: 'Year',           type: 'select', required: true,  tab: 'main', columnSpan: 1, options: YEAR_OPTIONS },
      { key: 'period',       labelAr: 'الفترة',         labelEn: 'Period',         type: 'select', required: true,  tab: 'main', columnSpan: 1, options: [
        {value:'q1',labelAr:'الربع الأول',labelEn:'Q1'}, {value:'q2',labelAr:'الربع الثاني',labelEn:'Q2'}, {value:'q3',labelAr:'الربع الثالث',labelEn:'Q3'}, {value:'q4',labelAr:'الربع الرابع',labelEn:'Q4'},
        {value:'h1',labelAr:'النصف الأول',labelEn:'H1'}, {value:'h2',labelAr:'النصف الثاني',labelEn:'H2'}, {value:'annual',labelAr:'سنوي',labelEn:'Annual'}
      ] },
      { key: 'targetValue',  labelAr: 'القيمة المستهدفة',labelEn: 'Target Value',  type: 'number', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'actualValue',  labelAr: 'القيمة الفعلية',  labelEn: 'Actual Value',  type: 'number', required: true,  tab: 'main', columnSpan: 1 },
      { key: 'commentsAr',   labelAr: 'ملاحظات/تبريرات',labelEn: 'Comments',       type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
      { key: 'attachments',  labelAr: 'مرفقات الإثبات', labelEn: 'Proof Docs',     type: 'file',   required: false, tab: 'main', columnSpan: 2, multiple: true },
    ],
    columns: [
      { key: 'kpiId',        labelAr: 'المؤشر',         labelEn: 'KPI',           type: 'text',   sortable: true },
      { key: 'year',         labelAr: 'السنة',          labelEn: 'Year',          type: 'text' },
      { key: 'period',       labelAr: 'الفترة',         labelEn: 'Period',        type: 'text' },
      { key: 'targetValue',  labelAr: 'المستهدف',       labelEn: 'Target',        type: 'text' },
      { key: 'actualValue',  labelAr: 'الفعلي',         labelEn: 'Actual',        type: 'text' },
      { key: 'achievement',  labelAr: 'نسبة التحقيق',   labelEn: 'Achievement %', type: 'progress' },
    ],
  },

  // ── Benefits ──────────────────────────────────────────────────────────────
  Benefits: {
    key: 'Benefits',
    nameAr: 'المنافع',
    nameEn: 'Benefits',
    icon: 'Gift',
    workspace: null,
    codePrefix: 'BNF',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'اسم المنفعة',    labelEn: 'Benefit Name',   type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',           type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'relatedToType',labelAr: 'مرتبط بـ (النوع)',labelEn:'Related To Type',type: 'select', required: true,  tab: 'main', columnSpan: 1, options: [ {value:'project', labelAr:'مشروع', labelEn:'Project'}, {value:'initiative', labelAr:'مبادرة', labelEn:'Initiative'} ] },
      { key: 'relatedToId',  labelAr: 'مرتبط بـ (العنصر)',labelEn:'Related To Item',type:'select', options: GENERIC_SELECT_OPTIONS, required: true,  tab: 'main', columnSpan: 1 },
      { key: 'value',        labelAr: 'قيمة المنفعة (المالية أو الكمية)',labelEn:'Benefit Value',type:'number',required:false,tab:'main', columnSpan: 1 },
      { key: 'realizationDate',labelAr:'تاريخ التحقيق المتوقع',labelEn:'Expected Realization Date',type:'date',required:false,tab:'main',columnSpan:1 },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',         type: 'select', required: true,  tab: 'main', columnSpan: 1, options: [
        {value:'planned', labelAr:'مخطط لها', labelEn:'Planned', color:'#1565C0'}, {value:'realized', labelAr:'متحققة', labelEn:'Realized', color:'#2E7D32'}, {value:'delayed', labelAr:'متأخرة', labelEn:'Delayed', color:'#F57F17'}, {value:'lost', labelAr:'مفقودة', labelEn:'Lost', color:'#B71C1C'}
      ] },
      { key: 'descriptionAr',labelAr: 'الوصف',          labelEn: 'Description',    type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'nameAr',       labelAr: 'اسم المنفعة',    labelEn: 'Benefit Name',  type: 'text',   sortable: true },
      { key: 'relatedToId',  labelAr: 'المرتبط بـ',     labelEn: 'Related To',    type: 'text' },
      { key: 'status',       labelAr: 'الحالة',         labelEn: 'Status',        type: 'badge',  statusColors: { realized: '#2E7D32', planned: '#1565C0', delayed: '#F57F17', lost: '#B71C1C' } },
      { key: 'realizationDate',labelAr:'تاريخ التحقيق', labelEn:'Realization Date',type:'date' },
    ],
  },

  // ── Stakeholders ──────────────────────────────────────────────────────────
  Stakeholders: {
    key: 'Stakeholders',
    nameAr: 'أصحاب المصلحة',
    nameEn: 'Stakeholders',
    icon: 'Users',
    workspace: null,
    codePrefix: 'STK',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' },
      { key: 'engagement', labelAr: 'خطة الإشراك', labelEn: 'Engagement Plan' }
    ],
    fields: [
      { key: 'nameAr',       labelAr: 'الاسم',          labelEn: 'Name',           type: 'text',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'organization', labelAr: 'الجهة/المنظمة',  labelEn: 'Organization',   type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'roleAr',       labelAr: 'الدور',          labelEn: 'Role',           type: 'text',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'projectId',    labelAr: 'المشروع/المبادرة',labelEn:'Project/Initiative',type:'select', options: GENERIC_SELECT_OPTIONS, required:true,  tab: 'main', columnSpan: 1 },
      { key: 'influence',    labelAr: 'مستوى التأثير',  labelEn: 'Influence Level',type: 'select', required: true,  tab: 'main', columnSpan: 1, options: [ {value:'high',labelAr:'عالي',labelEn:'High'}, {value:'medium',labelAr:'متوسط',labelEn:'Medium'}, {value:'low',labelAr:'منخفض',labelEn:'Low'} ] },
      { key: 'interest',     labelAr: 'مستوى الاهتمام', labelEn: 'Interest Level', type: 'select', required: true,  tab: 'main', columnSpan: 1, options: [ {value:'high',labelAr:'عالي',labelEn:'High'}, {value:'medium',labelAr:'متوسط',labelEn:'Medium'}, {value:'low',labelAr:'منخفض',labelEn:'Low'} ] },
      { key: 'contactInfo',  labelAr: 'بيانات التواصل', labelEn: 'Contact Info',   type: 'textarea',required: false, tab: 'main', columnSpan: 2 },
      { key: 'engagementStrategy',labelAr:'استراتيجية الإشراك',labelEn:'Engagement Strategy',type:'textarea',required:false,tab:'engagement',columnSpan:2 },
    ],
    columns: [
      { key: 'nameAr',       labelAr: 'الاسم',          labelEn: 'Name',          type: 'text',   sortable: true },
      { key: 'organization', labelAr: 'الجهة',          labelEn: 'Organization',  type: 'text' },
      { key: 'roleAr',       labelAr: 'الدور',          labelEn: 'Role',          type: 'text' },
      { key: 'influence',    labelAr: 'التأثير',        labelEn: 'Influence',     type: 'text' },
      { key: 'interest',     labelAr: 'الاهتمام',       labelEn: 'Interest',      type: 'text' },
    ],
  },

  // ── LessonsLearned ────────────────────────────────────────────────────────
  LessonsLearned: {
    key: 'LessonsLearned',
    nameAr: 'الدروس المستفادة',
    nameEn: 'Lessons Learned',
    icon: 'BookOpen',
    workspace: null,
    codePrefix: 'LL',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل', labelEn: 'Details' }
    ],
    fields: [
      { key: 'titleAr',      labelAr: 'عنوان الدرس المستفاد',labelEn:'Lesson Title',   type: 'text',   required: true,  tab: 'main', columnSpan: 2 },
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',           type: 'text',   required: false, tab: 'main', columnSpan: 1 },
      { key: 'projectId',    labelAr: 'المشروع/المبادرة',labelEn:'Project/Initiative',type:'select', options: GENERIC_SELECT_OPTIONS, required:true,  tab: 'main', columnSpan: 1 },
      { key: 'category',     labelAr: 'التصنيف',        labelEn: 'Category',       type: 'select', required: true,  tab: 'main', columnSpan: 1, options: [
        {value:'success', labelAr:'قصة نجاح', labelEn:'Success Story'}, {value:'issue', labelAr:'مشكلة وحلها', labelEn:'Resolved Issue'}, {value:'risk', labelAr:'مخاطرة متحققة', labelEn:'Realized Risk'}, {value:'other', labelAr:'أخرى', labelEn:'Other'}
      ] },
      { key: 'dateRecorded', labelAr: 'تاريخ التسجيل',  labelEn: 'Date Recorded',  type: 'date',   required: true,  tab: 'main', columnSpan: 1 },
      { key: 'situationAr',  labelAr: 'وصف الموقف',     labelEn: 'Situation Description',type:'textarea',required:true, tab: 'main', columnSpan: 2 },
      { key: 'actionAr',     labelAr: 'الإجراء المتخذ', labelEn: 'Action Taken',   type: 'textarea',required: true,  tab: 'main', columnSpan: 2 },
      { key: 'resultAr',     labelAr: 'النتيجة/الدرس',  labelEn: 'Result/Lesson',  type: 'textarea',required: true,  tab: 'main', columnSpan: 2 },
      { key: 'recommendationAr',labelAr:'التوصيات المستقبلية',labelEn:'Recommendations',type:'textarea',required:false,tab:'main', columnSpan: 2 },
    ],
    columns: [
      { key: 'code',         labelAr: 'الكود',          labelEn: 'Code',          type: 'link',   sortable: true, width: '130px' },
      { key: 'titleAr',      labelAr: 'العنوان',        labelEn: 'Title',         type: 'text',   sortable: true },
      { key: 'projectId',    labelAr: 'المشروع/المبادرة',labelEn:'Project/Initiative',type:'text' },
      { key: 'category',     labelAr: 'التصنيف',        labelEn: 'Category',      type: 'text' },
      { key: 'dateRecorded', labelAr: 'تاريخ التسجيل',  labelEn: 'Date Recorded', type: 'date' },
    ],
  },

  // ── Template Example ──────────────────────────────────────────────────────
  TemplateExample: {
    key: 'TemplateExample',
    nameAr: 'نموذج إعدادات',
    nameEn: 'Template Config',
    icon: 'Settings',
    workspace: null,
    codePrefix: 'TMP',
    tabs: [
      { key: 'main', labelAr: 'التفاصيل الأساسية', labelEn: 'Basic Details' }
    ],
    fields: [
      { key: 'code',     labelAr: 'الكود',        labelEn: 'Code',        type: 'text',  required: false, tab: 'main', columnSpan: 1 },
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
  }
};

export function getModuleConfig(key: string): ModuleConfig {
  if (MODULE_CONFIGS[key]) return MODULE_CONFIGS[key];
  throw new Error(`Module config not found for key: ${key}`);
}

export default MODULE_CONFIGS;