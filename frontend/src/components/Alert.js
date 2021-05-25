import React from "react"

const Alert = ({ status }) => {
  switch (status) {
    case "successful":
      return (
        <div className='form-alert successful'>
          <h3>Your phone has been added!</h3>
        </div>
      )
    case "unsuccessful":
      return (
        <div className='form-alert unsuccessful'>
          <h3>Your phone number could not be added</h3>
        </div>
      )
    default:
      return <></>
  }
}

export default Alert
