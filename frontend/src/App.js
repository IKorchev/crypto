import "./styles/main.scss"
import { useRef } from "react"
import Main from "./components/Main"
import { AuthContextProvider } from "./contexts/AuthContext"
import { StoreContextProvider } from "./contexts/StoreContext"
import { ModalContextProvider } from "./contexts/ModalContext"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Navbar from "./components/Navbar"
//FIREBASE
// APP
const App = () => {
  const formRef = useRef(null)
  const headerRef = useRef()

  return (
    <Router>
      <Switch>
        <AuthContextProvider>
          <StoreContextProvider>
            <ModalContextProvider>
              <Navbar />
              <Main formRef={formRef} headerRef={headerRef} />
            </ModalContextProvider>
          </StoreContextProvider>
        </AuthContextProvider>
      </Switch>
    </Router>
  )
}
export default App
