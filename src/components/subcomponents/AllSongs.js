import React  from 'react'
import {  PlayFill , PlusCircle , Heart} from "react-bootstrap-icons";
export default function AllSongs({songs,handleAddQueue,handlePlayFromAllSongs}) {
  return (
    <div className='song-queue' >
      <h2>Available Songs</h2>
      <div className='songs-list-container'>
        {songs.map((song) => {
          return (
          <div className='song-queue-item-all-songs' key={song.id} >
            <div className='song-image-container' onClick={() => handlePlayFromAllSongs(song.id)}>
              <img className='song-image' src={song.thumbnail} alt='' ></img>
              <span className='song-queue-play'><PlayFill/></span> {/* onclick -> clear queue and start new queue */}
              
            </div>
            <div className='song-details' onClick={() => handlePlayFromAllSongs(song.id)}>
              <h5>{song.title}</h5>
              <h6>{song.artist}</h6>
            </div>
            <div className='song-attributes'>
              <button><Heart/></button>
              <button onClick={() => handleAddQueue(song.id)}><PlusCircle/></button>{/* onclick -> add to exisitng queue */}
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
