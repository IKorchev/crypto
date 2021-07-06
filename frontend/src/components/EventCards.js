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
              {city ? (
                <p>
                  City: {city} {country}
                </p>
              ) : (
                " "
              )}
              <p className="card-description"> {startDate ? `Date: ${startDate}` : `Date: unknown`}</p>
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
