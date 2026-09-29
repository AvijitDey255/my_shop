'use client'
import React from 'react';
import { STORE_CONFIG } from '../data/storeConfig';

export function Footer({ onScrollToSection }) {
  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300 border-t border-stone-800 mt-16 py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="text-lg font-black text-white tracking-tight">{STORE_CONFIG.name}</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Authentic staple dry groceries, pure mustard oils, mill-aged rice sacks, Chakki flours, lentils, and dry fruits delivered free of charge for any distance. Strictly dry provisions (no fresh vegetables).
          </p>
        </div>

        {/* Quick Inventory Navigation */}
        <div className="space-y-2 text-xs">
          <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-3">Core Staples Stocked</h4>
          <ul className="space-y-2 text-stone-400">
            <li>• Pure Kachi Ghani Mustard Oil & Refined Oils</li>
            <li>• 10kg & 25kg Miniket & Basmati Rice Sacks</li>
            <li>• Chakki Fresh Atta, Maida, Suji & Besan</li>
            <li>• Masoor, Moong, Chana & Toor Dals</li>
            <li>• Almonds, Cashews, Raisins, Cornflakes & Biscuits</li>
          </ul>
        </div>

        {/* Schedule & Contact Details */}
        <div className="space-y-3 text-xs">
          <h4 className="text-white font-bold uppercase tracking-wider text-sm">Store Schedule & Contact</h4>
          <p className="text-stone-400">
            Tuesday – Sunday: <strong className="text-stone-200">7:00 AM – 2:30 PM</strong> & <strong className="text-stone-200">6:00 PM – 10:00 PM</strong>
          </p>
          <p className="text-rose-400 font-semibold">Every Monday: Closed (Weekly Holiday)</p>
          <p className="text-emerald-400 font-semibold">{STORE_CONFIG.deliveryFee}</p>
          <p className="text-stone-300">Phone: {STORE_CONFIG.displayPhone}</p>
          <p className="text-stone-300">Email: {STORE_CONFIG.email}</p>
          <p className="text-stone-500 pt-2 text-[11px]">© 2026 {STORE_CONFIG.name}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
