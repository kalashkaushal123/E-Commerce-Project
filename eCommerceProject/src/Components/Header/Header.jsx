import React from 'react'
import { ShoppingCart, Search, User, Moon, Heart } from "lucide-react";            // it's an icon library
import {Link, NavLink} from 'react-router-dom'
import useTheme from '../Context/ThemeContext';
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from '../Context/CartContext';
import { useLogin } from '../Context/LoginContext';


function Header() {
    const {themeMode, lightTheme, darkTheme} = useTheme()
    const { likedItems } = useWishlist();
    const { cartItems  } = useCart();

    const {user, isLoggedIn, logout} = useLogin()

  return (
    <header className="w-full bg-[#fce8ea] shadow-sm dark:bg-[#121212]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/">
            <div className="text-2xl font-bold text-[#d6336c] tracking-wide">
                Glow<span className="text-[#333] dark:text-[#f1f1f1]">Beauty</span>
            </div>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-[#444] font-medium">

          <Link to='/'  className={({isActive}) => isActive ? "text-[#d6336c]" : "text-[#444] dark:text-gray-300"}>
            <li className="hover:text-[#d6336c] cursor-pointer dark:text-gray-300 dark:hover:text-[#d6336c]">Home</li>
          </Link>
          <li className="relative group cursor-pointer">
            {/* Parent */}
            <span className="flex items-center gap-1 text-[#444] dark:text-gray-300 hover:text-[#d6336c]">
              Categories
            </span>

            {/* Dropdown */}
            <ul className="absolute left-0 mt-3 w-48 bg-white dark:bg-[#181818] shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {[
                "bronzer",
                "blush",
                "lip_liner",
                "foundation",
                "eyeshadow",
                "eyeliner",
                "nail_polish",
                "lipstick",
                "mascara",
              ].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/categories/${item}`}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm ${
                        isActive
                          ? "bg-pink-100 text-[#d6336c] dark:bg-[#2a2a2a]"
                          : "text-[#444] dark:text-gray-300"
                      } hover:bg-pink-100 hover:text-[#d6336c] dark:hover:bg-[#2a2a2a] dark:hover:text-[#d6336c] transition`
                    }
                  >
                    {item.replace("_", " ").toUpperCase()}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          <NavLink to='/about'  className={({isActive}) => isActive ? "text-[#d6336c]" : "text-[#444] dark:text-gray-300"}>
            <li className="hover:text-[#d6336c] cursor-pointer">About</li>
          </NavLink>
          <NavLink to='/contact'  className={({isActive}) => isActive ? "text-[#d6336c]" : "text-[#444] dark:text-gray-300"}>
            <li className="hover:text-[#d6336c] cursor-pointer">Contact</li>
          </NavLink>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Search */}
         <div className="hidden sm:flex items-center bg-white dark:bg-[#1c1c1c] rounded-full px-3 py-1 shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input
                type="text"
                placeholder="Search beauty products..."
                className="outline-none border-none px-2 text-sm bg-transparent text-[#444] dark:text-[#f1f1f1]"
            />
         </div>

          {/* Toggle */}
          <button
            onClick={() => {
              console.log("Moon clicked");
              themeMode === "dark" ? lightTheme() : darkTheme();
            }}
            className="p-2 rounded-full hover:bg-pink-100 dark:hover:bg-[#2a2a2a] transition"
          >
            <Moon
              size={20}
              className="text-[#444] dark:text-[#f1f1f1]"
            />
          </button>


          {/* Wishlist */}
          <button className="relative p-2 rounded-full hover:bg-pink-100 dark:hover:bg-[#2a2a2a] transition">
            <Link to="/wishCart">
              <Heart size={22} className="text-[#444] dark:text-gray-300 hover:text-[#d6336c]"/>
              
              {/* Wishlist count */}

              {likedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d6336c] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {likedItems.length}
                </span>
              )}
            </Link>
            
          </button>

          {/* Cart */}
          <button className="relative p-2 rounded-full hover:bg-pink-100 dark:hover:bg-[#2a2a2a] transition">
            <Link to="/cart">
              <ShoppingCart size={22} className="text-[#444] dark:text-[#f1f1f1]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d6336c] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
                
              )
                
              }
              
            </Link>
          </button>

          {/* Login */}
          {/* <Link to="/login">
            <button className="flex items-center gap-1 bg-[#d6336c] hover:bg-[#c2255c] text-white px-4 py-2 rounded-full text-sm transition">
              <User size={16} />
              Login
            </button>
          </Link> */}

          {isLoggedIn ? (
            <>
              <span className='dark:text-white'>Hello, {user.name}</span>
              <button 
              onClick={logout}
              className="flex items-center gap-1 bg-[#d6336c] hover:bg-[#c2255c] text-white px-4 py-2 rounded-full text-sm transition">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button 
              className="flex items-center gap-1 bg-[#d6336c] hover:bg-[#c2255c] text-white px-4 py-2 rounded-full text-sm transition">
                <User size={16} />
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

