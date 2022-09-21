import React from "react";
import { Textfit } from "react-textfit";
import "./Screen.css";

function Screen({ value }) {
  return (
    <Textfit mode="single" className="screen">
      {value}
    </Textfit>
  );
}

export default Screen;
