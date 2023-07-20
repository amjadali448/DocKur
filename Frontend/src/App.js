import React, { useState } from 'react';
import "./App.css";
import Header from "./header.jsx";
import ContainerCard from "./ContainerCard.jsx"

function App(props){ 

const [selectedItem, setSelectedItem] = useState(null);
const handleItemClick = (item) => {
  setSelectedItem(item);
};
  return (
    <div className="App">
      <style>{"body { background-color: #475e6e; }"}</style>
      <div className="header">
        <Header onItemClick={handleItemClick}/>
      </div>
      <div className="Container-Card">
          {selectedItem && <ContainerCard Iname={selectedItem} />}
      </div>
    </div>
  );
}

export default App;