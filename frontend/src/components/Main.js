import React from "react"
import { useAuth } from "../contexts/AuthContext"
import NotLoggedIn from "./NotLoggedIn"
import LoggedIn from "./LoggedIn"
import firebase from "firebase"
// IMAGES

const Main = () => {
  const { user } = useAuth()

  return <>{user === null ? <NotLoggedIn /> : <LoggedIn />}</>
}

export default Main
