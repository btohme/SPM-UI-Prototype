interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  color?: string;
}

const COLORS = ['#1B5E3B', '#0277BD', '#6A1B9A', '#E65100', '#2E7D32', '#B71C1C', '#006064', '#37474F', '#880E4F', '#4A148C'];

function getColor(name: string): string {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return COLORS[sum % COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function Avatar({ name, size = 'md', src, color }: AvatarProps) {
  const bg = color || getColor(name);
  const initials = getInitials(name);

  if (src) {
    return <img src={src} alt={name} className={`pure-avatar pure-avatar-${size}`} />;
  }

  return (
    <div className={`pure-avatar pure-avatar-${size}`} style={{ backgroundColor: bg, color: '#fff' }} title={name}>
      <span>{initials}</span>
    </div>
  );
}