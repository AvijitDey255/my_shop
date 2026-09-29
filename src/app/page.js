'use client'
import React, { useState } from 'react';
import { useStoreStatus } from '../hooks/useStoreStatus';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { StockSummary } from '../components/StockSummary';
import { OrderForm } from '../components/OrderForm';
import { ShopShowcase } from '../components/ShopShowcase';
import { StoreTimings } from '../components/StoreTimings';
import { StoreLocation } from '../components/StoreLocation';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Toast } from '../components/Toast';

export default function App() {
  const [itemsText, setItemsText] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const storeStatus = useStoreStatus();

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3200);
  };

  const handlePrefillSample = (sampleText) => {
    setItemsText((prev) => {
      const clean = prev.trim();
      return clean ? `${clean}\n• ${sampleText}` : `• ${sampleText}`;
    });
    scrollToSection('order-form-section');
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 transition-colors duration-300 font-sans pb-24 sm:pb-12">
      
      {/* Header Bar */}
      <Header 
        storeStatus={storeStatus} 
        onScrollToSection={scrollToSection} 
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-12 sm:space-y-16">
        
        {/* Hero Section with Shop Image */}
        <HeroSection onScrollToSection={scrollToSection} />

        {/* Feature Highlights */}
        <FeaturesSection />

        {/* Manual Grocery Order Station (WhatsApp, Email, File Export) */}
        <OrderForm 
          itemsText={itemsText} 
          setItemsText={setItemsText} 
          triggerToast={triggerToast} 
        />

        {/* Store Front Showcase & Gallery */}
        <ShopShowcase />

        {/* Stock Inventory Summary (No Cart, No Add Buttons) */}
        <StockSummary 
          onPrefillSample={handlePrefillSample} 
          triggerToast={triggerToast} 
        />

        {/* Weekly Timings & Schedule */}
        <StoreTimings storeStatus={storeStatus} />

        {/* Store Address & Map Location */}
        <StoreLocation />

      </main>

      {/* Footer */}
      <Footer onScrollToSection={scrollToSection} />

      {/* Sticky Mobile Bottom Navigation */}
      <MobileBottomNav onScrollToSection={scrollToSection} />

      {/* Toast Notification */}
      <Toast toast={toast} />

    </div>
  );
}