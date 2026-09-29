'use client'
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Check, ShieldCheck, Sparkles, Filter, Package } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export function ProductCatalog({ onAddItemToList, triggerToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddProduct = (productName, productId, unit) => {
    const qty = quantities[productId] || 1;
    const formattedItem = `${qty}x ${productName} (${unit})`;
    onAddItemToList(formattedItem);
    triggerToast(`Added ${formattedItem} to order list!`);
  };

  const filteredCategories = useMemo(() => {
    return CATEGORIES.map(cat => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return null;
      }
      if (!searchQuery.trim()) {
        return cat;
      }
      const q = searchQuery.toLowerCase();
      const catMatches = cat.name.toLowerCase().includes(q) || cat.tagline.toLowerCase().includes(q);
      const matchingProducts = cat.products.filter(p => p.name.toLowerCase().includes(q) || p.unit.toLowerCase().includes(q));

      if (catMatches || matchingProducts.length > 0) {
        return {
          ...cat,
          products: catMatches ? cat.products : matchingProducts
        };
      }
      return null;
    }).filter(Boolean);
  }, [searchQuery, selectedCategory]);

  return (
    <section id="catalog-section" className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Pure Dry Food Essentials
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            Our Staple Groceries & Provisions
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Select items with quantities or tap '+ Add to List' to quickly build your order.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-2.5 items-center w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rice, oil, atta..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
            />
          </div>

          {/* Category Dropdown/Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Category Grid */}
      {filteredCategories.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
          <p className="text-3xl">🔍</p>
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">No items found matching "{searchQuery}"</h3>
          <p className="text-xs text-stone-500">Try searching for a different keyword or reset the category filter.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-4 py-2 bg-stone-900 dark:bg-stone-800 text-white rounded-xl text-xs font-bold"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900 text-2xl flex items-center justify-center">
                      {cat.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                      Items & Pack Sizes:
                    </span>

                    <ul className="space-y-2">
                      {cat.products.map((product) => {
                        const qty = quantities[product.id] || 1;
                        return (
                          <li 
                            key={product.id}
                            className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850/60 border border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-stone-800 dark:text-stone-200">
                                  {product.name}
                                </span>
                                {product.popular && (
                                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                                Pack: {product.unit}
                              </span>
                            </div>

                            {/* Quantity Controls & Add Button */}
                            <div className="flex items-center justify-between sm:justify-end gap-2">
                              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 overflow-hidden text-xs">
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(product.id, -1)}
                                  className="px-2 py-1 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 font-bold"
                                >
                                  -
                                </button>
                                <span className="px-2 font-bold text-stone-900 dark:text-white min-w-[20px] text-center">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(product.id, 1)}
                                  className="px-2 py-1 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 font-bold"
                                >
                                  +
                                </button>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddProduct(product.name, product.id, product.unit)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs"
                              >
                                <Plus size={13} />
                                <span>Add</span>
                              </motion.button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Footer Badge & Quick Prefill */}
                <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-lg">
                    {cat.badge}
                  </span>
                  <button
                    onClick={() => {
                      onAddItemToList(cat.samplePrefill);
                      triggerToast("Added category bundle to order list!");
                    }}
                    className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <span>+ Add Sample Bundle</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
