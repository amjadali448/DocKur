// import "./App.css";
// import Header from "./header";
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Home from './Doker/Home';
import Contaner from './Doker/Contaner';



export default function App(props) {
  const [data, setData] = useState({});

  return (
    <BrowserRouter >
      {/* <Helmet>
        <title>{generateTitle()}</title>
      </Helmet> */}

      <div className='pageBackground h-screen  '>

        <Navbar />
        <div style={{ height: '92%', backgroundColor: '#475E6E' }} className='flex height '>
          <Sidebar />

          <div className="App flex justify-items-center items-center flex-col w-full   " id="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contaner" element={<Contaner />} />
            </Routes>
          </div>
        </div>
      </div>

    </BrowserRouter>
  );
}