import React, { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { Route } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import ClipLoader from "react-spinners/ClipLoader"
import { StoreContextProvider, useStore } from "../../contexts/StoreContext"
import Events from "../../pages/events"
import Home from "../../pages/home"
import AccountInfo from "../../pages/myaccount"
import TradingViewCharts from "../../pages/TradingViewCharts"
import Crypto from "../Home/Crypto"

const Routes = ({ formRef, headerRef }) => {
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
                  <Crypto />
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
