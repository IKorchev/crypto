import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { StoreContextProvider } from "../../contexts/StoreContext"
import PrivateRoute from "./PrivateRoute"
import Events from "../../pages/Logged-out/events"
import Home from "../../pages/Logged-out/home"
import AccountInfo from "../../pages/Logged-in/myaccount"
import TradingViewCharts from "../../pages/Logged-in/TradingViewCharts"
import Dashboard from "../../pages/Logged-in/Dashboard"
import Login from "../Login"
import Register from "../Register"
const RoutesWrapper = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    return setIsLoading(user === undefined)
  }, [user])

  return (
    <>
      {!isLoading && (
        <>
          {user ? (
            <StoreContextProvider>
              <Routes>
                <Route exact path='/' element={<Dashboard />} />
                <Route path='/events' element={<Events />} />
                <Route path='/account' element={<AccountInfo />} />
                <Route path='/charts' element={<TradingViewCharts />} />
              </Routes>
            </StoreContextProvider>
          ) : (
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          )}
        </>
      )}
    </>
  )
}

export default RoutesWrapper
