import React, { useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
const StoreContext = React.createContext()
export const useStore = () => useContext(StoreContext)

export const StoreContextProvider = ({ children }) => {
  const { store, user, firebase } = useAuth()
  const [news, setNews] = useState(null)
  const [data, setData] = useState(null)
  const [events, setEvents] = useState(null)

  const deleteCoin = (name) => {
    const db = store.collection("users").doc(user.uid)
    db.update({
      cryptos: firebase.firestore.FieldValue.arrayRemove(`${name}`),
    })
  }
  const addCoin = (name) => {
    console.log("adding")
    const db = store.collection("users").doc(user.uid)

    db.update({
      cryptos: firebase.firestore.FieldValue.arrayUnion(`${name}`),
    })
  }

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
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
