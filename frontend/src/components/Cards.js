import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import firebase from "firebase"
const Cards = ({ user, name, symbol, price, marketCap, image }) => {
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
    if (user) {
      const store = firebase.firestore()
      const db = store.collection("users").doc(user)

      const data = await db.update({
        name: firebase.firestore.FieldValue.arrayUnion(name),
      })
      console.log(data)
    } else {
      console.log(name)

      return false
    }
  }
  return (
    //prettier-ignore
    <div className='card' >
      <img className='card-icon' src={image} alt="Coin logo" onClick={addToCollection}/>
      <p>
        {name} / <strong>{symbol.toUpperCase()}</strong>
      </p>
      <p ref={(el) => pRef = el}>${price.toLocaleString()}</p>
      <p>${marketCap.toLocaleString()}</p>
    </div>
  )
}
export default Cards
