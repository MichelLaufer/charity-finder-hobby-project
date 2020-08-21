import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CharityCards } from '../components/CharityCards'


export const OtherUser = () => {
  const [addedFavorites, setAddedFavorites] = useState([])
  const [userName, setUserName] = useState("")
  const { userId } = useParams()

  useEffect(() => {
    fetch(`https://charity-finder-backend.herokuapp.com/users/${userId}/otherUser`)
      .then(res => res.json())
      .then(json => {
        setAddedFavorites(json.otherUser)
        setUserName(json.name)
        console.log(json.otherUser)
      })
  }, [userId])


  return (
    <div className="otheruser-wrap">
      {userName && (
        <div className="otheruser-name">{userName}'s favorite charities</div>
      )}
      <div>
        {addedFavorites && addedFavorites.map((favorite) => (
          <CharityCards key={favorite.projectId} id={favorite.projectId} />
        ))}
      </div>
    </div>
  )
}