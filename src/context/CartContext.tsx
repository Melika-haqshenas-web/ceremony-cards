'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { CartItem } from '@/lib/types';

/**
 * Cart state management via React Context + useReducer.
 *
 * Why Context (not Redux) here: the cart is a single, small slice of
 * global state with a handful of actions. Context + a typed reducer
 * gives us predictable updates and zero extra dependencies. If the app
 * grew many interdependent slices, Redux Toolkit would earn its keep.
 *
 * The cart is persisted to localStorage so a refresh keeps selections.
 */

type CartState = { items: CartItem[] };

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; templateId: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] };

const STORAGE_KEY = 'meli.cart.v1';

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD':
      // Each template can only be in the cart once.
      if (state.items.some((i) => i.templateId === action.item.templateId)) {
        return state;
      }
      return { items: [...state.items, action.item] };
    case 'REMOVE':
      return {
        items: state.items.filter((i) => i.templateId !== action.templateId),
      };
    case 'CLEAR':
      return { items: [] };
    case 'HYDRATE':
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: CartItem) => void;
  remove: (templateId: string) => void;
  clear: () => void;
  has: (templateId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) });
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items: state.items,
      count: state.items.length,
      subtotal: state.items.reduce((sum, i) => sum + i.price, 0),
      add: (item) => dispatch({ type: 'ADD', item }),
      remove: (templateId) => dispatch({ type: 'REMOVE', templateId }),
      clear: () => dispatch({ type: 'CLEAR' }),
      has: (templateId) => state.items.some((i) => i.templateId === templateId),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Access the cart. Throws if used outside <CartProvider>. */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
