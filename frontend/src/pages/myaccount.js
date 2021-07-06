import React from "react"
import { useAuth } from "../contexts/AuthContext"
const AccountInfo = () => {
  const { user } = useAuth()

  return (
    <div className='myaccount-wrapper'>
      <div className='myaccount-card'>
        <h1 className='myaccount-card-title'>Account details</h1>
        <div className='myaccount-card-content'>
          <div className='myaccount-card-item'>
            <h6>Name: {user.displayName}</h6>
          </div>
          <div className='myaccount-card-item'>
            <h6>Email: {user.email}</h6>
          </div>
          <div className='myaccount-card-item'>
            <h6>Created: {user.metadata.creationTime}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountInfo
