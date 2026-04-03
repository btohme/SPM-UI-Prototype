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
    <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-20 shadow-sm -mx-8 -mt-8 mb-8">
      {/* Workspace breadcrumb */}
      {workspaceTitle && (
        <div className="flex items-center gap-3 px-8 py-2.5 bg-gradient-to-r from-primary-50 to-transparent border-b border-gray-100">
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-primary-100">
            <span className="text-xs font-bold text-gray-500">{t('مساحة العمل', 'Workspace')}:</span>
            <span className="text-xs font-extrabold text-primary-700">{workspaceTitle}</span>
          </div>
          {workspaceCode && (
            <span className="text-xs font-bold text-gray-400 bg-gray-100 rounded-md px-2 py-1 shadow-inner">{workspaceCode}</span>
          )}
        </div>
      )}

      {/* Nav items */}
      <div className="flex items-center overflow-x-auto px-8 gap-2 py-2 no-scrollbar">
        {items.map(item => {
          const active = isActive(item);
          return (
            <motion.button
              key={item.key}
              whileHover={{ y: -2 }}
              onClick={() => item.route && navigate(item.route)}
              className={`
                relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold
                whitespace-nowrap transition-all duration-300 shrink-0
                ${active
                  ? 'text-primary-700 bg-primary-50/80 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {item.icon && (
                <span className={`transition-colors duration-300 ${active ? 'text-primary-600' : 'text-gray-400'}`}>
                  <HNavIcon name={item.icon} size={18} />
                </span>
              )}
              {t(item.labelAr, item.labelEn)}
              {active && (
                <motion.div
                  layoutId={`horizontal-nav-indicator-${workspaceType}`}
                  className="absolute bottom-0 start-4 end-4 h-1 bg-primary-600 rounded-t-full shadow-[0_-2px_8px_rgba(27,94,59,0.4)]"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}