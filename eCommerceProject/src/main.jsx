import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite';


import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
import Main from './Components/Main/Main.jsx'
import About from './Components/About/About.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Contact from './Components/Contact/Contact.jsx'

import { WishlistProvider } from './Components/Context/WishlistContext.jsx'
import { CartProvider } from './Components/Context/CartContext.jsx'
import WishCart from './Components/Cart/WishCart.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Login from './Components/LogIn/Login.jsx'
import ProductDetail from './Components/Main/ProductDetail.jsx'
import { LoginProvider } from './Components/Context/LoginContext.jsx';
import { ThemeProviderWrapper } from './Components/Context/ThemeContext.jsx';
import SignUp from './Components/LogIn/SignUp.jsx';



// import React from 'react'
// import ReactDOM from 'react-dom/client'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Main />} />
      <Route path='about' element={<About />} />
      <Route path='categories/:type' element={<Categories />} />
      <Route path='contact' element={<Contact />} />
      <Route path='wishCart' element={<WishCart />} />
      <Route path='cart' element={<Cart />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='product/:id' element={<ProductDetail />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderWrapper>
        <LoginProvider>
          <WishlistProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </WishlistProvider>
        </LoginProvider>
      </ThemeProviderWrapper>
  </StrictMode>,
)
