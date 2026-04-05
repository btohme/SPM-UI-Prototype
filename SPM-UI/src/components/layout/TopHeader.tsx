import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import NotificationDropdown from '../ui/NotificationDropdown';
import Avatar from '../ui/Avatar';
import GlobalQuickCreate from '../ui/GlobalQuickCreate';
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
    <header className="pure-top-header">
      <div>
        {titleAr && <h1 className="pure-header-title">{t(titleAr, titleEn || titleAr)}</h1>}
      </div>

      <div className="pure-header-actions">
<div className="pure-flex-end" style={{ gap: '16px', alignItems: 'center' }}>
   {/* Inject the Quick Create Button Here */}
   <GlobalQuickCreate />

   {/* Your existing notification icon, language switcher, etc. */}
</div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="pure-lang-btn">
          <Globe size={18} />
          <span>{language === 'ar' ? 'English' : 'عربي'}</span>
        </motion.button>

        <div style={{ color: '#4b5563', cursor: 'pointer' }}><NotificationDropdown /></div>

        <div ref={userRef} className="pure-user-menu-wrapper">
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => setUserMenuOpen(o => !o)} className="pure-user-btn">
            <div className="pure-user-info">
              <Avatar name={t(currentUser.nameAr, currentUser.nameEn)} size="md" color="#E8A020" />
              <div className="pure-user-text-wrapper">
                <p className="pure-user-name">{t(currentUser.nameAr, currentUser.nameEn)}</p>
                <p className="pure-user-role">{currentUser.role}</p>
              </div>
            </div>
            <ChevronDown size={16} style={{ color: '#9ca3af', transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </motion.button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="pure-dropdown-menu">
                <div className="pure-dropdown-header">
                  <p className="pure-dropdown-name">{t(currentUser.nameAr, currentUser.nameEn)}</p>
                  <p className="pure-dropdown-email">{currentUser.email}</p>
                  <span className="pure-dropdown-role-badge">{currentUser.role}</span>
                </div>
                <div className="pure-dropdown-body">
                  <button className="pure-dropdown-item"><User size={18} style={{ color: '#9ca3af' }} />{t('الملف الشخصي', 'Profile')}</button>
                  <button onClick={() => navigate('/list?modulekey=Configurations')} className="pure-dropdown-item"><Settings size={18} style={{ color: '#9ca3af' }} />{t('الإعدادات', 'Settings')}</button>
                  <div style={{ borderTop: '1px solid #f3f4f6', marginTop: '8px', paddingTop: '8px' }}>
                    <button className="pure-dropdown-item danger"><LogOut size={18} />{t('تسجيل الخروج', 'Sign Out')}</button>
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