// ─── Mock Data Store ──────────────────────────────────────────────────────
// All data is keyed by module key for easy lookup

export const MOCK_USERS = [
  { id: 'u1', nameAr: 'محمود سحرماني', nameEn: 'Mahmoud Sahrmarany', email: 'mahmoud@tanmia.sa', role: 'مدير مشروع', avatar: '' },
  { id: 'u2', nameAr: 'يوكو ديفيد', nameEn: 'Yoko David', email: 'yoko@tanmia.sa', role: 'محلل', avatar: '' },
  { id: 'u3', nameAr: 'لیساندرا تالي', nameEn: 'Lisandra Talley', email: 'lisandra@tanmia.sa', role: 'مدير برنامج', avatar: '' },
  { id: 'u4', nameAr: 'هافيفا نغوين', nameEn: 'Haviva Nguyen', email: 'haviva@tanmia.sa', role: 'مدير مبادرة', avatar: '' },
  { id: 'u5', nameAr: 'رجا سبنسر', nameEn: 'Raja Spencer', email: 'raja@tanmia.sa', role: 'مدير تنفيذي', avatar: '' },
  { id: 'u6', nameAr: 'فيرجينيا ترافينو', nameEn: 'Virginia Trevino', email: 'virginia@tanmia.sa', role: 'محلل استراتيجي', avatar: '' },
  { id: 'u7', nameAr: 'ليليث دينيس', nameEn: 'Lillith Dennis', email: 'lilith@tanmia.sa', role: 'مراقب أداء', avatar: '' },
];

export const MOCK_DATA: Record<string, any[]> = {
  // 1. Strategies (الاستراتيجيات)
  Strategies: [
    {
      id: 'strat-1',
      code: 'STR-001',
      nameAr: 'استراتيجية قطاع التنمية الاجتماعية',
      strategyType: 'sdss',
      sector: 'opt1', 
      approvalDate: '2026-12-04',
      description: 'إستراتيجية قطاعية لمدة خمس سنوات لقطاع التنمية الاجتماعية في الوزارة',
      vision: 'الريادة عالميا في تمكين الإنسان والمجتمع، وتعزيز تنافسية سوق العمل',
      values: 'التميز\nالابتكار\nالمسؤولية\nالإتقان\nالشفافية',
      mission: 'تمكين الفرد والمجتمع والمؤسسات وخلق سوق عمل يحفز الابتكار والاستدامة ومواكبة التحولات المستقبلية، من خلال سياسات وتشريعات مرنة وفاعلة'
    }
  ],

  // 2. Objectives (الأهداف الاستراتيجية)
  Objectives: [
    {
      id: 'obj-1',
      code: 'OBJ-SYS-001',
      objectiveCode: 'SO001',
      nameAr: 'القضاء التام على الفقر والجوع وعدم المساواة',
      level: 'level1',
      strategyType: 'strategic',
      relatedStrategy: 'opt1',
      sector: 'opt1',
      objectiveRelation: 'ownership',
      externalEntities: 'opt1',
      relatedPortfolio: 'opt1',
      subsector: 'opt1',
      department: 'opt2',
      description: 'الهدف الرئيسي الأول لتعزيز شبكة الحماية الاجتماعية وفق الرؤية.',
      objectiveOwner: 'u5',
      externalOwner: 'وزارة الاقتصاد والتخطيط'
    },
    {
      id: 'obj-2',
      code: 'OBJ-SYS-002',
      objectiveCode: 'SO002',
      nameAr: 'السلام والعدالة والصحة الجيدة والتعليم الجيد والرفاهية',
      level: 'level1',
      strategyType: 'strategic',
      relatedStrategy: 'opt1',
      sector: 'opt1',
      objectiveRelation: 'ownership',
      externalEntities: 'opt2',
      relatedPortfolio: 'opt1',
      subsector: 'opt2',
      department: 'opt1',
      description: 'تعزيز استقرار المجتمع ومؤشرات الصحة والتعليم.',
      objectiveOwner: 'u1',
      externalOwner: ''
    },
    {
      id: 'obj-3',
      code: 'OBJ-SYS-003',
      objectiveCode: 'SO003',
      nameAr: 'ضمان خدمات رعاية وحماية اجتماعية فعالة وشاملة',
      level: 'level2',
      strategyType: 'strategic',
      relatedStrategy: 'opt1',
      sector: 'opt1',
      parentObjective: 'opt1',
      objectiveRelation: 'contribution',
      description: 'دعم وتمكين ذوي الاحتياجات الخاصة والأسر المنتجة.',
      objectiveOwner: 'u2',
      externalOwner: ''
    },
    {
      id: 'obj-4',
      code: 'OBJ-SYS-004',
      objectiveCode: 'SO004',
      nameAr: 'تقديم خدمات تنموية اجتماعية مستدامة',
      level: 'level2',
      strategyType: 'strategic',
      relatedStrategy: 'opt1',
      sector: 'opt1',
      parentObjective: 'opt1',
      objectiveRelation: 'contribution',
      description: 'استدامة وتطوير برامج الضمان الاجتماعي.',
      objectiveOwner: 'u3',
      externalOwner: ''
    },
    {
      id: 'obj-5',
      code: 'OBJ-SYS-005',
      objectiveCode: 'SO005',
      nameAr: 'تحقيق الفائدة والعدالة الاجتماعية لجميع أفراد المجتمع',
      level: 'level2',
      strategyType: 'strategic',
      relatedStrategy: 'opt1',
      sector: 'opt1',
      parentObjective: 'opt1',
      objectiveOwner: 'u4'
    }
  ],

  // 3. KPIs (إدارة المؤشرات)
  KPIs: [
    {
      id: 'kpi-1',
      code: 'KPI-001',
      nameAr: 'نسبة الفقر',
      kpiType: 'main',
      relatedObjective: 'opt1',
      classification: 'performance',
      fromYear: 2026,
      toYear: 2030,
      categoryKpi: 'opt1',
      periodType: 'quarterly',
      description: 'ضمن محور الحماية الاجتماعية (بهدف القضاء على الفقر): تقليل نسبة الفقر (المستهدف 5 %)',
      issues: 'تأخر وصول البيانات الإحصائية من الجهات الخارجية',
      risks: 'عدم تحديث قاعدة بيانات المستفيدين بشكل دوري',
      externalFactors: 'التغيرات الاقتصادية العالمية والتضخم',
      assumptions: 'استقرار الأوضاع الاقتصادية واستمرار برامج الدعم',
      relatedMainKPIs: 'opt1',
      externalKpiOwner: 'الهيئة العامة للإحصاء',
      owner: 'u5', // Represents kabdelhadi from mock users
      performanceLeader: 'u2', // Represents sjamil or another user
      performanceLeader2: 'u3',
      dataSource: 'مسح دخل وإنفاق الأسرة',
      dataSourceResponsible: 'u4',
      email: 'kabdelhadi@netways.com',
      polarity: 'opt1', // Matches (-) Polarity representing negative/decrease is better
      resultType: 'opt1',
      cumulative: 'no',
      weight: 25,
      baseline: 8.5,
      measurePeriod: 'Q1',
      measurableNow: 'yes',
      strategyClass: 'opt1',
      relatedStrategyFormula: 'opt1',
      commitmentKpi: 'yes',
      calculationMethod: '(عدد الأسر تحت خط الفقر / إجمالي الأسر بالمملكة) * 100',
      lagging: '2026-04-15',
      attlabel: 'نسبة مئوية (%)',
      formula: 'A / B',
      item1: 1500,
      item2: 50000,
      item3: 0,
      item4: 0,
      item5: 0,
      item6: 0,
      item7: 0
    },
    {
      id: 'kpi-2',
      code: 'KPI-002',
      nameAr: 'زيادة متوسط العمر',
      kpiType: 'main',
      relatedObjective: 'opt1',
      classification: 'performance',
      fromYear: 2026,
      toYear: 2030,
      periodType: 'quarterly',
      description: 'ضمن محور جودة الحياة (بهدف تحسين الصحة): رفع جودة الخدمات الصحية (مستهدف + 5 سنوات)',
      owner: 'u5',
      email: 'kabdelhadi@netways.com',
      polarity: 'opt2', // Matches (+) Polarity
      cumulative: 'yes',
      weight: 15,
      baseline: 75.3,
      measurableNow: 'yes',
      calculationMethod: 'حساب متوسط الأعمار المتوقعة عند الولادة سنوياً',
      formula: 'X + Y'
    },
    {
      id: 'kpi-3',
      code: 'KPI-003',
      nameAr: 'نسبة التخرج',
      kpiType: 'main',
      relatedObjective: 'opt1',
      classification: 'performance',
      fromYear: 2026,
      toYear: 2030,
      periodType: 'quarterly',
      description: 'ضمن محور جودة الحياة (بهدف تحسين التعليم): تطوير مخرجات التعليم (مستهدف 95 %)',
      owner: 'u5',
      email: 'kabdelhadi@netways.com',
      polarity: 'opt2', // (+)
      weight: 20,
      baseline: 88,
      calculationMethod: '(عدد الخريجين الناجحين / إجمالي المسجلين) * 100'
    },
    {
      id: 'kpi-4',
      code: 'KPI-004',
      nameAr: 'نسبة التغطية',
      kpiType: 'level2',
      relatedObjective: 'opt1',
      classification: 'performance',
      fromYear: 2026,
      toYear: 2030,
      periodType: 'quarterly',
      description: 'ضمن محور الحماية الاجتماعية (هدف الحماية الاجتماعية الشاملة): تغطية المستفيدين (المستهدف 95 %)',
      owner: 'u5',
      email: 'kabdelhadi@netways.com',
      polarity: 'opt2', // (+)
      weight: 30,
      baseline: 70
    },
    {
      id: 'kpi-5',
      code: 'KPI-005',
      nameAr: 'استدامة البرامج',
      kpiType: 'level2',
      relatedObjective: 'opt1',
      classification: 'performance',
      fromYear: 2026,
      toYear: 2030,
      periodType: 'quarterly',
      description: 'ضمن محور الحماية الاجتماعية (هدف تقديم خدمات التنمية): تعزيز استدامة البرامج (مستهدف 90 %)',
      weight: 10,
      baseline: 50
    }
  ],

  // ---------------------------------------------------------------------------
  // ⚠️ YOUR OTHER MOCK DATA ARRAYS BELONG HERE ⚠️
  // (Projects, Initiatives, Tasks, Risks, Issues, etc.)
  // Please keep all of those from your original file intact!
  // ---------------------------------------------------------------------------
};

// Function to fetch mock data by module key safely
export const fetchMockData = (moduleKey: string) => {
  return MOCK_DATA[moduleKey] || [];
};

// Function to mock saving or updating data in the store
export const persistData = (moduleKey: string, item: any) => {
  if (!MOCK_DATA[moduleKey]) {
    MOCK_DATA[moduleKey] = [];
  }
  
  const existingIndex = MOCK_DATA[moduleKey].findIndex((i) => i.id === item.id);
  
  if (existingIndex >= 0) {
    // Update existing item
    MOCK_DATA[moduleKey][existingIndex] = { ...MOCK_DATA[moduleKey][existingIndex], ...item };
  } else {
    // Create new item with a generated mock ID if none exists
    const newItem = { id: item.id || `mock-${Math.random().toString(36).substring(2, 9)}`, ...item };
    MOCK_DATA[moduleKey].push(newItem);
    return newItem;
  }
  return item;
};

// ─── Notifications ────────────────────────────────────────────────────────
export const NOTIFICATION_ALERTS = [
  { id: 'n6', type: 'task' as const, titleAr: 'مهمة متأخرة: تحديث بيانات المؤشرات', titleEn: 'Overdue Task: Update KPI Data', messageAr: 'المهمة "تحديث بيانات المؤشرات" متأخرة عن موعدها', messageEn: 'Task "Update KPI Data" is overdue', isRead: false, createdAt: '2026-04-03T06:00:00', priority: 'high' as const },
  { id: 'n7', type: 'risk' as const, titleAr: 'تذكير: مخاطرة تقترب من موعد معالجتها', titleEn: 'Reminder: Risk Due Date Approaching', messageAr: 'مخاطرة "نقص الكفاءات التقنية" موعد معالجتها قريب', messageEn: 'Risk "Technical Skills Shortage" due date approaching', isRead: false, createdAt: '2026-04-02T10:00:00', priority: 'medium' as const },
];

// ─── Important Links ──────────────────────────────────────────────────────
export const IMPORTANT_LINKS = [
  { id: 'il1', titleAr: 'البوابة الحكومية', titleEn: 'Government Portal', url: 'https://www.saudi.gov.sa', icon: 'Globe', category: 'external' },
  { id: 'il2', titleAr: 'نظام إدارة الوثائق', titleEn: 'Document Management System', url: '#', icon: 'FileText', category: 'internal' },
  { id: 'il3', titleAr: 'بوابة الموارد البشرية', titleEn: 'HR Portal', url: '#', icon: 'Users', category: 'internal' },
  { id: 'il4', titleAr: 'نظام المشتريات', titleEn: 'Procurement System', url: '#', icon: 'ShoppingCart', category: 'internal' }
];