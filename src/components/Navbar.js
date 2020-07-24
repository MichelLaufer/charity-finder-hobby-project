import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Hamburger } from './Hamburger'
import { Logout } from './Logout'
import { PopoverLogin } from './PopoverLogin'
import { Searchbar } from './Searchbar'


export const Navbar = () => {
  const accessToken = useSelector((state) => state.users.accessToken)
  const userName = useSelector((state) => state.users.userName)


  return (
    <>
      <div className="navbar-header-container">
        <Hamburger />
        <h1 className="navbar-header-title">
          <Link to={`/`}>Make the world better</Link>
        </h1>
        <Searchbar />

        <div className="navright-container">
          <div className="username-nav">{userName}</div>
          {!accessToken && 
            <PopoverLogin />
          }
          {accessToken && 
          <Logout />
        }
        </div>
      </div>

      <div className="subnavbar">
        <h3 className="subnavbar-item">
          <Link to={`/`}>Projects</Link>
        </h3>

        <h3 className="subnavbar-item">
          <Link to={`/myfavorites`}>My favorites</Link>
        </h3>

        <h3 className="subnavbar-item">
          <Link to={`/userlist`}>Other users</Link>
        </h3>

        <h3 className="subnavbar-item">
          <Link to={`/about`}>About</Link>
        </h3>

      </div>
    </>
  )
}


// <h3 className="subnavbar-item">
// <Link to={`/searchprojects`}>Search projects</Link>
// </h3>