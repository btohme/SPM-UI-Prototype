import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { HorizontalNavItem } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HNavIcon({ name, size = 16 }: { name?: string; size?: number }) {
  if (!name) return null;
  const Icon = (LucideIcons as Record<string, any>)[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}

interface HorizontalNavProps {
  items: HorizontalNavItem[];
  workspaceTitle?: string;
  workspaceCode?: string;
  workspaceType?: 'project' | 'initiative';
  workspaceParam?: string;
}

export default function HorizontalNav({ items, workspaceTitle, workspaceCode, workspaceType }: HorizontalNavProps) {
  const { t } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item: HorizontalNavItem) => {
    if (!item.route) return false;

    const currentSearchParams = new URLSearchParams(location.search);
    const currentModuleKey = currentSearchParams.get('modulekey');

    // If the nav item points to a specific module (like Risks, Issues)
    if (item.moduleKey) {
      return currentModuleKey === item.moduleKey;
    }

    // If the nav item is the main dashboard (no modulekey)
    const itemPath = item.route.split('?')[0];
    return location.pathname === itemPath && !currentModuleKey;
  };

  // THE FIX: Smart Interceptor
  // Automatically upgrades old `code=` params from modules.ts to the new standard
  const handleNavClick = (route?: string) => {
    if (!route) return;
    let finalRoute = route;

    if (workspaceType === 'project' && workspaceCode) {
      finalRoute = finalRoute.replace(`code=${workspaceCode}`, `projectCode=${workspaceCode}`);
      // Failsafe: If the route is entirely missing the parameter, append it
      if (!finalRoute.includes('projectCode=')) {
        finalRoute += finalRoute.includes('?') ? `&projectCode=${workspaceCode}` : `?projectCode=${workspaceCode}`;
      }
    } else if (workspaceType === 'initiative' && workspaceCode) {
      finalRoute = finalRoute.replace(`code=${workspaceCode}`, `initiativeCode=${workspaceCode}`);
      // Failsafe: If the route is entirely missing the parameter, append it
      if (!finalRoute.includes('initiativeCode=')) {
        finalRoute += finalRoute.includes('?') ? `&initiativeCode=${workspaceCode}` : `?initiativeCode=${workspaceCode}`;
      }
    }

    navigate(finalRoute);
  };

  return (
    <div className="pure-hnav-container" style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>

      {/* Workspace breadcrumb */}
      {workspaceTitle && (
        <div className="pure-hnav-breadcrumb">
          <div className="pure-hnav-badge">
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280' }}>{t('مساحة العمل', 'Workspace')}:</span>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#147a6d' }}>{workspaceTitle}</span>
          </div>
          {workspaceCode && (
            <span className="pure-hnav-code">{workspaceCode}</span>
          )}
        </div>
      )}

      {/* Nav items */}
      <div className="pure-hnav-list no-scrollbar">
        {items.map(item => {
          const active = isActive(item);
          return (
            <motion.button
              key={item.key}
              whileHover={{ y: -2 }}
              onClick={() => handleNavClick(item.route)}
              className={`pure-hnav-item ${active ? 'active' : ''}`}
            >
              {item.icon && (
                <span style={{ color: active ? '#147a6d' : '#9ca3af', transition: 'color 0.3s' }}>
                  <HNavIcon name={item.icon} size={18} />
                </span>
              )}
              {t(item.labelAr, item.labelEn)}

              {active && (
                <motion.div
                  layoutId={`horizontal-nav-indicator-${workspaceType}`}
                  className="pure-hnav-indicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}