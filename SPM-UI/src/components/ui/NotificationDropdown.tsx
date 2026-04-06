import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, AlertTriangle, ClipboardCheck, AlertOctagon, Megaphone, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { NotificationType } from '../../types';

const TYPE_ICONS: Record<NotificationType, { icon: any, color: string }> = { task: { icon: ClipboardCheck, color: '#F57F17' }, risk: { icon: AlertTriangle, color: '#B71C1C' }, issue: { icon: AlertOctagon, color: '#E65100' }, notification: { icon: Info, color: '#0277BD' }, announcement: { icon: Megaphone, color: '#6A1B9A' } };
const TYPE_LABELS: Record<NotificationType, { ar: string; en: string }> = { task: { ar: 'المهام', en: 'Tasks' }, risk: { ar: 'المخاطر', en: 'Risks' }, issue: { ar: 'القضايا', en: 'Issues' }, notification: { ar: 'الإشعارات', en: 'Notifications' }, announcement: { ar: 'الإعلانات', en: 'Announcements' } };
type Tab = NotificationType | 'all'; const TABS: Tab[] = ['all', 'task', 'risk', 'issue', 'notification', 'announcement'];

export default function NotificationDropdown() {
  const { t, notifications, unreadCount, markAsRead, markAllRead } = useApp();
  const [open, setOpen] = useState(false); const [activeTab, setActiveTab] = useState<Tab>('all');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler); return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = activeTab === 'all' ? notifications : notifications.filter(n => n.type === activeTab);
  const tabCount = (tab: Tab) => tab === 'all' ? notifications.filter(n => !n.isRead).length : notifications.filter(n => n.type === tab && !n.isRead).length;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} className="pure-notif-btn">
        <Bell size={20} />
        <span style={{ fontWeight: '600' }}>{t('التنبيهات', 'Alerts')}</span>
        {unreadCount > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="pure-notif-badge">{unreadCount > 99 ? '99+' : unreadCount}</motion.span>}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.15 }} className="pure-notif-dropdown">
            <div className="pure-notif-header">
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{t('التنبيهات والإشعارات', 'Alerts & Notifications')}</span>
              {unreadCount > 0 && <button onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#a7f3d0', cursor: 'pointer', fontSize: '12px' }}><CheckCheck size={14} />{t('تعليم الكل كمقروء', 'Mark all read')}</button>}
            </div>
            <div className="pure-notif-tabs custom-scrollbar">
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`pure-notif-tab ${activeTab === tab ? 'active' : ''}`}>
                  {tab === 'all' ? t('الكل', 'All') : t(TYPE_LABELS[tab as NotificationType].ar, TYPE_LABELS[tab as NotificationType].en)}
                  {tabCount(tab) > 0 && <span style={{ background: '#dc2626', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>{tabCount(tab)}</span>}
                </button>
              ))}
            </div>
            <div className="custom-scrollbar" style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}><Bell size={32} style={{ margin: '0 auto 8px auto' }} /><p style={{ margin: 0, fontSize: '14px' }}>{t('لا توجد إشعارات', 'No notifications')}</p></div>
              ) : (
                filtered.map(n => {
                  const meta = TYPE_ICONS[n.type]; const IconCmp = meta.icon;
                  return (
                    <motion.button key={n.id} onClick={() => markAsRead(n.id)} className={`pure-notif-item ${!n.isRead ? 'unread' : ''}`}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: `${meta.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconCmp size={16} color={meta.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: !n.isRead ? 'bold' : 'normal', color: '#111827', margin: '0 0 4px 0', fontSize: '14px' }}>{t(n.titleAr, n.titleEn)}</p>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>{t(n.messageAr, n.messageEn)}</p>
                        <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{new Date(n.createdAt).toLocaleDateString('ar-SA')}</p>
                      </div>
                      {!n.isRead && <div style={{ width: '8px', height: '8px', background: '#147a6d', borderRadius: '50%', marginTop: '6px' }} />}
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}