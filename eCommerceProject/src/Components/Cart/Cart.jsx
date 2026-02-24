import { Cross, ShoppingCart } from 'lucide-react'
import React, { useEffect } from 'react' 
import { Link } from 'react-router-dom' 
import { useCart } from '../Context/CartContext' 
import { useWishlist } from '../Context/WishlistContext' 
import { useLogin } from '../Context/LoginContext' 
 
 function Cart() { 
  const { cartItems, setCartItems } = useCart() 
  const { setLikedItems } = useWishlist() 
  const { token } = useLogin(); 

  console.log("Token:", token);

  
    useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Cart API Response:", data);

        // IMPORTANT: adjust according to your backend response
        // if (Array.isArray(data)) {
        //   setCartItems(data);
        // } else if (Array.isArray(data.cart)) {
        //   setCartItems(data.cart);
        // } else {
        //   setCartItems([]);
        // }


        if (Array.isArray(data.cart_items)) {
          setCartItems(data.cart_items);
        } else {
          setCartItems([]);
        }


      })
      .catch(err => console.error(err));

  }, [token]);



  // REMOVE ITEMS

  
  // const removeItems = (id) => { 
  //   setCartItems(prev => prev.filter(item => item.id !== id)) 
  // } 

  const removeItems = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/delete-cart/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  
  // MOVE TO WISHLIST 


  const moveToWishlist = (item) => { 
    setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id)) 
    setLikedItems(prev => { 
      const exists = prev.some(i => i.id === item.id) 
      if (exists) return prev 
      return [...prev, item] 
    }) 
  } 


  // INCREASE THE QUANTITY

  
  // const handleIncrement = (id) => { 
  //   setCartItems(prev => 
  //     prev.map(item => 
  //       item.id === id 
  //       ? { ...item, quantity: (item.quantity || 1) + 1 }
  //       : item ) 
  //     ) 
  //   } 



  const handleIncrement = async (id, currentQuantity) => {
    try {
      await fetch(`http://localhost:8000/api/update-cart/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: currentQuantity + 1,
        }),
      });

      setCartItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };



  // DECREASE QUANTITY

    // const handleDecrement = (id) => { 
    //   setCartItems(prev => 
    //     prev.map(item => item.id === id && item.quantity > 1 
    //       ? { ...item, quantity: item.quantity - 1 } 
    //       : item ) 
    //     ) 
    //   } 


  const handleDecrement = async (id, currentQuantity) => {
    if (currentQuantity <= 1) return;

    try {
      await fetch(`http://localhost:8000/api/update-cart/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: currentQuantity - 1,
        }),
      });

      setCartItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

      
  const totalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0) 
    
    
    if (cartItems.length === 0) { 
      return ( 
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 dark:bg-black"> 
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-pink-100 dark:bg-[#2a1c22] mb-6"> 
          <ShoppingCart size={50} className="text-[#d6336c]" fill="#d6336c" /> 
          </div> 
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200"> 
            Your Cart is empty 
          </h2> 
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm"> 
            Click to the Add to Cart Option to buy the product. 
          </p> 
          
          <Link to="/"> 
            <button className="mt-6 px-6 py-2 rounded-full bg-[#d6336c] text-white font-medium"> 
              Continue Shopping 
            </button> 
          </Link> 
        </div> 
      ) 
    } 
    return ( 
      <div className="w-full px-4 sm:px-6 lg:px-20 py-10 bg-[#fffbfb] dark:bg-black"> 
        <p className="bg-white dark:bg-black text-3xl py-4 text-[#d6336c] font-bold mb-6"> 
          Shopping Cart 
        </p> 
        
        {/* CART ITEMS */} 
        {cartItems.map(item => ( 
          <div 
          key={item.id} 
          className="relative mb-6 flex flex-col lg:flex-row gap-6 bg-white dark:bg-[#181818] rounded-2xl shadow-xl p-4 lg:p-6" > 
            <img 
            src={item.image} 
            alt={item.name} 
            className="h-40 w-full sm:w-52 lg:w-40 object-cover rounded-xl mx-auto lg:mx-0" /> 
            <div className="flex-1 lg:pl-12"> 
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center lg:text-left"> 
                {item.name} 
              </h3> 
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mt-4 gap-4"> 
                <p className="text-[#d6336c] font-bold text-2xl"> 
                  ${item.price} 
                </p> 
                
                <div className="flex"> 
                  <div 
                  className="w-12 h-9 border-2 border-gray-700 cursor-pointer text-[#d6336c] flex items-center justify-center text-xl font-bold" 
                  onClick={() => handleIncrement(item.id, item.quantity)} >
                   + 
                  </div> 
                  <div className="w-12 h-9 border-t-2 border-b-2 border-gray-700 text-[#d6336c] flex items-center justify-center font-bold"> 
                    {item.quantity} 
                  </div> 
                  
                  <div 
                  className="w-12 h-9 border-2 border-gray-700 cursor-pointer text-[#d6336c] flex items-center justify-center text-xl font-bold" 
                  onClick={() => handleDecrement(item.id, item.quantity)} > 
                    - 
                  </div> 
                </div> 
              </div> 
              <div className="flex justify-center lg:justify-start"> 
                <button 
                className="bg-[#d6336c] text-white px-8 py-2 rounded font-semibold mt-5" 
                onClick={() => moveToWishlist(item)} > 
                  Save For Later 
                </button> 
              </div> 
            </div> 
            <span className="absolute top-3 right-3 cursor-pointer"> 
              <Cross 
                size={25} 
                fill="#d6336c" 
                className="rotate-[45deg] text-[#d6336c]" 
                onClick={() => removeItems(item.id)} /> 
            </span> 
          </div> 
          ))} 
            
            
      {/* ORDER SUMMARY */} 


      <div className="bg-white dark:bg-[#181818] shadow-lg max-w-3xl mx-auto px-6 sm:px-10 py-8 rounded-lg mt-20"> 
      
      {cartItems.map(item => (
        <div 
        key={item.id} 
        className="flex justify-between text-lg mb-4"> 
          <span className="dark:text-white"> 
            {item.name} ({item.quantity}) 
          </span> 
          <span className="dark:text-white font-medium"> 
            ${(item.price * item.quantity).toFixed(2)} 
          </span> 
        </div> 
      ))} 
  
  <div className="flex justify-between text-xl font-bold mt-6"> 
    <span className="text-[#d6336c]">Total M.R.P</span> 
    <span className="dark:text-white"> ${totalPrice().toFixed(2)} </span> 
  </div> 
  
    <button className="w-full bg-[#d6336c] text-white rounded-lg py-4 mt-10 font-bold"> 
      Place Your Order 
    </button> 
</div> 

</div> 
) 
} 
export default Cart



