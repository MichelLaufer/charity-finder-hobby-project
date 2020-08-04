import React, { useState } from 'react'
import { useSelector } from 'react-redux'


export const DonationSend = ({ projectId, projectTitle }) => {
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  const [donationAmount, setDonationAmount] = useState(null)
  const [donationBudget, setDonationBudget] = useState(false)

  // Function that is invoced when the user clicks on a donation button
  const handleDonation = (userId, projectId, projectTitle, donationAmount, donationBudget) => {
    // event.preventDefault()
    setDonationAmount(donationAmount)
    if (donationAmount > 0) {
      setDonationBudget(true)
    } else {
      setDonationBudget(false)
    }
    fetch(`http://localhost:8081/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, projectId, projectTitle, donationAmount, donationBudget }),
      headers: { "Content-Type": "application/json", "Authorization": accessToken}
    })
    console.log("Donation amount:", donationAmount)
  }


  return (
    <>
      <div>
        <form className="donation-amount-form">
        <label className="donation-amount-label">
        <input
          className="donation-amount-input"
          type="text"
          value={donationAmount}
          onChange={event => setDonationAmount(event.target.value)}
          placeholder="Enter amount here (in EUR)..."
        />
        <button 
          className="button-budget"
          type="submit"
          disabled={!accessToken}
          onClick={() => handleDonation(userId, projectId, projectTitle, donationAmount, donationBudget)}
        >
          Add to budget
        </button>
        </label>
        </form>
     </div>
    </>
  )
}