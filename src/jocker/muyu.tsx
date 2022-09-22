import React, { useState } from "react";
import * as _ from "lodash"
// import {useStore,actions} from '../store/index'
import muyuBgm from '../static/muyu.mp3'
import {useAudio} from '../hooks/play'
import "./muyu.less";




const Muyu = () => {
  const [clickState,setClickState] = useState(false);
  const [audioState,audioToggle] = useAudio(muyuBgm,{loop:false})
  const clickMuyu = ()=>{
    if(clickState) return;

    audioToggle()
    setClickState(true)
    setTimeout(() => {
        setClickState(false)
    }, 1000);
  }
  const textShow = {
    display: clickState?'block':'none'
  }
  return (
    <div className="muyu-container">
        <div className="muyu-text" style={textShow}>佛缘+1</div>
      <div className="muyu" onClick={clickMuyu}></div>
    </div>
  );
};

export default Muyu;
