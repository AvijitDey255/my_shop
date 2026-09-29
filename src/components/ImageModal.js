'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export function ImageModal({ isOpen, onClose, imageSrc, imageAlt }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center cursor-default bg-stone-900 rounded-3xl border border-stone-700 overflow-hidden shadow-2xl p-2 sm:p-4"
          >
            {/* Top Close Bar */}
            <div className="w-full flex items-center justify-between p-3 text-white border-b border-stone-800">
              <span className="font-bold text-xs sm:text-sm text-amber-400">
                🏪 Full Shop View - LALTU STORE
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
                aria-label="Close full view"
              >
                <X size={18} />
              </button>
            </div>

            {/* Full Image Display */}
            <div className="w-full h-full p-2 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={imageSrc}
                alt={imageAlt || "Full Shop View"}
                className="w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="p-2 text-center text-xs text-stone-400">
              Click anywhere outside or hit ✕ to close full view.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
