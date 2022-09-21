import React from 'react';
import bgm from './static/bgm.mp3'

import Play from './hooks/play'
import './App.css';

function App() {
  return (
    <div className="App">
      <Play url={bgm}></Play>
    </div>
  );
}

export default App;
