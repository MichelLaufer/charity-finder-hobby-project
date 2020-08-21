import React from 'react'
import { useSelector } from 'react-redux'


export const DonationBudget = ({ projectId, projectTitle, donationOption, donationDescription }) => {
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  const [donationAmount, setDonationAmount] = useState()

  // Function that is invoced when the user clicks on a donation button
  const handleDonation = (userId, projectTitle, donationAmount) => {
    setDonationAmount(donationAmount)
    fetch(`https://charity-finder-backend.herokuapp.com/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, projectId, projectTitle, donationAmount }),
      headers: { "Content-Type": "application/json", "Authorization": accessToken}
    })
  }


  return (
      <div>
        <button 
          className="donation-options-button"
          disabled={!accessToken}
          onClick={(e) => {
            e.preventDefault()
            handleDonation(userId, projectTitle, donationAmount)}}
        >
        <span className="donation-amount">€{donationOption}</span>
        <span className="donation-description">{donationDescription}</span>
        </button>
      </div>
  )
}