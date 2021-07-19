import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { StoreContextProvider } from "../../contexts/StoreContext"
import Events from "../../pages/Logged-out/events"
import Home from "../../pages/Logged-out/home"
import AccountInfo from "../../pages/Logged-in/myaccount"
import TradingViewCharts from "../../pages/Logged-in/TradingViewCharts"
import Dashboard from "../../pages/Logged-in/Dashboard"

const Routes = ({ formRef }) => {
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
            <>
              <Route exact path='/'>
                <StoreContextProvider>
                  <Dashboard />
                </StoreContextProvider>
              </Route>
              <Route path='/events'>
                <StoreContextProvider>
                  <Events />
                </StoreContextProvider>
              </Route>
              <Route path='/account'>
                <AccountInfo />
              </Route>
              <Route path='/charts'>
                <TradingViewCharts />
              </Route>
            </>
          ) : (
            <>
              <Route exact path='/'>
                <Home ref={formRef} />
              </Route>
              <Route path='/events'>
                <StoreContextProvider>
                  <Events />
                </StoreContextProvider>
              </Route>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Routes
