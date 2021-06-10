import React, { useRef } from "react"
const Form = ({ formFadeOut }, forwardedRef) => {
  // eslint-disable-next-line no-unused-vars

  const handleClick = (e) => {
    e.preventDefault()
    if (e.target === forwardedRef.current) {
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
