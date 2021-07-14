import React, { useContext, useEffect, useState, useRef } from "react"
import { useAuth } from "./AuthContext"
import firebase from "firebase"
const StoreContext = React.createContext()

export const useStore = () => useContext(StoreContext)

export const StoreContextProvider = ({ children }) => {
  const { store, user } = useAuth()
  const [socketIsOpen, setSocketIsOpen] = useState(false)
  // const [news, setNews] = useState(null)
  const [data, setData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [trades, setTrades] = useState([])
  const [realtimePrices, setRealtimePrices] = useState(null)
  const [events, setEvents] = useState(null)
  const socketProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
  const socketUrl = `${socketProtocol}//${window.location.hostname}:5500/ws/`

  useEffect(() => {
    const socket2 = new WebSocket(socketUrl)
    socket2.onopen = (e) => {
      setSocketIsOpen(true)
    }
    socket2.onmessage = (message) => {
      const data = JSON.parse(message.data)
      //if its price data
      if (data.eventType !== "trade") {
        setRealtimePrices(data)
      }
      //if its trade data
      if (data.eventType === "trade") {
        setTrades((oldArr) => {
          if (oldArr.length < 10) {
            return [data, ...oldArr]
          } else {
            oldArr.pop()
            return [data, ...oldArr]
          }
        })
      }
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const deleteCoin = (name) => {
    const db = store.collection("users").doc(user.uid)
    db.update({
      cryptos: firebase.firestore.FieldValue.arrayRemove(`${name}`),
    })
  }
  const addCoin = (name) => {
    store
      .collection("users")
      .doc(user.uid)
      .update({
        cryptos: firebase.firestore.FieldValue.arrayUnion(name),
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api")
      const data = await res.json()
      // const arr = data[1].data.splice(0, 50)
      // setNews(data[2])
      setEvents(data[1])
      setData(data[0])
    }
    fetchData()
    return setLoaded(true)
  }, [])
  useEffect(() => {
    data &&
      realtimePrices &&
      realtimePrices.forEach((el) => {
        const elsymbol = el.s.toLowerCase()
        for (const element of data) {
          if (elsymbol === `${element.symbol}usdt`) {
            element.new24Change = parseFloat(el.P)
            element.newPrice = parseFloat(el.c)
          }
        }
      })
  }, [realtimePrices, data])

  const value = {
    loaded,
    socketIsOpen,
    data,
    deleteCoin,
    addCoin,
    events,
    trades,
    // news,
    store,
    realtimePrices,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
