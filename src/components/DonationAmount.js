import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const DonationAmount = ({ projectId }) => {
  const userId = useSelector((state) => state.users.userId)
  const [donationBudget, setDonationBudget] = useState()

  // Get a project's donation budget amount
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8081/users/${userId}/charities?projectId=${projectId}`)
      .then(res => res.json())
      .then(json => {
        if (json && json.donationAmount) {
          setDonationBudget(json.donationAmount)
        } else if (json && !json.donationAmount) {
          setDonationBudget(false)
        }
      })
    }, [projectId])

    return (
        <div className="donation-amount">
          {donationBudget}
        </div>
    )
}