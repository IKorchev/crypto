import React, { useState, useRef } from "react"

const Form = (props, forwardedRef) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const formRef = useRef()
  const closeBtnRef = useRef()

  const handleForm = async (e) => {
    e.preventDefault()
    console.log(forwardedRef.current)

    if (e.target === forwardedRef.current || e.target === closeBtnRef.current) {
      await forwardedRef.current.classList.remove("fade-in")
      await forwardedRef.current.classList.add("fade-out")
      await forwardedRef.current.addEventListener("animationend", (e) => {
        forwardedRef.current.classList.add("display-none")
      })
    }
  }

  return (
    <div
      id='form-wrapper'
      className='display-none'
      ref={forwardedRef}
      onClick={handleForm}>
      <form ref={formRef}>
        <button id='close' ref={closeBtnRef} onClick={handleForm}>
          &times;
        </button>
        <h1 id='form-header'>Type in your number and be notified!</h1>
        <div id='form-content'>
          <div id='input-div'>
            <label htmlFor='phone-number'>Phone number</label>
            <input
              type='text'
              id='phone-number'
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                console.log(phoneNumber)
              }}
            />
          </div>
          <input id='form-button' type='submit' value='Notify me' />
        </div>
      </form>
    </div>
  )
}

export default React.forwardRef(Form)
