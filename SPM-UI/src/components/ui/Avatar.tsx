interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  color?: string;
}

const COLORS = [
  '#1B5E3B', '#0277BD', '#6A1B9A', '#E65100', '#2E7D32',
  '#B71C1C', '#006064', '#37474F', '#880E4F', '#4A148C',
];

function getColor(name: string): string {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return COLORS[sum % COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

const SIZE_MAP = {
  xs: { container: 'w-6 h-6 text-xs',  text: 'text-[10px]' },
  sm: { container: 'w-8 h-8 text-sm',  text: 'text-xs' },
  md: { container: 'w-10 h-10 text-base',text: 'text-sm' },
  lg: { container: 'w-12 h-12 text-lg', text: 'text-base' },
  xl: { container: 'w-16 h-16 text-2xl',text: 'text-lg' },
};

export default function Avatar({ name, size = 'md', src, color }: AvatarProps) {
  const sz = SIZE_MAP[size];
  const bg = color || getColor(name);
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sz.container} rounded-full object-cover ring-2 ring-white`}
      />
    );
  }

  return (
    <div
      className={`${sz.container} rounded-full flex items-center justify-center font-bold ring-2 ring-white shrink-0`}
      style={{ backgroundColor: bg, color: '#fff' }}
      title={name}
    >
      <span className={sz.text}>{initials}</span>
    </div>
  );
}
