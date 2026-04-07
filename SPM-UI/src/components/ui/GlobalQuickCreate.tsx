import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Zap, ArrowLeft, Trash2, Layers } from 'lucide-react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';
import MODULE_CONFIGS from '../../data/moduleConfigs';
import { MOCK_DATA, persistData } from '../../data/mockData';
import { showToast } from './Toast';

export default function GlobalQuickCreate() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Find only modules that have setupHub enabled
const hubModules = (Object.values(MODULE_CONFIGS) as any[]).filter(m => m && m.setupHub?.enabled);
  const [selectedModuleKey, setSelectedModuleKey] = useState(hubModules[0]?.key || '');
  const [parentName, setParentName] = useState('');
  const [childrenNames, setChildrenNames] = useState<string[]>(['', '', '']); // Start with 3 empty slots

  // Get config for selected module
  const selectedConfig = MODULE_CONFIGS[selectedModuleKey as keyof typeof MODULE_CONFIGS];
  const firstChildKey = selectedConfig?.setupHub?.hierarchy?.[0]?.moduleKey;
  const firstChildConfig = firstChildKey ? MODULE_CONFIGS[firstChildKey as keyof typeof MODULE_CONFIGS] : null;
  const foreignKey = selectedConfig?.setupHub?.hierarchy?.[0]?.foreignKey;

  const handleReset = () => {
    setParentName('');
    setChildrenNames(['', '', '']);
    setIsOpen(false);
  };

  const handleSave = async () => {
    if (!parentName.trim()) {
      showToast('يرجى إدخال اسم العنصر الرئيسي', 'Please enter the main item name');
      return;
    }

    // 1. Generate Parent Item
    const parentUniqueId = Math.floor(1000 + Math.random() * 9000);
    const parentId = Date.now().toString() + parentUniqueId;
    const parentCode = `${selectedConfig.codePrefix}-Q-${parentUniqueId}`;

    const newParent = {
      id: parentId,
      code: parentCode,
      nameAr: parentName,
      nameEn: parentName,
      status: 'draft'
    };

    if (!MOCK_DATA[selectedModuleKey]) MOCK_DATA[selectedModuleKey] = [];
    MOCK_DATA[selectedModuleKey].push(newParent);

    // 2. Generate Child Items (if any were typed)
    const validChildren = childrenNames.filter(name => name.trim() !== '');
    if (validChildren.length > 0 && firstChildKey && foreignKey) {
      if (!MOCK_DATA[firstChildKey]) MOCK_DATA[firstChildKey] = [];

      validChildren.forEach((childName, idx) => {
        const childId = Date.now().toString() + idx;
        MOCK_DATA[firstChildKey].push({
          id: childId,
          code: `${firstChildConfig?.codePrefix}-Q-${parentUniqueId}-${idx + 1}`,
          nameAr: childName,
          nameEn: childName,
          [foreignKey]: parentId, // Link to parent!
          status: 'draft'
        });
      });
    }

    // 3. Persist and Redirect
    persistData();
    showToast('تم إنشاء القالب السريع بنجاح', 'Quick Hierarchy created successfully');
    handleReset();

    // Jump straight to the Hub so they can see it!
    navigate(`/setup-hub?modulekey=${selectedModuleKey}&itemid=${parentCode}`);
  };

  if (hubModules.length === 0) return null;

  return (
    <>
      {/* THE GLOBAL HEADER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="pure-btn-primary pure-btn-sz-sm"
        style={{
            background: 'linear-gradient(135deg, #147a6d 0%, #144b2f 100%)',
            boxShadow: '0 2px 4px rgba(20, 122, 109, 0.2)',
            marginInlineEnd: '16px',
            display: 'flex',       /* FIX: Enforce flex layout inside the button */
            alignItems: 'center',  /* FIX: Vertically center the lightning bolt and text */
            gap: '6px'             /* FIX: Add consistent spacing between icon and text */
        }}
        title={t('إنشاء سريع', 'Quick Create')}
        >
        <Zap size={14} color="#FDE047" style={{ fill: '#FDE047' }} />
        {t('إنشاء سريع', 'Quick Create')}
    </button>

      {/* THE QUICK CREATE MODAL */}
      <Modal
        open={isOpen}
        onClose={handleReset}
        titleAr="الإنشاء السريع للقالب"
        titleEn="Quick Hierarchy Builder"
        size="md"
        footer={
          <div className="pure-flex-between" style={{ width: '100%' }}>
            <button onClick={handleReset} className="pure-btn-secondary">{t('إلغاء', 'Cancel')}</button>
            <button onClick={handleSave} className="pure-btn-primary">
               {t('إنشاء والذهاب للمركز', 'Create & Go to Hub')} <ArrowLeft size={16} />
            </button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Step 1: Select Type */}
          <div className="pure-input-group">
            <label className="pure-label">{t('نوع القالب', 'Hierarchy Type')}</label>
            <select
              className="pure-input"
              value={selectedModuleKey}
              onChange={(e) => setSelectedModuleKey(e.target.value)}
            >
              {hubModules.map(m => (
                <option key={m.key} value={m.key}>{t(m.nameAr, m.nameEn)}</option>
              ))}
            </select>
          </div>

          <hr style={{ borderTop: '1px solid #e5e7eb', margin: '0' }} />

          {/* Step 2: Parent Name */}
          <div className="pure-input-group">
            <label className="pure-label">
              {t(`اسم ${selectedConfig?.nameAr || 'العنصر'} الأساسي`, `Main ${selectedConfig?.nameEn || 'Item'} Name`)}
              <span style={{ color: '#ef4444' }}> *</span>
            </label>
            <input
              type="text"
              className="pure-input"
              placeholder={t('مثال: استراتيجية التحول الرقمي', 'e.g. Digital Transformation Strategy')}
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Step 3: Quick Add First-Level Children */}
          {firstChildConfig && (
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <label className="pure-label" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={14} color="#0277BD" />
                {t(`إضافة ${firstChildConfig.nameAr} (اختياري)`, `Add ${firstChildConfig.nameEn} (Optional)`)}
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {childrenNames.map((child, idx) => (
                  <div key={idx} className="pure-flex-between" style={{ gap: '8px' }}>
                    <input
                      type="text"
                      className="pure-input"
                      placeholder={`${idx + 1}. ${t('اكتب اسماً...', 'Type a name...')}`}
                      value={child}
                      onChange={(e) => {
                        const newArr = [...childrenNames];
                        newArr[idx] = e.target.value;
                        setChildrenNames(newArr);
                      }}
                    />
                    <button
                      onClick={() => setChildrenNames(childrenNames.filter((_, i) => i !== idx))}
                      className="pure-btn-secondary pure-btn-sz-sm"
                      style={{ padding: '8px', color: '#ef4444', borderColor: '#fca5a5', background: '#fef2f2' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setChildrenNames([...childrenNames, ''])}
                className="pure-btn-link"
                style={{ marginTop: '12px', fontSize: '13px' }}
              >
                <Plus size={14} /> {t('إضافة حقل آخر', 'Add another field')}
              </button>
            </div>
          )}

        </div>
      </Modal>
    </>
  );
}