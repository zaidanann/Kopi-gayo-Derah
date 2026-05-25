'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-2xl' };

export default function AdminModal({ isOpen, onClose, title, children, size = 'md' }: AdminModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-espresso/80 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative glass border border-coffee-700/30 rounded-sm w-full ${sizeMap[size]} max-h-[90vh] overflow-y-auto`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-coffee-800/30 sticky top-0 glass-dark z-10">
              <h2 className="font-display text-xl text-cream-100">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-coffee-900/60 flex items-center justify-center text-cream-400 hover:text-cream-200 hover:bg-coffee-800/80 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
