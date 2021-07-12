import { createContext, useContext, useEffect, useState } from "react"
import React from "react"
import firebase from "firebase"
import { useHistory } from "react-router"
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

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const auth = firebase.auth()
  const store = firebase.firestore()
  const history = useHistory()
  const handleSignout = () => {
    return auth.signOut()
  }
  const login = async (email, password) => {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      const res = await auth.signInWithEmailAndPassword(email, password)
      return res
    } catch (err) {
      return err
    }
  }
  const register = async (name, email, password, confirmPassword) => {
    if (confirmPassword === password)
      try {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        if (res.user) {
          store.collection("users").doc(res.user.uid).set({
            cryptos: [],
          })
          console.log(res.user)
        }
        return res
      } catch (error) {
        return error
      }
  }
  const reauthenticate = (currentPassword) => {
    if (currentPassword) {
      console.log(user)
      const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
      return user.reauthenticateWithCredential(cred)
    } else {
      return user.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())
    }
  }
  const deleteAccount = async (password) => {
    try {
      const newUserCred = await reauthenticate(password)
      const deletedDocument = await store
        .collection("users")
        .doc(newUserCred.user.uid)
        .delete()
      const response = await newUserCred.user.delete()
      console.log(response)
    } catch (err) {
      throw err
    }
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
    deleteAccount,
    auth,
    user,
    handleSignout,
    store,
    login,
    register,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
