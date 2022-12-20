import React from 'react'
import {  PlayFill , DashCircle , Heart, EmojiFrownFill,EmojiSmileFill, HeartFill} from "react-bootstrap-icons";



export default function SongQueueComp({songs,currentSong, handleRemoveQueue,handlePlayFromQueue,playRandomSong,handleFavourites}) {
  return (
    <div className='song-queue' >
      <h2>Current Playlist</h2>
      <div className='songs-list-container'>
        {songs.length===0 && <div className='no-song-queue'>
          <h4>Nothing to Play </h4>
          <p>Please add some songs from rightside to begin</p>
          <div className='emoji'>
            <button className='sad'><EmojiFrownFill/></button>
            <button className='happy' onClick={playRandomSong} title='PLay random song'><EmojiSmileFill/></button>
            </div>
          
        </div>
          }
        {songs.map((song) => {
          return (
          <div className={"song-queue-item "} id={currentSong.id===song.id ? "active-song":""} key={song.id} >
            <div className='song-image-container' onClick={() => handlePlayFromQueue(song.id)}>
              <img className='song-image' src={song.thumbnail} alt='' ></img>
              <span className='song-queue-play'><PlayFill/></span>  
            </div>
            <div className='song-details' onClick={() => handlePlayFromQueue(song.id)}>
              <h5>{song.title}</h5>
              <h6>{song.artist}</h6>
            </div>
            <div className='song-attributes'>
              <button onClick={() => handleFavourites(song.vid)}> {song.favourites === true ? <HeartFill/> : <Heart/>}</button>
              <button><DashCircle onClick={(id) => handleRemoveQueue(song.id)}/></button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
