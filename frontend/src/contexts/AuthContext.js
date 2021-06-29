import { createContext, useContext, useEffect, useState } from "react"
import React from "react"
import firebase from "firebase"

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const config = {
  apiKey: "AIzaSyBQm93ASu9oeveKdsZGwU60BB0wDd1iDnw",
  authDomain: "different-96334.firebaseapp.com",
  projectId: "different-96334",
  storageBucket: "different-96334.appspot.com",
  messagingSenderId: "894868313343",
  appId: "1:894868313343:web:6f54b81eb2ba0bcc8a28ca",
}
firebase.initializeApp(config)

const uiConfig = {
  signInSuccessUrl: "/",
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

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const auth = firebase.auth()
  const [data, setData] = useState([])
  const store = firebase.firestore()
  const handleSignout = () => {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [user, auth])
  const value = {
    data,
    auth,
    user,
    firebase,
    handleSignout,
    uiConfig,
    store,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
