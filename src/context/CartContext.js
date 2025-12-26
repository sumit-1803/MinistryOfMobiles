'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getWishlist } from '@/app/actions/customerAuth';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount and sync with backend
  useEffect(() => {
    const syncCart = async () => {
      // First load from local storage
      const savedCart = localStorage.getItem('mom_cart');
      let localCart = [];
      if (savedCart) {
        try {
          localCart = JSON.parse(savedCart);
          setCart(localCart);
        } catch (e) {
          console.error('Failed to parse cart', e);
        }
      }

      // Then try to fetch from backend (if logged in)
      try {
        const serverWishlist = await getWishlist();
        // If server returns a list (even empty), it means user is logged in and this is the source of truth
        if (serverWishlist !== null) {
          const serverCart = serverWishlist.map(item => ({
            ...item,
            quantity: 1 // Default quantity
          }));
          setCart(serverCart);
        }
      } catch (error) {
        console.error('Failed to sync cart', error);
      }
    };

    syncCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mom_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
