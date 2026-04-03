import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 32, color = '#1B5E3B' }: { size?: number; color?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      style={{ width: size, height: size, borderTopColor: color }}
      className="rounded-full border-4 border-gray-200"
    />
  );
}

export function LoadingPage({ messageAr = 'جاري التحميل...', messageEn: _messageEn = 'Loading...' }: { messageAr?: string; messageEn?: string }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 rounded-2xl bg-primary-700 flex items-center justify-center shadow-lg"
        >
          <span className="text-white font-bold text-xl">ت</span>
        </motion.div>
        <LoadingSpinner size={40} />
        <p className="text-gray-600 text-sm">{messageAr}</p>
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3 px-4 border-b border-gray-100">
      <div className="shimmer w-8 h-8 rounded-full" />
      <div className="shimmer flex-1 h-4 rounded" />
      <div className="shimmer w-24 h-4 rounded" />
      <div className="shimmer w-20 h-6 rounded-full" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 space-y-3">
      <div className="shimmer h-5 w-2/3 rounded" />
      <div className="shimmer h-4 w-full rounded" />
      <div className="shimmer h-4 w-4/5 rounded" />
      <div className="flex gap-2 mt-4">
        <div className="shimmer h-6 w-16 rounded-full" />
        <div className="shimmer h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-primary-700 h-10" />
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
