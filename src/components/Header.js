'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Send, Menu, X, Clock, MapPin } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

export function Header({ storeStatus, onScrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-900/90 border-b border-stone-800 shadow-md">
      {/* Top Banner */}
      <aside className="bg-stone-950 text-stone-300 text-xs py-2 px-3 sm:px-4 border-b border-stone-850">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-400">{STORE_CONFIG.deliveryFee}</span>
            <span className="hidden md:inline text-stone-600">•</span>
            <span className="hidden md:inline text-stone-300">Pure Dry Groceries & Provisions</span>
          </div>

          <div className="flex items-center gap-3 mx-auto sm:mx-0 text-stone-300 font-medium">
            <span>⏰ Tue–Sun: 7am–2:30pm & 6pm–10pm</span>
            <span className="text-amber-400 font-semibold">• {STORE_CONFIG.holiday}</span>
          </div>
        </div>
      </aside>

      {/* Main Header Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo & Identity */}
        <div className="flex items-center gap-2.5">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white text-xl shadow-lg shadow-amber-600/30 flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick('hero-section')}
          >
            🌾
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {STORE_CONFIG.name}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold rounded-md bg-amber-950 text-amber-300 border border-amber-800">
                Retail Merchant
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-400 font-medium truncate max-w-[200px] sm:max-w-none">
              {STORE_CONFIG.tagline}
            </p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Open/Closed badge on desktop */}
          <div className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${storeStatus.badgeColor}`}>
            <span className={`w-2 h-2 rounded-full ${storeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span>{storeStatus.label}</span>
          </div>

          {/* Phone Call Button */}
          <a
            href={`tel:${STORE_CONFIG.phone}`}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition border border-stone-700 active:scale-95"
          >
            <Phone size={14} className="text-emerald-400" />
            <span>Call Shop</span>
          </a>

          {/* Email Quick Link */}
          <a
            href={`mailto:${STORE_CONFIG.email}?subject=Grocery%20Inquiry`}
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition border border-stone-700 active:scale-95"
          >
            <Mail size={14} className="text-sky-400" />
            <span>Email Shop</span>
          </a>

          {/* WhatsApp Direct Link / Button */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            href={`https://wa.me/${STORE_CONFIG.phone}?text=Hello%20Laltu%20Store,%20I%20want%20to%20place%20a%20grocery%20order`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition"
          >
            <span>💬</span>
            <span className="hidden sm:inline">WhatsApp Order</span>
            <span className="sm:hidden">WhatsApp</span>
          </motion.a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open Navigation Menu"
            className="md:hidden p-2 rounded-xl bg-stone-800 text-stone-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Status Bar under header */}
      <div className="lg:hidden px-4 py-1.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${storeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          <span className="font-bold text-stone-200">{storeStatus.label}</span>
        </div>
        <span className="text-[11px] text-stone-400">{storeStatus.subtext}</span>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-stone-800 bg-stone-900 px-4 py-4 space-y-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleNavClick('order-form-section')}
                className="p-3 rounded-xl bg-amber-500 text-stone-950 font-black text-left flex items-center gap-2"
              >
                <span>📝</span> Order List Form
              </button>
              <button
                onClick={() => handleNavClick('store-showcase-section')}
                className="p-3 rounded-xl bg-stone-800 font-bold text-stone-200 text-left flex items-center gap-2"
              >
                <span>🏪</span> Shop Showcase
              </button>
              <button
                onClick={() => handleNavClick('timings-section')}
                className="p-3 rounded-xl bg-stone-800 font-bold text-stone-200 text-left flex items-center gap-2"
              >
                <Clock size={16} /> Timings
              </button>
              <button
                onClick={() => handleNavClick('location-section')}
                className="p-3 rounded-xl bg-stone-800 font-bold text-stone-200 text-left flex items-center gap-2"
              >
                <MapPin size={16} /> Location
              </button>
            </div>

            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs font-semibold">
              <a href={`tel:${STORE_CONFIG.phone}`} className="text-emerald-400 flex items-center gap-1.5">
                <Phone size={14} /> Call {STORE_CONFIG.displayPhone}
              </a>
              <a href={`mailto:${STORE_CONFIG.email}`} className="text-sky-400 flex items-center gap-1.5">
                <Mail size={14} /> Email Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
