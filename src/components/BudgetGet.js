import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const BudgetGet = () => {
  const budget = useSelector((state) => state.users.userBudget)
  // const userId = useSelector((state) => state.users.userId)
  // const [budget, setBudget] = useState(null)

  // useEffect(() => {
  //   fetch (`http://localhost:8081/users/${userId}/budget`)
  //     .then(res => res.json())
  //     .then(json => {
  //       setBudget(json)
  //     })
  // },[userId])

  if (!budget) return null
  

  return (
    <div>
      {budget}
    </div>
  )
}