import { Heart, Cross } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { useWishlist } from '../Context/WishlistContext'
import { useCart } from '../Context/CartContext';
import { useLogin } from '../Context/LoginContext';

function WishCart() {
    const { likedItems, setLikedItems } = useWishlist();
    const { cartItems, setCartItems } = useCart()
    const { isLoggedIn } = useLogin();
    const navigate = useNavigate()
    const location = useLocation()


    const moveToCart = (item) => {

    if(!isLoggedIn){
      navigate("/login",{
        state: {from: location.pathname}
      })
      return;
    }

    // add to cart (avoid duplicates)
    setCartItems(prev => {
        const exists = prev.find(p => p.id === item.id);
        if (exists) return prev;
        return [...prev, { ...item, quantity: item.quantity || 1 }];
    });

    // remove from wishlist
    setLikedItems(prev => prev.filter(i => i.id !== item.id));
    };

    const removeItems = (id) => {
        setLikedItems(likedItems.filter((items) => items.id !== id))
    }

    function handleIncrement(id){
        setLikedItems (prev => 
            prev.map(item => 
                item.id === id 
                ?{ ...item, quantity: (item.quantity || 1) + 1, 
                    // price : (item.unitPrice * (item.quantity + 2)).toFixed(2) 
                } 
                : item
            )
        )
        
    }

    function handleDecrement(id){
        setLikedItems (prev => 
            prev.map(item => 
                item.id === id && item.quantity > 1
                ?{ ...item, quantity: item.quantity - 1, 
                    // price: (item.unitPrice * (item.quantity - 1)).toFixed(2)
                 } 
                : item
            )
        )
    }

    // show empty state
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


    // show liked items 
        return (
            <div className="w-full gap-8 px-8 py-8 bg-[#fffbfb] dark:bg-black pl-32 pt-12 pb-[8em]">
            {likedItems.map((item) => (
                <div
                key={item.id}
                className="flex w-[70em] bg-white dark:bg-[#181818] rounded-2xl shadow-xl p-4 relative mb-5"
                >
                    <img
                        src={item.image_link}                
                        alt={item.name}
                        className="h-40 w-[10em] object-cover rounded-xl"
                    />
                    <div className='pl-14'>
                        <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white">
                            {item.name}
                        </h3>
                        <div className='flex mt-4'>
                            <p className="text-[#d6336c] font-bold text-[1.5em]">${(Number(item.price * item.quantity).toFixed(2)) || "N/A"}</p>
                            <div className='flex ml-[8em] text-center'>
                                <div 
                                className='w-[3em] h-[2.2em] text-[1.3em] font-bold border-2 border-gray-700 cursor-pointer text-[#d6336c] dark:text-[#d6336c]'
                                onClick={()=>handleIncrement(item.id)}>
                                    +
                                </div>
                                <div className='w-[3em] h-[2.2em] pt-1.5 text-[1.3em] border-t-2 border-b-2 border-gray-700 text-[#d6336c] dark:text-[#d6336c] font-bold'> 
                                    {item.quantity} 
                                </div>
                                <div 
                                className='w-[3em] h-[2.2em] text-[1.3em] font-bold border-2 border-gray-700 cursor-pointer text-[#d6336c] dark:text-[#d6336c]'
                                onClick={()=>handleDecrement(item.id)}>
                                    -
                                </div>
                            </div>
                        </div>

                        <button 
                        className='bg-[#d6336c] text-white px-8 py-2 rounded font-semibold mt-5'
                        onClick={() => moveToCart(item)}>
                            Move To Cart
                        </button>
                    </div>

                    {/* Remove button */}
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

export default WishCart


