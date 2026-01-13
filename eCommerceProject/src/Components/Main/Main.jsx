import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useWishlist } from '../Context/WishlistContext'
import Slider from './Slider'
import { Link } from 'react-router-dom'

function Main() {
  const [data, setData] = useState([])
  const {likedItems, setLikedItems} = useWishlist() 

  useEffect(()=>{
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then((response)=>response.json())
    .then((result)=>setData(result))
    .catch((error)=>error)

  },[])

  
  // console.log(data);
  return (

    <div> 

      <Slider></Slider>
      
      <div className='w-full flex flex-wrap gap-8 px-[8em] py-[4em] dark:bg-black bg-[#fffbfb]'>
      {
        data.map((item)=>(
        
          <div
              key={item.id}
              className="w-72 bg-white dark:bg-[#181818] rounded-2xl shadow-xl p-4 relative h-[21em]"
            >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image_link}                
                alt={item.name}
                className="h-48 w-full object-cover rounded-xl"
              />
            </Link>

              <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white h-[3em] overflow-hidden">
                {item.name}        
              </h3>

              
                <span className="text-[#d6336c] font-bold bottom-5 left-4 absolute">
                  ${item.price || "N/A"}
                </span>

                <span className='text-white absolute right-6 bottom-5'>
                  <Heart 
                  size={22} 
                  className={` dark:text-[#d6336c] text-[#d6336c] dark:hover:text-[#d6336c] cursor-pointer
                  transition ${
                    likedItems.some(i => i.id === item.id)
                      ? "text-[#d6336c]"
                      : " dark:text-[#d6336c] text-[#d6336c] dark:hover:text-[#d6336c]"
                  }
                  `}
                  fill={likedItems.find(i => i.id === item.id) ? "#d6336c" : "none"}
                  // style={{bac}}
                  onClick={()=>{
                    setLikedItems((prev) => {
                      // If item is already liked, remove it
                      if (prev.find(i => i.id === item.id)) {
                        return prev.filter(i => i.id !== item.id);
                      }
                      // Otherwise, add the whole item object
                      return [...prev, {...item, quantity : 1, unitPrice: Number(item.price) || 0}];
                    })
                  }}/>
                </span>
            </div>
        ))
      }
      </div>
    </div>
  )
}

export default Main

