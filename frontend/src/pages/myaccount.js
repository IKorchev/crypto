import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { ConfirmModal } from "../components/Modals"
const AccountInfo = () => {
  const { user } = useAuth()
  const [show, setShow] = useState()
  return (
    <div className='myaccount-wrapper'>
      <ConfirmModal show={show} setShow={setShow} />
      <div className='myaccount-card'>
        <h1 className='myaccount-card-title'>Account details</h1>
        <div className='myaccount-card-content'>
          <div className='myaccount-card-item'>
            <h5>Name: {user.displayName}</h5>
          </div>
          <div className='myaccount-card-item'>
            <h5>Email: {user.email}</h5>
          </div>
          <div className='myaccount-card-item'>
            <h5>
              Created: {new Date(user.metadata.creationTime).toLocaleDateString("en-UK")}
            </h5>
          </div>
          <div className='myaccount-card-item'>
            <button className='btn btn-danger py-1' onClick={() => setShow(true)}>
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountInfo
