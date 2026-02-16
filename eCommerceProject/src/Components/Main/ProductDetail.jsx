
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {cartItems, setCartItems} = useCart();
  const {likedItems, setLikedItems} = useWishlist();
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const moveToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if(exists){
        return prev.map((p) => p.id === item.id ? {...p, quantity: p.quantity + 1} : p)
      }
      return [...prev, {...item, quantity: 1}]
    });
    navigate("/cart")
  }

  const moveToWishlist = (item) => {
    setLikedItems((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev;

      return [...prev, {...item}]
    })
    navigate("/wishlist")
  }

    return (
    <div className="min-h-screen px-[8em] py-[4em] bg-[#fffbfb] dark:bg-black">

      <div className="flex gap-12 bg-white dark:bg-[#181818] p-10 rounded-2xl shadow-xl">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-[22em] h-[22em] object-cover rounded-xl"
        />

        {/* INFO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#d6336c]">
            {product.name}

          </h1>

          <p className="text-xl font-semibold dark:text-white">
            ${product.price || "N/A"}
          </p>

          <div className="flex items-center gap-2">

            <span className="text-lg font-semibold text-gray-800 dark:text-white">
                Rating : 
            </span>

            <span className="text-lg font-semibold text-gray-800 dark:text-white">
                {product.rating || "N/A"} 
            </span>

            <span className="text-lg font-semibold text-gray-600 dark:text-white">
                / 5    
            </span>

            <span className="ml-3">
                ⭐
            </span>

            
            </div>


          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description || "No description available"}
          </p>

          <p className="dark:text-white">
            <strong>Brand:</strong> {product.brand || "N/A"}
          </p>

          <p className="dark:text-white">
            <strong>Category:</strong> {product.category || "N/A"}
          </p>

          <div className="flex">
            <button 
            className="mt-6 bg-[#d6336c] text-white px-8 py-3 rounded-full hover:scale-105 transition w-[16em]"
            onClick={() => moveToCart(product)}>
                Add to Cart
            </button>

            <button 
            className="mt-6 bg-[#d6336c] text-white px-8 py-3 rounded-full hover:scale-105 transition ml-20 w-[16em]"
            onClick={() => moveToWishlist(product)}>
                Wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;


