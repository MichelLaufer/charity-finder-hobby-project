import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const BudgetGet = () => {
  const userId = useSelector((state) => state.users.userId)
  const [budget, setBudget] = useState()

  useEffect(() => {
    fetch (`http://localhost:8081/users/${userId}/budget`)
      .then(res => res.json())
      .then(json => {
        setBudget(json)
      })
  },[budget])
  

  return (
    <div>
      {budget}
    </div>
  )
}