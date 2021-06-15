import { createContext, useContext, useEffect, useState } from "react"
import React from "react"
import firebase from "firebase"
const firebaseui = require("firebaseui")

export const AuthContext = createContext(null)
export const useAuth = () => {
  return useContext(AuthContext)
}

const config = {
  apiKey: "AIzaSyBQm93ASu9oeveKdsZGwU60BB0wDd1iDnw",
  authDomain: "different-96334.firebaseapp.com",
  projectId: "different-96334",
  storageBucket: "different-96334.appspot.com",
  messagingSenderId: "894868313343",
  appId: "1:894868313343:web:6f54b81eb2ba0bcc8a28ca",
}
firebase.initializeApp(config)
const ui = new firebaseui.auth.AuthUI(firebase.auth())

export const startUI = (ref) => {
  const config = {
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
        return false
      },
    },
  }
  return ui.start(ref, config)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const auth = firebase.auth()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [user, auth])
  const value = {
    auth,
    user,
    firebase,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
