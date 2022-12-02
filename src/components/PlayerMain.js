import React, {  useEffect, useRef, useState } from 'react';
import AllSongsList from '../AllSongsList'
import songs from '../Data';
import AllSongs from './subcomponents/AllSongs';
import Player from './subcomponents/Player';
import SongQueueComp from './subcomponents/SongQueueComp';
import defaultImage from './../media/default.png'
import NavBar from './subcomponents/NavBar';

const PauseBtn = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-pause-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
</svg>`;
const PlayBtn = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>`;
const defaultSong =   {
  id:null,
  title:'',
  songFile: null,
  thumbnail: defaultImage,
  artist:'',
  category: ''
}
const songsList = songs
const endValue = songs.length>0 ? false : true
const currentSongTemp = endValue===false ? songsList[0] : defaultSong
export default function PlayerMain() {
  const [songQueue , setSongQueue] = useState(songsList)
  const [currentSong, setCurrentSong] = useState(currentSongTemp)
  const [constrains,setConstrains] = useState({firstSong:null,'lastSong':null,'changeVar':0,'direction':null,end:endValue}) 
  const [duration,setDuration] = useState({currentDuration:0,totalDuration:0})
  const audioRef = useRef(null)
  
  useEffect(() => {
    console.log(constrains)
    if (constrains.direction === 'N'){
      audioRef.current.currentDuration = 0
    }
    if (constrains.changeVar && !constrains.end){
      
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
  function constrainManager(newIndex,direction,songCount){
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
      return newIndex
  }
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
      const indexSong = songQueue.findIndex((song) => song.id === prevSong.id)   
      let newIndex = indexSong+val 
      const direction = val >0 ? 'F' : 'B'
      newIndex = constrainManager(newIndex,direction,songCount)
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
  const handleAddQueue = (id) =>{
    
    setSongQueue((prevQueue) => {
      let NewQueue = [...prevQueue]
      const NewID = prevQueue.reduce((a,b) => Math.max(a,b.id),0) + 1
      const song = AllSongsList.find((song) => song.id === id)
      const NewSong = {
        ...song,
        'id':NewID,
      }
      NewQueue.push(NewSong)
      return (NewQueue)
    })
    if (constrains.end){
    setCurrentSong(() => {
      const song = AllSongsList.find((song) => song.id === id)
      return {...song,'id':1}
    })
    setConstrains({firstSong:null,'lastSong':null,'changeVar':0,'direction':'N',end:false})
    
    }
  }
  const handleRemoveQueue = (id) =>{
    // const removDiv = document.querySelector('.queue-item-'+id)
    // removDiv.style.animation = 'left-out 1s'
    const songCount = songQueue.length
    const removeSong = songQueue.filter((song)=>song.id===id)[0]
    const indexSong = songQueue.findIndex((song) => song === removeSong) 
    // console.log(songCount,currentSong.id , removeSong.id,songCount===1)
    
    if (songCount===1){
      setCurrentSong(defaultSong)
      setConstrains((prevConstrains) => ({...prevConstrains,'end':true,'direction':null}))
    }
    
    else if (currentSong.id=== removeSong.id){
      console.log("passed")
      if (songCount === indexSong+1){
      
        handleChangeSong(-1)
      }
      else{
        console.log('next')
        handleChangeSong(1)
      }
    }

    setSongQueue((prevQueue) => {
      return prevQueue.filter((song) => song.id !== removeSong.id)
    })
  }
  const playRandomSong = () =>{
    const index = Math.floor(Math.random()*AllSongsList.length)
    const song = AllSongsList[index]
    const NewQueue = [{...song, 'id':1}]

    setSongQueue(()=>{
      return NewQueue
    })

    setCurrentSong((prevSong) => {
          return NewQueue[0]
      })
    setConstrains((prevConstrains) => {
      const newVar = prevConstrains.changeVar+1
      return {...prevConstrains,'lastSong':false,'firstSong':false,'changeVar':newVar,'direction':null,'end':false}
    })
  }
  const handlePlayFromAllSongs = (id) =>{
    const song = AllSongsList.find((song) => song.id === id)
    const NewQueue = [{...song, 'id':1}]

    setSongQueue(()=>{
      return NewQueue
    })

    setCurrentSong((prevSong) => {
          return NewQueue[0]
      })
    setConstrains((prevConstrains) => {
      const newVar = prevConstrains.changeVar+1
      return {...prevConstrains,'lastSong':false,'firstSong':false,'changeVar':newVar,'direction':null,'end':false}
    })
  }
  const handlePlayFromQueue = (id) =>{
    setCurrentSong((prevSong) => {
          return songQueue.find((song) => song.id === id)
      })
    setConstrains((prevConstrains) => {
      const newVar = prevConstrains.changeVar+1
      return {...prevConstrains,'lastSong':false,'firstSong':false,'changeVar':newVar,'direction':null,'end':false}
    })
      
  }



  return (
    <>
      <div className='thumbnail' style={{backgroundImage:`url(${currentSong.thumbnail})`}}>
        <NavBar constrains={constrains} currentSong={currentSong}/>
        <div className='main-content'>
          <SongQueueComp
          songs = {songQueue}
          currentSong = {currentSong}
          handleRemoveQueue = {handleRemoveQueue}
          handlePlayFromQueue = {handlePlayFromQueue}
          playRandomSong = {playRandomSong}
          />
          <AllSongs
          songs = {AllSongsList}
          handleAddQueue = {handleAddQueue}
          handlePlayFromAllSongs ={handlePlayFromAllSongs}
          />
        </div>
        {!constrains.end && <audio 
          src={currentSong.songFile}
          ref={audioRef}
          onTimeUpdate={handleUpdateTimeLine}
          onEnded={() => {
            document.querySelector('#play-btn').innerHTML = PlayBtn
            setConstrains((prevConstrains) =>{
              return {...prevConstrains,end:true}
            })
          }}
        >
        </audio>}
        {!constrains.end && <Player 
        handleChangeSong={handleChangeSong} 
        handleUpdateDuration={handleUpdateDuration} 
        handlePlay ={handlePlay}
        duration ={duration}
        song ={currentSong}
        />}
      </div>     
    </>
  )
}
