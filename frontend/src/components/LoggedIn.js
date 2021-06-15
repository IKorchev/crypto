import React, { useEffect, useState, useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Crypto from "./Crypto"
import Favourites from "./Favourites"
import { useAuth } from "../contexts/AuthContext"
// IMAGES
import Image1 from "../assets/Group 14.svg"
import Image2 from "../assets/Group 16.svg"
import firebase from "firebase"

const LoggedIn = () => {
  const { user, firebase, auth, data } = useAuth()

  const [favourites, setFavourites] = useState([])
  // const ref = firebase.firestore().collection("users").doc(user.uid)
  const handleSignout = () => {
    console.log("signed out")
    firebase.auth().signOut()
    window.location.href = "/"
  }

  // const deleteCoin = (coin) => {
  //   console.log(coin)
  //   // return ref.update({
  //   //   name: firebase.firestore.FieldValue.arrayRemove(coin),
  //   // })
  // }

  useEffect(() => {
    console.log(user)
    console.log(firebase)
    console.log(auth)
    // return ref.onSnapshot((doc) => {
    //   setFavourites(doc.data().name)
    // })
  }, [user])

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
            <Crypto data={data} />
          </Route>
          <Route path='/favourites'>
            <Favourites
              // deleteCoin={deleteCoin}
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
