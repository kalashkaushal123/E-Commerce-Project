import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "../Context/WishlistContext";

function Categories() {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const { likedItems, setLikedItems } = useWishlist();

  useEffect(() => {
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then(res => res.json())
      .then(result => {
        const filtered = result.filter(
          item => item.product_type === type
        );
        setData(filtered);
      });
  }, [type]);

  return (
    <div className="flex flex-wrap gap-8 px-16 py-10 bg-[#fffbfb] dark:bg-black">
      {data.map(item => (
        <div
          key={item.id}
          className="w-72 bg-white dark:bg-[#181818] rounded-xl shadow p-4 relative"
        >
          <img
            src={item.image_link}
            className="h-48 w-full object-cover rounded-lg"
          />

          <h3 className="mt-2 font-semibold dark:text-white">
            {item.name}
          </h3>

          <span className="text-[#d6336c] font-bold">
            ${item.price || "N/A"}
          </span>

          <Heart
            size={22}
            className="absolute right-4 bottom-4 cursor-pointer text-[#d6336c]"
            fill={likedItems.find(i => i.id === item.id) ? "#d6336c" : "none"}
            onClick={() =>
              setLikedItems(prev =>
                prev.find(i => i.id === item.id)
                  ? prev.filter(i => i.id !== item.id)
                  : [...prev, { ...item, quantity: 1 }]
              )
            }
          />
        </div>
      ))}
    </div>
  );
}

export default Categories;

