//import React, { useState } from 'react';
import "./App.css";
import Header from "./header.jsx";
import ContainerCard from "./ContainerCard.jsx"

function App() {
  return (
    <div className="App">
      <style>{"body { background-color: #475e6e; }"}</style>
      <div className="header">
        <Header/>
      </div>
      <div className="Container-Card">
        <ContainerCard />
      </div>
    </div>
  );
}

export default App;
