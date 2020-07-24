import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CharityCards } from '../components/CharityCards'


export const OtherUser = () => {
  const [addedFavorites, setAddedFavorites] = useState([])
  const [userName, setUserName] = useState("")
  const { userId } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8081/users/${userId}/otherUser`)
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
        {addedFavorites.map((favorite) => (
          <CharityCards key={favorite.projectId} id={favorite.projectId} />
        ))}
      </div>
    </div>
  )
}

// <div className="otheruser-title">Charities that {userName} has added as favorites</div>