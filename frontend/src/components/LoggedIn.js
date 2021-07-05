import React from "react"
import { Route } from "react-router-dom"
import Crypto from "./Crypto"
import Favourites from "../pages/events"
import AccountInfo from "../pages/myaccount"
import { useStore } from "../contexts/StoreContext"

// IMAGES

const Main = () => {
  const { data } = useStore()

  return (
    <>
      <Route exact path='/'>
        <Crypto data={data} />
      </Route>
      <Route path='/events'>
        <Favourites data={data} />
      </Route>
      <Route path='/account'>
        <AccountInfo />
      </Route>
    </>
  )
}

export default Main
