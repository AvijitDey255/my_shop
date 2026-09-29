'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, Download, Copy, RotateCcw, MapPin, Navigation, Loader2, ExternalLink } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';
import { 
  sendWhatsAppOrder, 
  sendEmailOrder, 
  downloadOrderFile, 
  copyOrderToClipboard 
} from '../utils/orderUtils';

export function OrderForm({ itemsText, setItemsText, triggerToast }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [targetPhoneNumber, setTargetPhoneNumber] = useState(STORE_CONFIG.phone);
  const [showCustomNumberInput, setShowCustomNumberInput] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const quickSamples = [
    "5L Kachi Ghani Mustard Oil Jar",
    "25kg Miniket Rice Sack",
    "10kg Chakki Fresh Atta Bag",
    "1kg Red Masoor Dal & 1kg Toor Dal",
    "500g Almonds & 500g Cashews",
    "500g Tata Tea & 2 Pkts Biscuits"
  ];

  const handleAddSampleChip = (sample) => {
    setItemsText((prev) => {
      const clean = prev.trim();
      return clean ? `${clean}\n• ${sample}` : `• ${sample}`;
    });
    triggerToast(`Added "${sample}" to your list!`);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      triggerToast("Geolocation is not supported by your browser.", "error");
      return;
    }

    setIsLocating(true);
    triggerToast("Detecting your live GPS location...", "info");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        const formattedLoc = `📍 Current Location: ${mapsUrl} (Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)})`;

        setCustomerAddress((prev) => {
          const cleanPrev = prev.trim();
          if (cleanPrev && !cleanPrev.includes('maps.google.com')) {
            return `${cleanPrev} | ${formattedLoc}`;
          }
          return formattedLoc;
        });

        setIsLocating(false);
        triggerToast("GPS Location attached! Included in WhatsApp message.", "success");
      },
      (error) => {
        setIsLocating(false);
        let errorMsg = "Unable to retrieve your location.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission denied. Please enter address manually.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "Location request timed out.";
        }
        triggerToast(errorMsg, "error");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const validateItems = () => {
    if (!itemsText.trim()) {
      triggerToast("Please enter at least one grocery item in the list!", "error");
      return false;
    }
    return true;
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validateItems()) return;
    sendWhatsAppOrder(itemsText, customerName, customerPhone, customerAddress, targetPhoneNumber);
    triggerToast("Opening WhatsApp with your grocery list...");
  };

  const handleEmailSubmit = () => {
    if (!validateItems()) return;
    sendEmailOrder(itemsText, customerName, customerPhone, customerAddress);
    triggerToast("Opening Email client with your order...");
  };

  const handleDownload = (format) => {
    if (!validateItems()) return;
    downloadOrderFile(itemsText, customerName, customerPhone, customerAddress, format);
    triggerToast(`Exported order file (${format.toUpperCase()})!`);
  };

  const handleCopy = async () => {
    if (!validateItems()) return;
    const success = await copyOrderToClipboard(itemsText, customerName, customerPhone, customerAddress);
    if (success) {
      triggerToast("Copied order list to clipboard!");
    } else {
      triggerToast("Failed to copy. Please copy manually.", "error");
    }
  };

  const handleReset = () => {
    setItemsText("");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    triggerToast("Form cleared.", "info");
  };

  return (
    <section id="order-form-section" className="rounded-3xl p-6 sm:p-10 bg-stone-900 border-2 border-stone-800 shadow-2xl space-y-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-800">
            📝 Manual Grocery Order Form
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Send Grocery List via WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Type your grocery items below. Click <strong>"📍 Use My Current Location"</strong> to automatically attach your GPS delivery location.
          </p>
        </div>

        {/* Quick Sample Prefill Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
            Tap to quick-add common staples:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickSamples.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddSampleChip(sample)}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-semibold transition active:scale-95 flex items-center gap-1"
              >
                <span>+</span>
                <span>{sample}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleWhatsAppSubmit} className="bg-stone-950 p-5 sm:p-7 rounded-2xl border border-stone-800 space-y-5">
          
          {/* Items Textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="itemsInput" className="text-xs font-bold text-stone-200 uppercase tracking-wide">
                Enter Grocery Items & Quantities: <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-stone-500">Plain text / bullet list</span>
            </div>
            <textarea
              id="itemsInput"
              rows={6}
              value={itemsText}
              onChange={(e) => setItemsText(e.target.value)}
              placeholder="Example:
1. 5 Litre Kachi Ghani Mustard Oil Jar
2. 25kg Miniket Daily Rice Sack
3. 10kg Chakki Fresh Atta Bag
4. 1kg Red Masoor Dal & 1kg Chana Dal
5. 500g Cashews & 500g Almonds"
              className="w-full text-xs sm:text-sm p-4 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 focus:bg-stone-950 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-sans"
              required
            />
          </div>

          {/* Customer Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nameInput" className="block text-xs font-bold text-stone-300 uppercase tracking-wide mb-1.5">
                Your Name (Optional):
              </label>
              <input
                id="nameInput"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Subir Mukherjee"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label htmlFor="phoneInput" className="block text-xs font-bold text-stone-300 uppercase tracking-wide mb-1.5">
                Your Contact Phone (Optional):
              </label>
              <input
                id="phoneInput"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g. +91 98300 XXXXX"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Delivery Address with Current Location Button */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <label htmlFor="addressInput" className="text-xs font-bold text-stone-300 uppercase tracking-wide">
                Delivery Address & Landmark:
              </label>

              {/* Current GPS Location Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 text-stone-950 text-xs font-black transition flex items-center gap-1.5 shadow-sm"
              >
                {isLocating ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Detecting GPS...</span>
                  </>
                ) : (
                  <>
                    <Navigation size={13} />
                    <span>📍 Use My Current Location</span>
                  </>
                )}
              </motion.button>
            </div>

            <input
              id="addressInput"
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="e.g. Flat 3B, Shivam Residency, Near Railway Gate (or click 'Use My Current Location')"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* WhatsApp Recipient Phone Number Box */}
          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-amber-400 block">
                  Recipient WhatsApp Number:
                </span>
                <span className="text-xs text-stone-300 font-medium">
                  Default Shop Contact: <strong className="text-white">{STORE_CONFIG.displayPhone}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomNumberInput(!showCustomNumberInput)}
                className="text-xs text-amber-400 hover:underline self-start sm:self-auto font-semibold"
              >
                {showCustomNumberInput ? "Use Default Shop Number" : "Change Recipient Number"}
              </button>
            </div>

            {showCustomNumberInput && (
              <div className="pt-2 space-y-1.5 border-t border-stone-800">
                <label htmlFor="targetPhoneInput" className="block text-[11px] font-bold text-stone-400 uppercase">
                  Enter Custom Recipient WhatsApp Phone Number:
                </label>
                <input
                  id="targetPhoneInput"
                  type="text"
                  value={targetPhoneNumber}
                  onChange={(e) => setTargetPhoneNumber(e.target.value)}
                  placeholder="e.g. 916291090003 (Country code + 10 digit number)"
                  className="w-full text-xs p-3 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Send to WhatsApp */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>Send Grocery List via WhatsApp</span>
              </motion.button>

              {/* Direct WhatsApp Link Button */}
              <a
                href={`https://wa.me/${targetPhoneNumber.replace(/\D/g, '')}?text=Hello%20Laltu%20Store,%20I%20want%20to%20place%20an%20order`}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-xs sm:text-sm border border-stone-700 transition flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} className="text-emerald-400" />
                <span>Open Direct WhatsApp Chat Link</span>
              </a>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={handleEmailSubmit}
                className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition flex items-center justify-center gap-1.5"
              >
                <Mail size={14} className="text-sky-400" />
                <span>Send via Email</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('txt')}
                className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition flex items-center justify-center gap-1.5"
              >
                <Download size={14} className="text-amber-400" />
                <span>Save .TXT File</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition flex items-center justify-center gap-1.5"
              >
                <Copy size={14} className="text-emerald-400" />
                <span>Copy Order</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-bold transition flex items-center justify-center gap-1.5 border border-rose-900"
              >
                <RotateCcw size={14} />
                <span>Clear Form</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-center text-stone-500 pt-1">
            🔒 Safe & Direct. Click WhatsApp to review and send your order. 100% Free Delivery.
          </p>
        </form>

      </div>
    </section>
  );
}
