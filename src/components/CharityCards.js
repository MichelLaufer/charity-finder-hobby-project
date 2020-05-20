import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FavoriteStatus } from './FavoriteStatus'

const API_KEY = process.env.REACT_APP_API_KEY


export const CharityCards = ({ id }) => {
  // const [project, setProject] = useState([])
  const [project, setProject] = useState([])
  const [donationoptions, setDonationOptions] = useState([])
  const [image, setImage] = useState([])
  const [error, setError] = useState("")
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
        setDonationOptions(json.project.donationOptions.donationOption)
        setImage(json.project.image.imagelink[3])
        setOrganization(json.project.organization)
      })  
  }, [id])


  if(loading) {
    return (
      <div>Charity page is loading...</div>
    )
  }

  
  return (
    <div 
      className="charity-card"
      key={id}
    >
      <div className="wrap-charity-card">
        <div className="wrap-charity-card-info">
          <div className="charity-card-title">{project.title}</div>
          <FavoriteStatus 
            projectId={project.id}
            projectTitle={project.title}
          />
        </div>
      </div>
    </div>
  )
}