'use client'
import React from 'react';
import { MapPin, Clock, Phone, Mail, ExternalLink, Truck } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

export function StoreLocation() {
  return (
    <section id="location-section" className="space-y-4">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-amber-400">
          Find Our Store
        </span>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Store Location & Directions
        </h2>
        <p className="text-xs sm:text-sm text-stone-400">
          Visit our retail shop counter or navigate with Google Maps.
        </p>
      </div>

      <div className="rounded-3xl p-6 sm:p-8 bg-stone-900 border border-stone-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Store Information */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏪</span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {STORE_CONFIG.name}
              </h3>
              <p className="text-xs text-amber-400 font-semibold">
                Retail Grocery & Dry Provision Merchant
              </p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm text-stone-300 border-y border-stone-800 py-4">
            
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold text-xs uppercase tracking-wide">
                  Store Address:
                </strong>
                <span>{STORE_CONFIG.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold text-xs uppercase tracking-wide">
                  Operating Hours:
                </strong>
                <span>Tue–Sun: 7:00 AM – 2:30 PM & 6:00 PM – 10:00 PM</span>
                <span className="block font-bold text-rose-400">Closed Every Monday</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold text-xs uppercase tracking-wide">
                  Direct Shop Contact:
                </strong>
                <a href={`tel:${STORE_CONFIG.phone}`} className="text-amber-400 font-bold hover:underline">
                  {STORE_CONFIG.displayPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={18} className="text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold text-xs uppercase tracking-wide">
                  Email Support:
                </strong>
                <a href={`mailto:${STORE_CONFIG.email}`} className="text-sky-400 font-bold hover:underline">
                  {STORE_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold text-xs uppercase tracking-wide">
                  Home Delivery:
                </strong>
                <span className="text-emerald-400 font-bold">{STORE_CONFIG.deliveryFee}</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={STORE_CONFIG.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 border border-stone-700"
            >
              <ExternalLink size={14} />
              <span>Open Google Maps App</span>
            </a>
            <a
              href={`tel:${STORE_CONFIG.phone}`}
              className="flex-1 text-center px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition flex items-center justify-center gap-1.5"
            >
              <Phone size={14} />
              <span>Call Store</span>
            </a>
          </div>
        </div>

        {/* Embedded Google Map Iframe with Explicit Pin Marker */}
        <div className="lg:col-span-7 h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden border border-stone-800 relative bg-stone-950 shadow-inner">
          <iframe
            title={`${STORE_CONFIG.name} Google Map Location`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={STORE_CONFIG.googleMapsUrl}
          />
          <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-700 text-xs font-semibold text-stone-200 shadow-md pointer-events-none flex items-center gap-1.5">
            <span className="text-rose-500 text-base">📍</span>
            <span>{STORE_CONFIG.name} Pin (Lat: {STORE_CONFIG.latitude}, Lng: {STORE_CONFIG.longitude})</span>
          </div>
        </div>

      </div>
    </section>
  );
}
