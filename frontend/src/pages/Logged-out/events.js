import React, { useRef } from "react"

import { useStore } from "../../contexts/StoreContext"
import EventCards from "../../components/Events/EventCards"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import News from "../../components/Events/News"
import TwitterTimeline from "../../components/Events/TwitterTimeline"
import Footer from "../../components/Footer/Footer"
gsap.registerPlugin(ScrollTrigger)
const Events = () => {
  const { events } = useStore()
  let ref = useRef(null)

  return (
    <div className='events-wrapper-outter'>
      <div className='events-wrapper'>
        <News />
        <div className='accordions-wrapper'>
          <div ref={ref} className='accordion accordion-flush' id='events-accordion'>
            <h4>Upcoming Events</h4>
            {events?.map((e, i) => (
                <EventCards
                  eventId={`accordion${i}`}
                  key={i}
                  title={e.title}
                  description={e.description}
                  startDate={e.start_date}
                  website={e.website}
                  venue={e.venue}
                  city={e.city}
                  country={e.country}
                  screenshot={e.screenshot}
                />
              ))}
          </div>
          <div className='accordion'>
            <h4>Tweets</h4>
            <TwitterTimeline twitterHandle='whale_alert' twitterName='Whale Alert' />
            <TwitterTimeline twitterHandle='WhaleTrades' twitterName='Whale Trades' />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Events
