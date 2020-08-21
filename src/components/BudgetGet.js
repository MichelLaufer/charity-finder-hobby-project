import React from 'react'
import { useSelector } from 'react-redux'


export const BudgetGet = () => {
  const budget = useSelector((state) => state.users.userBudget)

  if (!budget) return null
  

  return (
    <div className="budget-total">
      Your total budget is <span className="budget-total-highlight">{budget} EUR</span>
    </div>
  )
}
