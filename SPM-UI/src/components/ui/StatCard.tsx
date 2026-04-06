import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface StatCardProps { titleAr: string; titleEn: string; value: number | string; subtitle?: string; icon?: React.ReactNode; color?: string; trend?: 'up' | 'down' | 'neutral'; trendValue?: string; onClick?: () => void; gradient?: [string, string]; delay?: number; moduleKey?: string; }

export default function StatCard({ titleAr, titleEn, value, subtitle, icon, color = '#147a6d', trend, trendValue, onClick, gradient, delay = 0, moduleKey }: StatCardProps) {
  const { t } = useApp(); const navigate = useNavigate();
  const handleClick = () => { if (onClick) onClick(); else if (moduleKey) navigate(`/list?modulekey=${moduleKey}`); };
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? '#2E7D32' : trend === 'down' ? '#B71C1C' : '#78909C';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }} onClick={handleClick} className="pure-ui-card hoverable pure-ui-card-p-md" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: '4px', height: '100%', background: gradient ? `linear-gradient(180deg, ${gradient[0]}, ${gradient[1]})` : color }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600', margin: '0 0 2px 0' }}>{t(titleAr, titleEn)}</p>
          {subtitle && <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{subtitle}</p>}
        </div>
        {icon && <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: `${color}18`, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
        <AnimatePresence><motion.span key={String(value)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '30px', fontWeight: '900', color, lineHeight: 1 }}>{value}</motion.span></AnimatePresence>
        {trend && trendValue && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: trendColor, fontWeight: 'bold' }}><TrendIcon size={14} /><span>{trendValue}</span></div>}
      </div>
    </motion.div>
  );
}