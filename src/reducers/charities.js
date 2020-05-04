import { createSlice } from '@reduxjs/toolkit'
import { ui } from 'reducers/ui'

const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  charities: [], 
  url: `https://api.globalgiving.org/api/public/projectservice/all/projects/active.json?api_key=${API_KEY}`
}

export const charities = createSlice({
  name: 'charities',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.charities = action.payload
    }
  }
})

export const searchResult = (searchTerm) => {
  return dispatch => {
    dispatch(ui.actions.setLoading(true))
    fetch(`https://api.globalgiving.org/api/public/services/search/projects/active.json?api_key=${API_KEY}&q=${searchTerm}`)
      .then(res => res.json())
      .then(json => {
        dispatch(charities.actions.setSearchTerm(json.projects))
        dispatch(ui.actions.setLoading(false))
      })
  }
}