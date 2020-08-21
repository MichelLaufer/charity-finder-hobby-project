import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CharityCards } from '../components/CharityCards'
import { BudgetForm } from '../components/BudgetForm'
import { BudgetGet } from '../components/BudgetGet'
import { users } from '../reducers/users'

const url = "https://charity-finder-backend.herokuapp.com/secrets"


export const UserFavorites = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [projectStatus, setProjectStatus] = useState()
  const [donationBudget, setDonationBudget] = useState([])
  const budget = useSelector((state) => state.users.userBudget)

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
        console.log(message)
        setErrorMessage("")
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }, [accessToken])


  // Charities added to favorites
  useEffect(() => {
    if(!userId) return
    fetch(`https://charity-finder-backend.herokuapp.com/users/${userId}/charities?favoriteStatus=true`)
      .then(res => res.json())
      .then(json => {
        setProjectStatus(json)
        console.log("favorite status:", json)
      })
  }, [userId])

   // Charities with a positive donation amount
   useEffect(() => {
    if (!userId) return;
    fetch(`https://charity-finder-backend.herokuapp.com/users/${userId}/donations`)
      .then(res => res.json())
      .then(json => {
        setDonationBudget(json)
        console.log("donation budget:", json)
      })
  }, [userId])

  // Get a user's budget
  useEffect(() => {
    fetch (`https://charity-finder-backend.herokuapp.com/users/${userId}/budget`)
      .then(res => res.json())
      .then(budget => {
        dispatch(users.actions.setUserBudget(budget))
      })
  },[])

  const usedBudget = donationBudget.reduce((acc, cur) => acc + cur.donationAmount, 0)
  const remainingBudget = budget - usedBudget
  
  return (
    // Favorites
    <>
      <div className="wrapper-box">
        {errorMessage && <div className="error-message-favorites">You need to login to view this page!</div>}
        {!errorMessage && <div className="your-favorites">Your favorite charity projects</div>}
        {projectStatus && !projectStatus.message && (
          projectStatus.map((project) => (
            <CharityCards key={project.projectId} id={project.projectId} />
          ))
        )}

        {projectStatus && projectStatus.message && (
          <div className="error-message">No projects added to your favorites</div>
        )}
      </div>

      <div className="wrapper-box">
        {!errorMessage && <div className="your-favorites">Charity projects added to budget</div>}
        {donationBudget && !donationBudget.message && (
          donationBudget.map((charity) => (
          <CharityCards key={charity.projectId} id={charity.projectId} />
        ))
      )}

      {donationBudget && donationBudget.message && (
        <div className="error-message">No projects added to your budget</div>
      )}

      {!errorMessage && 
      <div>
        <BudgetGet />
        <p className="budget-remaining">Your remaining budget is <span className="budget-remaining-highlight">{remainingBudget} EUR</span></p>
        <BudgetForm />
      </div>
      }
      </div>
      
    </>
  )
}
