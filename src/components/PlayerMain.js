import React, {  useContext, useEffect,  useState } from 'react';
import AllSongsList from '../AllSongsList'
import AllSongs from './subcomponents/AllSongs';
import Player from './subcomponents/Player';
import SongQueueComp from './subcomponents/SongQueueComp';
import NavBar from './subcomponents/NavBar'; 
import { PlayerContext } from '../App';
import Favourites from './subcomponents/Favourites';




export default function PlayerMain({overlay,queueDisplay}) {
  const [duration,setDuration] = useState({currentDuration:0,totalDuration:0})
  const [favDisplay, setFavDisplay] = useState(false)
  
  const {favourites,
            handleAddQueue,
            playRandomSong,
            handlePlayFromAllSongs,
            handlePlayFromQueue,
            constrains,
            currentSong,
            songQueue,
            handleRemoveQueue,
            handleFavourites,
            handleChangeSong,
            handlePlay,
            PlayBtn,
            PauseBtn,
            defaultSong,
            audioRef,
            message,
            handleRemoveMessage
            } = useContext(PlayerContext)
  const [pageThumbnail,setPageThumbnail] = useState(currentSong.thumbnail)
  useEffect(() => {
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
  },[constrains,PlayBtn,PauseBtn,audioRef])
  useEffect(()=>{
    queueDisplay === false? setPageThumbnail(defaultSong.thumbnail):setPageThumbnail(currentSong.thumbnail)
  },[queueDisplay,currentSong,defaultSong.thumbnail])
  useEffect(()=>{
    if (message.status){
  
    setTimeout(()=>{
      handleRemoveMessage()
    },2000)
  }
  },[message,handleRemoveMessage])
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
  const handlefavDisplay = () =>{
    setFavDisplay((prevFavDisplay) => !prevFavDisplay)
  }




  return (
    <>
      <div className='thumbnail' style={{backgroundImage:`url(${pageThumbnail})`,opacity: overlay===true?0.5:1}}>
        
        <NavBar constrains={constrains} currentSong={currentSong} favDisplay={favDisplay}  queueDisplay={queueDisplay} handlefavDisplay={handlefavDisplay}/>
        {!favDisplay && queueDisplay && <div className='main-content'>
          <SongQueueComp
          songs = {songQueue}
          currentSong = {currentSong}
          handleRemoveQueue = {handleRemoveQueue}
          handlePlayFromQueue = {handlePlayFromQueue}
          playRandomSong = {playRandomSong}
          favourites = {favourites}
          handleFavourites = {handleFavourites}
          />
          <AllSongs
          songs = {AllSongsList}
          handleAddQueue = {handleAddQueue}
          handlePlayFromAllSongs ={handlePlayFromAllSongs}
          favourites = {favourites}
          handleFavourites = {handleFavourites}
          />
        </div>}
        {
          favDisplay && <Favourites/>
        }
        {console.log(message.status)}
        {message.status && <div className='message-container'>
            <p className='message'>{message.message}</p>
          </div>
          }
        {!constrains.end && <audio 
          src={currentSong.songFile}
          ref={audioRef}
          onTimeUpdate={handleUpdateTimeLine}
          onEnded={() => {
            
            handleChangeSong(1)
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
