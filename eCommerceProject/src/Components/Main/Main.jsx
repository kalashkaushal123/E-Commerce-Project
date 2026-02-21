import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useWishlist } from "../Context/WishlistContext";
import Slider from "./Slider";
import { Link } from "react-router-dom";

function Main() {
  const [data, setData] = useState([]);
  const { likedItems, setLikedItems } = useWishlist();

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Slider />

      {/* Products Section */}
      <div className="w-full dark:bg-black bg-[#fffbfb] px-4 sm:px-6 md:px-10 lg:px-20 py-12">

        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-8
        ">
          {data.map((item) => (
            
            <div
              key={item.id}
              className="bg-white dark:bg-[#181818] rounded-2xl shadow-xl p-4 relative h-[21em]"
            >
            
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded-xl"
                />
              </Link>

              <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white h-[3em] overflow-hidden">
                {item.name}
              </h3>

              <span className="text-[#d6336c] font-bold absolute bottom-5 left-4">
                ${item.price || "N/A"}
              </span>

              <span className="absolute right-6 bottom-5 cursor-pointer">
                <Heart
                  size={22}
                  className="transition text-[#d6336c]"
                  fill={
                    likedItems.some((i) => i.id === item.id)
                      ? "#d6336c"
                      : "none"
                  }
                  onClick={() => {
                    setLikedItems((prev) => {
                      if (prev.find((i) => i.id === item.id)) {
                        return prev.filter((i) => i.id !== item.id);
                      }
                      return [
                        ...prev,
                        {
                          ...item,
                          quantity: 1,
                          unitPrice: Number(item.price) || 0,
                        },
                      ];
                    });
                  }}
                />
              </span>
            </div>
            
          ))}
        </div>

      </div>
    </div>
  );
}

export default Main;


