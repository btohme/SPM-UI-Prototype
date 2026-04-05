// ─── Mock Data Store ──────────────────────────────────────────────────────
// All data is keyed by module key for easy lookup

export const MOCK_USERS = [
  { id: 'u1', nameAr: 'محمود سحرماني', nameEn: 'Mahmoud Sahrmarany', email: 'mahmoud@tanmia.sa', role: 'مدير مشروع', avatar: '' },
  { id: 'u2', nameAr: 'يوكو ديفيد', nameEn: 'Yoko David', email: 'yoko@tanmia.sa', role: 'محلل', avatar: '' },
  { id: 'u3', nameAr: 'لیساندرا تالي', nameEn: 'Lisandra Talley', email: 'lisandra@tanmia.sa', role: 'مدير برنامج', avatar: '' },
  { id: 'u4', nameAr: 'هافيفا نغوين', nameEn: 'Haviva Nguyen', email: 'haviva@tanmia.sa', role: 'مدير مبادرة', avatar: '' },
  { id: 'u5', nameAr: 'رجا سبنسر', nameEn: 'Raja Spencer', email: 'raja@tanmia.sa', role: 'مدير تنفيذي', avatar: '' },
  { id: 'u6', nameAr: 'فيرجينيا ترافينو', nameEn: 'Virginia Trevino', email: 'virginia@tanmia.sa', role: 'محلل استراتيجي', avatar: '' },
  { id: 'u7', nameAr: 'ليليث دينيس', nameEn: 'Lillith Dennis', email: 'lillith@tanmia.sa', role: 'مدير مشروع', avatar: '' },
  { id: 'u8', nameAr: 'كاميرون خيمينيز', nameEn: 'Cameron Jimenez', email: 'cameron@tanmia.sa', role: 'مدير مؤشرات', avatar: '' },
  { id: 'u9', nameAr: 'باشار توحمة', nameEn: 'Bachar Tohme', email: 'bachar@tanmia.sa', role: 'مسؤول النظام', avatar: '' },
  { id: 'u10', nameAr: 'سارة الأحمد', nameEn: 'Sara Al-Ahmad', email: 'sara@tanmia.sa', role: 'مدير مشروع', avatar: '' },
];

export const INITIAL_DATA: Record<string, unknown[]> = {

  // ─── Strategies ──────────────────────────────────────────────────────────
  Strategies: [
    { id: 'ST-001', code: 'ST-26-000001', nameAr: 'رؤية 2030 - التحول الرقمي', nameEn: 'Vision 2030 - Digital Transformation', pillarAr: 'الاقتصاد', pillarEn: 'Economy', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany', fromYear: '2024', toYear: '2030', status: 'active', completion: 42, descriptionAr: 'استراتيجية التحول الرقمي في إطار رؤية 2030', descriptionEn: 'Digital transformation strategy within Vision 2030 framework', objectivesCount: 8, kpisCount: 24, projectsCount: 15 },
    { id: 'ST-002', code: 'ST-26-000002', nameAr: 'تطوير المجتمع والرقي الاجتماعي', nameEn: 'Community Development & Social Advancement', pillarAr: 'المجتمع', pillarEn: 'Society', ownerAr: 'فيرجينيا ترافينو', ownerEn: 'Virginia Trevino', fromYear: '2024', toYear: '2030', status: 'active', completion: 35, descriptionAr: 'تطوير المجتمع وتعزيز جودة الحياة', descriptionEn: 'Community development and quality of life enhancement', objectivesCount: 6, kpisCount: 18, projectsCount: 10 },
    { id: 'ST-003', code: 'ST-26-000003', nameAr: 'التنويع الاقتصادي وتنمية القطاع الخاص', nameEn: 'Economic Diversification & Private Sector Growth', pillarAr: 'الاقتصاد', pillarEn: 'Economy', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', fromYear: '2025', toYear: '2030', status: 'active', completion: 28, descriptionAr: 'تنويع مصادر الدخل وتطوير القطاع الخاص', descriptionEn: 'Diversifying income sources and developing the private sector', objectivesCount: 5, kpisCount: 15, projectsCount: 8 },
    { id: 'ST-004', code: 'ST-26-000004', nameAr: 'الاستدامة البيئية والطاقة المتجددة', nameEn: 'Environmental Sustainability & Renewable Energy', pillarAr: 'البيئة', pillarEn: 'Environment', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', fromYear: '2024', toYear: '2028', status: 'draft', completion: 10, descriptionAr: 'الحفاظ على البيئة وتطوير مصادر الطاقة المتجددة', descriptionEn: 'Environmental preservation and renewable energy development', objectivesCount: 4, kpisCount: 12, projectsCount: 6 },
    { id: 'ST-005', code: 'ST-26-000005', nameAr: 'الصحة والرعاية الاجتماعية', nameEn: 'Health & Social Welfare', pillarAr: 'الصحة', pillarEn: 'Health', ownerAr: 'ليليث دينيس', ownerEn: 'Lillith Dennis', fromYear: '2024', toYear: '2030', status: 'active', completion: 55, descriptionAr: 'تطوير منظومة الصحة والرعاية الاجتماعية', descriptionEn: 'Developing healthcare and social welfare system', objectivesCount: 7, kpisCount: 20, projectsCount: 12 },
  ],

  // ─── Strategic Pillars ────────────────────────────────────────────────────
  StrategicPillars: [
    { id: 'SP-001', code: 'SP-26-000001', nameAr: 'الاقتصاد والمال', nameEn: 'Economy & Finance', strategyAr: 'رؤية 2030', strategyEn: 'Vision 2030', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany', status: 'active', objectivesCount: 12 },
    { id: 'SP-002', code: 'SP-26-000002', nameAr: 'المجتمع والثقافة', nameEn: 'Society & Culture', strategyAr: 'رؤية 2030', strategyEn: 'Vision 2030', ownerAr: 'فيرجينيا ترافينو', ownerEn: 'Virginia Trevino', status: 'active', objectivesCount: 8 },
    { id: 'SP-003', code: 'SP-26-000003', nameAr: 'الوطن والمواطنة', nameEn: 'Nation & Citizenship', strategyAr: 'رؤية 2030', strategyEn: 'Vision 2030', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', status: 'active', objectivesCount: 6 },
    { id: 'SP-004', code: 'SP-26-000004', nameAr: 'البيئة والاستدامة', nameEn: 'Environment & Sustainability', strategyAr: 'رؤية 2030', strategyEn: 'Vision 2030', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', status: 'active', objectivesCount: 5 },
  ],

  // ─── Objectives ──────────────────────────────────────────────────────────
  Objectives: [
    { id: 'OB-001', code: 'OB-26-000006', nameAr: 'استراتيجي', nameEn: 'objective strat', typeAr: 'استراتيجي', typeEn: 'Strategic', levelAr: 'رئيسي', levelEn: 'Main', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany', strategyAr: 'رؤية 2030', strategyEn: 'Vision 2030', unitAr: 'لا يوجد', unitEn: 'N/A', departmentAr: 'لا يوجد', departmentEn: 'N/A', relatedStrategyAr: 'لا يوجد', relatedStrategyEn: 'N/A', status: 'active', kpisCount: 4 },
    { id: 'OB-002', code: 'OB-26-000005', nameAr: 'Haviva Nguyen', nameEn: 'Haviva Nguyen', typeAr: 'استراتيجي', typeEn: 'Strategic', levelAr: 'رئيسي', levelEn: 'Main', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', strategyAr: 'تطوير المجتمع', strategyEn: 'Community Development', unitAr: 'لا يوجد', unitEn: 'N/A', departmentAr: 'لا يوجد', departmentEn: 'N/A', relatedStrategyAr: 'لا يوجد', relatedStrategyEn: 'N/A', status: 'active', kpisCount: 3 },
    { id: 'OB-003', code: 'OB-26-000004', nameAr: 'Raja Spencer', nameEn: 'Raja Spencer', typeAr: 'تشغيلي', typeEn: 'Operational', levelAr: 'رئيسي', levelEn: 'Main', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', strategyAr: 'التنويع الاقتصادي', strategyEn: 'Economic Diversification', unitAr: 'لا يوجد', unitEn: 'N/A', departmentAr: 'لا يوجد', departmentEn: 'N/A', relatedStrategyAr: 'لا يوجد', relatedStrategyEn: 'N/A', status: 'active', kpisCount: 5 },
    { id: 'OB-004', code: 'OB-26-000003', nameAr: 'Virginia Trevino', nameEn: 'Virginia Trevino', typeAr: 'استراتيجي', typeEn: 'Strategic', levelAr: 'فرعي مستوى ثاني', levelEn: 'Sub Level 2', ownerAr: 'فيرجينيا ترافينو', ownerEn: 'Virginia Trevino', strategyAr: 'رؤية 2030', strategyEn: 'Vision 2030', unitAr: 'لا يوجد', unitEn: 'N/A', departmentAr: 'لا يوجد', departmentEn: 'N/A', relatedStrategyAr: 'لا يوجد', relatedStrategyEn: 'N/A', status: 'active', kpisCount: 2 },
    { id: 'OB-005', code: 'OB-26-000002', nameAr: 'Lillith Dennis', nameEn: 'Lillith Dennis', typeAr: 'استراتيجي', typeEn: 'Strategic', levelAr: 'رئيسي', levelEn: 'Main', ownerAr: 'ليليث دينيس', ownerEn: 'Lillith Dennis', strategyAr: 'الصحة والرعاية', strategyEn: 'Health & Welfare', unitAr: 'لا يوجد', unitEn: 'N/A', departmentAr: 'لا يوجد', departmentEn: 'N/A', relatedStrategyAr: 'لا يوجد', relatedStrategyEn: 'N/A', status: 'active', kpisCount: 6 },
    { id: 'OB-006', code: 'OB-26-000001', nameAr: 'Lisandra Talley', nameEn: 'Lisandra Talley', typeAr: 'استراتيجي', typeEn: 'Strategic', levelAr: 'رئيسي', levelEn: 'Main', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', strategyAr: 'رؤية 2030', strategyEn: 'Vision 2030', unitAr: 'لا يوجد', unitEn: 'N/A', departmentAr: 'لا يوجد', departmentEn: 'N/A', relatedStrategyAr: 'لا يوجد', relatedStrategyEn: 'N/A', status: 'active', kpisCount: 3 },
  ],

  // ─── KPIs ──────────────────────────────────────────────────────────────────
  KPIs: [
    { id: 'KP-001', code: 'KP-26-000017', nameAr: 'Cameron Jimenez22', nameEn: 'Cameron Jimenez22', typeAr: 'تشغيلي', typeEn: 'Operational', classificationAr: 'النمو (القدرات الرئيسية)', classificationEn: 'Growth (Core Capabilities)', ownerAr: 'كاميرون خيمينيز', ownerEn: 'Cameron Jimenez', linkedObjectiveAr: 'يوكو ديفيد', linkedObjectiveEn: 'Yoko David', fromYear: '2020', toYear: '2020', unit: '%', baselineValue: 50, targetValue: 90, actualValue: 72, frequency: 'سنوي', status: 'active', externalFactorsAr: 'Dolores illo totam sit dicta eum molestiae perferendis occaecat vel ea assumenda esse dolorem', externalFactorsEn: 'External factors text here', descriptionAr: 'Autem vel ducimus et dolor aperiam vel ut dolor voluptate ut deleniti minima lure eos', descriptionEn: 'KPI description text here', changeFrequency: false, ownerAr2: 'محمود سحرماني', ownerEn2: 'Mahmoud Sahrmarany', performanceOwnerAr: 'محمود سحرماني', performanceOwnerEn: 'Mahmoud Sahrmarany', attachments: ['image (7).jpeg', 'image (5).png'] },
    { id: 'KP-002', code: 'KP-26-000016', nameAr: 'نسبة التحول الرقمي', nameEn: 'Digital Transformation Rate', typeAr: 'استراتيجي', typeEn: 'Strategic', classificationAr: 'الأداء', classificationEn: 'Performance', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany', linkedObjectiveAr: 'رؤية 2030', linkedObjectiveEn: 'Vision 2030', fromYear: '2024', toYear: '2030', unit: '%', baselineValue: 20, targetValue: 80, actualValue: 45, frequency: 'ربع سنوي', status: 'active' },
    { id: 'KP-003', code: 'KP-26-000015', nameAr: 'رضا المستفيدين', nameEn: 'Beneficiary Satisfaction', typeAr: 'تشغيلي', typeEn: 'Operational', classificationAr: 'الجودة', classificationEn: 'Quality', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', linkedObjectiveAr: 'تطوير المجتمع', linkedObjectiveEn: 'Community Development', fromYear: '2024', toYear: '2026', unit: 'نقطة', baselineValue: 65, targetValue: 90, actualValue: 78, frequency: 'نصف سنوي', status: 'active' },
    { id: 'KP-004', code: 'KP-26-000014', nameAr: 'عدد المشاريع المكتملة', nameEn: 'Completed Projects Count', typeAr: 'تشغيلي', typeEn: 'Operational', classificationAr: 'الإنتاجية', classificationEn: 'Productivity', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', linkedObjectiveAr: 'التنويع الاقتصادي', linkedObjectiveEn: 'Economic Diversification', fromYear: '2024', toYear: '2026', unit: 'مشروع', baselineValue: 10, targetValue: 50, actualValue: 28, frequency: 'سنوي', status: 'active' },
    { id: 'KP-005', code: 'KP-26-000013', nameAr: 'نسبة التوظيف المحلي', nameEn: 'Local Employment Rate', typeAr: 'استراتيجي', typeEn: 'Strategic', classificationAr: 'النمو', classificationEn: 'Growth', ownerAr: 'فيرجينيا ترافينو', ownerEn: 'Virginia Trevino', linkedObjectiveAr: 'رؤية 2030', linkedObjectiveEn: 'Vision 2030', fromYear: '2024', toYear: '2030', unit: '%', baselineValue: 35, targetValue: 70, actualValue: 52, frequency: 'ربع سنوي', status: 'active' },
  ],

  // ─── KPI Results ──────────────────────────────────────────────────────────
  KPIResults: [
    { id: 'KR-001', code: 'KR-26-000001', kpiNameAr: 'نسبة التحول الرقمي', kpiNameEn: 'Digital Transformation Rate', periodAr: 'الربع الأول 2026', periodEn: 'Q1 2026', targetValue: 45, actualValue: 48, achievementRate: 106.7, status: 'exceeded', enteredBy: 'محمود سحرماني', entryDate: '2026-03-31' },
    { id: 'KR-002', code: 'KR-26-000002', kpiNameAr: 'رضا المستفيدين', kpiNameEn: 'Beneficiary Satisfaction', periodAr: 'الربع الأول 2026', periodEn: 'Q1 2026', targetValue: 80, actualValue: 72, achievementRate: 90, status: 'below', enteredBy: 'هافيفا نغوين', entryDate: '2026-03-31' },
    { id: 'KR-003', code: 'KR-26-000003', kpiNameAr: 'عدد المشاريع المكتملة', kpiNameEn: 'Completed Projects', periodAr: 'الربع الأول 2026', periodEn: 'Q1 2026', targetValue: 10, actualValue: 10, achievementRate: 100, status: 'achieved', enteredBy: 'رجا سبنسر', entryDate: '2026-03-31' },
  ],

  // ─── Portfolios ───────────────────────────────────────────────────────────
  Portfolios: [
    { id: 'PF-001', code: 'PF-26-000001', nameAr: 'حافظة التحول الرقمي', nameEn: 'Digital Transformation Portfolio', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany', programsCount: 3, projectsCount: 15, budget: 50000000, status: 'active', fromYear: '2024', toYear: '2030', completion: 42 },
    { id: 'PF-002', code: 'PF-26-000002', nameAr: 'حافظة التنمية الاجتماعية', nameEn: 'Social Development Portfolio', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', programsCount: 2, projectsCount: 10, budget: 30000000, status: 'active', fromYear: '2024', toYear: '2028', completion: 35 },
    { id: 'PF-003', code: 'PF-26-000003', nameAr: 'حافظة البنية التحتية', nameEn: 'Infrastructure Portfolio', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', programsCount: 4, projectsCount: 20, budget: 80000000, status: 'active', fromYear: '2024', toYear: '2030', completion: 58 },
  ],

  // ─── Programs ─────────────────────────────────────────────────────────────
  Programs: [
    { id: 'PR-001', code: 'PR-26-000001', nameAr: 'برنامج التحول الرقمي الحكومي', nameEn: 'Government Digital Transformation Program', portfolioAr: 'حافظة التحول الرقمي', portfolioEn: 'Digital Transformation Portfolio', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany', projectsCount: 5, budget: 20000000, status: 'execution', fromDate: '2024-01-01', toDate: '2027-12-31', completion: 45 },
    { id: 'PR-002', code: 'PR-26-000002', nameAr: 'برنامج تطوير الخدمات الصحية', nameEn: 'Healthcare Services Development Program', portfolioAr: 'حافظة التنمية الاجتماعية', portfolioEn: 'Social Development Portfolio', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', projectsCount: 4, budget: 15000000, status: 'planning', fromDate: '2024-06-01', toDate: '2028-05-31', completion: 20 },
    { id: 'PR-003', code: 'PR-26-000003', nameAr: 'برنامج تطوير البنية الرقمية', nameEn: 'Digital Infrastructure Program', portfolioAr: 'حافظة البنية التحتية', portfolioEn: 'Infrastructure Portfolio', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', projectsCount: 6, budget: 25000000, status: 'execution', fromDate: '2023-01-01', toDate: '2026-12-31', completion: 65 },
  ],

  // ─── Projects ─────────────────────────────────────────────────────────────
  Projects: [
    { id: 'SC-001', code: 'SC-26-000001', nameAr: 'تطوير منصة الخدمات الرقمية', nameEn: 'Digital Services Platform Development', categoryAr: 'داخلي', categoryEn: 'Internal', programAr: 'برنامج التحول الرقمي الحكومي', programEn: 'Government Digital Transformation Program', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', departmentAr: 'إدارة التقنية', departmentEn: 'Technology Dept', unitAr: 'لا يوجد', unitEn: 'N/A', status: 'execution', phase: 'planning', riskLevel: 'medium', completion: 65, startDate: '2024-01-15', endDate: '2026-06-30', budget: 5000000, descriptionAr: 'تطوير منصة رقمية متكاملة لتقديم الخدمات الحكومية', descriptionEn: 'Developing an integrated digital platform for government services', isDraft: false, risksCount: 3, issuesCount: 2, milestonesCount: 8 },
    { id: 'SC-002', code: 'SC-26-000002', nameAr: 'نظام إدارة الموارد البشرية', nameEn: 'HR Management System', categoryAr: 'داخلي', categoryEn: 'Internal', programAr: 'برنامج التحول الرقمي الحكومي', programEn: 'Government Digital Transformation Program', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', departmentAr: 'الموارد البشرية', departmentEn: 'HR Department', unitAr: 'لا يوجد', unitEn: 'N/A', status: 'preparation', phase: 'preparation', riskLevel: 'low', completion: 20, startDate: '2024-06-01', endDate: '2025-12-31', budget: 2000000, descriptionAr: 'تطوير نظام متكامل لإدارة الموارد البشرية', descriptionEn: 'Developing an integrated HR management system', isDraft: false, risksCount: 1, issuesCount: 0, milestonesCount: 5 },
    { id: 'SC-003', code: 'SC-26-000003', nameAr: 'مشروع البنية التحتية الشبكية', nameEn: 'Network Infrastructure Project', categoryAr: 'تنموي', categoryEn: 'Development', programAr: 'برنامج تطوير البنية الرقمية', programEn: 'Digital Infrastructure Program', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', departmentAr: 'إدارة التقنية', departmentEn: 'Technology Dept', unitAr: 'لا يوجد', unitEn: 'N/A', status: 'execution', phase: 'execution', riskLevel: 'high', completion: 78, startDate: '2023-03-01', endDate: '2026-02-28', budget: 8000000, descriptionAr: 'تطوير وتحديث البنية التحتية الشبكية', descriptionEn: 'Developing and upgrading network infrastructure', isDraft: false, risksCount: 5, issuesCount: 3, milestonesCount: 12 },
    { id: 'SC-004', code: 'SC-26-000004', nameAr: 'منصة التعلم الإلكتروني', nameEn: 'E-Learning Platform', categoryAr: 'داخلي', categoryEn: 'Internal', programAr: 'برنامج تطوير الخدمات الصحية', programEn: 'Healthcare Services Program', ownerAr: 'فيرجينيا ترافينو', ownerEn: 'Virginia Trevino', departmentAr: 'التدريب والتطوير', departmentEn: 'Training & Development', unitAr: 'لا يوجد', unitEn: 'N/A', status: 'planning', phase: 'planning', riskLevel: 'medium', completion: 35, startDate: '2024-09-01', endDate: '2026-08-31', budget: 3500000, descriptionAr: 'إنشاء منصة تعلم إلكتروني متكاملة', descriptionEn: 'Creating an integrated e-learning platform', isDraft: false, risksCount: 2, issuesCount: 1, milestonesCount: 7 },
    { id: 'SC-005', code: 'SC-26-000005', nameAr: 'مشروع جديد', nameEn: 'New Project', categoryAr: 'داخلي', categoryEn: 'Internal', programAr: 'لا يوجد', programEn: 'N/A', ownerAr: 'ليليث دينيس', ownerEn: 'Lillith Dennis', departmentAr: 'لا يوجد', departmentEn: 'N/A', unitAr: 'لا يوجد', unitEn: 'N/A', status: 'preparation', phase: 'preparation', riskLevel: 'low', completion: 0, startDate: '2026-01-01', endDate: '2027-12-31', budget: 1000000, descriptionAr: 'وصف المشروع الجديد', descriptionEn: 'New project description', isDraft: false, risksCount: 0, issuesCount: 0, milestonesCount: 0 },
    { id: 'SC-006', code: 'SC-26-000006', nameAr: 'تطوير تطبيق الجوال', nameEn: 'Mobile App Development', categoryAr: 'تنموي', categoryEn: 'Development', programAr: 'برنامج التحول الرقمي الحكومي', programEn: 'Government Digital Transformation Program', ownerAr: 'كاميرون خيمينيز', ownerEn: 'Cameron Jimenez', departmentAr: 'إدارة التقنية', departmentEn: 'Technology Dept', unitAr: 'لا يوجد', unitEn: 'N/A', status: 'execution', phase: 'execution', riskLevel: 'medium', completion: 55, startDate: '2024-03-01', endDate: '2025-12-31', budget: 2500000, descriptionAr: 'تطوير تطبيق جوال متكامل للخدمات', descriptionEn: 'Developing an integrated mobile services application', isDraft: false, risksCount: 2, issuesCount: 1, milestonesCount: 6 },
  ],

  // ─── Initiatives ──────────────────────────────────────────────────────────
  Initiatives: [
    { id: 'IN-001', code: 'IN-26-000001', nameAr: 'مبادرة تطوير الكفاءات البشرية', nameEn: 'Human Capabilities Development Initiative', categoryAr: 'داخلي', categoryEn: 'Internal', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', strategyAr: 'رؤية 2030', strategyEn: 'Vision 2030', status: 'execution', phase: 'execution', riskLevel: 'medium', completion: 68, startDate: '2024-01-01', endDate: '2026-12-31', budget: 3000000, descriptionAr: 'تطوير وتعزيز الكفاءات البشرية الوطنية', descriptionEn: 'Developing national human capabilities', risksCount: 2, issuesCount: 1, milestonesCount: 6 },
    { id: 'IN-002', code: 'IN-26-000002', nameAr: 'مبادرة الاستدامة البيئية', nameEn: 'Environmental Sustainability Initiative', categoryAr: 'تنموي', categoryEn: 'Development', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', strategyAr: 'الاستدامة البيئية', strategyEn: 'Environmental Sustainability', status: 'planning', phase: 'planning', riskLevel: 'low', completion: 25, startDate: '2024-07-01', endDate: '2027-06-30', budget: 2000000, descriptionAr: 'تعزيز الاستدامة البيئية في الأنشطة', descriptionEn: 'Promoting environmental sustainability in activities', risksCount: 1, issuesCount: 0, milestonesCount: 4 },
    { id: 'IN-003', code: 'IN-26-000003', nameAr: 'مبادرة تحسين جودة الخدمات', nameEn: 'Service Quality Improvement Initiative', categoryAr: 'داخلي', categoryEn: 'Internal', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', strategyAr: 'تطوير المجتمع', strategyEn: 'Community Development', status: 'execution', phase: 'execution', riskLevel: 'medium', completion: 50, startDate: '2024-03-01', endDate: '2026-02-28', budget: 1500000, descriptionAr: 'تحسين جودة الخدمات المقدمة للمستفيدين', descriptionEn: 'Improving service quality for beneficiaries', risksCount: 3, issuesCount: 2, milestonesCount: 8 },
    { id: 'IN-004', code: 'IN-26-000004', nameAr: 'مبادرة التحول نحو الحوسبة السحابية', nameEn: 'Cloud Computing Transformation Initiative', categoryAr: 'تقني', categoryEn: 'Technical', ownerAr: 'فيرجينيا ترافينو', ownerEn: 'Virginia Trevino', strategyAr: 'رؤية 2030 - التحول الرقمي', strategyEn: 'Vision 2030 - Digital Transformation', status: 'planning', phase: 'planning', riskLevel: 'high', completion: 15, startDate: '2025-01-01', endDate: '2027-12-31', budget: 4000000, descriptionAr: 'التحول نحو الحوسبة السحابية المتقدمة', descriptionEn: 'Transitioning to advanced cloud computing', risksCount: 4, issuesCount: 1, milestonesCount: 10 },
  ],

  // ─── Tasks ────────────────────────────────────────────────────────────────
  Tasks: [
    { id: 'TA-001', code: 'TA-26-000001', titleAr: 'مراجعة تقرير المخاطر الشهري', titleEn: 'Review Monthly Risk Report', assigneeAr: 'محمود سحرماني', assigneeEn: 'Mahmoud Sahrmarany', assignedByAr: 'باشار توحمة', assignedByEn: 'Bachar Tohme', dueDate: '2026-04-10', status: 'pending', priority: 'high', completionRate: 0, relatedModuleAr: 'مخاطر المشروع', relatedModuleEn: 'Project Risks' },
    { id: 'TA-002', code: 'TA-26-000002', titleAr: 'تحديث بيانات المؤشرات', titleEn: 'Update KPI Data', assigneeAr: 'كاميرون خيمينيز', assigneeEn: 'Cameron Jimenez', assignedByAr: 'باشار توحمة', assignedByEn: 'Bachar Tohme', dueDate: '2026-04-05', status: 'in_progress', priority: 'medium', completionRate: 60, relatedModuleAr: 'المؤشرات', relatedModuleEn: 'KPIs' },
    { id: 'TA-003', code: 'TA-26-000003', titleAr: 'إعداد تقرير الأداء الربعي', titleEn: 'Prepare Quarterly Performance Report', assigneeAr: 'هافيفا نغوين', assigneeEn: 'Haviva Nguyen', assignedByAr: 'لیساندرا تالي', assignedByEn: 'Lisandra Talley', dueDate: '2026-04-15', status: 'pending', priority: 'high', completionRate: 0, relatedModuleAr: 'المشاريع', relatedModuleEn: 'Projects' },
    { id: 'TA-004', code: 'TA-26-000004', titleAr: 'تنفيذ اجتماع متابعة المبادرة', titleEn: 'Conduct Initiative Follow-up Meeting', assigneeAr: 'رجا سبنسر', assigneeEn: 'Raja Spencer', assignedByAr: 'فيرجينيا ترافينو', assignedByEn: 'Virginia Trevino', dueDate: '2026-04-08', status: 'completed', priority: 'low', completionRate: 100, relatedModuleAr: 'المبادرات', relatedModuleEn: 'Initiatives' },
    { id: 'TA-005', code: 'TA-26-000005', titleAr: 'مراجعة عقود الموردين', titleEn: 'Review Vendor Contracts', assigneeAr: 'ليليث دينيس', assigneeEn: 'Lillith Dennis', assignedByAr: 'محمود سحرماني', assignedByEn: 'Mahmoud Sahrmarany', dueDate: '2026-04-20', status: 'pending', priority: 'medium', completionRate: 0, relatedModuleAr: 'العقود', relatedModuleEn: 'Contracts' },
  ],

  // ─── Project Risks ─────────────────────────────────────────────────────────
  ProjectRisks: [
    { id: 'PRI-001', code: 'PRI-26-000001', nameAr: 'خطر التأخر في التسليم', nameEn: 'Delivery Delay Risk', projectCode: 'SC-26-000001', projectNameAr: 'تطوير منصة الخدمات الرقمية', projectNameEn: 'Digital Services Platform', probability: 'medium', impact: 'high', riskLevel: 'high', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany', statusAr: 'مفتوح', statusEn: 'Open', mitigationPlanAr: 'تعزيز الفريق وإعادة جدولة المهام', mitigationPlanEn: 'Reinforce team and reschedule tasks', identifiedDate: '2025-11-15', dueDate: '2026-06-30' },
    { id: 'PRI-002', code: 'PRI-26-000002', nameAr: 'خطر تجاوز الميزانية', nameEn: 'Budget Overrun Risk', projectCode: 'SC-26-000001', projectNameAr: 'تطوير منصة الخدمات الرقمية', projectNameEn: 'Digital Services Platform', probability: 'low', impact: 'high', riskLevel: 'medium', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', statusAr: 'قيد المعالجة', statusEn: 'In Progress', mitigationPlanAr: 'مراقبة الإنفاق بشكل دوري', mitigationPlanEn: 'Regular spending monitoring', identifiedDate: '2025-12-01', dueDate: '2026-06-30' },
    { id: 'PRI-003', code: 'PRI-26-000003', nameAr: 'خطر نقص الكفاءات التقنية', nameEn: 'Technical Skills Shortage', projectCode: 'SC-26-000003', projectNameAr: 'مشروع البنية التحتية الشبكية', projectNameEn: 'Network Infrastructure Project', probability: 'high', impact: 'high', riskLevel: 'high', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', statusAr: 'مفتوح', statusEn: 'Open', mitigationPlanAr: 'توظيف خبراء إضافيين وتدريب الفريق الحالي', mitigationPlanEn: 'Hire additional experts and train current team', identifiedDate: '2025-10-01', dueDate: '2026-03-31' },
  ],

  // ─── Project Issues ────────────────────────────────────────────────────────
  ProjectIssues: [
    { id: 'PIS-001', code: 'PIS-26-000001', titleAr: 'تأخر في استلام التراخيص', titleEn: 'License Approval Delay', projectCode: 'SC-26-000001', severity: 'high', statusAr: 'مفتوح', statusEn: 'Open', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', identifiedDate: '2026-01-10', resolvedDate: null, descriptionAr: 'التأخر في الحصول على التراخيص اللازمة من الجهات المختصة', descriptionEn: 'Delay in obtaining required licenses from authorities' },
    { id: 'PIS-002', code: 'PIS-26-000002', titleAr: 'مشكلة في التكامل مع الأنظمة', titleEn: 'System Integration Issue', projectCode: 'SC-26-000003', severity: 'medium', statusAr: 'قيد المعالجة', statusEn: 'In Progress', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', identifiedDate: '2026-02-15', resolvedDate: null, descriptionAr: 'مشاكل في التكامل مع الأنظمة الموجودة', descriptionEn: 'Integration issues with existing systems' },
  ],

  // ─── Project Milestones ────────────────────────────────────────────────────
  ProjectMilestones: [
    { id: 'PML-001', code: 'PML-26-000001', nameAr: 'إطلاق النسخة التجريبية', nameEn: 'Beta Launch', projectCode: 'SC-26-000001', plannedDate: '2025-12-31', actualDate: '2026-01-15', status: 'completed', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', descriptionAr: 'إطلاق النسخة التجريبية من المنصة', descriptionEn: 'Launch the beta version of the platform' },
    { id: 'PML-002', code: 'PML-26-000002', nameAr: 'اكتمال التطوير الأساسي', nameEn: 'Core Development Completion', projectCode: 'SC-26-000001', plannedDate: '2026-06-30', actualDate: null, status: 'in_progress', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', descriptionAr: 'اكتمال مرحلة التطوير الأساسية', descriptionEn: 'Completion of core development phase' },
    { id: 'PML-003', code: 'PML-26-000003', nameAr: 'إطلاق المنصة الرسمي', nameEn: 'Official Platform Launch', projectCode: 'SC-26-000001', plannedDate: '2026-09-30', actualDate: null, status: 'not_started', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', descriptionAr: 'الإطلاق الرسمي للمنصة للمستخدمين', descriptionEn: 'Official launch of the platform to users' },
    { id: 'PML-004', code: 'PML-26-000004', nameAr: 'اكتمال البنية التحتية', nameEn: 'Infrastructure Completion', projectCode: 'SC-26-000003', plannedDate: '2026-03-31', actualDate: '2026-04-01', status: 'completed', ownerAr: 'رجا سبنسر', ownerEn: 'Raja Spencer', descriptionAr: 'اكتمال تركيب البنية التحتية الشبكية', descriptionEn: 'Completion of network infrastructure installation' },
  ],

  // ─── Project MOMs ─────────────────────────────────────────────────────────
  ProjectMOMs: [
    { id: 'PMO-001', code: 'PMO-26-000001', titleAr: 'اجتماع متابعة المشروع - يناير', titleEn: 'Project Follow-up Meeting - January', projectCode: 'SC-26-000001', meetingDate: '2026-01-20', locationAr: 'غرفة الاجتماعات الرئيسية', locationEn: 'Main Meeting Room', chairAr: 'لیساندرا تالي', chairEn: 'Lisandra Talley', attendeesCount: 5, tasksCount: 3, status: 'closed' },
    { id: 'PMO-002', code: 'PMO-26-000002', titleAr: 'اجتماع مراجعة المخاطر', titleEn: 'Risk Review Meeting', projectCode: 'SC-26-000001', meetingDate: '2026-02-15', locationAr: 'عبر الإنترنت', locationEn: 'Online', chairAr: 'محمود سحرماني', chairEn: 'Mahmoud Sahrmarany', attendeesCount: 8, tasksCount: 5, status: 'open' },
  ],

  // ─── Change Requests ───────────────────────────────────────────────────────
  ChangeRequests: [
    { id: 'CR-001', code: 'CR-26-000001', titleAr: 'إضافة وحدة الأتمتة', titleEn: 'Add Automation Module', projectCode: 'SC-26-000001', requesterAr: 'لیساندرا تالي', requesterEn: 'Lisandra Talley', status: 'pending_approval', priority: 'high', estimatedCost: 250000, estimatedDays: 30, requestDate: '2026-02-01', impactAr: 'توسيع نطاق المشروع', impactEn: 'Project scope expansion' },
    { id: 'CR-002', code: 'CR-26-000002', titleAr: 'تعديل واجهة المستخدم', titleEn: 'UI Modifications', projectCode: 'SC-26-000003', requesterAr: 'رجا سبنسر', requesterEn: 'Raja Spencer', status: 'approved', priority: 'medium', estimatedCost: 50000, estimatedDays: 10, requestDate: '2026-01-15', impactAr: 'تحسين تجربة المستخدم', impactEn: 'UX improvement' },
  ],

  // ─── Contracts ────────────────────────────────────────────────────────────
  Contracts: [
    { id: 'CO-001', code: 'CO-26-000001', titleAr: 'عقد تطوير النظام مع شركة ABC', titleEn: 'System Development Contract with ABC Corp', projectCode: 'SC-26-000001', vendorAr: 'شركة ABC للتقنية', vendorEn: 'ABC Technology Corp', value: 2000000, currency: 'SAR', startDate: '2024-01-15', endDate: '2026-01-14', status: 'active', signerAr: 'لیساندرا تالي', signerEn: 'Lisandra Talley' },
    { id: 'CO-002', code: 'CO-26-000002', titleAr: 'عقد صيانة الشبكة', titleEn: 'Network Maintenance Contract', projectCode: 'SC-26-000003', vendorAr: 'شركة NetPro', vendorEn: 'NetPro Company', value: 500000, currency: 'SAR', startDate: '2023-03-01', endDate: '2026-02-28', status: 'active', signerAr: 'رجا سبنسر', signerEn: 'Raja Spencer' },
  ],

  // ─── Communication Plans ───────────────────────────────────────────────────
  CommunicationPlans: [
    { id: 'CP-001', code: 'CP-26-000001', titleAr: 'خطة تواصل مشروع المنصة الرقمية', titleEn: 'Digital Platform Project Communication Plan', projectCode: 'SC-26-000001', audienceAr: 'أصحاب المصلحة والإدارة العليا', audienceEn: 'Stakeholders and Senior Management', frequency: 'شهري', channel: 'البريد الإلكتروني والاجتماعات', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', status: 'active' },
  ],

  // ─── Project Deliverables ──────────────────────────────────────────────────
  ProjectDeliverables: [
    { id: 'PDL-001', code: 'PDL-26-000001', nameAr: 'وثيقة متطلبات النظام', nameEn: 'System Requirements Document', projectCode: 'SC-26-000001', type: 'document', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', plannedDate: '2024-03-31', actualDate: '2024-04-10', status: 'completed', descriptionAr: 'وثيقة شاملة لمتطلبات النظام الجديد', descriptionEn: 'Comprehensive system requirements document' },
    { id: 'PDL-002', code: 'PDL-26-000002', nameAr: 'نموذج التصميم الأولي', nameEn: 'Initial Design Prototype', projectCode: 'SC-26-000001', type: 'prototype', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany', plannedDate: '2025-06-30', actualDate: null, status: 'in_progress', descriptionAr: 'نموذج أولي للتصميم البصري للمنصة', descriptionEn: 'Initial visual design prototype of the platform' },
  ],

  // ─── Project Dependencies ──────────────────────────────────────────────────
  ProjectDependencies: [
    { id: 'PD-001', code: 'PD-26-000001', projectCode: 'SC-26-000001', dependsOnCode: 'SC-26-000002', dependsOnNameAr: 'نظام إدارة الموارد البشرية', dependsOnNameEn: 'HR Management System', type: 'finish_to_start', statusAr: 'نشط', statusEn: 'Active', descriptionAr: 'تعتمد منصة الخدمات على بيانات نظام الموارد البشرية', descriptionEn: 'Services platform depends on HR system data' },
  ],

  // ─── Project Updates Register ──────────────────────────────────────────────
  ProjectUpdatesRegister: [
    { id: 'PUR-001', code: 'PUR-26-000001', projectCode: 'SC-26-000001', updateDate: '2026-03-01', period: 'Q1 2026', completionBefore: 58, completionAfter: 65, statusBefore: 'execution', statusAfter: 'execution', updatedBy: 'لیساندرا تالي', notesAr: 'تم إنجاز الوحدات الأساسية وبدء الاختبارات', notesEn: 'Core modules completed, testing started' },
  ],

  // ─── Project Closure Forms ─────────────────────────────────────────────────
  ProjectClosureForms: [
    { id: 'PCF-001', code: 'PCF-26-000001', projectCode: 'SC-26-000003', projectNameAr: 'مشروع البنية التحتية الشبكية', projectNameEn: 'Network Infrastructure Project', closureDate: '2026-06-30', statusAr: 'مسودة', statusEn: 'Draft', submittedBy: 'رجا سبنسر', summaryAr: 'ملخص إغلاق المشروع', summaryEn: 'Project closure summary' },
  ],

  // ─── COCs ─────────────────────────────────────────────────────────────────
  COCs: [
    { id: 'CC-001', code: 'CC-26-000001', titleAr: 'شهادة إنجاز المرحلة الأولى', titleEn: 'Phase 1 Completion Certificate', projectCode: 'SC-26-000001', issuedDate: '2025-12-31', vendorAr: 'شركة ABC للتقنية', vendorEn: 'ABC Technology Corp', amount: 800000, statusAr: 'معتمد', statusEn: 'Approved', approvedBy: 'لیساندرا تالي' },
  ],

  // ─── Deliveries ────────────────────────────────────────────────────────────
  Deliveries: [
    { id: 'DL-001', code: 'DL-26-000001', titleAr: 'تسليم الوثائق التقنية', titleEn: 'Technical Documents Delivery', projectCode: 'SC-26-000001', deliveryDate: '2026-01-15', statusAr: 'مكتمل', statusEn: 'Completed', receivedBy: 'محمود سحرماني', vendorAr: 'شركة ABC للتقنية', vendorEn: 'ABC Technology Corp' },
  ],

  // ─── Lessons Learned ──────────────────────────────────────────────────────
  LessonsLearned: [
    { id: 'LL-001', code: 'LL-26-000001', titleAr: 'أهمية التخطيط المبكر للمخاطر', titleEn: 'Importance of Early Risk Planning', projectCode: 'SC-26-000001', category: 'risk', lessonsAr: 'التخطيط المبكر للمخاطر يقلل من التأثيرات السلبية على المشروع', lessonsEn: 'Early risk planning reduces negative project impacts', recommendation: 'Implement risk register from project start', addedBy: 'لیساندرا تالي', addedDate: '2026-02-01' },
  ],

  // ─── Stakeholders ─────────────────────────────────────────────────────────
  Stakeholders: [
    { id: 'SH-001', code: 'SH-26-000001', nameAr: 'وزارة التقنية', nameEn: 'Ministry of Technology', type: 'government', roleAr: 'جهة تنظيمية', roleEn: 'Regulatory Body', interestLevel: 'high', influenceLevel: 'high', contactPerson: 'يوكو ديفيد', email: 'yoko@tanmia.sa', engagementStrategy: 'monthly_meetings' },
    { id: 'SH-002', code: 'SH-26-000002', nameAr: 'المستخدمون النهائيون', nameEn: 'End Users', type: 'internal', roleAr: 'مستفيدون', roleEn: 'Beneficiaries', interestLevel: 'high', influenceLevel: 'medium', contactPerson: 'سارة الأحمد', email: 'sara@tanmia.sa', engagementStrategy: 'surveys_and_workshops' },
  ],

  // ─── Benefits ─────────────────────────────────────────────────────────────
  Benefits: [
    { id: 'BN-001', code: 'BN-26-000001', nameAr: 'توفير في تكاليف التشغيل', nameEn: 'Operational Cost Savings', projectCode: 'SC-26-000001', type: 'financial', baselineValue: 0, targetValue: 2000000, actualValue: 500000, unit: 'ريال', fromDate: '2025-01-01', toDate: '2030-12-31', status: 'realizing', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley' },
    { id: 'BN-002', code: 'BN-26-000002', nameAr: 'تحسين رضا المستفيدين', nameEn: 'Beneficiary Satisfaction Improvement', projectCode: 'SC-26-000001', type: 'non_financial', baselineValue: 65, targetValue: 90, actualValue: 78, unit: 'نقطة', fromDate: '2025-01-01', toDate: '2027-12-31', status: 'realizing', ownerAr: 'محمود سحرماني', ownerEn: 'Mahmoud Sahrmarany' },
  ],

  // ─── Initiative Risks ──────────────────────────────────────────────────────
  InitiativeRisks: [
    { id: 'IRI-001', code: 'IRI-26-000001', nameAr: 'خطر نقص التمويل', nameEn: 'Funding Shortage Risk', initiativeCode: 'IN-26-000001', probability: 'medium', impact: 'high', riskLevel: 'high', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', statusAr: 'مفتوح', statusEn: 'Open', mitigationPlanAr: 'البحث عن مصادر تمويل بديلة', mitigationPlanEn: 'Seek alternative funding sources', identifiedDate: '2025-10-01' },
    { id: 'IRI-002', code: 'IRI-26-000002', nameAr: 'خطر عدم كفاية الكوادر', nameEn: 'Insufficient Staff Risk', initiativeCode: 'IN-26-000001', probability: 'low', impact: 'medium', riskLevel: 'medium', ownerAr: 'هافيفا نغوين', ownerEn: 'Haviva Nguyen', statusAr: 'مغلق', statusEn: 'Closed', mitigationPlanAr: 'توظيف موارد إضافية', mitigationPlanEn: 'Hire additional resources', identifiedDate: '2025-11-01' },
  ],

  // ─── Initiative Issues ─────────────────────────────────────────────────────
  InitiativeIssues: [
    { id: 'IIS-001', code: 'IIS-26-000001', titleAr: 'غياب معايير واضحة للقياس', titleEn: 'Lack of Clear Measurement Standards', initiativeCode: 'IN-26-000001', severity: 'medium', statusAr: 'قيد المعالجة', statusEn: 'In Progress', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', identifiedDate: '2025-12-01' },
  ],

  // ─── Initiative Milestones ─────────────────────────────────────────────────
  InitiativeMilestones: [
    { id: 'IML-001', code: 'IML-26-000001', nameAr: 'إطلاق مرحلة التطوير', nameEn: 'Development Phase Launch', initiativeCode: 'IN-26-000001', plannedDate: '2024-06-30', actualDate: '2024-07-10', status: 'completed', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley' },
    { id: 'IML-002', code: 'IML-26-000002', nameAr: 'اكتمال المرحلة الأولى', nameEn: 'Phase 1 Completion', initiativeCode: 'IN-26-000001', plannedDate: '2025-12-31', actualDate: '2025-12-28', status: 'completed', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley' },
  ],

  // ─── Initiative Deliverables ───────────────────────────────────────────────
  InitiativeDeliverables: [
    { id: 'IDL-001', code: 'IDL-26-000001', nameAr: 'برنامج التدريب الأول', nameEn: 'First Training Program', initiativeCode: 'IN-26-000001', type: 'training', ownerAr: 'لیساندرا تالي', ownerEn: 'Lisandra Talley', plannedDate: '2024-12-31', actualDate: '2025-01-15', status: 'completed' },
  ],

  // ─── Initiative MOMs ───────────────────────────────────────────────────────
  InitiativeMOMs: [
    { id: 'IMO-001', code: 'IMO-26-000001', titleAr: 'اجتماع متابعة المبادرة - مارس', titleEn: 'Initiative Follow-up - March', initiativeCode: 'IN-26-000001', meetingDate: '2026-03-15', locationAr: 'غرفة الاجتماعات', locationEn: 'Meeting Room', chairAr: 'لیساندرا تالي', chairEn: 'Lisandra Talley', attendeesCount: 6, tasksCount: 4, status: 'open' },
  ],

  // ─── Initiative Updates Register ──────────────────────────────────────────
  InitiativeUpdatesRegister: [
    { id: 'IUR-001', code: 'IUR-26-000001', initiativeCode: 'IN-26-000001', updateDate: '2026-03-01', period: 'Q1 2026', completionBefore: 60, completionAfter: 68, updatedBy: 'لیساندرا تالي', notesAr: 'تقدم جيد في تنفيذ البرامج التدريبية', notesEn: 'Good progress in training program delivery' },
  ],

  // ─── Initiatives Support Objectives ────────────────────────────────────────
  InitiativesSupportObjectives: [
    { id: 'ISO-001', code: 'ISO-26-000001', initiativeCode: 'IN-26-000001', objectiveCode: 'OB-26-000001', objectiveNameAr: 'استراتيجي', objectiveNameEn: 'Objective Strat', linkType: 'direct', contributionPercentage: 35 },
  ],

  // ─── KPI Risks ────────────────────────────────────────────────────────────
  KPIRisks: [
    { id: 'KK-001', code: 'KK-26-000001', nameAr: 'خطر عدم دقة البيانات', nameEn: 'Data Accuracy Risk', kpiCode: 'KP-26-000017', probability: 'medium', impact: 'high', riskLevel: 'high', ownerAr: 'كاميرون خيمينيز', ownerEn: 'Cameron Jimenez', statusAr: 'مفتوح', statusEn: 'Open', mitigationPlanAr: 'تطبيق آليات التحقق من البيانات', mitigationPlanEn: 'Implement data verification mechanisms' },
  ],

  // ─── KPI Issues ────────────────────────────────────────────────────────────
  KPIIssues: [
    { id: 'KI-001', code: 'KI-26-000001', titleAr: 'تأخر في إدخال البيانات الشهرية', titleEn: 'Monthly Data Entry Delay', kpiCode: 'KP-26-000017', severity: 'medium', statusAr: 'قيد المعالجة', statusEn: 'In Progress', ownerAr: 'كاميرون خيمينيز', ownerEn: 'Cameron Jimenez', identifiedDate: '2026-02-01' },
  ],

  // ─── Knowledge Base ────────────────────────────────────────────────────────
  KnowledgeBase: [
    { id: 'KB2-001', code: 'KB2-26-000001', titleAr: 'دليل إدارة المشاريع', titleEn: 'Project Management Guide', categoryAr: 'إدارة المشاريع', categoryEn: 'Project Management', authorAr: 'محمود سحرماني', authorEn: 'Mahmoud Sahrmarany', createdDate: '2025-01-15', updatedDate: '2026-01-10', views: 245, status: 'published' },
    { id: 'KB2-002', code: 'KB2-26-000002', titleAr: 'إطار إدارة المخاطر', titleEn: 'Risk Management Framework', categoryAr: 'إدارة المخاطر', categoryEn: 'Risk Management', authorAr: 'فيرجينيا ترافينو', authorEn: 'Virginia Trevino', createdDate: '2025-03-20', updatedDate: '2025-12-05', views: 180, status: 'published' },
  ],

  // ─── Notifications ─────────────────────────────────────────────────────────
  Notifications: [
    { id: 'NO-001', code: 'NO-26-000001', titleAr: 'تذكير بموعد تسليم التقرير', titleEn: 'Report Submission Reminder', type: 'reminder', recipientAr: 'محمود سحرماني', recipientEn: 'Mahmoud Sahrmarany', sentDate: '2026-04-01', status: 'sent', isRead: false },
    { id: 'NO-002', code: 'NO-26-000002', titleAr: 'طلب موافقة على طلب تغيير', titleEn: 'Change Request Approval Needed', type: 'approval', recipientAr: 'لیساندرا تالي', recipientEn: 'Lisandra Talley', sentDate: '2026-04-02', status: 'sent', isRead: false },
  ],
};
const STORAGE_KEY = 'SPM_PROTOTYPE_DATA';
// Initialize MOCK_DATA from LocalStorage, or fallback to INITIAL_DATA
const storedData = localStorage.getItem(STORAGE_KEY);
export const MOCK_DATA = storedData ? JSON.parse(storedData) : JSON.parse(JSON.stringify(INITIAL_DATA));

// 3. Export a helper function to save changes to LocalStorage
export const persistData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
};

// 4. Export a helper to reset the prototype
export const resetPrototypeData = () => {
  if (window.confirm('هل أنت متأكد من إعادة تعيين جميع البيانات إلى حالتها الافتراضية؟ / Are you sure you want to reset all demo data?')) {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/'; // Reload the app to the home page
  }
};
// ─── Notification Alerts ──────────────────────────────────────────────────
export const NOTIFICATION_ALERTS = [
  { id: 'n1', type: 'task' as const, titleAr: 'مهمة جديدة مُعيّنة لك', titleEn: 'New Task Assigned to You', messageAr: 'تم تعيين مهمة "مراجعة تقرير المخاطر" لك', messageEn: 'Task "Review Risk Report" assigned to you', isRead: false, createdAt: '2026-04-03T07:30:00', priority: 'high' as const },
  { id: 'n2', type: 'risk' as const, titleAr: 'مخاطرة عالية جديدة', titleEn: 'New High Risk Identified', messageAr: 'تم تحديد مخاطرة عالية في مشروع المنصة الرقمية', messageEn: 'High risk identified in Digital Platform project', isRead: false, createdAt: '2026-04-02T14:00:00', priority: 'high' as const },
  { id: 'n3', type: 'issue' as const, titleAr: 'قضية جديدة في مشروعك', titleEn: 'New Issue in Your Project', messageAr: 'تم إضافة قضية "تأخر في استلام التراخيص"', messageEn: 'Issue "License Approval Delay" added', isRead: true, createdAt: '2026-04-01T09:00:00', priority: 'medium' as const },
  { id: 'n4', type: 'notification' as const, titleAr: 'تحديث حالة المشروع', titleEn: 'Project Status Update', messageAr: 'تم تحديث حالة مشروع البنية التحتية الشبكية', messageEn: 'Network Infrastructure project status updated', isRead: true, createdAt: '2026-03-31T16:00:00', priority: 'low' as const },
  { id: 'n5', type: 'announcement' as const, titleAr: 'إعلان: اجتماع الإدارة العليا', titleEn: 'Announcement: Senior Management Meeting', messageAr: 'سيُعقد اجتماع الإدارة العليا يوم الأحد القادم', messageEn: 'Senior management meeting scheduled for next Sunday', isRead: false, createdAt: '2026-03-30T08:00:00', priority: 'medium' as const },
  { id: 'n6', type: 'task' as const, titleAr: 'مهمة متأخرة: تحديث بيانات المؤشرات', titleEn: 'Overdue Task: Update KPI Data', messageAr: 'المهمة "تحديث بيانات المؤشرات" متأخرة عن موعدها', messageEn: 'Task "Update KPI Data" is overdue', isRead: false, createdAt: '2026-04-03T06:00:00', priority: 'high' as const },
  { id: 'n7', type: 'risk' as const, titleAr: 'تذكير: مخاطرة تقترب من موعد معالجتها', titleEn: 'Reminder: Risk Due Date Approaching', messageAr: 'مخاطرة "نقص الكفاءات التقنية" موعد معالجتها قريب', messageEn: 'Risk "Technical Skills Shortage" due date approaching', isRead: false, createdAt: '2026-04-02T10:00:00', priority: 'medium' as const },
];

// ─── Important Links ──────────────────────────────────────────────────────
export const IMPORTANT_LINKS = [
  { id: 'il1', titleAr: 'البوابة الحكومية', titleEn: 'Government Portal', url: 'https://www.saudi.gov.sa', icon: 'Globe', category: 'external' },
  { id: 'il2', titleAr: 'نظام إدارة الوثائق', titleEn: 'Document Management System', url: '#', icon: 'FileText', category: 'internal' },
  { id: 'il3', titleAr: 'بوابة الموارد البشرية', titleEn: 'HR Portal', url: '#', icon: 'Users', category: 'internal' },
  { id: 'il4', titleAr: 'لوحة التحليلات', titleEn: 'Analytics Dashboard', url: '#', icon: 'BarChart2', category: 'internal' },
  { id: 'il5', titleAr: 'مركز الدعم الفني', titleEn: 'IT Support Center', url: '#', icon: 'Headphones', category: 'support' },
  { id: 'il6', titleAr: 'قاعدة المعرفة', titleEn: 'Knowledge Base', url: '/list?modulekey=KnowledgeBase', icon: 'BookOpen', category: 'internal' },
];
