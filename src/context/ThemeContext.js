'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
  setThemeMode: (mode) => {}
});

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('laltu_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('laltu_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('laltu_theme', 'light');
      }
      return next;
    });
  };

  const setThemeMode = (isDark) => {
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('laltu_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('laltu_theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, setThemeMode, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
