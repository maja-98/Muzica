import React, { useEffect, useRef, useState } from 'react';
import sample1Img from '../media/sample1.jpg' 
import sample1Sng from '../media/sample1.mp3' 
import sample2Img from '../media/sample2.jpg' 
import sample2Sng from '../media/sample2.mp3' 
import {  SkipBackwardFill, SkipForwardFill } from "react-bootstrap-icons";

const songQueue = [
  {
    title:'sample1',
    songFile: sample1Sng,
    thumbnail: sample1Img,
    category: 'rock'
  },
  {
    title:'sample2',
    songFile: sample2Sng,
    thumbnail:sample2Img,
    category: 'pop'
  },
]
const PauseBtn = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-pause-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
</svg>`;
const PlayBtn = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>`;
export default function Home() {

  const [currentSong, setCurrentSong] = useState(songQueue[0])
  const audioRef = useRef(null)
  const HandlePlay = (e) => {
    const AudioStatus = audioRef.current.paused
    if (AudioStatus){
      e.currentTarget.innerHTML = PauseBtn
      audioRef.current.play();
    }
    else{
      e.currentTarget.innerHTML = PlayBtn
      console.log(audioRef)
      audioRef.current.pause();
    }  
  }
  const HandleChangeSong = (val) =>{
    
    
    setCurrentSong((prevSong) =>{
      const songCount = songQueue.length
      const indexSong = songQueue.findIndex((song) => song === prevSong)
      const newIndex = indexSong+val
      if ( (newIndex< songCount-1) && (newIndex>0)) {
        return songQueue[newIndex]
      }
      else if(newIndex>songCount-1){
        return songQueue[0]
      }
      else{
        return songQueue[songCount-1]
      }
    })
    setTimeout(() => {
      audioRef.current.play()
      document.querySelector('#play-btn').innerHTML = PauseBtn
    },500)
    }
    const handleUpdateTimeLine = () =>{
      const timeline = document.querySelector('.timeline');
      const percentagePosition = (100*audioRef.current.currentTime) / audioRef.current.duration;
      timeline.style.backgroundSize = `${percentagePosition}% 100%`;
      timeline.value = percentagePosition;
    }
    const handleUpdateDuration = () =>{
      const timeline = document.querySelector('.timeline');
      const time = (timeline.value * audioRef.current.duration) / 100;
      audioRef.current.currentTime = time;
    }
  return (
    <>
      <div className='thumbnail' style={{backgroundImage:`url(${currentSong.thumbnail})`}}>
        <h1 className='song-title'>{currentSong.title}</h1>
        <audio 
          src={currentSong.songFile}
          ref={audioRef}
          onChange={(e) => e.target.play()} 
          onEnded={() =>HandleChangeSong(1)} 
          onTimeUpdate={handleUpdateTimeLine}
        >
        </audio>
      </div>     
      <div className="controls-all">
        <input type="range" class="timeline" onChange={handleUpdateDuration} max="100" value="0"></input>
        <div className='controls'>
          <div className='track-info'>
            Test
          </div>
          <div className='playback-controls'>
            <button onClick={() =>HandleChangeSong(-1)} className='previous-song-btn'>
              <SkipBackwardFill/>
            </button>
            <button id='play-btn' onClick={(e) => HandlePlay(e)} className="player-button">
              <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
              </svg>             
            </button>
            <button onClick={() =>HandleChangeSong(1)} className='previous-song-btn'>
              <SkipForwardFill/>
            </button>
          </div>
          <div className='volumne-controls'>
            Volume controls
          </div>
        </div>
      </div>

    </>
  )
}
