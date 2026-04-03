import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  gradient?: boolean;
  onClick?: () => void;
}

const PAD = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-6' };

export default function Card({ children, className = '', hover = false, padding = 'md', gradient = false, onClick }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100
        ${PAD[padding]}
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${gradient ? 'bg-linear-to-br from-white to-primary-50/30' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
