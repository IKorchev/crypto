import React from "react"
import { Timeline } from "react-twitter-widgets"

const TwitterTimeline = ({ twitterName, twitterHandle }) => {
  return (
    <div className='accordion-item'>
      <div className='accordion-header' id={`#twitter-${twitterHandle}-header`}>
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#twitter-${twitterHandle}-accordion`}
          aria-expanded='true'
          aria-controls='collapseOne'>
          {twitterName}
        </button>
      </div>
      <div
        id={`twitter-${twitterHandle}-accordion`}
        className='accordion-collapse collapse'
        aria-labelledby={`twitter-${twitterHandle}-header`}
        data-bs-parent='#events-accordion'>
        <Timeline
          dataSource={{ sourceType: "profile", screenName: twitterHandle }}
          options={{ theme: "light", width: "100%", height: "10rem" }}
        />
      </div>
    </div>
  )
}
export default TwitterTimeline
