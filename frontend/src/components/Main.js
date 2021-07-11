import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import NotLoggedIn from "./NotLoggedIn"
import LoggedIn from "./LoggedIn"
import Spinner from "./Spinner"
import { useStore } from "../contexts/StoreContext"
// IMAGES

const Main = ({ showRegisterModal, showLoginModal }) => {
  const { user } = useAuth()
  const { data } = useStore()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    return user !== undefined && setIsLoading(false)
  }, [user])
  return (
    <>
      {isLoading && <Spinner />}
      {user ? (
        <LoggedIn showRegisterModal={showRegisterModal} showLoginModal={showLoginModal} />
      ) : (
        <NotLoggedIn
          showRegisterModal={showRegisterModal}
          showLoginModal={showLoginModal}
        />
      )}
    </>
  )
}

export default Main
