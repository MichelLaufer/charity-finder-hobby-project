import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LogoutStatic } from './Logout'
import { charities } from '../reducers/charities'
import { ui } from '../reducers/ui'


export const Menu = ({ open, setOpen }) => {
  const selectedTab = useSelector((state) => state.ui.tab)
  const dispatch = useDispatch()

  const handleTabChange = (tab) => {
    dispatch(ui.actions.setTab(tab))
    dispatch(ui.actions.setPage(1))
  }


return (
  <nav className="styled-menu" open={open} transform={({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'}>
    <Link to="/"
      onClick={() => { handleTabChange("charities"); dispatch(charities.actions.setSearchTerm("")); setOpen(!open)}}
    >
      Projects
    </Link>

    <Link to="/myfavorites"
      onClick={() => { handleTabChange("favorites"); setOpen(!open)}}
    >
      My favorites
    </Link>

    <Link to="/otherusers"
      onClick={() => { handleTabChange("otherusers"); setOpen(!open)}}
    >
      Other users
    </Link>
    <Link to="/about"
      onClick={() => { handleTabChange("about"); setOpen(!open)}}
    >
      About
    </Link>
  </nav>
)
}

const Burger = ({ open, setOpen }) => {
  return (
    <button className="styled-burger" open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </button>
  )
}

export const Hamburger = () => {
  const [open, setOpen] = useState(false)
  const node = React.useRef()

  return (
    <div className="hamburger-wrap">
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}