import React from 'react'
import { useDispatch } from 'react-redux'
import { charities } from '../reducers/charities'


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
          <option value="themes/children">Children projects</option>
          <option value="themes/covid-19">COVID-19 projects</option>
          <option value="themes/edu">Education projects</option>
          <option value="themes/tech">Technology projects</option>
          <option value="themes/gender">Women and girls projects</option>
        </select>
      </label>
    </div>
  )
}