import React from 'react'
import { useSelector } from 'react-redux'


export const BudgetGet = () => {
  const budget = useSelector((state) => state.users.userBudget)

  if (!budget) return null
  

  return (
    <div className="budget-total">
      Your total budget is currently <span className="budget-total-highlight">{budget} EUR</span>
    </div>
  )
}



  // const userId = useSelector((state) => state.users.userId)
  // const [budget, setBudget] = useState(null)

  // useEffect(() => {
  //   fetch (`http://localhost:8081/users/${userId}/budget`)
  //     .then(res => res.json())
  //     .then(json => {
  //       setBudget(json)
  //     })
  // },[userId])