import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Crypto from "./Crypto"
import Favourites from "./Favourites"
// IMAGES
import Image1 from "../assets/Group 14.svg"
import Image2 from "../assets/Group 16.svg"
import firebase from "firebase"

const LoggedIn = ({ user, data }) => {
  const [favourites, setFavourites] = useState([])
  const ref = firebase.firestore().collection("users").doc(user.uid)

  const handleSignout = () => {
    console.log("signed out")
    firebase.auth().signOut()
    window.location.href = "/"
  }

  const deleteCoin = (coin) => {
    return ref.update({
      name: firebase.firestore.FieldValue.arrayRemove(coin),
    })
  }

  useEffect(() => {
    console.log("waiting for changes in firestore")
    // return ref.onSnapshot((doc) => {
    //   setFavourites(doc.data().name)
    // })
  })

  return (
    <>
      <Router>
        <Navbar handleSignout={handleSignout} />
        <div id='background-images'>
          <img id='image1' alt='Background 1' src={Image1}></img>
          <img id='image2' alt='Background 3' src={Image2}></img>
        </div>
        <Switch>
          <Route exact path='/'>
            <Crypto user={user} data={data} />
          </Route>
          <Route path='/favourites'>
            <Favourites
              deleteCoin={deleteCoin}
              user={user}
              data={data}
              favourites={favourites}
            />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default LoggedIn
