import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, UserCircle, Check } from 'lucide-react';
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

  const baseInputClass = `form-input ${readOnly ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`;

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
          <div className="flex flex-wrap gap-2">
            {attachments.length === 0 ? (
              <span className="text-gray-400 text-sm">{t('لا يوجد مرفقات', 'No attachments')}</span>
            ) : (
              attachments.map((a, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-primary-50 text-primary-700 rounded-lg px-3 py-1.5 text-sm">
                  <span className="text-blue-500">ℹ</span>
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
          <div className="flex items-center gap-2 py-2">
            {name ? (
              <>
                <Avatar name={name} size="sm" />
                <span className="text-sm text-gray-800">{name}</span>
              </>
            ) : (
              <span className="text-gray-400 text-sm">{t('لا يوجد', 'N/A')}</span>
            )}
          </div>
        );
      }
      if (field.type === 'radio' || field.type === 'select') {
        const opt = field.options?.find(o => o.value === value);
        const displayLabel = opt ? t(opt.labelAr, opt.labelEn) : String(value || t('لا يوجد', 'N/A'));
        return <p className="text-sm text-gray-800 py-1">{displayLabel}</p>;
      }
      if (field.type === 'textarea' || field.type === 'richtext') {
        return <p className="text-sm text-gray-800 py-1 whitespace-pre-wrap">{String(value || t('لا يوجد', 'N/A'))}</p>;
      }
      return <p className="text-sm text-gray-800 py-1">{String(value ?? t('لا يوجد', 'N/A'))}</p>;
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
          <div className="relative">
            <input
              type="number"
              className={baseInputClass}
              value={String(value ?? '')}
              onChange={e => onChange(field.key, e.target.value)}
              min={field.min}
              max={field.max}
              placeholder="0"
            />
            {field.type === 'currency' && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                {t('ريال', 'SAR')}
              </span>
            )}
            {field.type === 'percentage' && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">%</span>
            )}
          </div>
        );

      case 'textarea':
      case 'richtext':
        return (
          <textarea
            className={`${baseInputClass} min-h-24 resize-y`}
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
            className={`${baseInputClass} min-h-24`}
            multiple
            value={Array.isArray(value) ? value as string[] : []}
            onChange={e => {
              const selected = Array.from(e.target.selectedOptions).map(o => o.value);
              onChange(field.key, selected);
            }}
          >
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {t(opt.labelAr, opt.labelEn)}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="flex items-center gap-6 py-2">
            {field.options?.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.key}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(field.key, opt.value)}
                  className="w-4 h-4 accent-primary-700"
                />
                <span className="text-sm text-gray-700">{t(opt.labelAr, opt.labelEn)}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={e => onChange(field.key, e.target.checked)}
              className="w-4 h-4 accent-primary-700"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        );

      case 'people':
        return (
          <div className="relative">
            <button
              type="button"
              onClick={() => setPeoplePicker(true)}
              className={`${baseInputClass} flex items-center gap-2 text-right`}
            >
              {value ? (
                <>
                  <Avatar name={String(value)} size="xs" />
                  <span className="text-sm text-gray-800">{String(value)}</span>
                </>
              ) : (
                <span className="text-gray-400 flex items-center gap-1.5">
                  <UserCircle size={16} />
                  {t('اختر شخصاً...', 'Select a person...')}
                </span>
              )}
            </button>

            <AnimatePresence>
              {peoplePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute z-30 top-full mt-1 w-full bg-white rounded-xl border border-gray-200 shadow-xl"
                >
                  <div className="p-2 border-b border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <Search size={14} className="text-gray-400" />
                      <input
                        autoFocus
                        className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
                        placeholder={t('ابحث عن شخص...', 'Search person...')}
                        value={peopleSearch}
                        onChange={e => setPeopleSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredUsers.map(u => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          onChange(field.key, t(u.nameAr, u.nameEn));
                          setPeoplePicker(false);
                          setPeopleSearch('');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-primary-50 text-right transition-colors"
                      >
                        <Avatar name={t(u.nameAr, u.nameEn)} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{t(u.nameAr, u.nameEn)}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                        {String(value) === t(u.nameAr, u.nameEn) && (
                          <Check size={14} className="text-primary-700 mr-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => { setPeoplePicker(false); setPeopleSearch(''); }}
                    className="w-full text-xs text-gray-400 py-2 hover:bg-gray-50 border-t border-gray-100"
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
          <div className="space-y-2">
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-colors">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">📎</span>
                <span className="text-sm text-gray-500">{t('اسحب وأفلت أو انقر للرفع', 'Drag & drop or click to upload')}</span>
              </div>
              <input
                type="file"
                className="hidden"
                multiple={field.multiple}
                onChange={handleFileChange}
              />
            </label>
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-primary-50 text-primary-700 rounded-lg px-3 py-1.5 text-sm">
                    <span>📄</span>
                    <span className="max-w-32 truncate">{f.name}</span>
                    <button type="button" onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            className={baseInputClass}
            value={String(value ?? '')}
            onChange={e => onChange(field.key, e.target.value)}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-1 ${field.columnSpan === 2 ? 'col-span-2' : 'col-span-1'}`}
    >
      {field.type !== 'checkbox' && (
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
          {field.maxLength && !readOnly && (
            <span className="text-gray-400 text-xs mr-auto">
              {t(`الحد الأقصى لعدد الحروف هو ${field.maxLength} حرف`, `Max ${field.maxLength} characters`)}
            </span>
          )}
        </label>
      )}
      {renderInput()}
    </motion.div>
  );
}
