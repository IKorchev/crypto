import "./styles/main.scss"
import { useRef } from "react"
import { AuthContextProvider } from "./contexts/AuthContext"
import { ModalContextProvider } from "./contexts/ModalContext"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Routes from "./components/Navbar/Routes"
const App = () => {
  const formRef = useRef(null)
  return (
    <Router>
      <AuthContextProvider>
        <ModalContextProvider>
          <Navbar />
          <Routes formRef={formRef} />
        </ModalContextProvider>
      </AuthContextProvider>
    </Router>
  )
}
export default App
