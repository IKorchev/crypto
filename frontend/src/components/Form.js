import React, { useState, useRef } from "react"
import Alert from "./Alert"
const Form = (props, forwardedRef) => {
  // eslint-disable-next-line no-unused-vars
  const [phoneNumber, setPhoneNumber] = useState("")
  const [alertStatus, setAlertStatus] = useState("successful")
  const formRef = useRef()
  const closeBtnRef = useRef()
  const submitBtnRef = useRef()

  const handleFormSubmit = (e) => {
    setAlertStatus("successful")
    formRef.current.reset()
    setTimeout(() => {
      handleClick(e)
    }, 5000)
  }
  const addClasses = () => {
    forwardedRef.current.classList.add("fade-out")
    forwardedRef.current.classList.remove("fade-in")
    setTimeout(() => {
      forwardedRef.current.classList.add("display-none")
    }, 200)
  }
  const handleClick = (e) => {
    e.preventDefault()
    if (e.target === closeBtnRef.current || e.target === forwardedRef.current) {
      addClasses()
    }
    if (e.target === submitBtnRef.current) {
      setTimeout(() => {
        addClasses()
      }, 1000)
    }
  }
  return (
    <div
      id='form-wrapper'
      className='display-none'
      ref={forwardedRef}
      onClick={handleClick}>
      <form
        ref={formRef}
        onSubmit={(e) => {
          handleFormSubmit(e)
          handleClick(e)
        }}>
        <span id='close' ref={closeBtnRef} onClick={handleClick}>
          &times;
        </span>
        <h1 id='form-header'>Type in your number and be notified!</h1>
        <div id='form-content'>
          <div id='input-div'>
            <label htmlFor='phone-number'>Phone number</label>
            <input
              type='text'
              id='phone-number'
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            ref={submitBtnRef}
            id='form-button'
            type='submit'
            onClick={handleFormSubmit}
            value=''>
            Notify me
          </button>
        </div>
        <Alert status={alertStatus} />
      </form>
    </div>
  )
}

export default React.forwardRef(Form)
