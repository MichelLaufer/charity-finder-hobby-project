import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { LogoutStatic } from './Logout'
import { charities } from '../reducers/charities'
import { ui } from '../reducers/ui'
import styled from 'styled-components/macro'


export const Menu = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const handleTabChange = (tab) => {
    dispatch(ui.actions.setTab(tab))
    dispatch(ui.actions.setPage(1))
  }


return (
  <StyledMenu open={open}>
    <Link to="/"
      onClick={() => { handleTabChange("charities"); dispatch(charities.actions.setSearchTerm("")); setOpen(!open)}}
    >
      <span role="img" aria-label="menu-item-icon">🎗</span>Projects
    </Link>

    <Link to="/myfavorites"
      onClick={() => { handleTabChange("favorites"); setOpen(!open)}}
    >
      <span role="img" aria-label="menu-item-icon">❤️</span>My favorites
    </Link>

    <Link to="/userlist"
      onClick={() => { handleTabChange("otherusers"); setOpen(!open)}}
    >
      Other users
    </Link>

    <Link to="/login"
      onClick={() => { handleTabChange("login"); setOpen(!open)}}
    >
      <span role="img" aria-label="menu-item-icon">☑️</span>Sign in
    </Link>

    <Link to="/register"
      onClick={() => { handleTabChange("register"); setOpen(!open)}}
    >
      <span role="img" aria-label="menu-item-icon">📝</span>Register
    </Link>

    <Link to="/about"
      onClick={() => { handleTabChange("about"); setOpen(!open)}}
    >
      About
    </Link>

    <Link
      onClick={() => setOpen(!open)}
    >
      <span role="img" aria-label="menu-item-icon">❌</span><LogoutStatic />
    </Link>
  </StyledMenu>
)
}

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

export const Hamburger = () => {
  const [open, setOpen] = useState(false)
  const node = React.useRef()

  return (
    <HamburgerWrap>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </HamburgerWrap>
  )
}


const HamburgerWrap = styled.div`
  display: inline-block;
  @media(min-width: 768px) {
    display: none;
  }
`
const StyledBurger = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 2rem;
  justify-content: space-around;
  left: 2rem;
  padding: 0;
  position: absolute;
  top: 5%;
  width: 2rem;
  z-index: 10;
  &:focus {
    outline: none;
  }
  div {
    background: ${({ open }) => open ? '#0D0C1D' : '#EFFFFA'};
    border-radius: 10px;
    height: 0.25rem;
    position: relative;
    transform-origin: 1px;
    transition: all 0.3s linear;
    width: 2rem;
    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }
    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`
const StyledMenu = styled.nav`
  background: orange;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: 1.5rem;
  position: absolute;
  text-align: left;
  top: 0;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 2;
  width: 100%;
  a {
    color: #000f3c;
    font-family: 'Raleway',sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.5rem;
    padding: 1.3rem 0;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.3s linear;
      text-align: center;
    &:hover {
      color: #343078;
    }
  }
`