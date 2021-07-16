import React, { useState, useEffect, useRef } from "react"

import { useStore } from "../contexts/StoreContext"
import EventCards from "../components/Events/EventCards"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import News from "../components/Events/News"
import TwitterTimeline from "../components/Events/TwitterTimeline"
import Spinner from "../components/Spinner"
import Footer from "../components/Footer/Footer"
import { Timeline } from "react-tradingview-embed"
gsap.registerPlugin(ScrollTrigger)
const Events = () => {
  const { events } = useStore()
  const [eventsArr, setEventsArr] = useState([])
  const [loading, setLoading] = useState(true)
  let ref = useRef(null)
  useEffect(() => {
    return () => {
      setLoading(false)
      setEventsArr(events)
    }
  }, [events])

  return !eventsArr && loading ? (
    <Spinner />
  ) : (
    <>
      <div className='events-wrapper'>
        <News />
        <div className='accordions-wrapper'>
          <div ref={ref} className='accordion accordion-flush' id='events-accordion'>
            <h4>Upcoming Events</h4>
            {eventsArr &&
              eventsArr.map((e, i) => (
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
            <TwitterTimeline twitterHandle='whale_alerts' twitterName='Whale Alerts' />
            <TwitterTimeline twitterHandle='WhaleTrades' twitterName='Whale Trades' />
          </div>
       
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Events
