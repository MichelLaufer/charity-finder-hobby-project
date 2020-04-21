import React, { useState } from 'React'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'
import { searchResult } from 'reducers/charities'


export const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()
    if(searchTerm.length > 0) {
      dispatch(searchResult(searchTerm))
      setSearchTerm("")
      history.push(`/`)
    }
  }

  return (
    <form 
      className="form-search"
      onSubmit={handleSubmit}
    >
    <input 
      value={searchTerm}
      onChange={event => setSearchTerm(event.target.value)}
      disabled={false}
      large={true}
      placeholder='Search charity...'
      leftIcon={<Icon icon="search" />}
      small={false}
      type="search"
    />
    </form>
  )
}