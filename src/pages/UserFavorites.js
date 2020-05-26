import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ui } from '../reducers/ui'
import { CharityCards } from '../components/CharityCards'

const url = "http://localhost:8081/secrets"


export const UserFavorites = () => {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [projectStatus, setProjectStatus] = useState()

  const accessToken = useSelector((state) => state.users.accessToken)
  const page = useSelector((state) => state.ui.page)
  const selectedTab = useSelector((state) => state.ui.tab)
  const userId = useSelector((state) => state.users.userId)
  const dispatch = useDispatch()

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
    </>
  )
}

// <div>Your donation budget: 1000 EUR</div>