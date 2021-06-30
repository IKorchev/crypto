import React, { useRef } from "react"
import { Route } from "react-router-dom"
import Navbar from "./Navbar"
import Header from "./Header"
const NotLoggedIn = ({ headerRef }) => {
  const formRef = useRef()

  return (
    <>
      <Route exact path='/'>
        <Navbar />
        <Header ref={formRef} myRef={headerRef} />
      </Route>
    </>
  )
}

export default NotLoggedIn
