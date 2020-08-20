import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FavoriteStatus } from './FavoriteStatus'
import { DonationAmount } from './DonationAmount'

const API_KEY = process.env.REACT_APP_API_KEY


export const CharityCards = ({ id }) => {
  const [project, setProject] = useState({})
  const [image, setImage] = useState([])
  const [loading, setLoading] = useState("")
  const [organization, setOrganization] = useState([])


  const url = `https://api.globalgiving.org/api/public/projectservice/projects/${id}?api_key=${API_KEY}`
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
    fetch(req)
      .then((res) => res.json())
      .then((json) => {
        setLoading(false)
        setProject(json.project)
        {json.project && (
        setImage(json.project.image.imagelink[2])
        )}
      })  
  }, [id])


  if (loading) {
    return (
      <div>Charity card is loading...</div>
    )
  }


  if (!project) return null; 
  console.log(project)

  return (
    <div 
      className="favorite-charity-card"
      key={id}
    >
      <div className="wrap-charity-card">
        <Link key={project.id} to={`/charities/${project.id}`}>
          <img 
            className="card-img" 
            src={image.url} 
            alt="Charity"
          />
        </Link>
        <div className="wrap-charity-card-info">
          <Link key={project.id} to={`/charities/${project.id}`}>
            <div className="charity-card-title">{project.title}</div>
          </Link>
          <FavoriteStatus 
            projectId={project.id}
            projectTitle={project.title}
          />
          <DonationAmount 
            projectId={project.id}
            projectTitle={project.title}
          />
        </div>
      </div>
    </div>
  )
}
