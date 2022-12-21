import React, { useState } from 'react'
import { MusicNote,HeartFill ,InfoCircleFill,CaretDown,CaretUpFill,HouseFill} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'


export default function NavBar({constrains,currentSong,queueDisplay,handlefavDisplay,favDisplay}) {
    const [navBarDisplay, setNavBarDisplay] = useState(false)
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
      <h1 className='logo-title'>MUZICA </h1>
      {!constrains.end && queueDisplay &&
        <div className='track-main-details'>
            <h2 className='song-title'><span>&#119136;</span>{currentSong.title}</h2>
            <h3 className='artist-title'>{currentSong.artist}</h3>
        </div>
        }

      <div className='nav-menu'>

        {navBarDisplay && <Link to={'/about/'} className='nav-links' title='About'><InfoCircleFill/></Link> }
        {navBarDisplay && <Link to={'/all-songs/'} className='nav-links' title='All Songs'><MusicNote/></Link> }
        {navBarDisplay && <button className='nav-links' onClick={handlefavDisplay} title='Favourites'>{favDisplay===false ? <HeartFill/>:<HouseFill/>}</button> }

        <div className='profile'>
            <img className='profile-img' src='https://muzica-22.s3.ap-south-1.amazonaws.com/Default/Avatar.png' alt=''></img>
            <h6>MAJA</h6>
            <span  onClick={handleExpand} className='profile-down-arrow'>{navBarDisplay===true ? <CaretUpFill/>:<CaretDown/>}</span>
        </div>
      </div>
    </div>
  )
}
