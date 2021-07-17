import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
const NewsCard = ({
  description,
  url,
  title,
  urlToImage,
  author,
  source,
  datePublished,
}) => {
  const date = new Date(datePublished).toLocaleString()

 
  return (
    <div  className='news-article-card'>
      <a href={url} target='_blank' rel='noreferrer'>
        <img src={urlToImage} alt='Article'></img>
      </a>
      <div  className='news-article-card-content'>
        <h1 className='card-title mt-0'>{title}</h1>
        <div className='d-flex align-items-between mt-1'>
          <div className='col-6 p-0'>
            <p className='text-muted m-0'>Author: {author || "unknown"}</p>
            <p className='text-muted m-0'>{source.name}</p>
          </div>
          <div className='col-6 p-0'>
            <p className='text-muted m-0'>Date: {date}</p>
          </div>
        </div>
        <p className='lead'>{description}</p>

        <a className='news-article-card-link' href={url} rel='noreferrer' target='blank'>
          Read more &gt;
        </a>
      </div>
    </div>
  )
}

export default NewsCard
