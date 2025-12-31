import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Note: For development purposes, the send limit counter resets every time the app is killed and restarted.
// In production, it persists across app restarts but resets monthly.

const storage = new MMKV();

interface SendLimitState {
  count: number;
  month: string; // e.g., '2025-12'
  increment: () => void;
  canSend: () => boolean;
  getRemaining: () => number;
  resetIfNewMonth: () => void;
}

const MAX_SENDS_PER_MONTH = 3;

export const useSendLimitStore = create<SendLimitState>()(
  persist(
    (set, get) => ({
      count: 0,
      month: new Date().toISOString().slice(0, 7), // YYYY-MM

      increment: () => {
        const currentMonth = new Date().toISOString().slice(0, 7);
        set((state) => ({
          count: state.count + 1,
          month: currentMonth,
        }));
      },

      canSend: () => {
        const { count, month } = get();
        const currentMonth = new Date().toISOString().slice(0, 7);
        return month === currentMonth && count < MAX_SENDS_PER_MONTH;
      },

      getRemaining: () => {
        const { count, month } = get();
        const currentMonth = new Date().toISOString().slice(0, 7);
        if (month !== currentMonth) {
          return MAX_SENDS_PER_MONTH;
        }
        return Math.max(0, MAX_SENDS_PER_MONTH - count);
      },

      resetIfNewMonth: () => {
        const currentMonth = new Date().toISOString().slice(0, 7);
        set((state) => {
          if (state.month !== currentMonth) {
            return { count: 0, month: currentMonth };
          }
          return state;
        });
      },
    }),
    {
      name: 'send-limit-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const value = storage.getString(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          storage.set(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          storage.delete(name);
        },
      })),
      // In development, skip hydration to reset on restart
      skipHydration: __DEV__,
    }
  )
);
