'use client'
import { useState, useEffect } from 'react';

export function useStoreStatus() {
  const [status, setStatus] = useState({
    isOpen: false,
    label: "Checking schedule...",
    subtext: "Based on local shop hours",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
  });

  useEffect(() => {
    const calculateStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0: Sun, 1: Mon, ...
      const minutes = now.getHours() * 60 + now.getMinutes();

      const morningOpen = 7 * 60;        // 7:00 AM
      const morningClose = 14 * 60 + 30; // 2:30 PM
      const eveningOpen = 18 * 60;       // 6:00 PM
      const eveningClose = 22 * 60;      // 10:00 PM

      if (day === 1) {
        // Monday
        setStatus({
          isOpen: false,
          label: "Closed Today (Monday)",
          subtext: "Reopens Tuesday at 7:00 AM",
          badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900"
        });
      } else {
        if (minutes >= morningOpen && minutes < morningClose) {
          setStatus({
            isOpen: true,
            label: "Open Now (Morning Shift)",
            subtext: "Morning shift closes at 2:30 PM",
            badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
          });
        } else if (minutes >= morningClose && minutes < eveningOpen) {
          setStatus({
            isOpen: false,
            label: "Afternoon Break (Closed)",
            subtext: "Reopens this evening at 6:00 PM",
            badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
          });
        } else if (minutes >= eveningOpen && minutes < eveningClose) {
          setStatus({
            isOpen: true,
            label: "Open Now (Evening Shift)",
            subtext: "Evening shift closes at 10:00 PM",
            badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
          });
        } else {
          setStatus({
            isOpen: false,
            label: "Currently Closed",
            subtext: day === 0 ? "Closed tomorrow (Monday). Reopens Tuesday 7:00 AM" : "Opens at 7:00 AM today",
            badgeColor: "bg-stone-200 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
          });
        }
      }
    };

    calculateStatus();
    const interval = setInterval(calculateStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
