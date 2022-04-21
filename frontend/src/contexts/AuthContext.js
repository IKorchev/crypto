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

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const auth = firebase.auth()
  const store = firebase.firestore()
  const [userFavourites, setUserFavourites] = useState(null)
  const [jwtToken, setJwtToken] = useState(null)
  const handleSignout = () => {
    return auth.signOut()
  }
  const sendPasswordResetEmail = async (email) => {
    try {
      const res = await auth.sendPasswordResetEmail(email)
      return res
    } catch (error) {
      return error
    }
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
    if (confirmPassword !== password) return { code: 1, message: "Passwords don't match" }
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
  //prettier-ignore
  const updateUserInfo = async (type, payload) => {
    type === "photo" && 
    user.updateProfile({photoURL: payload})
    .then(() =>  "Photo URL updated")
    .catch(error => "Could not update Photo URL")
    type === "name" && 
    user.updateProfile({displayName: payload})
    .then(() => "Name updated")
    .catch(error => "Could not update name")
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
      store.collection("users").doc(newUserCred.user.uid).delete()
      const response = await newUserCred.user.delete()
      console.log(response)
    } catch (err) {
      throw err
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      try {
        const token = await currentUser.getIdToken()
        if (token) {
          setJwtToken(token)
        }
      } catch (error) {
        setJwtToken(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [user, auth])

  useEffect(() => {
    if (user) {
      const unsubscribe = store
        .collection("users")
        .doc(user.uid)
        .onSnapshot((snap) => {
          setUserFavourites(snap.data().cryptos)
        })
      return () => {
        unsubscribe()
      }
    }
  }, [store, user])

  const value = {
    deleteAccount,
    auth,
    user,
    handleSignout,
    store,
    login,
    register,
    updateUserInfo,
    userFavourites,
    sendPasswordResetEmail,
    jwtToken,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
