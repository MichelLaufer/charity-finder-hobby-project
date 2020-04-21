import React from 'react'
import { Link } from 'react-router-dom'
// import { Searchbar } from './Searchbar'

export const Navbar = () => {

  return (
    <>
      <div className="navbar-header-container">
        <h1 className="navbar-header-title">
          <Link to={`/`}>Make the world better</Link>
        </h1>
        
      </div>
      <div className="subnavbar">
        <h3 className="subnavbar-item">
          <Link to={`/featured`}>Featured</Link>
        </h3>
        <h3 className="subnavbar-item">
          <Link to={`/children`}>Children</Link>
        </h3>
      </div>
    </>
  )
}