import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // ?  This Custom Provider will store data (state) and functionality (updaters) in here and everyone can access it via the Consumer!
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return <LocalStateProvider value={{
    cartOpen,
    toggleCart,
    closeCart,
    openCart,
  }}>{children}</LocalStateProvider>;
}

// ? Make a Custom Hook for accessing the cart local state
function useCart() {
  // ? Use a Consumer to access the cart state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };