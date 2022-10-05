import React, { useState } from "react";
import muyuBgm from "../static/muyu.mp3";
import { useAudio } from "../hooks/play";
import "./muyu.less";

const clickNumberFromCache = Number(localStorage.getItem("clickNumber")) || 0;

const Muyu = () => {
  const [clickState, setClickState] = useState(false);
  const [clickNumber, setClickNumber] = useState(clickNumberFromCache);
  const [audioState, audioToggle] = useAudio(muyuBgm, { loop: false });

  const clickMuyu = () => {
    console.log(clickState,audioState)
    if (clickState) return;

    audioToggle();

    setClickState(true);
    setClickNumber(clickNumber + 1);
    localStorage.setItem("clickNumber", String(clickNumber + 1));

    setTimeout(() => {
      setClickState(false);
    }, 200);
  };

  const clearNumber = (e: React.MouseEvent) => {
    e.stopPropagation();

    localStorage.setItem("clickNumber", String(0));
    setClickNumber(0);
  };

  const textShow = {
    display: clickState ? "block" : "none",
  };

  return (
    <div
      className={["muyu-container", clickState ? "clicked" : ""].join(" ")}
      onClick={clickMuyu}
    >
      <div className="muyu-count">
        {clickNumber ? `您已敲击${clickNumber}次` : "请诚心敲击木鱼"}
      </div>
      <div className="muyu-text" style={textShow}>
        佛缘+1
      </div>
      <div className={["muyu", clickState ? "clicked" : ""].join(" ")}></div>
      {/* <div className="btn" onClick={clearNumber}>
        计数清0
      </div> */}
    </div>
  );
};

export default Muyu;
