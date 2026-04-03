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
    <div className="sticky top-0 bg-white border-b border-gray-200 z-20 shadow-sm -mx-8 -mt-6 mb-6">
      {/* Workspace breadcrumb */}
      {workspaceTitle && (
        <div className="flex items-center gap-2 px-6 py-2 bg-primary-50/50 border-b border-gray-100">
          <span className="text-xs text-gray-500">{t('مساحة العمل', 'Workspace')}:</span>
          <span className="text-xs font-semibold text-primary-700">{workspaceTitle}</span>
          {workspaceCode && (
            <span className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-0.5">{workspaceCode}</span>
          )}
        </div>
      )}

      {/* Nav items */}
      <div className="flex items-center overflow-x-auto px-6 gap-1 py-1 no-scrollbar">
        {items.map(item => {
          const active = isActive(item);
          return (
            <motion.button
              key={item.key}
              whileHover={{ y: -1 }}
              onClick={() => item.route && navigate(item.route)}
              className={`
                relative flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium
                whitespace-nowrap transition-all duration-200 shrink-0
                ${active
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {item.icon && (
                <span className={active ? 'text-primary-700' : 'text-gray-400'}>
                  <HNavIcon name={item.icon} />
                </span>
              )}
              {t(item.labelAr, item.labelEn)}
              {active && (
                <motion.div
                  layoutId={`horizontal-nav-indicator-${workspaceType}`}
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-700 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
