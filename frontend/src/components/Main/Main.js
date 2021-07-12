import React, { useState, useEffect, useRef } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useStore } from "../../contexts/StoreContext"
import Spinner from "../Spinner"
import { Route } from "react-router-dom"
import Crypto from "../Home/Crypto/Crypto"
import Events from "../../pages/events"
import AccountInfo from "../../pages/myaccount"
import Home from "../../pages/home"
// IMAGES

const Main = ({ showRegisterModal, showLoginModal }) => {
  const formRef = useRef()
  const { user } = useAuth()
  const { data } = useStore()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    return user !== undefined && setIsLoading(false)
  }, [user])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      {user && !isLoading ? (
        <>
          <Route exact path='/'>
            <Crypto data={data} />
          </Route>
          <Route path='/events'>
            <Events data={data} />
          </Route>
          <Route path='/account'>
            <AccountInfo />
          </Route>
        </>
      ) : (
        !user &&
        !isLoading && (
          <>
            <Route exact path='/'>
              <Home ref={formRef} />
            </Route>
            <Route path='/events'>
              <Events data={data} />
            </Route>
          </>
        )
      )}
    </>
  )
}

export default Main
