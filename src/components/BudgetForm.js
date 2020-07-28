import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { users } from '../reducers/users'



export const BudgetForm = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  const [budget, setBudget] = useState()

  const handleBudget = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8081/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, budget }),
      headers: { "Content-Type": "application/json", "Authorization": accessToken}
    })
    .then(res => {
      if(res.ok) dispatch(users.actions.setUserBudget(budget))
    })
  }
 
  return (
    <div>
      <form className="donation-amount-form">
        <label className="donation-amount-label">
        <input
          className="donation-amount-input"
          type="text"
          value={budget}
          onChange={event => setBudget(event.target.value)}
          placeholder="Enter amount here (in EUR)..."
        />
        <button 
          className="button-budget"
          type="submit"
          disabled={!accessToken}
          onClick={event => handleBudget(event)}
        >
          Update budget
        </button>
        </label>
      </form>
    </div>
  )
}