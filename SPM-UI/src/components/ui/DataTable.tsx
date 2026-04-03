import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Eye, Edit, Trash2, Plus, ChevronLeft, FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';
import Avatar from './Avatar';
import { useApp } from '../../context/AppContext';
import type { ColumnConfig } from '../../types';

interface DataTableProps {
  moduleKey: string;
  columns: ColumnConfig[];
  data: Record<string, unknown>[];
  loading?: boolean;
  workspaceParam?: string; // e.g. "projectCode=SC-26-000001"
  onAdd?: () => void;
  showExport?: boolean;
  filterComponent?: React.ReactNode;
}

function renderCell(col: ColumnConfig, value: unknown, t: (ar: string, en: string) => string) {
  const raw = String(value ?? '');

  switch (col.type) {
    case 'badge': {
      const color = col.statusColors?.[raw] || '#78909C';
      return <Badge label={raw || t('لا يوجد', 'N/A')} color={raw ? color : '#E8A020'} />;
    }
    case 'people':
      return (
        <div className="flex items-center gap-2">
          <Avatar name={raw || 'U'} size="xs" />
          <span className="text-sm text-gray-700">{raw || t('لا يوجد', 'N/A')}</span>
        </div>
      );
    case 'date':
      if (!raw || raw === 'null') return <span className="text-accent-600 text-sm">{t('لا يوجد', 'N/A')}</span>;
      return <span className="text-sm text-gray-600">{new Date(raw).toLocaleDateString('ar-SA')}</span>;
    case 'number':
      return <span className="text-sm font-medium text-gray-700">{Number(value ?? 0).toLocaleString('ar-SA')}</span>;
    case 'currency':
      return <span className="text-sm font-medium text-gray-700">{Number(value ?? 0).toLocaleString('ar-SA')} {t('ريال', 'SAR')}</span>;
    case 'percentage':
      return <span className="text-sm font-medium text-gray-700">{String(value ?? 0)}%</span>;
    case 'progress': {
      const pct = Number(value ?? 0);
      const color = pct >= 75 ? '#2E7D32' : pct >= 50 ? '#F57F17' : pct >= 25 ? '#E65100' : '#B71C1C';
      return (
        <div className="flex items-center gap-2 min-w-24">
          <div className="progress-bar flex-1">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ backgroundColor: color }}
            />
          </div>
          <span className="text-xs font-medium" style={{ color }}>{pct}%</span>
        </div>
      );
    }
    default:
      if (!raw || raw === 'null' || raw === 'undefined') {
        return <span className="text-accent-600 text-sm font-medium">{t('لا يوجد', 'N/A')}</span>;
      }
      return <span className="text-sm text-gray-700">{raw}</span>;
  }
}

export default function DataTable({
  moduleKey,
  columns,
  data,
  loading = false,
  workspaceParam = '',
  onAdd,
  showExport = true,
  filterComponent,
}: DataTableProps) {
  const { t, language } = useApp();
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSort = (key: string) => {
    if (sortCol === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortCol(key); setSortDir('asc'); }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortCol) return 0;
    const av = String(a[sortCol] ?? '');
    const bv = String(b[sortCol] ?? '');
    return sortDir === 'asc' ? av.localeCompare(bv, 'ar') : bv.localeCompare(av, 'ar');
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const pageData = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const buildRoute = (suffix: string, id?: string) => {
    let base = `/${suffix}?modulekey=${moduleKey}`;
    if (id) base += `&itemid=${id}`;
    if (workspaceParam) base += `&${workspaceParam}`;
    return base;
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shimmer h-12 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters + Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {filterComponent}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {showExport && (
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={() => {}}
            >
              <FileDown size={16} />
              {t('تصدير إلى Excel', 'Export to Excel')}
            </button>
          )}
          {onAdd && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors shadow-sm"
            >
              <Plus size={16} />
              {t('إنشاء +', 'Create +')}
            </motion.button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-700 text-white">
                <th className="py-3.5 px-5 text-right text-xs font-semibold uppercase tracking-wide w-12">#</th>
                {columns.map(col => (
                  <th
                    key={col.key}
                    className="py-3.5 px-5 text-right text-xs font-semibold uppercase tracking-wide"
                    style={{ width: col.width }}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className={`flex items-center gap-1 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''} ${col.sortable ? 'cursor-pointer select-none' : ''}`}>
                      {col.sortable && sortCol === col.key && (
                        sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                      {language === 'ar' ? col.labelAr : col.labelEn}
                    </div>
                  </th>
                ))}
                <th className="py-3.5 px-5 text-right text-xs font-semibold uppercase tracking-wide w-28">{t('الإجراءات', 'Actions')}</th>
                <th className="py-3.5 px-5 w-10" />
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 3} className="text-center py-12 text-gray-400">
                      {t('لا توجد بيانات', 'No data found')}
                    </td>
                  </tr>
                ) : (
                  pageData.map((row, idx) => {
                    const id = String(row.id ?? row.code ?? idx);
                    const expanded = expandedRows.has(id);

                    return (
                      <>
                        <motion.tr
                          key={id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors even:bg-gray-50/30"
                        >
                          <td className="py-3.5 px-5 text-sm text-gray-500 font-medium">
                            {(page - 1) * PER_PAGE + idx + 1}
                          </td>
                          {columns.map(col => (
                            <td key={col.key} className="py-3.5 px-5">
                              {col.type === 'link' ? (
                                <button
                                  onClick={() => navigate(buildRoute('view', id))}
                                  className="text-primary-700 hover:underline font-semibold text-sm"
                                >
                                  {String(row[col.key] ?? '')}
                                </button>
                              ) : (
                                renderCell(col, row[col.key], t)
                              )}
                            </td>
                          ))}
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => navigate(buildRoute('view', id))}
                                className="p-1.5 rounded-lg hover:bg-primary-100 text-primary-700 transition-colors"
                                title={t('عرض', 'View')}
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                onClick={() => navigate(buildRoute('edit', id))}
                                className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-600 transition-colors"
                                title={t('تعديل', 'Edit')}
                              >
                                <Edit size={15} />
                              </button>
                              <button
                                className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                                title={t('حذف', 'Delete')}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-5">
                            <button
                              onClick={() => toggleExpand(id)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                            >
                              <ChevronLeft
                                size={16}
                                className={`transition-transform duration-200 ${expanded ? '-rotate-90' : ''}`}
                              />
                            </button>
                          </td>
                        </motion.tr>

                        {/* Expanded row detail */}
                        <AnimatePresence>
                          {expanded && (
                            <motion.tr
                              key={`${id}-expanded`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <td colSpan={columns.length + 3} className="bg-primary-50/30 px-8 py-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  {Object.entries(row)
                                    .filter(([k]) => !['id'].includes(k))
                                    .slice(0, 8)
                                    .map(([k, v]) => (
                                      <div key={k} className="text-sm">
                                        <span className="text-gray-500 text-xs block mb-0.5">{k}</span>
                                        <span className="font-medium text-gray-800 text-xs">
                                          {v == null || v === '' ? <span className="text-accent-600">لا يوجد</span> : String(v)}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-500 font-medium">
              {t(`إجمالي: ${data.length} سجل`, `Total: ${data.length} records`)}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition-colors"
              >
                {t('السابق', 'Prev')}
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                    page === i + 1
                      ? 'bg-primary-700 text-white'
                      : 'border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100 transition-colors"
              >
                {t('التالي', 'Next')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
