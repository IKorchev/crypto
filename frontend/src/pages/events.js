import React, { useState, useEffect, useRef } from "react"
import { useStore } from "../contexts/StoreContext"
import EventCards from "../components/EventCards"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
const Events = () => {
  const { events } = useStore()
  const [eventsArr, setEventsArr] = useState([])
  let ref = useRef(null)
  useEffect(() => {
    return setEventsArr(events)
  }, [events])
  useEffect(() => {
    gsap.from(ref.childNodes, { opacity: 0, x: 100, duration: 0.8, stagger: 0.2 })
  }, [ref, eventsArr])
  return (
    <div className='events-wrapper'>
      <h1>Upcoming events</h1>
      <div className='events-container' ref={(el) => (ref = el)}>
        {eventsArr &&
          eventsArr.map((e, i) => (
            <EventCards
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
    </div>
  )
}

export default Events
