import React from 'react'
import PlayerMain from './PlayerMain'

export default function Home({overlay,handleOverlay}) {
  return (
    <div>
      {overlay &&
      <div className='overlay'>
        <div className='overlay-message-box'>
          <p className='overlay-message'>Site is under construction. As API for this app not yet build, all actions will be saved under locally
          .Will deploy more features soon. Happy Listening!!!</p>
          <div className='overlay-button-container'>
            <button onClick={handleOverlay}>Start Listening</button>
            <h1 className='hidden-overlay-message'>MUZICA</h1>
          </div>
        </div>
      </div>}
      <PlayerMain 
      overlay={overlay}
      queueDisplay = {true}
      user = 'maja'/>
    </div>
  )
}
