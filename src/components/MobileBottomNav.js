'use client'
import React from 'react';
import { Phone, Send, Mail } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

export function MobileBottomNav({ onScrollToSection }) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 p-2.5 px-4 flex items-center justify-between gap-2 shadow-2xl transition-colors duration-200">
      <a
        href={`tel:${STORE_CONFIG.phone}`}
        className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-300 dark:border-stone-700 active:scale-95 transition"
      >
        <Phone size={15} className="text-emerald-600 dark:text-emerald-400" />
        <span>Call Shop</span>
      </a>

      <button
        onClick={() => onScrollToSection('order-form-section')}
        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 transition"
      >
        <Send size={15} />
        <span>Order Station</span>
      </button>
    </div>
  );
}
