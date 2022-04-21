import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { StoreContextProvider } from "../../contexts/StoreContext"
import Events from "../../pages/Logged-in/Events"
import Home from "../../pages/Logged-out/Home"
import AccountInfo from "../../pages/Logged-in/Myaccount"
import TradingViewCharts from "../../pages/Logged-in/TradingViewCharts"
import Dashboard from "../../pages/Logged-in/Dashboard"
import Login from "../../pages/Logged-out/Login"
import Register from "../../pages/Logged-out/Register"

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
            //prettier-ignore
            <StoreContextProvider>
              <Routes>
                <Route path='/' exact  element={<Dashboard />} />
                <Route path='/events'  element={<Events />} />
                <Route path='/account' element={<AccountInfo />} />
                <Route path='/charts'  element={<TradingViewCharts />} />
              </Routes>
            </StoreContextProvider>
          ) : (
            //prettier-ignore
            <Routes>
              <Route path='/' exact   element={<Home />} />
              <Route path='/login'    element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          )}
        </>
      )}
    </>
  )
}

export default RoutesWrapper
