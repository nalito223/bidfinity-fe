import React from "react"
import "./Nav.css"


const Nav: React.FC = () => {
  return (
    <nav className="nav-container">
      <div className="nav-left">
    <h1 className="nav-logo">bid<span className="green">finity</span></h1>
    </div>

    <div className="nav-right">
      <button className="log-in-button">Log in</button>
      <button className="sign-up-button">Sign up</button>
    </div>
    </nav>
  )
}

export default Nav