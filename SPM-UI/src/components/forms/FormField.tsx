import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, UserCircle, Check, UploadCloud, Paperclip } from 'lucide-react';
import type { FieldConfig } from '../../types';
import { useApp } from '../../context/AppContext';
import { MOCK_USERS } from '../../data/mockData';
import Avatar from '../ui/Avatar';

interface FormFieldProps {
  field: FieldConfig;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
  readOnly?: boolean;
}

export default function FormField({ field, value, onChange, readOnly = false }: FormFieldProps) {
  const { t } = useApp();
  const [peoplePicker, setPeoplePicker] = useState(false);
  const [peopleSearch, setPeopleSearch] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const label = t(field.labelAr, field.labelEn);
  const required = field.required;

  const baseInputClass = `pure-input ${readOnly ? 'readonly' : ''}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selected]);
    onChange(field.key, selected.map(f => f.name));
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const filteredUsers = MOCK_USERS.filter(u =>
    t(u.nameAr, u.nameEn).toLowerCase().includes(peopleSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(peopleSearch.toLowerCase())
  );

  const renderInput = () => {
    if (readOnly) {
      if (field.type === 'file') {
        const attachments = Array.isArray(value) ? value : value ? [value] : [];
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
            {attachments.length === 0 ? (
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>{t('لا يوجد مرفقات', 'No attachments')}</span>
            ) : (
              attachments.map((a, i) => (
                <div key={i} className="pure-file-badge">
                  <span style={{ color: '#1B5E3B' }}><Paperclip size={14} /></span>
                  <span>{String(a)}</span>
                </div>
              ))
            )}
          </div>
        );
      }
      if (field.type === 'people') {
        const name = String(value || '');
        return (
          <div className="pure-input readonly" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px' }}>
            {name ? (
              <>
                <Avatar name={name} size="sm" />
                <span style={{ fontWeight: '700', color: '#1f2937' }}>{name}</span>
              </>
            ) : (
              <span style={{ color: '#9ca3af' }}>{t('لا يوجد', 'N/A')}</span>
            )}
          </div>
        );
      }
      if (field.type === 'radio' || field.type === 'select') {
        const opt = field.options?.find(o => o.value === value);
        const displayLabel = opt ? t(opt.labelAr, opt.labelEn) : String(value || t('لا يوجد', 'N/A'));
        return <div className="pure-input readonly">{displayLabel}</div>;
      }
      if (field.type === 'textarea' || field.type === 'richtext') {
        return <div className="pure-input readonly" style={{ minHeight: '100px', whiteSpace: 'pre-wrap' }}>{String(value || t('لا يوجد', 'N/A'))}</div>;
      }
      return <div className="pure-input readonly">{String(value ?? t('لا يوجد', 'N/A'))}</div>;
    }

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={field.type}
            className={baseInputClass}
            value={String(value ?? '')}
            onChange={e => onChange(field.key, e.target.value)}
            placeholder={field.placeholder || `${t('أدخل', 'Enter')} ${label}`}
            maxLength={field.maxLength}
          />
        );

      case 'number':
      case 'currency':
      case 'percentage':
        return (
          <div className="pure-input-wrapper">
            <input
              type="number"
              className={`${baseInputClass} ${field.type !== 'number' ? 'pure-input-with-addon' : ''}`}
              value={String(value ?? '')}
              onChange={e => onChange(field.key, e.target.value)}
              min={field.min}
              max={field.max}
              placeholder="0"
            />
            {field.type === 'currency' && <span className="pure-input-addon">{t('ريال', 'SAR')}</span>}
            {field.type === 'percentage' && <span className="pure-input-addon">%</span>}
          </div>
        );

      case 'textarea':
      case 'richtext':
        return (
          <textarea
            className={baseInputClass}
            style={{ minHeight: '120px', resize: 'vertical' }}
            value={String(value ?? '')}
            onChange={e => onChange(field.key, e.target.value)}
            placeholder={field.placeholder || `${t('أدخل', 'Enter')} ${label}`}
            maxLength={field.maxLength}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            className={baseInputClass}
            value={String(value ?? '')}
            onChange={e => onChange(field.key, e.target.value)}
          />
        );

      case 'select':
        return (
          <select
            className={baseInputClass}
            value={String(value ?? '')}
            onChange={e => onChange(field.key, e.target.value)}
          >
            <option value="">{t('-- اختر --', '-- Select --')}</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {t(opt.labelAr, opt.labelEn)}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <select
            className={baseInputClass}
            style={{ minHeight: '120px', padding: '8px' }}
            multiple
            value={Array.isArray(value) ? value as string[] : []}
            onChange={e => {
              const selected = Array.from(e.target.selectedOptions).map(o => o.value);
              onChange(field.key, selected);
            }}
          >
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value} style={{ padding: '8px', cursor: 'pointer' }}>
                {t(opt.labelAr, opt.labelEn)}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="pure-radio-group">
            {field.options?.map(opt => (
              <label key={opt.value} className="pure-radio-label">
                <input
                  type="radio"
                  name={field.key}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(field.key, opt.value)}
                  className="pure-radio-input"
                />
                <div className="pure-radio-custom" />
                <span>{t(opt.labelAr, opt.labelEn)}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="pure-checkbox-wrapper">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={e => onChange(field.key, e.target.checked)}
              className="pure-checkbox-input"
            />
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937' }}>{label}</span>
          </label>
        );

      case 'people':
        return (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setPeoplePicker(true)}
              className={`${baseInputClass} pure-people-btn`}
            >
              {value ? (
                <>
                  <Avatar name={String(value)} size="xs" />
                  <span style={{ fontWeight: '700', color: '#1f2937' }}>{String(value)}</span>
                </>
              ) : (
                <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserCircle size={18} />
                  {t('اختر شخصاً...', 'Select a person...')}
                </span>
              )}
            </button>

            <AnimatePresence>
              {peoplePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="pure-people-dropdown"
                >
                  <div className="pure-people-search-box">
                    <div className="pure-people-search-inner">
                      <Search size={16} color="#9ca3af" />
                      <input
                        autoFocus
                        className="pure-people-search-input"
                        placeholder={t('ابحث عن شخص...', 'Search person...')}
                        value={peopleSearch}
                        onChange={e => setPeopleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="pure-people-list custom-scrollbar">
                    {filteredUsers.map(u => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          onChange(field.key, t(u.nameAr, u.nameEn));
                          setPeoplePicker(false);
                          setPeopleSearch('');
                        }}
                        className="pure-people-option"
                      >
                        <Avatar name={t(u.nameAr, u.nameEn)} size="sm" />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '700', color: '#1f2937', margin: '0 0 2px 0' }}>{t(u.nameAr, u.nameEn)}</p>
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{u.email}</p>
                        </div>
                        {String(value) === t(u.nameAr, u.nameEn) && (
                          <Check size={16} color="#1B5E3B" style={{ marginInlineStart: 'auto' }} />
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => { setPeoplePicker(false); setPeopleSearch(''); }}
                    style={{ width: '100%', padding: '12px', background: '#f9fafb', border: 'none', borderTop: '1px solid #f3f4f6', fontWeight: 'bold', color: '#6b7280', cursor: 'pointer' }}
                  >
                    {t('إغلاق', 'Close')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'file':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="pure-file-dropzone">
              <div className="pure-file-icon-btn">
                <UploadCloud size={20} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#4b5563', marginBottom: '4px' }}>{t('اسحب وأفلت أو انقر للرفع', 'Drag & drop or click to upload')}</span>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>PNG, JPG, PDF up to 10MB</span>
              <input type="file" style={{ display: 'none' }} multiple={field.multiple} onChange={handleFileChange} />
            </label>
            {files.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {files.map((f, i) => (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={i} className="pure-file-badge">
                    <span style={{ color: '#1B5E3B' }}><Paperclip size={14} /></span>
                    <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                    <button type="button" onClick={() => removeFile(i)} className="pure-file-remove">
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        );

      default:
        return (
          <input type="text" className={baseInputClass} value={String(value ?? '')} onChange={e => onChange(field.key, e.target.value)} />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ gridColumn: field.columnSpan === 2 ? 'span 2' : 'span 1', display: 'flex', flexDirection: 'column' }}
    >
      {field.type !== 'checkbox' && (
        <label className="pure-form-label">
          {label}
          {required && <span className="pure-form-label-required">*</span>}
          {field.maxLength && !readOnly && (
            <span className="pure-form-label-hint">
              {t(`الحد الأقصى ${field.maxLength}`, `Max ${field.maxLength}`)}
            </span>
          )}
        </label>
      )}
      {renderInput()}
    </motion.div>
  );
}