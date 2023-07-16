import React from "react";
import "./ContainerCard.css";
import start from "./start.png";
import stop from "./stop.png";
import restart from "./restart.png";
import deleted from "./delete.png";

function ContainerCard() {
  return (
    <div className="ContainerCard">
      <style>{"body { background-color: #475e6e; }"}</style>
      <div className="data-div">
        <p>data</p>
        <button className="button"><img src={start} className="img" alt="start" /></button>
        <button className="button"><img src={stop} className="img" alt="stop" /></button>
        <button className="button"><img src={restart} className="img" alt="restart" /></button>
        <button className="button"><img src={deleted} className="img" alt="deleted" /></button>
      </div>
    </div>
  );
}
export default ContainerCard;
