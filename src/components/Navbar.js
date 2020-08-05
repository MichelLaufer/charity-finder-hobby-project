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
          <Link to={`/`}><div className="navbar-link">Projects</div></Link>
        </h3>

        <h3 className="subnavbar-item">
          <Link to={`/myfavorites`}><div className="navbar-link">My favorites</div></Link>
        </h3>

        <h3 className="subnavbar-item">
          <Link to={`/userlist`}><div className="navbar-link">Other users</div></Link>
        </h3>

        <h3 className="subnavbar-item">
          <Link to={`/about`}><div className="navbar-link">About</div></Link>
        </h3>

      </div>
    </>
  )
}