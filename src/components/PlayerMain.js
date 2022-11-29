import React, {  useEffect, useRef, useState } from 'react';

import songQueue from '../Data';
import Player from './subcomponents/Player';

const PauseBtn = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-pause-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
</svg>`;
const PlayBtn = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>`;
export default function PlayerMain() {
  const [currentSong, setCurrentSong] = useState(songQueue[0])
  const [constrains,setConstrains] = useState({firstSong:null,'lastSong':null,'changeVar':0,'direction':null,end:false}) 
  const [duration,setDuration] = useState({currentDuration:0,totalDuration:0})
  const audioRef = useRef(null)
  useEffect(() => {
    // console.log(constrains)
    if (constrains.changeVar){
      setTimeout(() => {
      const playBtnElement = document.querySelector('#play-btn')
      if( constrains.firstSong && constrains.direction === 'B'){
        audioRef.current.currentTime = 0
        audioRef.current.play()
        playBtnElement.innerHTML = PauseBtn
      }
      else if (constrains.lastSong && constrains.direction === 'F'){
        audioRef.current.currentTime = audioRef.current.duration
        audioRef.current.pause()
        playBtnElement.innerHTML = PlayBtn
      }
      else{
        audioRef.current.currentTime = 0
        audioRef.current.play()
        playBtnElement.innerHTML = PauseBtn
      }
    } 
    ,100)
  }
  },[constrains])
  const handlePlay = (e) => {
    const AudioStatus = audioRef.current.paused
    if (constrains.lastSong=== true && AudioStatus ){
      audioRef.current.currentTime = 0
      setConstrains((prevConstrains) => ({...prevConstrains,changeVar:0,end:false,lastSong:false}))
    }
    if (AudioStatus){
      e.currentTarget.innerHTML = PauseBtn
      audioRef.current.play();
    }
    else{
      e.currentTarget.innerHTML = PlayBtn
      audioRef.current.pause();
    }  
    
  }
  const handleChangeSong = (val) =>{
    setCurrentSong((prevSong) =>{
      const songCount = songQueue.length
      const indexSong = songQueue.findIndex((song) => song === prevSong)    
      let newIndex = indexSong+val
      const direction = val >0 ? 'F' : 'B'
      if (newIndex>=0 && newIndex <=songCount-1){
        setConstrains((prevConstrains) => {
          const newVar = prevConstrains.changeVar+1
          return {...prevConstrains,'lastSong':false,'firstSong':false,'direction':direction,'changeVar':newVar,'end':false}
        })
      }
      if (newIndex<0){
        setConstrains((prevConstrains) => {
          const newVar = prevConstrains.changeVar+1
          return {...prevConstrains,'firstSong':true,'changeVar':newVar,'direction':direction,'end':false}
        })
        newIndex = 0
      }
      if(newIndex>songCount-1){
        newIndex =songCount-1
        setConstrains((prevConstrains) => {
          const newVar = prevConstrains.changeVar+1
          return {...prevConstrains,'lastSong':true,'changeVar':newVar,'direction':direction,'end':false}
        })
      }
      return songQueue[newIndex]
    }
    )}
    const handleUpdateTimeLine = () =>{
      
      const timeline = document.querySelector('.timeline');
      const currentDuration = audioRef.current.currentTime
      const totalDuration = audioRef.current.duration
      const percentagePosition = (100*currentDuration) / totalDuration;
      timeline.style.backgroundSize = `${percentagePosition}% 100%`;
      timeline.value = percentagePosition;
      setDuration({currentDuration,totalDuration})
    }
    const handleUpdateDuration = () =>{
      
      const timeline = document.querySelector('.timeline');
      const time = (timeline.value * audioRef.current.duration) / 100;
      audioRef.current.currentTime = time;
    }
  return (
    <>
      <div className='thumbnail' style={{backgroundImage:`url(${currentSong.thumbnail})`}}>
        <h1 className='logo-title'>MUZICA</h1>
        <audio 
          src={currentSong.songFile}
          ref={audioRef}
          onChange={(e) => e.target.play()} 
          onTimeUpdate={handleUpdateTimeLine}
          onEnded={() => {
            document.querySelector('#play-btn').innerHTML = PlayBtn
            setConstrains((prevConstrains) =>{
              return {...prevConstrains,end:true}
            })
          }}
        >
        </audio>
        <Player 
        handleChangeSong={handleChangeSong} 
        handleUpdateDuration={handleUpdateDuration} 
        handlePlay ={handlePlay}
        song = {currentSong}
        duration ={duration}
        />
      </div>     
    </>
  )
}
