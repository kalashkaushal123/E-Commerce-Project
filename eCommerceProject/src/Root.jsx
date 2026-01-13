import React from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Root() {
  console.log("Hello");
  
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Root

