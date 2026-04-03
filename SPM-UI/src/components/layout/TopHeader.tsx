import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import NotificationDropdown from '../ui/NotificationDropdown';
import Avatar from '../ui/Avatar';

export default function TopHeader({ titleAr, titleEn }: { titleAr?: string; titleEn?: string }) {
  const { t, language, setLanguage, currentUser } = useApp();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 bg-primary-700 flex items-center justify-between px-8 z-30 shadow-md shrink-0 w-full">
      {/* Right: Title */}
      <div className="flex items-center gap-3">
        {titleAr && (
          <h1 className="text-white font-bold text-lg">
            {t(titleAr, titleEn || titleAr)}
          </h1>
        )}
      </div>

      {/* Left: Actions */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/15 text-white text-sm transition-colors"
        >
          <Globe size={16} />
          <span className="font-medium">{language === 'ar' ? 'English' : 'عربي'}</span>
        </motion.button>

        {/* Notifications */}
        <NotificationDropdown />

        {/* User Menu */}
        <div ref={userRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setUserMenuOpen(o => !o)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/15 text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Avatar name={t(currentUser.nameAr, currentUser.nameEn)} size="sm" color="#E8A020" />
              <div className="text-right">
                <p className="text-sm font-semibold leading-tight">{t(currentUser.nameAr, currentUser.nameEn)}</p>
                <p className="text-xs text-white/60 leading-tight">{currentUser.role}</p>
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`text-white/60 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
            />
          </motion.button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1 left-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                <div className="p-4 bg-primary-50 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{t(currentUser.nameAr, currentUser.nameEn)}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                  <p className="text-xs text-primary-600 mt-0.5">{currentUser.role}</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right transition-colors">
                    <User size={15} className="text-gray-400" />
                    {t('الملف الشخصي', 'Profile')}
                  </button>
                  <button
                    onClick={() => navigate('/list?modulekey=Configurations')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right transition-colors"
                  >
                    <Settings size={15} className="text-gray-400" />
                    {t('الإعدادات', 'Settings')}
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-right transition-colors">
                      <LogOut size={15} />
                      {t('تسجيل الخروج', 'Sign Out')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
