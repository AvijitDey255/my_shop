'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, ShieldCheck, Truck, Package, CreditCard, Maximize2 } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';
import { ImageModal } from './ImageModal';

export function HeroSection({ onScrollToSection }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="hero-section" className="space-y-6">
      
      {/* Top Hero Container */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 opacity-95 z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Left Content Column */}
        <div className="relative z-10 lg:col-span-7 p-6 sm:p-10 space-y-5">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider"
          >
            <span>🌾 Pure Dry Provisions Merchant</span>
            <span>•</span>
            <span className="text-emerald-400">{STORE_CONFIG.deliveryFee}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
          >
            LALTU STORE
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed"
          >
            Authentic packaged groceries: Pure Kachi Ghani Mustard Oil, 10kg & 25kg mill-aged rice bags, fresh Chakki Atta, lentils, and dry fruits.
            <strong className="text-amber-300 font-semibold"> Type your grocery list below and send it directly to WhatsApp!</strong>
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onScrollToSection('order-form-section')}
              className="px-5 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm transition shadow-lg shadow-amber-500/30 flex items-center gap-2"
            >
              <Send size={16} />
              <span>Write & Send Grocery List</span>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={`https://wa.me/${STORE_CONFIG.phone}?text=Hello%20Laltu%20Store,%20I%20want%20to%20place%20a%20grocery%20order`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Us Directly</span>
            </motion.a>
          </motion.div>

          {/* Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-emerald-400" /> 
              <span>Zero Delivery Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Package size={15} className="text-amber-400" /> 
              <span>Heavy Sacks Carried</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" /> 
              <span>Original Factory Packs</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={15} className="text-amber-400" /> 
              <span>Cash / UPI / QR</span>
            </div>
          </div>

        </div>

        {/* Hero Right Image Frame (Full Shop Display) */}
        <div className="relative z-10 lg:col-span-5 p-4 lg:p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onClick={() => setModalOpen(true)}
            className="relative rounded-2xl overflow-hidden border-2 border-stone-700 shadow-2xl group cursor-pointer bg-stone-950"
          >
            {/* Display full uncropped aspect ratio */}
            <img 
              src="/images/shop-front.jpg" 
              alt="Laltu Store Retail Grocery Counter Full View" 
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-90"></div>
            
            <div className="absolute bottom-3 left-3 right-3 bg-stone-900/90 backdrop-blur-md p-3 rounded-xl border border-stone-700 flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-amber-400 block text-xs sm:text-sm">🏪 LALTU STORE</span>
                <span className="text-[10px] sm:text-[11px] text-stone-300">Tap to expand full screen</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 text-[10px] font-black uppercase flex items-center gap-1 shadow-sm">
                <Maximize2 size={12} />
                <span>Full View</span>
              </span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc="/images/shop-front.jpg"
        imageAlt="Full Laltu Store View"
      />

    </section>
  );
}
