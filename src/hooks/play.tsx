import React, { useState, useEffect } from "react";
// import {useStore,actions} from '../store/index'
import "./play.less";


export const useAudio = (url: string, options: Partial<HTMLAudioElement>) => {
//   const [state,actions] = useStore('gameStore')
  const [playing, setPlaying] = useState(false); // 播放暂停
  const [hasBeenClicked, setHasBeenClicked] = useState(false); // 是否点击过
  const [loading, setLoading] = useState(true); // 加载情况

  const [audio] = useState(new Audio(url));
  
  audio.loop = options.loop || false
  audio.controls = options.controls || false;
  audio.ontimeupdate = (event:Event)=>{
    console.log('duration',audio.currentTime)
    if(audio.currentTime >=0.3){
      audio.currentTime = 0.1;
      audio.pause();
      setPlaying(false)
    }
  }
  audio.oncanplaythrough = (env: Event) => {
    //console.log(audio.duration)
   
    setLoading(false);
  };
  const playerToggle = () => {
    setHasBeenClicked(true);
    setPlaying(!playing);
  };

  useEffect(() => {
    if(playing){
       audio.currentTime = 0.1 ;
       audio.play()
    }else{
      audio.pause();
      setPlaying(false)
    }
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [{ loading, playing, hasBeenClicked }, playerToggle] as const;
};

interface playerOptions {
  url: string;
}
const usePlayer = (opt: playerOptions) => {
  const [audioState, playerToggle] = useAudio(opt.url, {
    loop: true,
    controls: false,
  });
  const show = {
    display: !(audioState.playing && audioState.hasBeenClicked)
      ? "block"
      : "none",
  };
  const text = audioState.loading
    ? "加载中..."
    : audioState.playing
    ? "放弃挑战"
    : "开始挑战";
  return (
    <div className="audio-container" style={show}>
      <button onClick={playerToggle}>{text}</button>
    </div>
  );
};

export default usePlayer;
