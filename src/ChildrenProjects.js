import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProgressBar } from './components/ProgressBar'

const API_KEY = process.env.REACT_APP_API_KEY


export const ChildrenProjects = () => {
  const [charities, setCharities] = useState([])

  const url = `https://api.globalgiving.org/api/public/projectservice/themes/children/projects?api_key=${API_KEY}`
  const newhead = new Headers({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  })

  let req = new Request(url, {
    method: 'GET',
    mode: 'no-cors',
    headers: newhead
  })

  // Fetch individual project details
  useEffect(() => {
    fetch(req)
      .then((res) => res.json())
      .then((json) => {
        setCharities(json.projects.project)
      })  
  }, [])

  console.log(charities)


  return (
    <section>
      <h1 className="main-title">Children projects</h1>
      <section className="charity-list">
        {charities.map((charity) => (
          <div 
            className="charity-card"
            key={charity.id}
          >
            <Link to={`/charities/${charity.id}`}>
              <img 
                className="charity-list-img" 
                src={charity.image.imagelink[3].url} 
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
