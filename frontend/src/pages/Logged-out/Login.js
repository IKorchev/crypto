import React, { useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useUiConfig } from "../../utils/uiConfig"
const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { config } = useUiConfig()
  const { auth } = useAuth()

  return (
    <div className='form-container py-5 container text-white d-grid justify-content-center aling-items-center'>
      <form
        className='form d-flex flex-column rounded'
        onSubmit={async (e) => {
          e.preventDefault()
          const response = await login(email, password)
          response.code ? setError(response.message) : navigate("/")
        }}>
        <h2 className='mb-4 text-center'>Login</h2>
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
        <button type='submit' className='my-4 btn btn-light'>
          Login
        </button>
        <h5 className='text-center'>or</h5>
        <StyledFirebaseAuth uiConfig={config} firebaseAuth={auth} />
        {error && <h6 className='alert alert-danger my-2 text-center'>{error}</h6>}
      </form>
    </div>
  )
}

export default Login
