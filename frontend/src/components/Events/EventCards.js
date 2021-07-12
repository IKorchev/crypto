const EventCards = ({
  eventId,
  title,
  description,
  startDate,
  website,
  venue,
  city,
  country,
  screenshot,
}) => {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id='headingOne'>
        <button
          className='accordion-button'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#${eventId}`}
          aria-expanded='true'
          aria-controls='collapseOne'>
          {title}
        </button>
      </h2>
      <div
        id={eventId}
        className='accordion-collapse collapse'
        aria-labelledby='headingOne'
        data-bs-parent='#accordionExample'>
        <div className='accordion-body'>
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
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
export default EventCards
