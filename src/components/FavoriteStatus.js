import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const FavoriteStatus = ({ projectId, projectTitle }) => {
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  const [favoriteStatus, setFavoriteStatus] = useState()

  // Function that is invoced when the user clicks on Add or remove from Favorites
  const handleFavoriteStatus = (userId, projectTitle, favoriteStatus) => {
    setFavoriteStatus(favoriteStatus)
    fetch(`https://charity-finder-backend.herokuapp.com/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, projectId, projectTitle, favoriteStatus }),
      headers: { "Content-Type": "application/json", "Authorization": accessToken}
    })
  }

  // Get a project's favorite status
  useEffect(() => {
    if (!userId || !projectId) return;
    fetch(`https://charity-finder-backend.herokuapp.com/users/${userId}/charities?projectId=${projectId}`)
      .then(res => res.json())
      .then(json => {
        if (json && json.favoriteStatus) {
          setFavoriteStatus(json.favoriteStatus)
        } else if (json && !json.favoriteStatus) {
          setFavoriteStatus(false)
        }
      })
  }, [userId, projectId])

  return (
    <>
      <div>
        <button 
          className="button-favorite"
          disabled={!accessToken}
          onClick={() => handleFavoriteStatus(userId, projectTitle, !favoriteStatus)}
        >
          {favoriteStatus ? "Remove from my favorites" : "Add to my favorites"}
        </button>
      </div>
    </>
  )
}