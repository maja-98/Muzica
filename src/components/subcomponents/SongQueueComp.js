import React from 'react'
import {  PlayFill , DashCircle , Heart, HeartFill } from "react-bootstrap-icons";



export default function SongQueueComp({songs, handleRemoveQueue,handlePlayFromQueue}) {
  return (
    <div className='song-queue' >
      <h2>Current Playlist</h2>
      <div className='songs-list-container'>
        {songs.map((song) => {
          return (
          <div className='song-queue-item' key={song.id} >
            <div className='song-image-container' onClick={() => handlePlayFromQueue(song.id)}>
              <img className='song-image' src={song.thumbnail} alt='' ></img>
              <span className='song-queue-play'><PlayFill/></span>  
            </div>
            <div className='song-details' onClick={() => handlePlayFromQueue(song.id)}>
              <h5>{song.title}</h5>
              <h6>{song.artist}</h6>
            </div>
            <div className='song-attributes'>
              <button><Heart/></button>
              <button><DashCircle onClick={(id) => handleRemoveQueue(song.id)}/></button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
