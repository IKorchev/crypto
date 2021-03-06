import React from "react"
import CryptoInfo from "../../assets/CryptoInfo.svg"
import { links } from "./footerLinks"

const FooterLinkList = ({ link, title, label }) => {
  return (
    <ul>
      <h5>{label}</h5>
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
    <div className='footer-wrapper text-white'>
      <h1 className='footer-title'>
        <a href='/'>
          <img src={CryptoInfo} alt='Website logo' />
        </a>
      </h1>
      <div className='footer-content d-flex justify-content-between'>
        <div>
          {links.usefulLinks.map((object, i) => (
            <FooterLinkList key={i} label={object.label} link={object.link} title={object.title} />
          ))}
        </div>
        <div>
          {links.projectLinks.map((object, i) => (
            <FooterLinkList key={i} label={object.label} link={object.link} title={object.title} />
          ))}
        </div>
        <div>
          {links.contactLinks.map((object, i) => (
            <FooterLinkList key={i} label={object.label} link={object.link} title={object.title} />
          ))}
        </div>
      </div>
      <p className=' text-center'>
        Copyright &copy;
        <a className='mx-2' href='https://ikorchev.com'>
          ikorchev.com
        </a>
      </p>
    </div>
  )
}

export default Footer
