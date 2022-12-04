import React from 'react'
import { ConeStriped } from 'react-bootstrap-icons'
import {Link} from 'react-router-dom'
export default function DevError() {
  return (
    <div className='home-link-container'>
      <Link className='home-link' to={'/'}>MUZICA</Link>
      <p className='dev-error-message'>Site is under construction. We know that Playback is stopped.Sorry for your inconvenience.
      Site is only half baked.Please resume your journey by clicking on Above Heading. </p>
      <div className='dev-error-icon-container'>
        <p className='dev-error-icon'><ConeStriped/></p>
        <p className='dev-error-icon-message'>Work in Progress</p>
      </div>
    </div>
  )
}
