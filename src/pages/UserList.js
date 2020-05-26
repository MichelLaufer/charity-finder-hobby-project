import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const UserList = () => {
  const [userList, setUserList] = useState([])
  const userId = useSelector((state) => state.users.userId)

  // All users
  useEffect(() => {
    if (!userId) return 
    fetch(`http://localhost:8081/users`)
      .then(res => res.json())
      .then(json => {
        setUserList(json)
        console.log("All users:", json)
      })
  }, [userId])

  return (
    <div className="userlist-wrap">
      <div className="userlist-title">
        Other Users
      </div>
      {userList.map((user) => (
        userId !== user._id &&
        <div className="userlist-names">
          <Link to={`/users/${user._id}`} key={user._id} className="userlist-names-link">
            {user.name} - {user.charities.length} added favorites
          </Link>
        </div>
      ))}
    </div>
  )
}