import React, { useRef } from "react"
import { Route } from "react-router-dom"
import Home from "../pages/home"
import Favourites from "../pages/events"
import { useStore } from "../contexts/StoreContext"
const NotLoggedIn = ({ headerRef }) => {
  const formRef = useRef()
  const { data } = useStore()
  return (
    <>
      <Route exact path='/'>
        <Home ref={formRef} myRef={headerRef} />
      </Route>
      <Route path='/events'>
        <Favourites data={data} />
      </Route>
    </>
  )
}

export default NotLoggedIn
