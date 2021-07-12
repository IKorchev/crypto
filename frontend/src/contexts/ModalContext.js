import React, { useContext, useState } from "react"
import { RegisterModal, LoginModal } from "../components/Home/Crypto/Modals"
import firebase from "firebase"
import { useAuth } from "./AuthContext"

const ModalContext = React.createContext()

export const useModal = () => useContext(ModalContext)

export const ModalContextProvider = ({ children }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { auth, store } = useAuth()
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (auth) => {
        if (auth.additionalUserInfo.isNewUser) {
          console.log(auth.additionalUserInfo.isNewUser)
          store.collection("users").doc(auth.user.uid).set({
            cryptos: [],
          })
        }
        setShowLoginModal(false)
        setShowRegisterModal(false)
        return false
      },
    },
    signInFlow: "popup",
    signInOptions: [
      {
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  }

  const value = {
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
  }
  return (
    <ModalContext.Provider value={value}>
      <RegisterModal uiConfig={uiConfig} firebaseAuth={auth} />
      <LoginModal uiConfig={uiConfig} firebaseAuth={auth} />
      {children}
    </ModalContext.Provider>
  )
}
