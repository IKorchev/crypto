import React from "react"
import Logo from "../assets/Group 15.svg"
const Footer = () => {
  return (
    <div className=' footer-wrapper container text-white'>
      <h1 className='footer-title'>
        <a href='/'>
          <img src={Logo} alt='Website logo' width='50' /> CryptoInfo
        </a>
      </h1>
      <div className='footer-content row justify-content-between'>
        <ul>
          <h6>Links</h6>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.binance.com/en-IN/register?ref=140171731'>
              Trade on Binance
            </a>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://bitcoin.org/en/'>
              Learn Bitcoin
            </a>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://ethereum.org/en/'>
              Learn Ethereum
            </a>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://cardano.org/'>
              Learn Cardano
            </a>
          </li>
        </ul>
        <ul>
          <h6>Contact links</h6>
          <li>
            <a target='_blank' rel='noreferrer' href='https://binance.com/'>
              Github
            </a>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://binance.com/'>
              <i className='bi bi-gthub'></i>
              LinkedIn
            </a>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='mailto:korchev94@gmail.com'>
              <i className='bi bi-gthub'></i>
              Email
            </a>
          </li>
        </ul>
        <ul>
          <h6>Project links</h6>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://github.com/IKorchev/crypto/issues'>
              Report bugs
            </a>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://github.com/IKorchev/crypto'>
              Contribute
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://binance-docs.github.io/apidocs/futures/en/#change-log'>
              Price Data
            </a>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://www.coingecko.com/en'>
              Coingecko
            </a>
          </li>
        </ul>
      </div>
      <p className=' text-center'>Copyright &copy; Ivaylo Korchev</p>
    </div>
  )
}

export default Footer
