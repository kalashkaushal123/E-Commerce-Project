import { Cross, Heart, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext'
import { useWishlist } from '../Context/WishlistContext'

function Cart() {
    const {cartItems, setCartItems} = useCart()
    const {likedItems, setLikedItems} = useWishlist()
  

    const removeItems = (id) => {
        setCartItems(cartItems.filter((items) => items.id !== id))
    }

    const moveToWishlist = (item) => {
        setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id))

        // add to wishlist (avoid duplicates)
        setLikedItems(prev => {
            const alreadyExists = prev.some(likedItems => likedItems.id === item.id)
            if (alreadyExists) return prev
            return [...prev, item]
        })
    }

    function handleIncrement(id){
        setCartItems (prev => 
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
        setCartItems (prev => 
            prev.map(item => 
                item.id === id && item.quantity > 1
                ?{ ...item, quantity: item.quantity - 1, 
                    // price: (item.unitPrice * (item.quantity - 1)).toFixed(2)
                 } 
                : item
            )
        )
    }

    const totalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + Number(item.price) * item.quantity
        }, 0)
        
    }


    if(cartItems.length === 0){
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 dark:bg-black">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-pink-100 dark:bg-[#2a1c22] mb-6">
                
                <ShoppingCart size={50} className="text-[#d6336c] dark:text-[#f1f1f1]" fill="#d6336c" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Your Cart is empty
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
                Click to the Add to Cart Option to buy the product.
                </p>

                <Link to="/">
                    <button className="mt-6 px-6 py-2 rounded-full bg-[#d6336c] text-white font-medium hover:bg-pink-600 transition">
                        Continue Shopping
                    </button>
                </Link>
            </div>
  )
    }

    return(
    <div className="w-full gap-8 px-8 py-8 bg-[#fffbfb] dark:bg-black pl-[10em] pt-12">
        <p className='bg-white text-3xl py-4 text-[#d6336c] font-bold dark:bg-black mb-5 '>Shopping Cart</p>
            {cartItems.map((item) => (
                <div
                key={item.id}
                className="flex w-[74em] bg-white dark:bg-[#181818] rounded-2xl shadow-xl p-4 relative mb-5"
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
                        onClick={() => moveToWishlist(item)}>
                            Save For Later
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


            <div className='bg-white shadow-lg w-[44em] ml-[15em] px-[4em] py-[2em] dark:bg-[#181818] rounded-lg mt-[6em]'>
                {
                    cartItems.map((item) => (
                        <div  className='text-black dark:text-white text-lg mb-4 flex relative' >
                            <h3 className="mt-3 text-gray-800 dark:text-white w-[20em]">
                                {item.name}
                            </h3>   
                            <span className='text-[1em] mt-3 ml-14'>({item.quantity})</span>
                            <p className="dark:text-white text-black font-medium text-[1em] mt-3 absolute right-6">${(Number(item.price * item.quantity).toFixed(2)) || "N/A"}</p>

                        </div>
                    ))
                }
                <span className='text-xl font-semibold text-[#d6336c]'>Total M.R.P</span>
                <span className='text-black dark:text-white text-xl ml-[19em] font-bold'>$ {totalPrice().toFixed(2)} </span>

                <button className=' bg-[#d6336c] text-white rounded-lg px-[14em] py-[1em] mt-12 font-bold'>Place Your Order</button>
            </div>
    </div>
    )
}

export default Cart


