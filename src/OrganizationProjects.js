import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_KEY = process.env.REACT_APP_API_KEY

export const OrganizationProjects = () => {
  const { id } = useParams()
  const [charities, setCharities] = useState([])

  const url=`https://api.globalgiving.org/api/public/projectservice/organizations/${id}/projects?api_key=${API_KEY}`

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
    fetch(req)
      .then((res) => res.json())
      .then((json) => {
        setCharities(json.projects.project)
      })  
  }, [id])

console.log(charities)


return (
  <section>
    <h1 className="main-title">Search for charity projects below</h1>
    <section className="charity-list">
      {charities.map((charity) => (
        <div 
          className="charity-card"
          key={charity.id}
        >
          <h2 className="project-title">{charity.title}</h2>
          <h3 className="org-name">by {charity.organization.name}</h3>
          <Link to={`/charities/${charity.id}`}>
          <img 
            className="project-img"
            src={charity.imageLink} 
          />
          </Link>
          <div className="project-funding">€ {charity.funding} raised</div>
          <div className="project-goal">€ {charity.goal} goal</div>
        </div>
      ))}
    </section>
  </section>
)
}