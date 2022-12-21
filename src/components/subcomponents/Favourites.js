import React, { useContext } from 'react'
import { Heart, HeartFill, PlayFill, PlusCircle } from 'react-bootstrap-icons'
import { PlayerContext } from '../../App'
export default function Favourites() {
  const {favourites,handleFavourites,handlePlayFromAllSongs,handleAddQueue} = useContext(PlayerContext)
  return (
    <div className='favourite-queue'>
      {favourites.length > 0 && <h5 className='fav-heading'>Favourite Songs</h5>}
      {favourites.length===0 && <div className='no-fav-song'>
          <h4>Not loving any songs </h4>
          <p>Add Your Favourite songs to Favourites for Quick Access</p>
          
        </div>
          }
      {favourites.map((song)=>{
        return (
          <div className={"song-queue-item "}  key={song.id} >
            <div className='song-image-container' onClick={() => handlePlayFromAllSongs(song.id)}>
              <img className='song-image' src={song.thumbnail} alt='' ></img>
              <span className='song-queue-play'><PlayFill/></span>  
            </div>
            <div className='song-details' onClick={() => handlePlayFromAllSongs(song.id)}>
              <h5>{song.title}</h5>
              <h6>{song.artist}</h6>
            </div>
            <div className='song-attributes'>
              <button onClick={() => handleAddQueue(song.id)}><PlusCircle/></button>
              <button onClick={() => handleFavourites(song.id)}> {song.favourites === true ? <HeartFill/> : <Heart/>}</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
