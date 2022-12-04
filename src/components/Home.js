import React, {useState } from 'react'
import PlayerMain from './PlayerMain'

export default function Home() {
  const overlaySessionStorage = JSON.parse(sessionStorage.getItem("muzicaOverlay"))
  const overlayVal = overlaySessionStorage===null ? true : overlaySessionStorage
  const [overlay,setOverlay] = useState(overlayVal)
  const handleOverlay = () =>{
    setOverlay(false)
    sessionStorage.setItem("muzicaOverlay",false)
  }
  return (
    <div>
      {overlay &&
      <div className='overlay'>
        <div className='overlay-message-box'>
          <p className='overlay-message'>This site is not yet compltely developed. For Better User experience use Desktop (You can try Desktop Mode in Mobile).
          As of Now app is incompatible on Mobile devices.
          Also Many of the functionalities yet to build.Will deploy more features soon. Happy Listening!!!</p>
          <div className='overlay-button-container'>
            <button onClick={handleOverlay}>Start Listening</button>
            <h1 className='hidden-overlay-message'>MUZICA</h1>
          </div>
        </div>
      </div>}
      <PlayerMain overlay={overlay}/>
    </div>
  )
}
