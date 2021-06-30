import React, { useState, useEffect } from "react"
import { useStore } from "../contexts/StoreContext"
import EventCards from "./EventCards"
const Favourites = () => {
  const { events } = useStore()
  const [eventsArr, setEventsArr] = useState([])
  useEffect(() => {
    return setEventsArr(events)
  }, [events])
  return (
    <div className='events-wrapper'>
      <h1>Upcoming events</h1>
      <div className='events-container'>
        {eventsArr.lenght === 0 ? (
          <h2>Nothing to show here</h2>
        ) : (
          eventsArr.map((e) => (
            <EventCards
              title={e.title}
              description={e.description}
              startDate={e.start_date}
              website={e.website}
              venue={e.venue}
              city={e.city}
              country={e.country}
              screenshot={e.screenshot}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Favourites
