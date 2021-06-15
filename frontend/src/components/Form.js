import React, { useRef } from "react"
const Form = (props, wrapperRef) => {
  // eslint-disable-next-line no-unused-vars

  const handleClick = (e) => {
    e.preventDefault()
    if (e.target === wrapperRef.current) {
      wrapperRef.current.classList.toggle("fade-out")
      wrapperRef.current.classList.toggle("fade-in")
      wrapperRef.current.classList.toggle("display-none")
    }
  }
  return (
    <div
      id='form-wrapper'
      className='display-none'
      ref={wrapperRef}
      onClick={handleClick}></div>
  )
}

export default React.forwardRef(Form)
