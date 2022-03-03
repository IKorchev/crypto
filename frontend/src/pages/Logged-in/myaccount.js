import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import AccountTradingViewCards from "../../components/Account/AccountTradingViewCards"

const AccountInfo = () => {
  const { user, updateUserInfo, deleteAccount } = useAuth()
  const [name, setName] = useState(user.displayName)
  const [photoUrl, setPhotoUrl] = useState(user.photoURL)
  const [error, setError] = useState(null)
  const editName = useRef()
  const editPhotoUrl = useRef()
  const [password, setPassword] = useState("")

  return (
    <div className='myaccount-wrapper'>
      <div>
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
                <div className='d-flex'>
                  <button
                    onClick={() => {
                      editPhotoUrl.current.select()
                    }}
                    className='button text-white'>
                    <i className='bi bi-pencil-square'></i>
                  </button>
                  <button
                    onClick={async () => {
                      let res = await updateUserInfo("photo", photoUrl)
                      console.log(res)
                    }}
                    className='button text-white'>
                    Save
                  </button>
                </div>
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
                <div className='d-flex'>
                  <button
                    onClick={() => {
                      editName.current.select()
                    }}
                    className='button text-white'>
                    <i className='bi bi-pencil-square'></i>
                  </button>
                  <button
                    className='button text-white'
                    onClick={async () => {
                      await updateUserInfo("name", name)
                      console.log(updateUserInfo("name", name))
                    }}>
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className='myaccount-labels'>
              <label>
                <h5>Email:</h5>
              </label>
              <h4>{user.email}</h4>
            </div>
            <h5 className='mt-4'>
              {`Date created: 
            ${new Date(user.metadata.creationTime).toLocaleDateString("en-UK")}`}
            </h5>
            <br />
            <hr />
            <h3 className='w-100 bg-turquiose rounded '>Delete your account</h3>
            <div className='d-flex flex-row justify-content-between py-2 w-100 gap-4'>
              <div>
                <label htmlFor='password'>Password *</label>
                <input
                  id='password'
                  type='password'
                  className='bg-light text-dark rounded p-1 w-100'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type='button'
                className='btn btn-danger w-50 h-50 align-self-end'
                onClick={async (e) => {
                  e.preventDefault()
                  try {
                    await deleteAccount(password)
                  } catch (error) {
                    setError(error)
                  }
                }}>
                Delete
              </button>
            </div>
            {error && (
              <div className='alert alert-warning fw-bold text-center mt-3'>{error.message}</div>
            )}
          </div>
        </div>
        <AccountTradingViewCards />
      </div>
    </div>
  )
}

export default AccountInfo
