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
      <div>
        <button onClick={handleClick} className="pure-pill">
          <span style={{ opacity: 0.8 }}><NavIcon name={item.icon} size={20} /></span>
          <span className="pure-pill-text" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {t(item.labelAr, item.labelEn)}
          </span>
          <ChevronDown size={16} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', opacity: 0.5 }} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
              <div className="pure-submenu">
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={isActive ? "pure-pill active" : "pure-pill"}
    >
      <span style={{ opacity: isActive ? 1 : 0.7 }}>
        <NavIcon name={item.icon} size={level === 0 ? 22 : 18} />
      </span>
      <span className="pure-pill-text">{t(item.labelAr, item.labelEn)}</span>

      {item.badge !== undefined && item.badge > 0 && (
        <span style={{ background: isActive ? '#0e3d25' : 'rgba(255,255,255,0.2)', color: isActive ? '#E8A020' : 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
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
    <aside className="pure-sidebar">
      {/* Logo Area */}
      <div className="pure-logo-area" onClick={() => navigate('/')}>
        <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
              <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="2.5"/>
              <path d="M10 20 Q20 8 30 20 Q20 32 10 20Z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'white', fontWeight: '900', fontSize: '28px', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>تنمية</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>البرنامج الوطني للتنمية</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="pure-nav-area no-scrollbar">
        {SIDE_NAV_ITEMS.map(item => (
          <SideNavItem key={item.key} item={item} />
        ))}
      </nav>

      {/* Important Links Button */}
      <div style={{ background: 'rgba(0,0,0,0.15)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => setImportantLinksOpen(true)} className="pure-bottom-btn" style={{ width: 'calc(100% - 40px)' }}>
          <Link2 size={18} />
          {t('روابط مهمة', 'Important Links')}
        </button>
      </div>

      {/* Important Links Panel */}
      <AnimatePresence>
        {importantLinksOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(14, 61, 37, 0.98)', backdropFilter: 'blur(10px)', zIndex: 50, display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>{t('روابط مهمة', 'Important Links')}</h3>
              <button onClick={() => setImportantLinksOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {IMPORTANT_LINKS.map(link => (
                <a key={link.id} href={link.url} target={link.url.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', color: 'white', textDecoration: 'none' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <NavIcon name={link.icon} size={24} />
                  </div>
                  <span style={{ flex: 1, fontWeight: 'bold' }}>{t(link.titleAr, link.titleEn)}</span>
                  {link.url.startsWith('http') && <ExternalLink size={16} style={{ opacity: 0.5 }} />}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}