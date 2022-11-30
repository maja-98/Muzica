import React from 'react'
import {  PlayFill , PlusCircle , Heart, HeartFill } from "react-bootstrap-icons";
export default function AllSongs({songs}) {
  return (
    <div className='song-queue' >
      <h2>Available Songs</h2>
      <div className='songs-list-container'>
        {songs.map((song) => {
          return (
          <div className='song-queue-item' key={song.id}>
            <div className='song-image-container'>
              <img className='song-image' src={song.thumbnail} alt='' ></img>
              <span className='song-queue-play'><PlayFill/></span> {/* onclick -> clear queue and start new queue */}
              
            </div>
            <div className='song-details'>
              <h5>{song.title}</h5>
              <h6>{song.artist}</h6>
            </div>
            <div className='song-attributes'>
              <button><Heart/></button>
              <button><PlusCircle/></button>{/* onclick -> add to exisitng queue */}
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
