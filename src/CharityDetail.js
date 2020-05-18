import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import { FavoriteStatus } from './components/FavoriteStatus'
import { ProgressBar } from './components/ProgressBar'

const API_KEY = process.env.REACT_APP_API_KEY


export const CharityDetail = () => {
  const { id } = useParams()
  const [charity, setCharity] = useState([])
  const [donationoptions, setDonationOptions] = useState([])
  const [image, setImage] = useState([])
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
        setCharity(json.project)
        setDonationOptions(json.project.donationOptions.donationOption)
        setImage(json.project.image.imagelink[3])
        setOrganization(json.project.organization)
      })  
  }, [id])

  console.log(charity)
  console.log(organization)

  if (loading) {
    return (
      <div>Charity page is loading...</div>
    )
  }


  return (
    <div
      key={id}
      className="project-detail-background"
    >
      <h2 className="project-detail-title">{charity.title}</h2>
      <h3 className="project-detail-org-name">by {organization.name}</h3>

      <div className="project-detail-container">
        <div className="left-container">
          <img className="project-img" src={image.url} /> 
          <div className="info-and-usage-wrap">
            <div className="info-container">
            <div className="project-detail-summary">
            <span className="summary-title">Summary</span>
            <br></br> 
            {charity.summary}
          </div>
      
          <div className="project-detail-need">
            <span className="need-title">Need</span>
            <br></br> 
            {charity.need}
          </div>

          <div className="project-detail-activities">
            <span className="activities-title">Activities</span>
            <br></br> 
            {charity.activities}
          </div>

          <div className="project-detail-longtermimpact">
            <span className="activities-title">Long-term impact</span>
            <br></br> 
            {charity.longTermImpact}
          </div>
        </div>
      </div>

        <div className="organization-container">
          <h3 className="org-info-title">Organization information</h3>
          <div>
            <Link to={`/organization/${organization.id}`}>
              <img 
                src={organization.logoUrl}
              />
            </Link>
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
              <span className="detail-highlight">€ {charity.funding}</span> raised of € {charity.goal} goal
            </div>
            <div className="donations-and-remaining">
              <span className="detail-highlight">{charity.numberOfDonations}</span> donations, € {charity.remaining} to go
            </div>
            <ProgressBar percentage={(charity.funding/charity.goal)*100} />
          </div>
         
          <div className="usage-container">
            {donationoptions.map((donation) => (
              <div 
                className="donation-options"
                key={donation.id}
              >
                <div className="donation-amount">€{donation.amount}</div>
                <div className="donation-description">{donation.description}</div>
              </div>
            ))}
          </div>

          <button className="favorites-button">Add to favorites</button>


          <div className="links-container">
            <h3 className="org-info-title">For more information</h3>
            <div className="link-item"><span className="link-highlight">Project link</span> <a className="project-link" href={charity.projectLink} target="_blank" rel="noopener noreferrer">{charity.projectLink}</a></div>
            <div className="link-item"><span className="link-highlight">Progress report</span> <a className="project-link" href={charity.progressReportLink} target="_blank" rel="noopener noreferrer">{charity.progressReportLink}</a></div>
            <div className="link-item"><span className="link-highlight">Additional documentation</span> <a className="project-link" href={charity.additionalDocumentation} target="_blank" rel="noopener noreferrer">{charity.additionalDocumentation}</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}

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