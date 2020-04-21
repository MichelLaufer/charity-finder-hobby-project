import { createSlice } from '@reduxjs/toolkit'

// const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  charities: []
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
    fetch(`https://api.globalgiving.org/api/public/services/search/projects/active.json?api_key=0c3b2ef8-c5f4-488f-9657-00e518a52add`)
      .then(res => res.json())
      .then(json => {
        dispatch(charities.actions.setSearchTerm(json.results))
      })
  }
}