import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Menu>
    <Link to="/">
      Projects
    </Link>

    <Link to="/myfavorites">
      My favorites
    </Link>

    <Link to="/otherusers">
      Other users
    </Link>
    </Menu>
  )
}