import "./styles/main.scss"
import { useEffect, useState, useRef } from "react"

import Spinner from "./components/Spinner"
import NotLoggedIn from "./components/NotLoggedIn"
import LoggedIn from "./components/LoggedIn"
// IMAGES

//FIREBASE
import firebase from "firebase"
import { config } from "./firebase"
firebase.initializeApp(config)


// APP
const App = () => {
  const formRef = useRef()
  const headerRef = useRef()
  const [data, setData] = useState([])
  const [user, setUser] = useState(undefined)
  const auth = firebase.auth()

  const formFadeOut = () => {
    formRef.current.classList.add("fade-out")
    formRef.current.classList.remove("fade-in")
    setTimeout(() => {
      formRef.current.classList.add("display-none")
    }, 200)
  }

  //listen for signin or signout
  auth.onAuthStateChanged((u) => setUser(u))

  useEffect(() => {
    //FETCH DATA FROM SERVER
    // eslint-disable-next-line no-unused-vars
    const fetchData = (async () => {
      const res = await fetch("/api")
      const json = await res.json()
      setData(json.data)
    })()
  }, [user])
  if (user === undefined) return <Spinner />
  if (user !== null) {
    return <LoggedIn user={user} formRef={formRef} data={data} />
  }
  if (user === null) {
    return (
      <NotLoggedIn
        user={user}
        formRef={formRef}
        data={data}
        headerRef={headerRef}
        formFadeOut={formFadeOut}
  
      />
    )
  }
  return <Spinner />
}
export default App
