import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from "react-router-dom";
import HomePage from '../components/HomePage';
import '../assets/styles/homepage/homepage.css';


function layout() {
  return (
    <>
      <div className="header-container">
        <Header/>
        <div className="sidebar-container">
          {/* <HomePage/> */}
          <div className="main-content">
            <Outlet />
          </div>
        </div>
        <Footer/>
      </div>
      {/* <Cart /> */}
    </>
  )
}

export default layout