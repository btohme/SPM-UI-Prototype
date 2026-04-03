import { motion } from 'framer-motion';

interface BadgeProps {
  label: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline' | 'soft';
  dot?: boolean;
}

export default function Badge({ label, color = '#1B5E3B', size = 'sm', variant = 'soft', dot = false }: BadgeProps) {
  const sizeClasses = { sm: 'text-xs px-2 py-0.5', md: 'text-sm px-3 py-1', lg: 'text-base px-4 py-1.5' };

  const getStyle = () => {
    if (variant === 'filled') return { backgroundColor: color, color: '#fff' };
    if (variant === 'outline') return { borderColor: color, color, backgroundColor: 'transparent', border: '1px solid' };
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16), g = parseInt(hex.substring(2, 4), 16), b = parseInt(hex.substring(4, 6), 16);
    return { backgroundColor: `rgba(${r},${g},${b},0.12)`, color };
  };

  return (
    <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`pure-badge ${sizeClasses[size]}`} style={getStyle()}>
      {dot && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color }} />}
      {label}
    </motion.span>
  );
}