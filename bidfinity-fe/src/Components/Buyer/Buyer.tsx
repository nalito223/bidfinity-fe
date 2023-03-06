import React, { useState, useContext } from "react";
import "./Buyer.css"
import Map from "../Map/Map"
import userEvent from "@testing-library/user-event";
import { AppContext } from '../App/AppContext';
import ProjectCards from "../ProjectCard/ProjectCards";

const Buyer: React.FC = () => {
  const { user } = useContext(AppContext);
  return (
    <div className="buyer-container">
      <div className="buyer-secondary-container">

        <div className="left-column">
          <center><h2>Search all projects</h2></center>
        </div>

        <div className="middle-column">
          <div className="map-container">
            <Map />
          </div>
          <center><h2>All projects by latest</h2></center>
          <div className="project-card-container">
            <ProjectCards />
          </div>
        </div>

        <div className="right-column">
          <center>
            <div className="avatar-wrapper">
              <img src={user?.image} alt="Avatar" className="avatar-image" />
            </div>
          </center>
          <center><h2>My profile</h2></center>

          {/* <p><i>
            This profile is not visible to the public.
          </i></p> */}


          <ul className="user-info">
            {/* <li>ID: 3</li> */}
            <li>Name: {user?.first_name + " "} {user?.last_name}</li>
            <li>Email: {user?.email}</li>
            {/* <li>Password: password789</li> */}
            <li>Phone Number: {user?.phone_number}</li>
            {/* <li>Account Type: buyer</li> */}
            {/* <li>Hosted Projects: [3]</li> */}
            {/* <li>Bookmarked Projects: [2]</li> */}
            <li>Country: {user?.country}</li>
            <li>Business Name: {user?.business_name}</li>
          </ul>



          <center><h2>My projects</h2></center>
          <center><button className="get-started-button">Create project</button></center>
          {/* <p>Your projects, including closed projects that are no longer public, appear here.</p> */}
        </div>

      </div>
    </div>
  );
};

export default Buyer;