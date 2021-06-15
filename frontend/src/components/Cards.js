import React, { useRef, useEffect, useContext } from "react"
import gsap from "gsap"
import firebase from "firebase"
import { AuthContext } from "../contexts/AuthContext"

const Cards = ({ name, symbol, price, marketCap, image }) => {
  const { user } = useContext(AuthContext)

  let pRef = useRef(null)
  useEffect(() => {
    console.log()
    return gsap.fromTo(
      pRef,
      {
        y: -10,
        opacity: 0,
        duration: 0.2,
        ease: "slow",
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "slow",
      }
    )
  }, [price])
  const addToCollection = async (e) => {
    e.preventDefault()
    console.log("clicked")

    if (typeof user.uid === "string") {
      try {
        const db = firebase.firestore().collection("users").doc(user.uid)
        const doc = await db.get()
        if (doc.exists)
          await db.update({
            name: firebase.firestore.FieldValue.arrayUnion(name),
          })
        if (!doc.exists) {
          await db.set({
            name: firebase.firestore.FieldValue.arrayUnion(name),
          })
        }
        return
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    //prettier-ignore
    <div className='card' onClick={addToCollection} >
      <img className='card-icon' src={image} alt="Coin logo" />
      <p>
        {name} / <strong>{symbol.toUpperCase()}</strong>
      </p>
      <p ref={(el) => pRef = el}>${price.toLocaleString()}</p>
      <p>${marketCap.toLocaleString()}</p>
    </div>
  )
}

export default Cards
