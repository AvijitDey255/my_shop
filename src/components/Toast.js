'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs sm:text-sm font-semibold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 pointer-events-none border border-stone-700/50 dark:border-stone-300/50"
        >
          {toast.type === 'error' ? (
            <AlertCircle size={18} className="text-rose-400 dark:text-rose-600 flex-shrink-0" />
          ) : toast.type === 'info' ? (
            <Info size={18} className="text-sky-400 dark:text-sky-600 flex-shrink-0" />
          ) : (
            <CheckCircle size={18} className="text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
