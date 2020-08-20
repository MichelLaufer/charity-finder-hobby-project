import { createSlice } from '@reduxjs/toolkit'
import { ui } from './ui'

const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  charities: [], 
  chosenCategory: "featured",
  chosenCountry: "AF"
}

export const charities = createSlice({
  name: 'charities',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.charities = action.payload
    },
    setCategory: (state, action) => {
      state.chosenCategory = action.payload
    },
    setCountry: (state, action) => {
      state.chosenCountry = action.payload
    }
  }
})

export const searchResult = (searchTerm) => {
  return dispatch => {
    const url = `https://api.globalgiving.org/api/public/services/search/projects?api_key=${API_KEY}&q=${searchTerm}`
    const newhead = new Headers({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })

    let req = new Request(url, {
      method: 'GET',
      headers: newhead
    })

    fetch(req)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch(charities.actions.setSearchTerm(json.search.response.projects))
        dispatch(ui.actions.setLoading(false))
      })
  }
}