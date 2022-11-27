import React from 'react'
import {  SkipBackwardFill, SkipForwardFill } from "react-bootstrap-icons";
export default function Player({handleChangeSong,handlePlay,handleUpdateDuration}) {
  return (
    <div>
      <div className="controls-all">
        <input type="range" className="timeline" onChange={handleUpdateDuration} max="100" value="0"></input>
        <div className='controls'>
          <div className='track-info'>
            Test
          </div>
          <div className='playback-controls'>
            <button onClick={() =>handleChangeSong(-1)} className='previous-song-btn'>
              <SkipBackwardFill/>
            </button>
            <button id='play-btn' onClick={(e) => handlePlay(e)} className="player-button">
              <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
              </svg>             
            </button>
            <button onClick={() =>handleChangeSong(1)} className='previous-song-btn'>
              <SkipForwardFill/>
            </button>
          </div>
          <div className='volumne-controls'>
            Volume controls
          </div>
        </div>
      </div>
    </div>
  )
}
