import React, { useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useAuth } from "../../contexts/AuthContext"
import { useModal } from "../../contexts/ModalContext"
import { Modal } from "react-bootstrap"
import { useHistory } from "react-router"
export const RegisterModal = ({ uiConfig, firebaseAuth }) => {
  const { register } = useAuth()
  const { showRegisterModal, setShowRegisterModal } = useModal()
  const [error, setError] = useState()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const handleClose = () => setShowRegisterModal(false)

  return (
    <>
      <Modal centered show={showRegisterModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h2 className='mb-5'>Register</h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const response = await register(name, email, password, passwordConfirm)
              response.code ? setError(response.message) : handleClose()
            }}>
            <label htmlFor='myaccount-name'>Name</label>
            <input
              placeholder='Your name'
              id='myaccount-name'
              autoComplete='given-name'
              type='text'
              className='search-bar'
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='myaccount-email'>Email</label>
            <input
              placeholder='email@example.com'
              id='myaccount-email'
              autoComplete='email'
              type='email'
              className='search-bar'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='myaccount-name'>Password (minimum 6 characters)</label>
            <input
              placeholder='Password'
              id='myaccount-password'
              autoComplete='new-password'
              type='password'
              className='search-bar'
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='myaccount-name'>Confirm password </label>
            <input
              placeholder='Confirm password'
              id='myaccount-confirm-password'
              autoComplete='new-password'
              type='password'
              className='search-bar'
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button type='submit' className='search-bar form-button'>
              Submit
            </button>
            {error && <h6 className='alert alert-danger'>{error}</h6>}
          </form>
          <h5 className='text-center'>or</h5>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export const LoginModal = ({ uiConfig, firebaseAuth }) => {
  const { login } = useAuth()
  const { showLoginModal, setShowLoginModal } = useModal()
  const [email, setEmail] = useState("")
  const [error, setError] = useState()
  const [password, setPassword] = useState("")
  const handleClose = () => setShowLoginModal(false)
  return (
    <>
      <Modal centered show={showLoginModal} onHide={handleClose}>
        <Modal.Header className='py-0' closeButton></Modal.Header>
        <Modal.Body>
          <h2 className='mb-5'>Log in</h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const response = await login(email, password)
              response.code ? setError(response.message) : handleClose()
            }}>
            <label>Email </label>
            <input
              placeholder='email@example.com'
              autoComplete='email'
              type='email'
              className='search-bar'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password </label>
            <input
              placeholder='Password'
              autoComplete='current-password'
              type='password'
              className='search-bar'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='search-bar form-button'>
              Submit
            </button>
            {error && <h6 className='alert alert-warning'>{error}</h6>}
          </form>
          <h5 className='text-center'>or</h5>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export const ConfirmModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { deleteAccount } = useAuth()
  const history = useHistory()

  const handleDeleteAccount = async (e) => {
    e.preventDefault()
    try {
      await deleteAccount(password)
      history.push("/")
    } catch (err) {
      setError(err)
    }
  }
  return (
    <>
      <Modal size='md' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body className='confirm-modal'>
          <h3 className='mb-5'>Delete account</h3>
          <form
            className='container d-flex flex-column px-5'
            onSubmit={handleDeleteAccount}>
            <label for='delete-user-password'>
              <h5 className=''>Confirm your password</h5>
            </label>
            <span className='my-2'>Leave blank if you signed in with google.</span>
            <input
              type='password'
              className='search-bar'
              onChange={(e) => setPassword(e.target.value)}
              id='delete-user-password'
              placeholder='Password'
            />
            <button className='delete-button' type='submit'>
              Delete account
            </button>
          </form>
          {error && <div className='alert text-warning'>{error.message}</div>}
        </Modal.Body>
      </Modal>
    </>
  )
}
