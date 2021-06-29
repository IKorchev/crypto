import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Crypto from "./Crypto"
import Favourites from "./Favourites"
import { useAuth } from "../contexts/AuthContext"
import { useStore } from "../contexts/StoreContext"

// IMAGES

const Main = () => {
  const { handleSignout } = useAuth()
  const { data } = useStore()

  return (
    <>
      <Navbar handleSignout={handleSignout} />
      <Switch>
        <Route exact path='/'>
          <Crypto data={data} />
        </Route>
        <Route path='/favourites' component={() => <Favourites data={data} />}></Route>
      </Switch>
    </>
  )
}

export default Main
