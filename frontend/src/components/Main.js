import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import NotLoggedIn from "./NotLoggedIn"
import LoggedIn from "./LoggedIn"
import Spinner from "./Spinner"
// IMAGES

const Main = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    user !== undefined && setIsLoading(false)
  }, [user])
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && <> {user ? <LoggedIn /> : <NotLoggedIn />}</>}
    </>
  )
}

export default Main
