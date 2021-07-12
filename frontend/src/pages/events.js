import React, { useState, useEffect, useRef } from "react"
import { useStore } from "../contexts/StoreContext"
import EventCards from "../components/Events/EventCards"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import News from "../components/Events/News"
gsap.registerPlugin(ScrollTrigger)
const Events = () => {
  const { events } = useStore()
  const [eventsArr, setEventsArr] = useState([])
  let ref = useRef(null)
  useEffect(() => {
    return setEventsArr(events)
  }, [events])

  return !eventsArr ? (
    <></>
  ) : (
    <div className='events-wrapper'>
      <News />
      <div ref={ref} className='accordion accordion-flush' id='accordionExample'>
        <h3>Events</h3>
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
    </div>
  )
}

export default Events
