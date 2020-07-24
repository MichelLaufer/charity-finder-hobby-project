import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const DonationAmount = ({ projectId }) => {
  const userId = useSelector((state) => state.users.userId)
  const [donationBudget, setDonationBudget] = useState()
  const [showDonationBudget, setShowDonationBudget] = useState(false)

  // Get a project's donation budget amount
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8081/users/${userId}/charities?projectId=${projectId}`)
      .then(res => res.json())
      .then(json => {
        if (json && json.donationBudget) {
          setDonationBudget(json.donationAmount)
          setShowDonationBudget(true)
        } else if (json && !json.donationAmount) {
          setDonationBudget(false)
          setShowDonationBudget(false)
        }
      })
    }, [userId, projectId])

    return (
      <div>
        {showDonationBudget && (
          <div className="donation-amount-box">
            {donationBudget} EUR 💶
          </div>
        )}
      </div>
    )
}