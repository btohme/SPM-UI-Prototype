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

export default function HorizontalNav({ items, workspaceTitle, workspaceCode, workspaceType, workspaceParam: _workspaceParam }: HorizontalNavProps) {
  const { t } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item: HorizontalNavItem) => {
    if (!item.route) return false;
    const itemPath = item.route.split('?')[0];
    const currentPath = location.pathname;
    const currentSearch = location.search;
    if (itemPath === currentPath) {
      if (item.moduleKey) {
        return currentSearch.includes(`modulekey=${item.moduleKey}`);
      }
      return !currentSearch.includes('modulekey=');
    }
    return false;
  };

  return (
    <div className="pure-hnav-container">
      {/* Workspace breadcrumb */}
      {workspaceTitle && (
        <div className="pure-hnav-breadcrumb">
          <div className="pure-hnav-badge">
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280' }}>{t('مساحة العمل', 'Workspace')}:</span>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#1B5E3B' }}>{workspaceTitle}</span>
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
              onClick={() => item.route && navigate(item.route)}
              className={`pure-hnav-item ${active ? 'active' : ''}`}
            >
              {item.icon && (
                <span style={{ color: active ? '#1B5E3B' : '#9ca3af', transition: 'color 0.3s' }}>
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