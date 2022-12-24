import React from 'react'
import {  Instagram,Github } from "react-bootstrap-icons";
export default function About() {
  return (
    <div className='about'>
      <h1 className='about-title'>MUZICA</h1>
      <div className='about-container'>
        <h5 className='version'>Version v1.0.0</h5>
        <h5>User Friendly UI/UX</h5>
        <h5>Favourites option</h5>
        <h5>Custom queue </h5>
        <h5>Search Option</h5>
        <h5>Mobile Compatible</h5>
        <h5 className='developer'>App by: Muhammed Ali Jouhar A</h5>
        <div className='about-links'>
          <a href='https://www.instagram.com/__maj_a__/'rel="noreferrer" target ='_blank'><Instagram/></a>
          <a href='https://github.com/maja-98' rel="noreferrer" target='_blank'><Github/></a>
        </div>
        
      </div>
      
    </div>
  )
}
