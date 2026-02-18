import { createContext, useContext, useEffect, useState } from "react";
import { useLogin } from "./LoginContext";

const CartContext = createContext();

export function CartProvider({ children }) {

  const { isLoggedIn, user } = useLogin();

  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    if(!isLoggedIn || !user){
      setCartItems([]);
      return;
      }
      
      const stored = localStorage.getItem(`Cart_${user.email}`);
      const parsed = stored ? JSON.parse(stored) : [];

      setCartItems(Array.isArray(parsed) ? parsed : []);

    }, [isLoggedIn, user])

    // save cat when it changes
    useEffect(() => {
      if (!isLoggedIn || !user) return;

      localStorage.setItem( `Cart_${user.email}` , JSON.stringify(cartItems))
    }, [cartItems, isLoggedIn, user])

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

