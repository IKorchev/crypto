import React, { useEffect, useRef } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Header from "./Header"
const NotLoggedIn = ({ headerRef }) => {
  const formRef = useRef()

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Navbar />
            <Header ref={formRef} myRef={headerRef} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default NotLoggedIn
