import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DropDownList } from './components/DropDownList'
import { ProgressBar } from './components/ProgressBar'

const API_KEY = process.env.REACT_APP_API_KEY


export const CharityList = () => {
  const [charities, setCharities] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const searchResult = useSelector(state => state.charities.charities)
  const category = useSelector(state => state.charities.chosenCategory)

  const url = `https://api.globalgiving.org/api/public/projectservice/${category}/projects?api_key=${API_KEY}`
  const newhead = new Headers({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  })

  let req = new Request(url, {
    method: 'GET',
    headers: newhead
  })

  // Fetch individual project details
  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(req)
      .then((res) => res.json())
      .then((json) => {
        setCharities(json.projects.project)
      })
    setLoading(false)  
  }, [category])

  console.log(charities)

  if (loading) {
    return (
      <div className="loading-message">Charity page is loading...</div>
    )
  }

  if (!charities) {
    return (
      <div>{error}</div>
    )
  }

  console.log("Charities", charities)
  console.log("Search results", searchResult)

  let charitiesResults = charities.slice(0,9)
  if (searchResult.project && searchResult.project.length > 0) {
    charitiesResults = searchResult.project.slice(0,9)
  }
  console.log("Charities Results", charitiesResults)

  return (
    <section>
      <div className="hero-image"></div>
      <div className="charity-list-top-wrapper">
        <h1 className="main-title">Search for charity projects</h1>
        <DropDownList />
      </div>
      <section className="charity-list">
        {charitiesResults && charitiesResults.map((charity) => (
          <div 
            className="charity-card"
            key={charity.id}
          >
            <Link to={`/charities/${charity.id}`}>
              <img 
                className="charity-list-img" 
                src={charity.image.imagelink[3].url} 
                alt="charity project"
              />
            </Link>
            <div className="charity-card-text-container">
              <h2 className="project-title">{charity.title}</h2>
              <div className="project-summary">{charity.summary}</div>
              <div className="project-funding"><span className="funding-highlight">€ {charity.funding}</span> raised</div>
              <div className="project-goal"><span className="funding-highlight">€ {charity.goal}</span> goal</div>
              <ProgressBar percentage={(charity.funding/charity.goal)*100} />

            </div>
          </div>
        ))}
      </section>
    </section>
  )
}