import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Home from './Doker/Home';
import Contaner from './Doker/Contaner';
import ImportImg from './Doker/ImportImg';



export default function App(...otherprops) {
  return (
    <BrowserRouter >
      {/* <Helmet>
        <title>{generateTitle()}</title>
      </Helmet> */}

      <div className='pageBackground h-screen w-full '>

        <Navbar />
        <Home />

      </div>

    </BrowserRouter>
  );
}