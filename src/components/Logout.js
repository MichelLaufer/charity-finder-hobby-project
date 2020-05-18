import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { users } from '../reducers/users'


export const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(users.actions.removeAccessToken(""))
    dispatch(users.actions.removeUserName(""))
    dispatch(users.actions.removeUserId(""))
    history.push(`/`)
  }

  return (
    <button className="signout-button" onClick={handleLogout}>
      Sign out
    </button>
  )
}

export const LogoutStatic = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(users.actions.removeAccessToken(""))
    dispatch(users.actions.removeUserName(""))
    dispatch(users.actions.removeUserId(""))
    history.push(`/`)
  }

  return (
    <button className="logout-static-button" onClick={handleLogout}>
      Sign out
    </button>
  )
}