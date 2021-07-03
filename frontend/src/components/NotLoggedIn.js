import React, { useRef } from "react"
import { Route } from "react-router-dom"
import Navbar from "./Navbar"
import Header from "./Header"
import Favourites from "./Favourites"
import { useStore } from "../contexts/StoreContext"
const NotLoggedIn = ({ headerRef }) => {
  const formRef = useRef()
  const { data } = useStore()
  return (
    <>
      <Route exact path='/'>
        <Header ref={formRef} myRef={headerRef} />
      </Route>
      <Route path='/events'>
        <Favourites data={data} />
      </Route>
    </>
  )
}

export default NotLoggedIn
