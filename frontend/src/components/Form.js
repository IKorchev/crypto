import React, { useState, useRef } from "react"
import Alert from "./Alert"
const Form = (props, forwardedRef) => {
  // eslint-disable-next-line no-unused-vars
  const [phoneNumber, setPhoneNumber] = useState("")
  const [alertStatus, setAlertStatus] = useState("")
  const formRef = useRef()
  const closeBtnRef = useRef()
  const submitBtnRef = useRef()

  const formFadeOut = () => {
    forwardedRef.current.classList.add("fade-out")
    forwardedRef.current.classList.remove("fade-in")
    setTimeout(() => {
      forwardedRef.current.classList.add("display-none")
    }, 200)
  }
  const handleFormSubmit = (e) => {
    setAlertStatus("successful")
    e.preventDefault()
  }
  const handleClick = (e) => {
    e.preventDefault()
    if (e.target === closeBtnRef.current || e.target === forwardedRef.current) {
      formFadeOut()
    }
  }
  return (
    <div
      id='form-wrapper'
      className='display-none'
      ref={forwardedRef}
      onClick={handleClick}>
      <div id="'#firebaseui-auth-container'"></div>
    </div>
  )
}

export default React.forwardRef(Form)
