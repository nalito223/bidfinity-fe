import React from "react"
import "../Footer/Footer.css"


const Footer = () => {
  return (
    <>
    <footer className="footer-container">
      <div className="footer-sub-container">
        <h2>Bidfinity</h2>
        <div className="footer-list">

          <ul>
            <h2>About Us</h2>
            <li>How it works</li>
            <li>For contractors</li>
            <li>For vendors</li>
          </ul>

          <ul>
            <h2>Contact</h2>
            <li>Contact form</li>
            <li>Trusted Agencies</li>
            <li>FAQS's</li>
          </ul>

          <ul>
            <h2>Bookmark and Follow</h2>
            <li>Twitter</li>
            <li>Mailing list</li>
            <li>Blog</li>
          </ul>

          {/* <ul>
            <h2>About Us</h2>
            <li>How it works</li>
          </ul> */}

        </div>
      </div>
    </footer>
      <div className="sub-footer-container">
        <div className="sub-footer-text">
          All rights reserved | Terms and conditions | Reset password
        </div>
      </div>
      </>
  )
}

export default Footer