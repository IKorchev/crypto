import React from "react"
import CryptoInfo from "../assets/CryptoInfo.svg"
import { links } from "./footerLinks"

const FooterLinkList = ({ link, title, label }) => {
  return (
    <ul>
      <h6>{label}</h6>
      <li>
        <a target='_blank' rel='noreferrer' href={link}>
          {title}
        </a>
      </li>
    </ul>
  )
}

const Footer = () => {
  return (
    <div className=' footer-wrapper container text-white'>
      <h1 className='footer-title'>
        <a href='/'>
          <img src={CryptoInfo} alt='Website logo' />
        </a>
      </h1>
      <div className='footer-content row justify-content-between'>
        <div>
          {links.usefulLinks.map((object, i) => (
            <FooterLinkList
              key={i}
              label={object.label}
              link={object.link}
              title={object.title}
            />
          ))}
        </div>
        <div>
          {links.projectLinks.map((object, i) => (
            <FooterLinkList
              key={i}
              label={object.label}
              link={object.link}
              title={object.title}
            />
          ))}
        </div>
        <div>
          {links.contactLinks.map((object, i) => (
            <FooterLinkList
              key={i}
              label={object.label}
              link={object.link}
              title={object.title}
            />
          ))}
        </div>
      </div>
      <p className=' text-center'>Copyright &copy; Ivaylo Korchev</p>
    </div>
  )
}

export default Footer
