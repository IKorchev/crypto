import React, { useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useUiConfig } from "../utils/uiConfig"
const Login = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const { config } = useUiConfig()
  const { auth } = useAuth()

  return (
    <div className='form-container py-5 container text-white d-grid justify-content-center aling-items-center'>
      <form
        className='form d-flex flex-column rounded'
        onSubmit={async (e) => {
          e.preventDefault()
          const response = await register(name, email, password, passwordConfirm)
          response.code ? setError(response.message) : navigate("/")
        }}>
        <h2 className='mb-4 text-center'>Register</h2>
        <label htmlFor='myaccount-name' className='text-white'>
          Name
        </label>
        <input
          id='myaccount-name'
          autoComplete='given-name'
          type='text'
          className='p-1'
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='myaccount-email' className='text-white'>
          Email
        </label>
        <input
          id='myaccount-email'
          autoComplete='email'
          type='email'
          className='p-1'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='myaccount-name' className='text-white'>
          Password (minimum 6 characters)
        </label>
        <input
          id='myaccount-password'
          autoComplete='new-password'
          type='password'
          className='p-1'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='myaccount-name' className='text-white'>
          Confirm password
        </label>
        <input
          id='myaccount-confirm-password'
          autoComplete='new-password'
          type='password'
          className='p-1'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type='submit' className='my-2 btn btn-light'>
          Register
        </button>
        {error && <h6 className='text-danger my-2 text-center'>{error}</h6>}
        <h5 className='text-center'>or</h5>
        <StyledFirebaseAuth uiConfig={config} firebaseAuth={auth} />
      </form>
    </div>
  )
}

export default Login
