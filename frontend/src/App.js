import "./styles/main.scss"
import { useRef } from "react"
import Main from "./components/Main/Main"
import { AuthContextProvider } from "./contexts/AuthContext"
import { StoreContextProvider } from "./contexts/StoreContext"
import { ModalContextProvider } from "./contexts/ModalContext"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

const App = () => {
  const formRef = useRef(null)
  const headerRef = useRef()

  return (
    <Router>
      <AuthContextProvider>
        <StoreContextProvider>
          <ModalContextProvider>
            <Navbar />
            <Main formRef={formRef} headerRef={headerRef} />
          </ModalContextProvider>
          <Footer />
        </StoreContextProvider>
      </AuthContextProvider>
    </Router>
  )
}
export default App
