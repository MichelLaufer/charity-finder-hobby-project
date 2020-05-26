import React from 'react'
import { useDispatch } from 'react-redux'
import { charities } from '../reducers/charities'


export const DropDownCountries = () => {
  const dispatch = useDispatch()

  return (
    <div className="category-dropdown">
      <label>
        <select 
          className="select-css"
          onChange={(event) => {
            dispatch(charities.actions.setSearchTerm(""))
            dispatch(charities.actions.setCountry(event.target.value))
          }}
        >
          <option value="AF">Afghanistan</option>
          <option value="NG">Nigeria</option>
          <option value="IN">India</option>
        </select>
      </label>
    </div>
  )
}