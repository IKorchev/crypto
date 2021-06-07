import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Crypto from "./Crypto"
// IMAGES
import Image1 from "../assets/Group 14.svg"
import Image2 from "../assets/Group 16.svg"
import Form from "./Form"
import firebase from "firebase"
const LoggedIn = ({ user, formRef, data }) => {
  const handleSignout = () => {
    console.log("signed out")
    firebase.auth().signOut()
    window.location.href = "/"
  }

  return (
    <>
      <Router>
        <Navbar handleSignout={handleSignout} />
        <div id='background-images'>
          <img id='image1' alt='Background 1' src={Image1}></img>
          <img id='image2' alt='Background 3' src={Image2}></img>
        </div>
        <Form ref={formRef} />
        <Switch>
          <Route exact path='/'>
            <Crypto user={user} data={data} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default LoggedIn
