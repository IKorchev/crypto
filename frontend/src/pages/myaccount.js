import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { ConfirmModal } from "../components/Home/Modals"
import AccountTradingViewCards from "../components/AccountTradingViewCards"

const AccountInfo = () => {
  const { user, updateUserInfo } = useAuth()
  const [name, setName] = useState(user.displayName)
  const [photoUrl, setPhotoUrl] = useState(user.photoURL)
  const editName = useRef()
  const editPhotoUrl = useRef()
  const [show, setShow] = useState()
  return (
    <div className='myaccount-wrapper'>
      <ConfirmModal show={show} setShow={setShow} />
      <div>
        <h1 className='myaccount-card-title'>Account details</h1>
        <div className='myaccount-card'>
          <div className='img-container'>
            <img
              src={
                user.photoURL ||
                "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
              }
              alt='User'
            />
          </div>
          <div className='myaccount-card-content mt-3'>
            <div className='myaccount-labels'>
              <label>
                <h5>Photo:</h5>
              </label>
              <div className='d-flex justify-content-between'>
                <input
                  className='fs-6'
                  ref={editPhotoUrl}
                  type='url'
                  onClick={(e) => e.target.select()}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  value={photoUrl}
                />
                <button
                  onClick={() => {
                    editPhotoUrl.current.select()
                  }}
                  className='text-white'>
                  <i className='bi bi-pencil-square'></i>
                </button>
                <button
                  onClick={async () => {
                    let res = await updateUserInfo("photo", photoUrl)
                    console.log(res)
                  }}
                  className='text-white'>
                  Save
                </button>
              </div>
            </div>
            <div className='myaccount-labels'>
              <label>
                <h5>Name: </h5>
              </label>
              <div className='d-flex justify-content-between'>
                <input
                  type='text'
                  ref={editName}
                  onClick={(e) => e.target.select()}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <button
                  onClick={() => {
                    editName.current.select()
                  }}
                  className='text-white'>
                  <i className='bi bi-pencil-square'></i>
                </button>
                <button
                  className='text-white'
                  onClick={async () => {
                    await updateUserInfo("name", name)
                    console.log(updateUserInfo("name", name))
                  }}>
                  Save
                </button>
              </div>
            </div>
            <div className='myaccount-labels'>
              <label>
                <h5>Email:</h5>
              </label>
              <div className='d-flex justify-content-between'>
                <h5>{user.email}</h5>
              </div>
            </div>
            <h5 className='text-end mt-5'>
              {`Date of creation 
            ${new Date(user.metadata.creationTime).toLocaleDateString("en-UK")}`}
            </h5>
            <button className=' text-danger py-1' onClick={() => setShow(true)}>
              Delete account
            </button>
          </div>
        </div>
        <AccountTradingViewCards />
      </div>
    </div>
  )
}

export default AccountInfo
