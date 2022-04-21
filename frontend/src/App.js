import "./styles/main.scss"
import { useRef } from "react"
import { AuthContextProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Routes from "./components/Navbar/Routes"
import Footer from "./components/Footer/Footer"
const App = () => {
  const formRef = useRef(null)
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes formRef={formRef} />
        <Footer />
      </AuthContextProvider>
    </Router>
  )
}
export default App
