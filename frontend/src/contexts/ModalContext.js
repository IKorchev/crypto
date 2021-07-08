import React, { useContext, useState } from "react"
import { RegisterModal, LoginModal } from "../components/Modals"
import { useAuth, uiConfig } from "./AuthContext"
import firebase from "firebase/firebase"

const ModalContext = React.createContext()

export const useModal = () => useContext(ModalContext)

export const ModalContextProvider = ({ children }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { auth } = useAuth()
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => false,
    },
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  }

  const value = {
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
  }
  return (
    <ModalContext.Provider value={value}>
      <RegisterModal uiConfig={uiConfig} auth={auth} />
      <LoginModal uiConfig={uiConfig} auth={auth} />
      {children}
    </ModalContext.Provider>
  )
}
