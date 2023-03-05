import React, { useContext } from 'react';

import "./LandingPage.css"
// @ts-ignore
import home from "../../images/home.png"
// @ts-ignore
import tree from "../../images/tree.jpg"
// @ts-ignore
import plant from "../../images/plant.png"
// @ts-ignore
import check from "../../images/check.png"
// @ts-ignore
import clipboard from "../../images/clipboard.png"
// @ts-ignore
import search from "../../images/search.png"
import { AppContext } from '../App/AppContext';

interface LandingPageProps {
  openModal: () => void;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const { user, handleLogin, openModal, handleLogout, } = useContext(AppContext);

  return (
    <>
      <section className="landing-page-container">
        <div className="landing-page-left">
          <h2 className="landing-page-bold-text">Connect with landscape buyers and vendors.</h2>
          <p>Find the best projects. Get the best prices. Save time and money.</p>
          <button className="get-started-button"
            onClick={() => console.log("made it to get started")}
          >Get started</button>
        </div>
        <div className="landing-page-right">
          <img src={tree} alt="Image of a tree" className="tree-image" />
        </div>
      </section>
      <div className="landing-page-divider"></div>
      <div className="landing-page-roles-container">
        <div className="landing-page-roles-left">
          <div className="image-wrapper">
            <img src={home} alt="Symbol of a home" className="home-image" />
          </div>
          <h2>I'm a contractor</h2>
          <p>Post your projects and get the best prices on landscape materials</p>
          <button className="sign-up-button"
            onClick={(e) => {
              e.preventDefault();
              openModal("signup");
            }}
          >Sign up</button>

        </div>
        <div className="landing-page-roles-right">
          <div className="image-wrapper">
            <img src={plant} alt="Symbol of a home" className="home-image" />
          </div>
          <h2>I'm a vendor</h2>
          <p>Get details on all the latest project from your area and around the US.</p>
          <button className="sign-up-button"
            onClick={(e) => {
              e.preventDefault();
              openModal("signup");
            }}
          >Sign up</button>
        </div>



      </div>

      <div className="process-container">
        <h2>How does it work?</h2>
        <div className="process-sub-container">

          <div className="process-text-container">
            <div className="image-wrapper">
              <img src={clipboard} alt="Symbol of a clipboard" className="home-image" />
            </div>
            <h3>List new projects</h3>
            <p>Contractors can list new projects that require landscape materials to get access to vendors across the US.</p>
          </div>

          <div className="process-text-container">
            <div className="image-wrapper">
              <img src={search} alt="Symbol of a magnifying glass" className="home-image" />
            </div>
            <h3>Get the best prices</h3>
            <p>Contractors get the best prices on materials.  Vendors get find more projects and get more sales. </p>
          </div>

          <div className="process-text-container">
            <div className="image-wrapper">
              <img src={check} alt="Symbol of a check" className="home-image" />
            </div>
            <h3>Search for projects</h3>
            <p>Landscape vendors can search for projects in their area or across the US to find potential deals. </p>
          </div>
        </div>

      </div>

    </>
  )
}

export default LandingPage