import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, AlertTriangle, ClipboardCheck, AlertOctagon, Megaphone, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { NotificationType } from '../../types';

const TYPE_ICONS: Record<NotificationType, { icon: React.FC<{size: number}>, color: string }> = {
  task:         { icon: ClipboardCheck, color: '#F57F17' },
  risk:         { icon: AlertTriangle,  color: '#B71C1C' },
  issue:        { icon: AlertOctagon,   color: '#E65100' },
  notification: { icon: Info,           color: '#0277BD' },
  announcement: { icon: Megaphone,      color: '#6A1B9A' },
};

const TYPE_LABELS: Record<NotificationType, { ar: string; en: string }> = {
  task:         { ar: 'المهام',       en: 'Tasks'         },
  risk:         { ar: 'المخاطر',      en: 'Risks'         },
  issue:        { ar: 'القضايا',      en: 'Issues'        },
  notification: { ar: 'الإشعارات',    en: 'Notifications' },
  announcement: { ar: 'الإعلانات',    en: 'Announcements' },
};

type Tab = NotificationType | 'all';
const TABS: Tab[] = ['all', 'task', 'risk', 'issue', 'notification', 'announcement'];

export default function NotificationDropdown() {
  const { t, notifications, unreadCount, markAsRead, markAllRead } = useApp();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeTab);

  const tabCount = (tab: Tab) =>
    tab === 'all' ? notifications.filter(n => !n.isRead).length
    : notifications.filter(n => n.type === tab && !n.isRead).length;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white"
      >
        <Bell size={20} />
        <span className="text-sm font-medium">{t('التنبيهات', 'Alerts')}</span>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary-700 text-white">
              <span className="font-bold text-sm">{t('التنبيهات والإشعارات', 'Alerts & Notifications')}</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs hover:text-accent-300 transition-colors"
                >
                  <CheckCheck size={14} />
                  {t('تعليم الكل كمقروء', 'Mark all read')}
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3 py-2 text-xs font-medium whitespace-nowrap flex items-center gap-1 transition-colors shrink-0 ${
                    activeTab === tab ? 'text-primary-700 border-b-2 border-primary-700 bg-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'all'
                    ? t('الكل', 'All')
                    : t(TYPE_LABELS[tab as NotificationType].ar, TYPE_LABELS[tab as NotificationType].en)}
                  {tabCount(tab) > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {tabCount(tab)}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <Bell size={32} strokeWidth={1} />
                  <p className="text-sm mt-2">{t('لا توجد إشعارات', 'No notifications')}</p>
                </div>
              ) : (
                filtered.map(n => {
                  const meta = TYPE_ICONS[n.type];
                  const IconCmp = meta.icon;
                  return (
                    <motion.button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className={`w-full flex items-start gap-3 px-4 py-3 border-b border-gray-50 text-right transition-colors ${
                        !n.isRead ? 'bg-primary-50/50' : ''
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${meta.color}18` }}
                      >
                        {/* @ts-expect-error lucide color */}
                        <IconCmp size={16} color={meta.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!n.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {t(n.titleAr, n.titleEn)}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {t(n.messageAr, n.messageEn)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(n.createdAt).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      {!n.isRead && (
                        <div className="w-2 h-2 bg-primary-600 rounded-full shrink-0 mt-2" />
                      )}
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
