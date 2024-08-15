import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const updatedItems = [...state.items, action.payload];
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
      };
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };
    case 'REMOVE_ITEM':
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems.splice(itemIndex, 1);
        const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
        return {
          ...state,
          items: updatedItems,
          total: updatedTotal,
        };
      }
      return state;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
