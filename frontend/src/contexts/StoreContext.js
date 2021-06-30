import React, { useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
const StoreContext = React.createContext()
export const useStore = () => useContext(StoreContext)

export const StoreContextProvider = ({ children }) => {
  const { store, user, firebase } = useAuth()
  // const db = store.collection("users").doc(user.uid)
  const [userFavourites, setUserFavourites] = useState([])
  const [data, setData] = useState(null)
  const [events, setEvents] = useState(null)

  useEffect(() => {
    if (user !== null) {
      const db = store.collection("users").doc(user.uid)
      db.onSnapshot((snap) => {
        if (snap) {
          setUserFavourites(snap.data().cryptos)
        } else {
          console.log("waiting")
        }
      })
    }
  }, [user, store])

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
      setEvents(data[1])
      setData(data[0])
    }
    fetchData()
  }, [])

  const value = {
    data,
    userFavourites,
    deleteCoin,
    addCoin,
    events,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
