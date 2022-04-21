import React, { useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import firebase from "firebase"
// const API_URL = "polar-hamlet-55067.herokuapp.com"
const StoreContext = React.createContext()

export const useStore = () => useContext(StoreContext)

export const StoreContextProvider = ({ children }) => {
  const { store, user, jwtToken } = useAuth()
  const [news, setNews] = useState([])
  const [data, setData] = useState(null)
  const [trades, setTrades] = useState([])
  const [liquidations, setLiquidations] = useState([])
  const [realtimePrices, setRealtimePrices] = useState(null)
  const [events, setEvents] = useState(null)
  const socketProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
  const socketUrl = `${socketProtocol}//${window.location.host}/ws?token=${jwtToken}`
  
  useEffect(() => {
    console.log(socketUrl)
    const socket = new WebSocket(`${socketUrl}`)

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      //if its price data
      if (data.eventType !== "trade" && data.e !== "forceOrder") {
        setRealtimePrices(data)
      }

      //if its trade data
      if (data.eventType === "trade") {
        setTrades((oldArr) => {
          if (oldArr.length < 10) {
            //limit the array's length to 10
            return [data, ...oldArr]
          } else {
            // clean up the array and push new trade in
            oldArr.pop()
            return [data, ...oldArr]
          }
        })
      }
      if (data.e === "forceOrder") {
        setLiquidations((old) => {
          if (old.length < 10) {
            //limit the array's length to 10
            return [data, ...old]
          } else {
            // clean up the array and push new trade in
            old.pop()
            return [data, ...old]
          }
        })
      }
    }
  }, [socketUrl])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/events`, {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        })
        const data = await res.json()
        setNews(data[2])
        setEvents(data[1])
        setData(data[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [jwtToken])
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const deleteCoin = (object) => {
    const db = store.collection("users").doc(user.uid)
    db.update({
      cryptos: firebase.firestore.FieldValue.arrayRemove(object),
    })
  }
  const addCoin = (object) => {
    store
      .collection("users")
      .doc(user.uid)
      .update({
        cryptos: firebase.firestore.FieldValue.arrayUnion(object),
      })
  }

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
    data,
    deleteCoin,
    addCoin,
    events,
    trades,
    news,
    liquidations,
    store,
    realtimePrices,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
