import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { fetchUser } from '../reducers/users.js'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}))

export const PopoverLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const history = useHistory()
  const dispatch = useDispatch()
  const failed = useSelector(state => state.ui.isLoginFailed)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    if (failed) {
      setAnchorEl(null)
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleSignin = (event) => {
    event.preventDefault()
    dispatch(fetchUser({ email, password }))
    handleClose()
    history.push(`/`)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('the key is enter')
      dispatch(fetchUser({ email, password }))
      handleClose()
      history.push(`/`)
    }
  }

  const reDirect = () => {
    handleClose()
    setAnchorEl(null)
    history.push(`/register`)
  }

  return (
    <>
      <button
        className="signin-button" 
        type="button"
        aria-describedby={id} 
        onClick={handleClick}
      >
        Sign in
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >

        <Typography className={classes.typography}>
          <label>
            Email 
            <input 
              type="email"
              required
              value={email}
              onChange={event => setEmail(event.target.value.toLowerCase())}
            />
          </label>

          <label>
            Password
            <input 
              type="password"
              required
              value={password}
              onChange={event => setPassword(event.target.value)}
              onKeyPress={handleKeyPress}
            />
          </label>

          {failed && <div className="error-message">Incorrect user and/or password.</div>}
          <Button 
            type="submit"
            onClick={handleSignin}
          >
            Login
          </Button>
          <Button 
            type="button"
            onClick={reDirect}
          >
            Not a member?
          </Button>
        </Typography>
      </Popover>
    </>
  )
}