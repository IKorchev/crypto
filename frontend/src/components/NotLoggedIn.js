import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Header from "./Header"
import { startUI } from "../contexts/AuthContext"
// IMAGES
import Image1 from "../assets/Group 14.svg"
import Image2 from "../assets/Group 16.svg"
import Form from "./Form"

const NotLoggedIn = ({ formRef, headerRef, ui }) => {
  useEffect(() => {
    startUI("#form-wrapper")
  }, [ui])
  return (
    <>
      <Router>
        <Navbar />
        <div id='background-images'>
          <img id='image1' alt='Background 1' src={Image1}></img>
          <img id='image2' alt='Background 3' src={Image2}></img>
        </div>
        <Form ref={formRef} />
        <Switch>
          <Route exact path='/'>
            <Header ref={formRef} myRef={headerRef} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default NotLoggedIn
