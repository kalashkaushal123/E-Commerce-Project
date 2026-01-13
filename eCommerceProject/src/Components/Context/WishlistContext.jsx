  import { createContext, useContext, useEffect, useState } from "react";
import { useLogin } from "./LoginContext";

  const WishlistContext = createContext(null);

  export function WishlistProvider({ children }) {

    const { isLoggedIn, user } = useLogin()

    const [likedItems, setLikedItems] = useState([]);

    useEffect(() => {
      if (!isLoggedIn || !user) {
        setLikedItems([]);
        return;
      }

      const stored = localStorage.getItem(`wishlist_${user.email}`);
      setLikedItems(stored ? JSON.parse(stored) : []);
    }, [isLoggedIn, user]);

    // 🔹 Save wishlist when it changes
    useEffect(() => {
      if (!isLoggedIn || !user) return;

      localStorage.setItem(
        `wishlist_${user.email}`,
        JSON.stringify(likedItems)
      );
    }, [likedItems, isLoggedIn, user]);

    return (
      <WishlistContext.Provider value={{ likedItems, setLikedItems }}>
        {children}
      </WishlistContext.Provider>
    );
  }

  export function useWishlist() {
    const context = useContext(WishlistContext);

    if (!context) {
      throw new Error("useWishlist must be used inside WishlistProvider");
    }

    return context;
  }


