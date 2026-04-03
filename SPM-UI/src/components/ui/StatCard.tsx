import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  titleAr: string;
  titleEn: string;
  value: number | string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  onClick?: () => void;
  gradient?: [string, string];
  delay?: number;
  moduleKey?: string;
}

export default function StatCard({
  titleAr,
  titleEn,
  value,
  subtitle,
  icon,
  color = '#1B5E3B',
  trend,
  trendValue,
  onClick,
  gradient,
  delay = 0,
  moduleKey,
}: StatCardProps) {
  const { t } = useApp();
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else if (moduleKey) navigate(`/list?modulekey=${moduleKey}`);
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? '#2E7D32' : trend === 'down' ? '#B71C1C' : '#78909C';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      onClick={handleClick}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm cursor-pointer relative overflow-hidden"
    >
      {/* Background gradient accent */}
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
        style={{ background: gradient ? `linear-gradient(180deg, ${gradient[0]}, ${gradient[1]})` : color }}
      />

      <div className="pr-2">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500 font-medium">{t(titleAr, titleEn)}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {icon && (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${color}18` }}
            >
              <span style={{ color }}>{icon}</span>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <AnimatePresence>
            <motion.span
              key={String(value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
              style={{ color }}
            >
              {value}
            </motion.span>
          </AnimatePresence>

          {trend && trendValue && (
            <div className="flex items-center gap-1 text-xs" style={{ color: trendColor }}>
              <TrendIcon size={14} />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
