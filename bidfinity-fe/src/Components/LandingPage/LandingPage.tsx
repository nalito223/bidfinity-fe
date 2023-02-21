import React from "react"
import "./LandingPage.css"
// @ts-ignore
import home from "../../images/home.png"
// @ts-ignore
import tree from "../../images/tree.jpg"
// @ts-ignore
import plant from "../../images/plant.png"

const LandingPage: React.FC = () => {

  return (
    <>
      <section className="landing-page-container">
        <div className="landing-page-left">
          <h2 className="landing-page-bold-text">Connect with landscape buyers and vendors.</h2>
          <p>Find the best projects. Get the best prices. Save time and money.</p>
          <button className="get-started-button">Get started</button>
        </div>
        <div className="landing-page-right">
          <img src={tree} alt="Image of a tree" className="tree-image" />
        </div>
      </section>
      <div className="landing-page-divider"></div>
      <div className="landing-page-roles-container">
        <div className="landing-page-roles-left">
          <img src={home} alt="Symbol of a home" className="home-image"/>
          <h2>I'm a contractor</h2>
          <p>Post your projects and get the best prices on landscape materials</p>
          <button className="sign-up-button">Sign up</button>
        </div>
        <div className="landing-page-roles-right">
        <img src={plant} alt="Symbol of a home" className="home-image"/>
          <h2>I'm a vendor</h2>
          <p>Get details on all the latest project from your area and around the US.</p>
          <button className="sign-up-button">Sign up</button>
        </div>
      </div>
      <div className="landing-page-explainer-container"></div>
    </>
  )
}

export default LandingPage