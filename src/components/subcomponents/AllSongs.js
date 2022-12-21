import React, { useState }  from 'react'
import {  PlayFill , PlusCircle , Heart, HeartFill} from "react-bootstrap-icons";
export default function AllSongs({songs,handleAddQueue,handlePlayFromAllSongs,handleFavourites}) {
  const [filterSongs,setfilterSongs]= useState(songs)
  const handleSearch = (e) =>{
    const SearchTerm = e.target.value.toLowerCase()
    setfilterSongs(songs.filter(song => song.title.toLowerCase().includes(SearchTerm) ))
  }
  return (
    <div className='song-queue' >
      <h2>Available Songs</h2>
      <input type={'text'} placeholder='Search your Song' onChange={(e) =>handleSearch(e)} className='song-search'></input>
      <div className='songs-list-container'>
        {filterSongs.length===0 && <div className='no-song-queue'>
          <p>Sorry!!! No such song in our library</p>
        </div>}
        {filterSongs.map((song) => {
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
              <button onClick={() => handleFavourites(song.id)}>{song.favourites === true ? <HeartFill/> : <Heart/>}</button>
              <button onClick={() => handleAddQueue(song.id)}><PlusCircle/></button>{/* onclick -> add to exisitng queue */}
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
