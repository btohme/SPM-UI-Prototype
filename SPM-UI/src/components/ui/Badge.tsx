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
    // soft: light background
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { backgroundColor: `rgba(${r},${g},${b},0.12)`, color };
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses[size]}`}
      style={getStyle()}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      {label}
    </motion.span>
  );
}
