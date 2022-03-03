import React from "react"
import { Navigate, Route } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth()
  return <>{user ? children : <Navigate to='/login' />}</>
}

export default PrivateRoute
