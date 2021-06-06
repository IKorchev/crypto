import React, { useRef } from "react"
const Form = (props, forwardedRef) => {
  // eslint-disable-next-line no-unused-vars

  const closeBtnRef = useRef()

  const formFadeOut = () => {
    forwardedRef.current.classList.add("fade-out")
    forwardedRef.current.classList.remove("fade-in")
    setTimeout(() => {
      forwardedRef.current.classList.add("display-none")
    }, 200)
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
      onClick={handleClick}></div>
  )
}

export default React.forwardRef(Form)
