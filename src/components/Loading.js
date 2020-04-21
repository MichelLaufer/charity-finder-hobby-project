import React from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'


export const Loading = () => {
  const isLoading = useSelector((state) => state.ui.isLoading)

  return (
    <div className="loading-icon">
      {isLoading && (
        <Loader 
          type="BallTriangle"
          color="#f2acad"
          height={150}
          width={150}
        />
      )}
    </div>
  )
}