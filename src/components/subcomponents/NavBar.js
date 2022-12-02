import React, { useState } from 'react'
import { Image ,MusicNote,HeartFill ,InfoCircleFill,CaretDown,CaretUpFill} from 'react-bootstrap-icons'
import ProfileImg from './../../media/Profile.jpg'


export default function NavBar({constrains,currentSong}) {
    const [navBarDisplay, setNavBarDisplay] = useState(false)
    console.log(navBarDisplay)
    const handleExpand = () =>{
        const navMenu = document.querySelector('.nav-menu') 
        setNavBarDisplay((prevState) =>{
            
            if (prevState===false){
                navMenu.style.backgroundColor = '#8e86ff28'
            }
            else{
                navMenu.style.backgroundColor = "transparent"
            }
            return !prevState
        }
        )
    }
    return (
    <div className='navbar-container'>
      <h1 className='logo-title'>MUZICA</h1>
        <div className='track-main-details'>
            {!constrains.end && <h2 className='song-title'><span>&#119136;</span>{currentSong.title}</h2>}
            <h3 className='artist-title'>{currentSong.artist}</h3>
        </div>
      <div className='nav-menu'>
        {navBarDisplay && <button className='nav-links' title='About'><InfoCircleFill/></button>}
        {navBarDisplay && <button className='nav-links' title='Favourites'><HeartFill/></button>}
        {navBarDisplay && <button className='nav-links' title='All Songs'><MusicNote/></button>}
        <div className='profile'>
            <img className='profile-img' src={ProfileImg} alt=''></img>
            <h6>MAJA</h6>
            <span  onClick={handleExpand} className='profile-down-arrow'>{navBarDisplay===true ? <CaretUpFill/>:<CaretDown/>}</span>
        </div>
      </div>
    </div>
  )
}
