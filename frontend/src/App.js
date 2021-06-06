import "./styles/main.scss"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import Crypto from "./components/Crypto"
// IMAGES
import Image1 from "./assets/Group 14.svg"
import Image2 from "./assets/Group 16.svg"
import { useEffect, useState, useRef } from "react"
import Form from "./components/Form"

//FIREBASE
import firebase from "firebase"
import { config, uiConfig } from "./firebase"
const firebaseui = require("firebaseui")
firebase.initializeApp(config)
const store = firebase.firestore()
const ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start("#form-wrapper", uiConfig)
firebase.auth().onAuthStateChanged(async (u) => {
  if (u) {
    const db = store.collection("users").doc(u.uid)
    const doc = await db.get()
    console.log("hello")

    if (doc.exists) {
    } else {

      return store.collection("users").doc(u.uid).set({})
    }
  }
  if (!u) {
    console.log("lol")
  }
})

// APP
function App() {
  const handleSignout = () => {
    console.log("signed out")
    firebase.auth().signOut()
    window.location.href = "/"
  }
  const formRef = useRef()
  const headerRef = useRef()
  const [data, setData] = useState([])
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)

  const fetchData = async () => {
    const res = await fetch("/api")
    const json = await res.json()
    setData(json.data)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Router>
        <Navbar handleSignout={handleSignout} />
        <div id='background-images'>
          <img id='image1' alt='Background 1' src={Image1}></img>
          <img id='image2' alt='Background 3' src={Image2}></img>
        </div>
        <Form ref={formRef} />
        <Switch>
          <Route exact path='/'>
            <Header ref={formRef} myRef={headerRef} />
            <Crypto user={user} data={data} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
export default App
