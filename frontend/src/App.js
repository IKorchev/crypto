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
//

function App() {
  const formRef = useRef()
  const headerRef = useRef()
  const [data, setData] = useState([])
  const fetchData = async () => {
    const res = await fetch("/api")
    const json = await res.json()
    setData(json.data)
  }
  useEffect(() => {
    fetchData()
    setInterval(() => {
      fetchData()
      console.log("fetching")
    }, 2000)
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <div id='background-images'>
          <img id='image1' alt='Background 1' src={Image1}></img>
          <img id='image2' alt='Background 3' src={Image2}></img>
        </div>
        <Form ref={formRef} />
        <Switch>
          <Route exact path='/'>
            <Header ref={formRef} myRef={headerRef} />
            <Crypto data={data} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
