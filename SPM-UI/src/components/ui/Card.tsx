import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode; className?: string; hover?: boolean; padding?: 'none' | 'sm' | 'md' | 'lg'; gradient?: boolean; onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, padding = 'md', gradient = false, onClick }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} onClick={onClick}
      className={`pure-ui-card pure-ui-card-p-${padding} ${hover ? 'hoverable' : ''} ${className}`}
      style={gradient ? { background: 'linear-gradient(to bottom right, #ffffff, #f0fdf4)' } : {}}
    >
      {children}
    </motion.div>
  );
}