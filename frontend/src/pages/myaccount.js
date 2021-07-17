import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { ConfirmModal } from "../components/Home/Modals"
const AccountInfo = () => {
  const [name, setName] = useState("")
  const { user } = useAuth()
  console.log(user)
  const [show, setShow] = useState()
  return (
    <div className='myaccount-wrapper'>
      <ConfirmModal show={show} setShow={setShow} />
      <div className='myaccount-card'>
        <h1 className='myaccount-card-title'>Account details</h1>
        <div className='myaccount-card-content'>
          <div className='myaccount-labels'>
            <img src={user.photoURL} alt='User' />
            <h5>Name: </h5>
            <h5 contentEditable='true' onInput={(e) => setName(e.target.innerText)}>
              {user.displayName}
            </h5>
            <h5>
              Email:
              {user.email}
            </h5>
            <h5>
              Created:
              {new Date(user.metadata.creationTime).toLocaleDateString("en-UK")}
            </h5>
          </div>
        </div>
        <div className='myaccount-card-item'>
          <button className='btn btn-danger py-1' onClick={() => setShow(true)}>
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountInfo
