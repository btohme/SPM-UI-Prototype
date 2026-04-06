import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 32, color = '#147a6d' }: { size?: number; color?: string }) {
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      style={{ width: size, height: size, borderTopColor: color, borderRadius: '50%', border: '4px solid #e5e7eb', borderTopStyle: 'solid' }}
    />
  );
}

export function LoadingPage({ messageAr = 'جاري التحميل...' }: { messageAr?: string; messageEn?: string }) {
  return (
    <div className="pure-loading-overlay">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#147a6d', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>ت</span>
        </motion.div>
        <LoadingSpinner size={40} />
        <p style={{ color: '#4b5563', fontSize: '14px', margin: 0 }}>{messageAr}</p>
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
      <div className="pure-shimmer" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
      <div className="pure-shimmer" style={{ flex: 1, height: '16px', borderRadius: '4px' }} />
      <div className="pure-shimmer" style={{ width: '96px', height: '16px', borderRadius: '4px' }} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="pure-ui-card pure-ui-card-p-md" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="pure-shimmer" style={{ height: '20px', width: '66%', borderRadius: '4px' }} />
      <div className="pure-shimmer" style={{ height: '16px', width: '100%', borderRadius: '4px' }} />
      <div className="pure-shimmer" style={{ height: '16px', width: '80%', borderRadius: '4px' }} />
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="pure-table-container">
      <div style={{ background: '#147a6d', height: '40px' }} />
      {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
    </div>
  );
}