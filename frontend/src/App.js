import "./styles/main.scss"
import { useRef } from "react"
import Main from "./components/Main"
import { AuthContextProvider } from "./contexts/AuthContext"
import { StoreContextProvider } from "./contexts/StoreContext"
import { BrowserRouter as Router } from "react-router-dom"

//FIREBASE
// APP
const App = () => {
  const formRef = useRef(null)
  const headerRef = useRef()

  return (
    <Router>
      <AuthContextProvider>
        <StoreContextProvider>
          <Main formRef={formRef} headerRef={headerRef} />
        </StoreContextProvider>
      </AuthContextProvider>
    </Router>
  )
}
export default App
