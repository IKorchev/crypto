import "./styles/main.scss"
import { useEffect, useState, useRef } from "react"
import Spinner from "./components/Spinner"
import NotLoggedIn from "./components/NotLoggedIn"
import LoggedIn from "./components/LoggedIn"
import { AuthContextProvider } from "./contexts/AuthContext"
//FIREBASE

// APP
const App = () => {
  const formRef = useRef()
  const headerRef = useRef()
  const [data, setData] = useState([])
  const [d, setD] = useState()
  const [btcPrice, setBtcPrice] = useState()
  const [obj, setObj] = useState({
    name: "",
    price: "",
  })
  const fetchData = async () => {
    const res = await fetch("/api")
    const json = await res.json()
    setData(json.data)
  }
  //prettier-ignore
  function socketInit() {
    try {
    const socket = new WebSocket("wss://stream.binance.com:9443/stream?streams=")
    socket.onopen = ev => socket.send(JSON.stringify({
      "method": "SUBSCRIBE",
      "params":
      [
      "btcusdt@trade",
      "ethusdt@trade",
      "dotusdt@trade",
      "linkusdt@trade",
      "adausdt@trade",
      "xrpusdt@trade",
      "maticusdt@trade",
      "solusdt@trade"
      ],
      "id": 1
      }))
    const btcArr = []
    socket.onerror = ev => ev
    socket.onmessage = (ev) => {
    const parsedData = JSON.parse(ev.data)
      setObj( {
        name: parsedData.data.s,
        price: parsedData.data.p
      })
       
    }
    
  }catch(err) {
      console.log(err)
    }
  }

  socketInit()
  //listen for signin or signout
  useEffect(() => {
    //FETCH DATA FROM SERVER
    // eslint-disable-next-line no-unused-vars

    fetchData()
  }, [])

  return (
    <AuthContextProvider>
      {/* <LoggedIn formRef={formRef} /> */}
      <h1>Price is: {(obj.name, obj.price)}</h1>
      <NotLoggedIn formRef={formRef} data={data} headerRef={headerRef} />
    </AuthContextProvider>
  )
}
export default App
