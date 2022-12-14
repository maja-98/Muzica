import React, { useEffect, useState } from 'react'
import {  SkipBackwardFill, SkipForwardFill,SpeakerFill } from "react-bootstrap-icons";
export default function Player({handleChangeSong,handlePlay,handleUpdateDuration,duration}) {
  const [volume,setVolume] = useState(50)
  useEffect(()=>{
    const handleKeyPress = (event) => {
    const key = event.code
    const volBar = document.querySelector('#volume-control')
    const volPercent = document.querySelector('#vol-percent')
    if (key==='ArrowUp' | key==='ArrowDown'){
      event.preventDefault()
      
      if (volBar.style.display==='none'|volBar.style.display===''){
      volBar.style.display = 'inline-block'
      volPercent.style.display ='none'
      }
    }
    if (key==='ArrowUp' ){
      volBar.value  =  parseInt(volBar.value)+1
    }
    else if(key==='ArrowDown'){
      volBar.value  =  parseInt(volBar.value)-1
    }
    }
    document.addEventListener("keydown", (event) =>handleKeyPress(event))
    return (() => document.removeEventListener("keydown",(event) => handleKeyPress(event)))
  },[])

  const handleAudioBarToggle = () => {
    const volBar = document.querySelector('#volume-control')
    const volPercent = document.querySelector('#vol-percent')
    if (volBar.style.display==='') {
      volBar.style.display = 'none'
    }
    if  (volPercent.style.display ===''){
      volPercent.style.display = 'inline-block'
    }
    volBar.style.display = volBar.style.display==='none' ?  'inline-block' : 'none'
    volPercent.style.display = volPercent.style.display==='none'  ?  'inline-block' : 'none'
  }
  const handleVolumeControl = () =>{
    const volBar = document.querySelector('#volume-control')
    const audio = document.querySelector('audio') 
    audio.volume = volBar.value/100
    setVolume(volBar.value)
  }
  const secondsToMinute = (seconds) =>{
    if (seconds){
    let minutes = Math.floor(seconds/60)
    let addSeconds = seconds % 60
    addSeconds = Math.floor(addSeconds)
    minutes = minutes < 10 ? '0'+minutes : minutes
    addSeconds = addSeconds < 10 ? '0'+addSeconds : addSeconds
    return minutes+':'+addSeconds}
    else{
      return '00:00'
    }
  }

  return (
    <div className='player-container'>
      <div className="controls-all">
        <input type="range" className="timeline" onChange={handleUpdateDuration} max="100" value="0"></input>
        <div className='controls'>
          <div className='track-info'>
            <h2 className='duration'>{secondsToMinute(duration.currentDuration)}/{secondsToMinute(duration.totalDuration)}</h2>
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
          <div className='volume-control-container'>
            <span id='vol-percent'>{volume}%</span>
            <button id='vol-btn' onClick={handleAudioBarToggle}><SpeakerFill/></button>
            <input 
            id ='volume-control'
            type={'range'} 
            min={0}
            max={100}
            onChange ={handleVolumeControl}
            ></input>
          </div>
        </div>
      </div>
    </div>
  )
}
