import React, { useContext, useEffect, useState, useRef } from "react"
import { useAuth } from "./AuthContext"
import firebase from "firebase/firebase"
const StoreContext = React.createContext()
export const useStore = () => useContext(StoreContext)
export const StoreContextProvider = ({ children }) => {
  const { store, user } = useAuth()
  const [news, setNews] = useState(null)
  const [data, setData] = useState(null)
  const [realtimePrices, setRealtimePrices] = useState([])
  const [events, setEvents] = useState(null)

  const socket = useRef(new WebSocket(`wss://fstream.binance.com/ws/!ticker@arr`))
  useEffect(() => {
    socket.current.onopen = (e) => {
      console.log("socket opened")
    }
    socket.current.onerror = (err) => {
      return
    }
    socket.current.onmessage = (m) => {
      setRealtimePrices(JSON.parse(m.data))
    }
  }, [])

  const deleteCoin = (name) => {
    const db = store.collection("users").doc(user.uid)
    db.update({
      cryptos: firebase.firestore.FieldValue.arrayRemove(`${name}`),
    })
  }
  const addCoin = (name) => {
    const db = store.collection("users").doc(user.uid)

    db.update({
      cryptos: firebase.firestore.FieldValue.arrayUnion(`${name}`),
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api")
      const data = await res.json()
      // const arr = data[1].data.splice(0, 50)
      setNews(data[2])
      setEvents(data[1])
      setData(data[0])
    }
    fetchData()
  }, [])

  const value = {
    data,
    deleteCoin,
    addCoin,
    events,
    news,
    store,
    realtimePrices,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
