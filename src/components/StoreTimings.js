'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle, Truck, MessageSquare } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

export function StoreTimings({ storeStatus }) {
  return (
    <section id="timings-section" className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Weekly Timings
          </span>
          <h2 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            Store Opening Hours
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Please note our split shift timings and weekly holiday schedule.
          </p>
        </div>

        {/* Dynamic Status Display Box */}
        <div className={`p-4 rounded-2xl border flex items-center gap-3 ${storeStatus.badgeColor}`}>
          <span className={`w-3.5 h-3.5 rounded-full ${storeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          <div>
            <p className="text-xs font-extrabold">{storeStatus.label}</p>
            <p className="text-[11px] opacity-80">{storeStatus.subtext}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3.5">
          
          {/* Monday Holiday Notice */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/80 flex items-start gap-3">
            <span className="text-2xl">⛔</span>
            <div>
              <h3 className="font-extrabold text-rose-900 dark:text-rose-200 text-sm">
                Every Monday: FULL DAY CLOSED
              </h3>
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5 leading-relaxed">
                {STORE_CONFIG.name} remains closed every Monday for stock inventory and mill procurement. No counter sales or deliveries on Mondays.
              </p>
            </div>
          </div>

          {/* Tuesday to Sunday Schedule */}
          <div className="p-4 rounded-2xl  dark:bg-stone-850 border border-amber-200 dark:border-stone-700 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                Tuesday to Sunday (6 Days a Week)
              </h3>
              <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                Open Daily
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 pt-1">
              <div className="flex items-center justify-between py-1.5 border-b border-amber-200/60 dark:border-stone-700/60">
                <span className="font-semibold text-stone-800 dark:text-stone-200">🌅 Morning Session:</span>
                <span className="font-bold text-amber-900 dark:text-amber-300">
                  {STORE_CONFIG.shifts.morning.open} – {STORE_CONFIG.shifts.morning.close}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-amber-200/60 dark:border-stone-700/60">
                <span className="font-semibold text-stone-500 dark:text-stone-400">🌙 Afternoon Break:</span>
                <span className="font-medium text-stone-500 dark:text-stone-400">
                  {STORE_CONFIG.shifts.break.open} – {STORE_CONFIG.shifts.break.close} (Closed)
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="font-semibold text-stone-800 dark:text-stone-200">🌆 Evening Session:</span>
                <span className="font-bold text-amber-900 dark:text-amber-300">
                  {STORE_CONFIG.shifts.evening.open} – {STORE_CONFIG.shifts.evening.close}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Free Delivery Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-800 to-stone-900 text-white p-6 sm:p-7 space-y-4 shadow-md">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            {STORE_CONFIG.deliveryFee}
          </span>
          <h3 className="text-xl sm:text-2xl font-black">
            Any Distance, Zero Delivery Fees
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Heavy rice bags (10kg/25kg), multiple 5L oil jars, and bulk flour sacks will be carried and safely delivered right into your kitchen with <strong>zero delivery charge</strong>.
          </p>
          <div className="pt-1">
            <a
              href={`https://wa.me/${STORE_CONFIG.phone}?text=Hello%20${encodeURIComponent(STORE_CONFIG.name)},%20I%20would%20like%20to%20place%20a%20free%20home%20delivery%20order`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs sm:text-sm transition active:scale-95"
            >
              <MessageSquare size={16} />
              <span>Book Delivery on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
