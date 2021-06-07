import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Header from "./Header"

// IMAGES
import Image1 from "../assets/Group 14.svg"
import Image2 from "../assets/Group 16.svg"
import Form from "./Form"
import firebase from "firebase"

const NotLoggedIn = ({ formRef, headerRef, formFadeOut, ui }) => {
  const handleSignout = () => {
    console.log("signed out")
    firebase.auth().signOut()
    window.location.href = "/"
  }
  useEffect(() => {
    const uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: async (user) => {
          formFadeOut()
          return false
        },
      },
    }
    return ui.start("#form-wrapper", uiConfig)
  })
  return (
    <>
      <Router>
        <Navbar handleSignout={handleSignout} />
        <div id='background-images'>
          <img id='image1' alt='Background 1' src={Image1}></img>
          <img id='image2' alt='Background 3' src={Image2}></img>
        </div>
        <Form formFadeOut={formFadeOut} ref={formRef} />
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
