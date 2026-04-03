import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AppContextType, Language, Notification, User } from '../types';
import { NOTIFICATION_ALERTS } from '../data/mockData';

const AppContext = createContext<AppContextType | null>(null);

const CURRENT_USER: User = {
  id: 'u9',
  nameAr: 'باشار توحمة',
  nameEn: 'Bachar Tohme',
  email: 'bachar@tanmia.sa',
  role: 'مسؤول النظام',
  avatar: '',
  department: 'إدارة التقنية',
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');
  const [notifications, setNotifications] = useState<Notification[]>(
    NOTIFICATION_ALERTS as Notification[]
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [importantLinksOpen, setImportantLinksOpen] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (ar: string, en: string) => (language === 'ar' ? ar : en),
    [language]
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser: CURRENT_USER,
        notifications,
        unreadCount,
        markAsRead,
        markAllRead,
        sidebarOpen,
        setSidebarOpen,
        importantLinksOpen,
        setImportantLinksOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
