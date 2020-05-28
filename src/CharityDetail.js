import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FavoriteStatus } from './components/FavoriteStatus'
import { ProgressBar } from './components/ProgressBar'

const API_KEY = process.env.REACT_APP_API_KEY


export const CharityDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState([])
  const [donationoptions, setDonationOptions] = useState([])
  const [image, setImage] = useState([])
  const [imageGallery, setImageGallery] = useState([])
  const [loading, setLoading] = useState(true)
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

  const url_img = `https://api.globalgiving.org/api/public/projectservice/projects/${id}/imagegallery?api_key=${API_KEY}`
  const newhead_img = new Headers({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  })


  let req_img = new Request(url_img, {
    method: 'GET',
    headers: newhead_img
  })

  // Fetch individual project image gallery
  useEffect(() => {
    setLoading(true)
    fetch(req_img)
      .then((res) => res.json())
      .then((json) => {
        setImageGallery(json.images.image)
      })  
  }, [id])

  console.log(imageGallery)

  if (loading) {
    return (
      <div className="loading-message">Charity page is loading...</div>
    )
  }


  return (
    <div
      key={id}
      className="project-detail-background"
    >
      <h2 className="project-detail-title">{project.title}</h2>
      <h3 className="project-detail-org-name">by {organization.name}</h3>

      <div className="project-detail-container">
        <div className="left-container">
          <img className="project-img" src={image.url} /> 
          <div className="info-and-usage-wrap">
            <div className="info-container">
              <div className="project-detail-summary">
                <span className="summary-title">Summary</span>
                <br></br> 
                {project.summary}
              </div>
      
              <div className="project-detail-need">
                <span className="need-title">Need</span>
                <br></br> 
                {project.need}
              </div>

              <div className="project-detail-activities">
                <span className="activities-title">Activities</span>
                <br></br> 
                {project.activities}
              </div>

              <div className="project-detail-longtermimpact">
                <span className="activities-title">Long-term impact</span>
                <br></br> 
                {project.longTermImpact}
              </div>
            </div>
          </div>

        <div className="organization-container">
          <h3 className="org-info-title">Organization information</h3>
          <div>
            <img src={organization.logoUrl} />
            <h3 className="org-name">{organization.name}</h3>
          </div>
          <div><span className="detail-highlight">Location:</span> {organization.city}, {organization.country}</div>
          <div><span className="detail-highlight">Website:</span> <a className="org-link" href={organization.url} target="_blank" rel="noopener noreferrer">{organization.url}</a></div>
          <div><span className="detail-highlight">Number of projects:</span> {organization.activeProjects} active, {organization.totalProjects} in total</div>
          </div>
        </div>

        <div className="donation-wrap">
          <div className="donation-container">
            <div className="funding-raised-of-goal">
              <span className="detail-highlight">€ {project.funding}</span> raised of € {project.goal} goal
            </div>
            <div className="donations-and-remaining">
              <span className="detail-highlight">{project.numberOfDonations}</span> donations, € {project.remaining} to go
            </div>
            <ProgressBar percentage={(project.funding/project.goal)*100} />
          </div>
         
          <div className="usage-container">
            <div className="donation-title">Donation options</div>
            {donationoptions.map((donation) => (
              <div 
                key={donation.id}
              >
                <button 
                  className="donation-options-button"
                  type="button"
                >
                  <span className="donation-amount">€{donation.amount}</span>
                  <span className="donation-description">{donation.description}</span>
                </button>
              </div>
            ))}
          </div>

          <FavoriteStatus projectId={project.id} projectTitle={project.title} />

          <div className="links-container">
            <h3 className="org-info-title">For more information</h3>
            <div className="link-item"><span className="link-highlight">Project link</span> <a className="project-link" href={project.projectLink} target="_blank" rel="noopener noreferrer">{project.projectLink}</a></div>
            <div className="link-item"><span className="link-highlight">Progress report</span> <a className="project-link" href={project.progressReportLink} target="_blank" rel="noopener noreferrer">{project.progressReportLink}</a></div>
            <div className="link-item"><span className="link-highlight">Additional documentation</span> <a className="project-link" href={project.additionalDocumentation} target="_blank" rel="noopener noreferrer">{project.additionalDocumentation}</a></div>
          </div>
        </div>
      </div>

      <div className="image-gallery">
      <h3 className="org-info-title">Image gallery</h3>
      <div className="image-gallery-container">
        {imageGallery.map((image) => (
        <div 
          className="image-gallery-item"
          key={image.id}
        >
          <img className="gallery-image" src={image.imagelink[2].url} /> 
        </div>
        ))}
      </div>
      </div>
    </div>
  )
}


// <button className="favorites-button">Add to favorites</button>

// <FavoriteStatus projectId={charity.id} projectTitle={charity.title} />

// <button className="donation-button">DONATE</button>

    // <img 
    //   src={charity.image.imagelink[2]}
    // />

    // const url = `https://api.globalgiving.org/api/public/projectservice/projects/${id}?api_key=${API_KEY}`
    // const newhead = new Headers({
    //   'Access-Control-Allow-Origin': '*'
    // })
    // newhead.append('Accept', 'application/json')

    // {images.map((image) => (
    //   <div key={id}>
    //     <img src={image.url} />
    //   </div>
    // ))}

    // <img 
    //   className="project-img"
    //   src={charity.imageLink} 
    // />