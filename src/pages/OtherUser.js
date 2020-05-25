import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


export const OtherUser = () => {
  const [addedFavorites, setAddedFavorites] = useState([])
  const [userName, setUserName] = useState("")
  const { userId } = useParams()
  const myId = useSelector((state) => state.users.userId)

  useEffect(() => {
    fetch(`http:localhost:8081/users/${userId}/otherUser`)
      .then(res => res.json())
      .then(json => {
        setAddedFavorites(json.otherUser)
        setUserName(json.name)
      })
  }, [userId])


  return (
    <div>
      <div>{userName}</div>
      <div>Charities that {userName} has added as favorites</div>
      <div>
        {addedFavorites.map((favorite) => (
          <div>{favorite.projectTitle}</div>
        ))}
      </div>
    </div>
  )

}