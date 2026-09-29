'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/categories';
import { PlusCircle, CheckCircle } from 'lucide-react';

export function StockSummary({ onPrefillSample, triggerToast }) {
  return (
    <section id="stock-summary-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-400">
            Available Inventory
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Staples We Stock & Deliver
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Tap "+ Add Sample to Form" on any category to auto-fill sample items into the order box below.
          </p>
        </div>
        
        <div className="inline-flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900 border border-stone-800 px-3.5 py-1.5 rounded-xl font-medium">
          <span>🛡️</span>
          <span>100% Branded & Factory Sealed Packs</span>
        </div>
      </div>

      {/* Category Overview Cards (No Cart / No Individual Add Buttons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <motion.div 
            key={cat.id} 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="rounded-3xl p-6 bg-stone-900 border border-stone-800 shadow-sm hover:border-stone-700 transition flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-900 text-amber-300 text-2xl flex items-center justify-center">
                  {cat.icon}
                </span>
                <div>
                  <h3 className="font-bold text-stone-100 text-base sm:text-lg">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Available Varieties:
                </span>
                <ul className="text-xs space-y-1.5 text-stone-300">
                  {cat.products.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{item.name} ({item.unit})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Prefill Sample Button */}
            <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                {cat.badge}
              </span>
              <button
                type="button"
                onClick={() => {
                  onPrefillSample(cat.samplePrefill);
                  triggerToast("Added sample items to your order form!");
                }}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1 active:scale-95 transition"
              >
                <PlusCircle size={14} />
                <span>+ Add Sample to Form</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
