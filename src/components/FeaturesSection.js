'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, MessageSquare, Mail, FileText } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: "🚚",
      lucideIcon: Truck,
      color: "emerald",
      title: "Free Delivery at Any Distance",
      description: "No distance slabs, no delivery surges, and no hidden packing fees. Whether you live right next door or across the town, delivery is 100% free of charge."
    },
    {
      icon: "🌾",
      lucideIcon: Package,
      color: "amber",
      title: "Heavy Sacks Delivered Safely",
      description: "Skip the back pain of hauling 25kg rice sacks, 10kg flour bags, or 5L oil cans. Our staff safely carries heavy provisions straight to your kitchen door."
    },
    {
      icon: "📲",
      lucideIcon: MessageSquare,
      color: "sky",
      title: "WhatsApp, Email & File Export",
      description: "Order conveniently your way! Send items via WhatsApp, submit via Email, or export a formatted TXT / CSV list to keep for your records."
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {features.map((feat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
          whileHover={{ y: -4 }}
          className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-stone-800 text-2xl flex items-center justify-center border border-amber-100 dark:border-stone-700">
            {feat.icon}
          </div>
          <h2 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100">
            {feat.title}
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            {feat.description}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
