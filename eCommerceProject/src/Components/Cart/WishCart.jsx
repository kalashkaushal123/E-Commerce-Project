import { Heart, Cross } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react'
import { useWishlist } from '../Context/WishlistContext'
import { useCart } from '../Context/CartContext';
import { useLogin } from '../Context/LoginContext';

function WishCart() {
  const { likedItems, setLikedItems } = useWishlist();
  const { setCartItems } = useCart()
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate()
  const location = useLocation()

  const moveToCart = (item) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } })
      return;
    }

    setCartItems(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) return prev;
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });

    setLikedItems(prev => prev.filter(i => i.id !== item.id));
  };

  const removeItems = (id) => {
    setLikedItems(prev => prev.filter(item => item.id !== id))
  }

  const handleIncrement = (id) => {
    setLikedItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    )
  }

  const handleDecrement = (id) => {
    setLikedItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  if (likedItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 dark:bg-black">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-pink-100 dark:bg-[#2a1c22] mb-6">
          <Heart size={40} className="text-[#d6336c]" fill="#d6336c" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Your wishlist is empty
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
          Tap the heart icon on products to save them here for later.
        </p>

        <Link to="/">
          <button className="mt-6 px-6 py-2 rounded-full bg-[#d6336c] text-white font-medium hover:bg-pink-600 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-16 py-10 bg-[#fffbfb] dark:bg-black pb-[8em]">
      {likedItems.map(item => (
        <div
          key={item.id}
          className="relative mb-6 flex flex-col lg:flex-row gap-6 bg-white dark:bg-[#181818] rounded-2xl shadow-xl p-4 lg:p-6"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="h-40 w-full sm:w-52 lg:w-40 object-cover rounded-xl mx-auto lg:mx-0"
          />

          {/* Content */}
          <div className="flex-1 lg:pl-10">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center lg:text-left">
              {item.name}
            </h3>

            {/* Price & Quantity */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mt-4 gap-4">
              <p className="text-[#d6336c] font-bold text-2xl">
                ${(Number(item.price * item.quantity).toFixed(2)) || "N/A"}
              </p>

              <div className="flex">
                <div
                  className="w-12 h-9 text-xl font-bold border-2 border-gray-700 cursor-pointer text-[#d6336c] flex items-center justify-center"
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </div>

                <div className="w-12 h-9 border-t-2 border-b-2 border-gray-700 text-[#d6336c] font-bold flex items-center justify-center">
                  {item.quantity}
                </div>

                <div
                  className="w-12 h-9 text-xl font-bold border-2 border-gray-700 cursor-pointer text-[#d6336c] flex items-center justify-center"
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center lg:justify-start">
              <button
                className="bg-[#d6336c] text-white px-8 py-2 rounded font-semibold mt-5"
                onClick={() => moveToCart(item)}
              >
                Move To Cart
              </button>
            </div>
          </div>

          {/* Remove */}
          <span className="absolute top-3 right-3 cursor-pointer">
            <Cross
              size={25}
              fill="#d6336c"
              className="text-[#d6336c] rotate-[45deg]"
              onClick={() => removeItems(item.id)}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

export default WishCart;

