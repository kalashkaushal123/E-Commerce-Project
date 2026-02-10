import React, { useState } from 'react'
import { ShoppingCart, Search, User, Moon, Heart, Menu, X } from "lucide-react";            // it's an icon library
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

    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);


  return (
    <header className="w-full bg-[#fce8ea] shadow-sm dark:bg-[#121212]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-bold text-[#d6336c]">
            Glow<span className="text-[#333] dark:text-[#f1f1f1]">Beauty</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 font-medium text-[#444] dark:text-gray-300">
          <NavLink to="/" className="hover:text-[#d6336c]">Home</NavLink>

          <div className="relative group cursor-pointer">
            <span className="hover:text-[#d6336c]">Categories</span>
            <ul className="absolute left-0 z-10 w-48 bg-white dark:bg-[#181818] shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              {[
                "foundation", "powder", "blush", "highlighter", "primer", "eyeshadow", "eyeliner", "mascara", "lipgloss", "lip liner", "lipstick", "brush", "Makeup Puff", ""
              ].map(item => (
                <NavLink
                  key={item}
                  to={`/categories/${item}`}
                  className="block px-4 py-2 text-sm hover:bg-pink-100 dark:hover:bg-[#2a2a2a]"
                >
                  {item.replace("_"," ").toUpperCase()}
                </NavLink>
              ))}
            </ul>
          </div>

          <NavLink to="/about" className="hover:text-[#d6336c]">About</NavLink>
          <NavLink to="/contact" className="hover:text-[#d6336c]">Contact</NavLink>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">


        {/* Search */} 
        <div className="hidden sm:flex items-center bg-white dark:bg-[#1c1c1c] rounded-full px-3 py-1 shadow-sm"> 
            <Search size={18} className="text-gray-400" /> 
            <input type="text" placeholder="Search beauty products..." className="outline-none border-none px-2 text-sm bg-transparent text-[#444] dark:text-[#f1f1f1]" /> 
        </div>


          {/* Theme Toggle */}
          <button
            onClick={() => themeMode === "dark" ? lightTheme() : darkTheme()}
            className="p-2 rounded-full hover:bg-pink-100 dark:hover:bg-[#2a2a2a] dark:text-white"
          >
            <Moon size={20} />
          </button>

          {/* Wishlist */}
          <Link to="/wishCart" className="relative p-2">
            <Heart size={22} className='dark:text-white' />
            {likedItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d6336c] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full ">
                {likedItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={22} className='dark:text-white' />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d6336c] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* ================= USER SECTION ================= */}

            {/* DESKTOP / MEDIUM+ → Direct Logout */}
            {isLoggedIn && (
            <div className="hidden md:flex items-center gap-3">
                <span className="text-sm font-medium dark:text-white">
                {user.name}
                </span>

                <button
                onClick={logout}
                className="bg-[#d6336c] text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition"
                >
                Logout
                </button>
            </div>
            )}

            {/* MOBILE → Avatar Dropdown */}
            {isLoggedIn && (
            <div className="relative md:hidden">
                <button
                onClick={() => setUserMenu(!userMenu)}
                className="w-9 h-9 rounded-full bg-[#d6336c] text-white font-bold"
                >
                {user.name.charAt(0).toUpperCase()}
                </button>

                {userMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#181818] shadow-lg rounded-xl p-3 z-50">
                    <p className="text-sm dark:text-white">{user.name}</p>
                    <button
                    onClick={logout}
                    className="mt-2 w-full bg-[#d6336c] text-white text-sm py-1 rounded"
                    >
                    Logout
                    </button>
                </div>
                )}
            </div>
            )}

            {/* NOT LOGGED IN */}
            {!isLoggedIn && (
            <Link to="/login">
                <button className="bg-[#d6336c] text-white px-4 py-2 rounded-full text-sm">
                <User size={16} />
                </button>
            </Link>
            )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#181818] px-6 py-4 shadow-lg">
            
            <ul className="flex flex-col gap-4 font-medium text-[#444] dark:text-gray-300">

            <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#d6336c]"
            >
                Home
            </NavLink>

            {/* Mobile Categories Toggle */}
            <button
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className="flex items-center justify-between hover:text-[#d6336c]"
            >
                <span>Categories</span>
                <span className="text-sm">
                {mobileCategoryOpen ? "-" : "+"}
                </span>
            </button>

            {/* Categories List (ONLY when clicked) */}
            {mobileCategoryOpen && (
                <div className="flex flex-col gap-2 pl-4">
                {[
                    "bronzer","blush","lip_liner","foundation","eyeshadow",
                    "eyeliner","nail_polish","lipstick","mascara"
                ].map(item => (
                    <NavLink
                    key={item}
                    to={`/categories/${item}`}
                    onClick={() => {
                        setMenuOpen(false);
                        setMobileCategoryOpen(false);
                    }}
                    className="text-sm hover:text-[#d6336c]"
                    >
                    {item.replace("_"," ").toUpperCase()}
                    </NavLink>
                ))}
                </div>
            )}

            <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#d6336c]"
            >
                About
            </NavLink>

            <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#d6336c]"
            >
                Contact
            </NavLink>

            </ul>
        </div>
        )}
          </header>

      )
}

export default Header

