import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Eye, Edit, Trash2, Plus, ChevronLeft, FileDown, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';
import Avatar from './Avatar';
import { useApp } from '../../context/AppContext';
import type { ColumnConfig } from '../../types';
import { getModuleConfig } from '../../data/moduleConfigs';
interface DataTableProps { moduleKey: string; columns: ColumnConfig[]; data: Record<string, unknown>[]; loading?: boolean; workspaceParam?: string; onAdd?: () => void; showExport?: boolean; filterComponent?: React.ReactNode; }

function renderCell(col: ColumnConfig, value: unknown, t: (ar: string, en: string) => string) {
  const raw = String(value ?? '');
  switch (col.type) {
    case 'badge': return <Badge label={raw || t('لا يوجد', 'N/A')} color={raw ? col.statusColors?.[raw] || '#78909C' : '#E8A020'} />;
    case 'people': return <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Avatar name={raw || 'U'} size="xs" /><span style={{ fontSize: '14px' }}>{raw || t('لا يوجد', 'N/A')}</span></div>;
    case 'date': return <span style={{ fontSize: '14px', color: '#4b5563' }}>{(!raw || raw === 'null') ? t('لا يوجد', 'N/A') : new Date(raw).toLocaleDateString('ar-SA')}</span>;
    case 'number': return <span style={{ fontSize: '14px', fontWeight: '500' }}>{Number(value ?? 0).toLocaleString('ar-SA')}</span>;
    case 'currency': return <span style={{ fontSize: '14px', fontWeight: '500' }}>{Number(value ?? 0).toLocaleString('ar-SA')} {t('ريال', 'SAR')}</span>;
    case 'percentage': return <span style={{ fontSize: '14px', fontWeight: '500' }}>{String(value ?? 0)}%</span>;
    case 'progress': {
      const pct = Number(value ?? 0); const color = pct >= 75 ? '#2E7D32' : pct >= 50 ? '#F57F17' : pct >= 25 ? '#E65100' : '#B71C1C';
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '96px' }}>
          <div style={{ flex: 1, height: '6px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden' }}><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} style={{ height: '100%', backgroundColor: color }} /></div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color }}>{pct}%</span>
        </div>
      );
    }
    default: return <span style={{ fontSize: '14px' }}>{(!raw || raw === 'null' || raw === 'undefined') ? t('لا يوجد', 'N/A') : raw}</span>;
  }
}

export default function DataTable({ moduleKey, columns, data, loading = false, workspaceParam = '', onAdd, showExport = true, filterComponent }: DataTableProps) {
  const { t, language } = useApp(); const navigate = useNavigate();
  const config = getModuleConfig(moduleKey);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState(''); const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1); const PER_PAGE = 10;

  const toggleExpand = (id: string) => { setExpandedRows(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const handleSort = (key: string) => { if (sortCol === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc')); else { setSortCol(key); setSortDir('asc'); } };

  const sorted = [...data].sort((a, b) => { if (!sortCol) return 0; const av = String(a[sortCol] ?? ''), bv = String(b[sortCol] ?? ''); return sortDir === 'asc' ? av.localeCompare(bv, 'ar') : bv.localeCompare(av, 'ar'); });
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const pageData = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // THE FIX: Smart Route Builder
  // If we click a Project or Initiative row, it automatically injects its code to trigger the Workspace scope!
  const buildRoute = (suffix: string, id?: string) => {
    let base = `/${suffix}?modulekey=${moduleKey}`;
    if (id) base += `&itemid=${id}`;

    if (moduleKey === 'Projects' && id) {
      base += `&projectCode=${id}`;
    } else if (moduleKey === 'Initiatives' && id) {
      base += `&initiativeCode=${id}`;
    } else if (workspaceParam) {
      base += `&${workspaceParam}`;
    }

    return base;
  };

  if (loading) return <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>{Array.from({ length: 6 }).map((_, i) => <div key={i} className="pure-shimmer" style={{ height: '48px', borderRadius: '8px' }} />)}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, flexWrap: 'wrap' }}>{filterComponent}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {showExport && <button className="pure-btn-secondary"><FileDown size={16} />{t('تصدير', 'Export')}</button>}
          {onAdd && <button onClick={onAdd} className="pure-btn-primary"><Plus size={16} />{t('إنشاء +', 'Create +')}</button>}
        </div>
      </div>

      <div className="pure-table-container">
        <table className="pure-table">
          <thead>
            <tr>
              <th style={{ width: '48px' }}>#</th>
              {columns.map(col => (
                <th key={col.key} style={{ width: col.width, cursor: col.sortable ? 'pointer' : 'default' }} onClick={() => col.sortable && handleSort(col.key)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: language === 'ar' ? 'row-reverse' : 'row', justifyContent: language === 'ar' ? 'flex-end' : 'flex-start' }}>
                    {col.sortable && sortCol === col.key && (sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    {language === 'ar' ? col.labelAr : col.labelEn}
                  </div>
                </th>
              ))}
              <th style={{ width: '120px' }}>{t('الإجراءات', 'Actions')}</th>
              <th style={{ width: '40px' }} />
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {pageData.length === 0 ? (
                <tr><td colSpan={columns.length + 3} style={{ textAlign: 'center', padding: '48px', color: '#9ca3af' }}>{t('لا توجد بيانات', 'No data found')}</td></tr>
              ) : (
                pageData.map((row, idx) => {
                  // THE FIX: Prioritize `row.code` over `row.id` so the Workspace Route gets the correct SC-26-XXXX format
                  const id = String(row.code ?? row.id ?? idx);
                  const expanded = expandedRows.has(id);

                  return (
                    <React.Fragment key={id}>
                      <motion.tr initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: idx * 0.04 }}>
                        <td style={{ color: '#6b7280', fontWeight: '600' }}>{(page - 1) * PER_PAGE + idx + 1}</td>
                        {columns.map(col => (
                          <td key={col.key}>
                            {col.type === 'link' ? <button onClick={() => navigate(buildRoute('view', id))} style={{ background: 'none', border: 'none', color: '#1B5E3B', fontWeight: 'bold', cursor: 'pointer' }}>{String(row[col.key] ?? '')}</button> : renderCell(col, row[col.key], t)}
                          </td>
                        ))}
                        <td>
                          <div className="pure-table-actions">
                            {config.setupHub?.enabled && (
                              <button
                                onClick={() => navigate(`/setup-hub?modulekey=${moduleKey}&itemid=${itemId || String(item.id)}`)}
                                className="pure-btn-base pure-btn-sz-sm pure-btn-hub"
                              >
                                <Layers size={16} />
                                {t('فتح مركز الإعداد', 'Open Setup Hub')}
                              </button>
                            )}
                            <button onClick={() => navigate(buildRoute('view', id))} className="pure-table-action-btn view"><Eye size={16} /></button>
                            <button onClick={() => navigate(buildRoute('edit', id))} className="pure-table-action-btn edit"><Edit size={16} /></button>
                            <button className="pure-table-action-btn delete"><Trash2 size={16} /></button>
                          </div>
                        </td>
                        <td>
                          <button onClick={() => toggleExpand(id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                            <ChevronLeft size={18} style={{ transform: expanded ? 'rotate(-90deg)' : 'none', transition: '0.2s' }} />
                          </button>
                        </td>
                      </motion.tr>
                      <AnimatePresence>
                        {expanded && (
                          <motion.tr initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                            <td colSpan={columns.length + 3} style={{ background: 'rgba(27, 94, 59, 0.02)', padding: '16px 32px' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                {Object.entries(row).filter(([k]) => !['id'].includes(k)).slice(0, 8).map(([k, v]) => (
                                  <div key={k}><span style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>{k}</span><span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{v == null || v === '' ? '-' : String(v)}</span></div>
                                ))}
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="pure-pagination-bar">
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>{t(`إجمالي: ${data.length} سجل`, `Total: ${data.length} records`)}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="pure-btn-secondary pure-btn-sz-sm">{t('السابق', 'Prev')}</button>
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                <button key={i + 1} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'pure-btn-primary pure-btn-sz-sm' : 'pure-btn-secondary pure-btn-sz-sm'}>{i + 1}</button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="pure-btn-secondary pure-btn-sz-sm">{t('التالي', 'Next')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}