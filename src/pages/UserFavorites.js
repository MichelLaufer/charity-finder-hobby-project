import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CharityCards } from '../components/CharityCards'
import { BudgetForm } from '../components/BudgetForm'
import { BudgetGet } from '../components/BudgetGet'

const url = "http://localhost:8081/secrets"


export const UserFavorites = () => {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [projectStatus, setProjectStatus] = useState()
  const [donationBudget, setDonationBudget] = useState()

  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)


  // Logged in or not?
  useEffect(() => {
    setErrorMessage("")
    fetch(url, {
      method: "GET",
      headers: { Authorization: accessToken }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else if (!res.ok) {
          throw new error("You need to sign in to view this page", JSON)
        }
      })
      .then(json => {
        setMessage(json.secret)
        setErrorMessage("")
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }, [accessToken])


  // Charities added to favorites
  useEffect(() => {
    if(!userId) return
    fetch(`http://localhost:8081/users/${userId}/charities?favoriteStatus=true`)
      .then(res => res.json())
      .then(json => {
        setProjectStatus(json)
        console.log("favorite status:", json)
      })
  }, [])

   // Get a project's donation budget amount
   useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8081/users/${userId}/charities?donationBudget=true`)
      .then(res => res.json())
      .then(json => {
        setDonationBudget(json)
        console.log("donation budget:", json)
      })
  }, [])

  
  return (
    // Favorites
    <>
      <div className="wrapper-box">
        {errorMessage && <div>{errorMessage}</div>}
        {!errorMessage && <div className="your-favorites">Your favorite charity projects</div>}
        {projectStatus && !projectStatus.message && (
          projectStatus.map((project) => (
            <CharityCards key={project.projectId} id={project.projectId} />
          ))
        )}

        {projectStatus && projectStatus.message && (
          <div className="error-message">`No projects added to your favorites</div>
        )}
      </div>

      <div className="wrapper-box">
        {errorMessage && <div>{errorMessage}</div>}
        {!errorMessage && <div className="your-favorites">Charity projects added to budget</div>}
        {donationBudget && !donationBudget.message && (
          donationBudget.map((project) => (
          <CharityCards key={project.projectId} id={project.projectId} />
        ))
      )}

      {donationBudget && donationBudget.message && (
        <div className="error-message">`No projects added to your favorites</div>
      )}
      </div>

      <div>
        <BudgetForm />
        <BudgetGet />
      </div>
      
    </>
  )
}

// <div>Your donation budget: 1000 EUR</div>

// useEffect(() => {
//   if (!userId) return;
//   fetch(`http://localhost:8081/users/${userId}/charities?donationAmount=true`)
//     .then(res => res.json())
//     .then(json => {
//       if (json && json.donationAmount) {
//         setDonationAmount(json.donationAmount)
//         console.log("donation amount:", json)
//       } else if (json && !json.donationAmount) {
//         setDonationAmount("")
//       }
//     })
// }, [])
