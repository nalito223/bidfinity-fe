import React from "react"
import "./Nav.css"

type NavProps = {
  openModal: (selectedForm: string) => void;
};

const Nav = ({ openModal }: NavProps) => {
  return (
    <nav className="nav-container">
      <div className="nav-left">
        <h1 className="nav-logo">bid<span className="green">finity</span></h1>
      </div>

      <div className="nav-right">
        <button className="log-in-button"
           onClick={(e) => {
            e.preventDefault();
            openModal("login");
          }}
        >Log in</button>
        <button className="sign-up-button"
          onClick={(e) => {
            e.preventDefault();
            openModal("signup");
          }}
        >Sign up</button>
      </div>
    </nav>
  )
}

export default Nav