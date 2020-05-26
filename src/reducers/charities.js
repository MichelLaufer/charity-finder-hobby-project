import { createSlice } from '@reduxjs/toolkit'
import { ui } from 'reducers/ui'

const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  charities: [], 
  // url: `https://api.globalgiving.org/api/public/projectservice/all/projects/active.json?api_key=${API_KEY}`,
  chosenCategory: "featured",
  chosenCountry: ""
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
    dispatch(ui.actions.setLoading(true))
    const url = `https://api.globalgiving.org/api/public/services/search/projects&api_key=${API_KEY}&q=${searchTerm}`
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
        dispatch(charities.actions.setSearchTerm(json.projects))
        dispatch(ui.actions.setLoading(false))
      })
  }
}


// const url = `https://api.globalgiving.org/api/public/services/search/projects/active.json?api_key=${API_KEY}&q=${searchTerm}`