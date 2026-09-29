'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ShieldCheck, Truck, Check, Maximize2 } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';
import { ImageModal } from './ImageModal';

export function ShopShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="store-showcase-section" className="space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-800">
          🏪 Authentic Retail Counter Showcase
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Welcome to Laltu Store
        </h2>
        <p className="text-xs sm:text-sm text-stone-400">
          Direct retail merchant stocking original Cooking Oils, 10kg/25kg Rice Sacks, Chakki Fresh Atta, Dals, and Dry Fruits.
        </p>
      </div>

      <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Full Image Showcase Column */}
        <div className="lg:col-span-7 relative p-4 sm:p-6 bg-stone-950 flex flex-col justify-center">
          <div 
            onClick={() => setModalOpen(true)}
            className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-xl group cursor-pointer bg-stone-900"
          >
            {/* Display full uncropped image */}
            <img 
              src="/images/shop-front.jpg" 
              alt="Laltu Store Front Full Showcase" 
              className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-300"
            />
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-stone-950/90 backdrop-blur-md p-3 rounded-xl border border-stone-800">
              <div>
                <p className="font-black text-amber-400 text-xs sm:text-sm">{STORE_CONFIG.name}</p>
                <p className="text-stone-300 text-[10px] sm:text-[11px] truncate">{STORE_CONFIG.address}</p>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 text-[10px] font-black uppercase flex items-center gap-1 shadow-sm"
              >
                <Maximize2 size={12} />
                <span>Full View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Store Highlights Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-white">Why Shop at Laltu Store?</h3>
            
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-white block font-semibold">100% Free Doorstep Delivery:</strong>
                  <span>No distance fees or extra packing charges.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-white block font-semibold">Heavy Sacks Carried Safely:</strong>
                  <span>25kg rice bags and 5L oil jars carried right into your kitchen.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-white block font-semibold">Sealed & Authentic Quality:</strong>
                  <span>Direct mill-packaged rice sacks, Agmark mustard oils, and fresh flours.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-white block font-semibold">WhatsApp Order Convenience:</strong>
                  <span>Write your list in plain text and send it directly to our phone.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-400">Shop Helpline:</span>
            <a href={`tel:${STORE_CONFIG.phone}`} className="font-bold text-amber-400 hover:underline">
              {STORE_CONFIG.displayPhone}
            </a>
          </div>
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
