import React, { useState } from 'react'
import { useSelector } from 'react-redux'


export const BudgetForm = () => {
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  const [budget, setBudget] = useState()

  const handleBudget = (userId, budget) => {
    setBudget(budget)
    fetch(`http://localhost:8081/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, budget }),
      headers: { "Content-Type": "application/json", "Authorization": accessToken}
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
          onClick={() => handleBudget(userId, 300)}
        >
          Update budget
        </button>
        </label>
      </form>
    </div>
  )
}