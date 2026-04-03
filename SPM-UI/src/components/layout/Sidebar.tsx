import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Link2, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SIDE_NAV_ITEMS } from '../../data/modules';
import { IMPORTANT_LINKS } from '../../data/mockData';
import type { NavItem } from '../../types';

// Dynamic icon renderer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NavIcon({ name, size = 18 }: { name?: string; size?: number }) {
  if (!name) return null;
  const Icon = (LucideIcons as Record<string, any>)[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}

function SideNavItem({ item, level = 0 }: { item: NavItem; level?: number }) {
  const { t } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.route
    ? location.pathname + location.search === item.route ||
      location.pathname === item.route?.split('?')[0]
    : false;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(e => !e);
    } else if (item.route) {
      if (item.route.startsWith('http')) {
        window.open(item.route, '_blank');
      } else {
        navigate(item.route);
      }
    }
  };

  if (item.isSection) {
    return (
      <div className="mt-1">
        <button
          onClick={handleClick}
          className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-lg group"
        >
          <span className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            <NavIcon name={item.icon} size={16} />
          </span>
          <span className="flex-1 text-xs font-bold uppercase tracking-wide text-right">
            {t(item.labelAr, item.labelEn)}
          </span>
          <ChevronDown
            size={14}
            className={`shrink-0 transition-transform duration-200 opacity-60 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mr-4 border-r border-white/10 pr-2 py-1">
                {item.children?.map(child => (
                  <SideNavItem key={child.key} item={child} level={level + 1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ x: -2 }}
      onClick={handleClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
        ${level === 0 ? 'text-sm' : 'text-xs'}
        ${isActive
          ? 'bg-white/15 text-white border-r-2 border-accent-400'
          : 'text-white/75 hover:text-white hover:bg-white/10'
        }
      `}
    >
      {item.icon && (
        <span className={`shrink-0 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
          <NavIcon name={item.icon} size={level === 0 ? 18 : 14} />
        </span>
      )}
      <span className="flex-1 text-right font-medium">{t(item.labelAr, item.labelEn)}</span>
      {item.badge !== undefined && item.badge > 0 && (
        <span className="bg-accent-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shrink-0">
          {item.badge}
        </span>
      )}
    </motion.button>
  );
}

export default function Sidebar() {
  const { t, importantLinksOpen, setImportantLinksOpen } = useApp();
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={{ x: 80 }}
      animate={{ x: 0 }}
      className="fixed top-0 right-0 h-screen w-64 bg-primary-700 flex flex-col z-40 overflow-hidden shadow-2xl"
    >
      {/* Logo */}
      <div
        className="flex flex-col items-center justify-center py-5 border-b border-white/15 cursor-pointer shrink-0"
        onClick={() => navigate('/')}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-1"
        >
          {/* Logo icon */}
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
            <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
              <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="2"/>
              <path d="M10 20 Q20 8 30 20 Q20 32 10 20Z" fill="white" opacity="0.8"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white font-black text-xl tracking-wider">تنمية</p>
            <p className="text-white/60 text-xs leading-tight">البرنامج الوطني للتنمية</p>
            <p className="text-white/60 text-xs leading-tight">المجتمعية في المناطق</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {SIDE_NAV_ITEMS.map(item => (
          <SideNavItem key={item.key} item={item} />
        ))}
      </nav>

      {/* Important Links Button */}
      <div className="border-t border-white/15 p-3 shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setImportantLinksOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 text-sm font-medium"
        >
          <Link2 size={16} />
          {t('روابط مهمة', 'Important Links')}
        </motion.button>
      </div>

      {/* Important Links Panel */}
      <AnimatePresence>
        {importantLinksOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-primary-800 flex flex-col z-50"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h3 className="text-white font-bold">{t('روابط مهمة', 'Important Links')}</h3>
              <button
                onClick={() => setImportantLinksOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {IMPORTANT_LINKS.map(link => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  whileHover={{ x: -4, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  className="flex items-center gap-3 p-3 rounded-xl text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
                    <NavIcon name={link.icon} size={18} />
                  </div>
                  <span className="text-sm font-medium flex-1">{t(link.titleAr, link.titleEn)}</span>
                  {link.url.startsWith('http') && <ExternalLink size={12} className="opacity-50 shrink-0" />}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
