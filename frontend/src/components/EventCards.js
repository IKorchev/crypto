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
      <a href={website} target='_blank' rel='noreferrer'>
        <img src={screenshot} width='100px' height='auto' alt='event header'></img>
      </a>
      <div className='event-card-content'>
        <a href={website} target='_blank' rel='noreferrer'>
          <h1>{title}</h1>
        </a>
        <p>Location: {venue}</p>
        <div className='event-info'>
          <p>
            {city}, {country}
          </p>
          <p>Date: {startDate}</p>
        </div>
      </div>
      <div className='event-description'>
        <h3>About the event</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
export default EventCards
