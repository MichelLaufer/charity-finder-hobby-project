import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export const DonationAmount = ({ projectId }) => {
  const userId = useSelector((state) => state.users.userId)
  const [donationAmount, setDonationAmount] = useState()
  const [showDonationAmount, setShowDonationAmount] = useState(false)

  // Get a project's donation amount
  useEffect(() => {
    if (!userId || !projectId) return;
    fetch(`http://localhost:8081/users/${userId}/charities?projectId=${projectId}`)
      .then(res => res.json())
      .then(json => {
        if (json && json.donationAmount > 0) {
          setDonationAmount(json.donationAmount)
          setShowDonationAmount(true)
        } else if (json && !json.donationAmount) {
          setDonationAmount(false)
          setShowDonationAmount(false)
        }
      })
    }, [userId, projectId])

    return (
      <div>
        {showDonationAmount && (
          <div className="donation-amount-box">
            {donationAmount} EUR 💶
          </div>
        )}
      </div>
    )
}