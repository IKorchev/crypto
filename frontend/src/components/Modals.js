import React, { useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useAuth } from "../contexts/AuthContext"
import { Modal } from "react-bootstrap"
export const RegisterModal = ({ showRegisterModal, setShowRegisterModal }) => {
  const { register } = useAuth()
  const [error, setError] = useState()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const handleClose = () => setShowRegisterModal(false)

  return (
    <>
      <Modal show={showRegisterModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const response = await register(name, email, password, passwordConfirm)
              response.code && setError(response.message)
            }}>
            <label>Name </label>
            <input
              type='text'
              className='search-bar'
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email </label>
            <input
              type='email'
              className='search-bar'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password </label>
            <input
              type='password'
              className='search-bar'
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm password </label>
            <input
              type='password'
              className='search-bar'
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button type='submit' className='search-bar form-button'>
              Submit
            </button>
            {error && <h6 className='alert alert-danger'>{error}</h6>}
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export const LoginModal = ({ uiConfig, auth, showLoginModal, setShowLoginModal }) => {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [error, setError] = useState()
  const [password, setPassword] = useState("")
  const handleClose = () => setShowLoginModal(false)
  return (
    <>
      <Modal show={showLoginModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const response = await login(email, password)
              response.code && setError(response.message)
            }}>
            <label>Email </label>
            <input
              type='email'
              className='search-bar'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password </label>
            <input
              type='password'
              className='search-bar'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='search-bar form-button'>
              Submit
            </button>
            {error && <h6 className='alert alert-warning'>{error}</h6>}
          </form>
        </Modal.Body>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Modal>
    </>
  )
}
