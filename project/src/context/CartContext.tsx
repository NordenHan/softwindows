import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, width: number) => void;
  updateCartItemLength: (productId: number, width: number, length: number | null) => void;
  clearCart: () => void;
  isItemInCart: (productId: number, width: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // If item already exists, don't add it again
      const exists = prevItems.some(
        (i) => i.productId === item.productId && i.width === item.width
      );
      if (exists) return prevItems;
      return [...prevItems, item];
    });
  };

  const removeFromCart = (productId: number, width: number) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.productId === productId && item.width === width)
      )
    );
  };

  const updateCartItemLength = (productId: number, width: number, length: number | null) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.width === width
          ? { ...item, length }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isItemInCart = (productId: number, width: number) => {
    return cartItems.some(
      (item) => item.productId === productId && item.width === width
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemLength,
        clearCart,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};