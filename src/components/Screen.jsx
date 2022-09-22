import React from "react";
import { Textfit } from "react-textfit";
import "./Screen.css";

function Screen({ value }) {
  const style = value.toString().length > 18 ? "screen font" : "screen";
  return (
    <Textfit mode="single" className={style}>
      {value}
    </Textfit>
  );
}

export default Screen;
