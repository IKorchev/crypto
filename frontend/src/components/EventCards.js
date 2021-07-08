import gsap from "gsap/gsap-core"
import { useRef, useState, useEffect } from "react"
const EventCards = ({
  title,
  description,
  startDate,
  website,
  venue,
  city,
  country,
  screenshot,
}) => {
  const [expand, setExpand] = useState(false)
  const descRef = useRef(null)
  useEffect(() => {
    descRef.current.focus()
  }, [])
  const animate = () => {
    setExpand((state) => !state)
    gsap.to(descRef.current, {
      maxHeight: !expand ? "max-content" : "",
    })
  }
  return (
    <div className='event-card'>
      <a href={website} className='event-image' target='_blank' rel='noreferrer'>
        <img src={screenshot} alt='event header'></img>
      </a>
      <div className='event-description'>
        <div className='event-card-content'>
          <div className='event-card-title'>
            <h1>{title}</h1>
            <div>
              <p>Location: {venue || "unknown"}</p>
              <p>
                City: {city || "To be determined"} {city ? country : ""}
              </p>
              <p className='card-description'>
                {startDate ? `Date: ${startDate}` : `Date: unknown`}
              </p>
            </div>
          </div>

          <h5>About the event</h5>
          <p ref={descRef}>{description}</p>
          <button
            onClick={() => {
              animate()
            }}>
            {expand ? "Show less" : "...read more"}
          </button>
        </div>
      </div>
    </div>
  )
}
export default EventCards
