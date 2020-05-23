import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { Hamburger } from './components/Hamburger'
import { Logout } from './components/Logout'
import { PopoverLogin } from 'components/PopoverLogin'
import { Searchbar } from './components/Searchbar'
import { charities } from './reducers/charities'
import { ui } from './reducers/ui'
// import SideBar from './components/sidebar'


export const Navbar = () => {
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  const userName = useSelector((state) => state.users.userName)
  const selectedTab = useSelector((state) => state.ui.tab)

  const dispatch = useDispatch()

  const handleTabChange = (tab) => {
    dispatch(ui.actions.setTab(tab))
    dispatch(ui.actions.setPage(1))
  }


  return (
    <>
      <div className="navbar-header-container">
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
          <Link to={`/otherusers`}>Other users</Link>
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