import React from 'react'
import { useDispatch } from 'react-redux'
import { charities } from '..reducers/charities'


export const DropDownList = () => {
  const dispatch = useDispatch()

  return (
    <div className="category-dropdown">
      <label>
        <select 
          className="select-css"
          onChange={(event) => {
            dispatch(charities.actions.setSearchTerm(""))
            dispatch(charities.actions.setCategory(event.target.value))
          }}
        >
          <option value="featured">Featured projects</option>
          <option value="children">Children projects</option>
          <option value="education">Education projects</option>
          <option value="technology">Technology projects</option>        
        </select>
      </label>
    </div>
  )
}