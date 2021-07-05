import React, { useContext, useState } from "react"
import { RegisterModal, LoginModal } from "../components/Modals"
import { useAuth, uiConfig } from "./AuthContext"
const ModalContext = React.createContext()

export const useModal = () => useContext(ModalContext)

export const ModalContextProvider = ({ children }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { auth } = useAuth()

  const value = {
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
  }
  return (
    <ModalContext.Provider value={value}>
      <RegisterModal />
      <LoginModal uiConfig={uiConfig} auth={auth} />
      {children}
    </ModalContext.Provider>
  )
}
