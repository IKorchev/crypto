import React, { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import NotLoggedIn from "./NotLoggedIn"
import LoggedIn from "./LoggedIn"
import firebase from "firebase"
import Spinner from "./Spinner"
// IMAGES

const Main = () => {
  const { user } = useAuth()

  return (
    <>
      {user === undefined ? <Spinner /> : user === null ? <NotLoggedIn /> : <LoggedIn />}
    </>
  )
}

export default Main
