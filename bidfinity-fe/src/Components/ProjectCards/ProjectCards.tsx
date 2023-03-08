import React, { useContext, useState, useEffect } from "react";
import { AppContext } from '../App/AppContext';
import "./ProjectCards.css"
// @ts-ignore
import edit from "../../images/edit.png"
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";

interface Project {
  id: number;
  project_title: string;
  created_date: string;
  location: { lat: number; lng: number; address: string; };
  project_summary: string;
  status: string;
  contact_information: string;
  upload_id: number;
}


const ProjectCards = () => {
  const { projectsData, user, openModal, setSelectedProject } = useContext(AppContext);
  const sortedProjectsData = projectsData.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());

  // const [projectAddresses, setProjectAddresses] = useState<{ [projectId: number]: string }>({});

  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     const newProjectAddresses: { [projectId: number]: string } = {};
  //     for (const project of sortedProjectsData) {
  //       const address = await getAddress(project);
  //       newProjectAddresses[project.id] = address;
  //     }
  //     setProjectAddresses(newProjectAddresses);
  //   };
  //   fetchAddresses();
  // }, [sortedProjectsData]);

  // const getAddress = async (project: Project): Promise<string> => {
  //   const lat: number = project.location.lat
  //   const lng: number = project.location.lng
  //   const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
  //   const data = await response.json();
  //   return data.address.city;
  // };

  const allCards = () => {
    return (
      <div>
        {sortedProjectsData.map((project: Project) => (
          <div key={project.id} className="card">
            <div className="card-left">
              <h3>{project.project_title}</h3>
              <p>{project.project_summary}</p>
              <p>
                {
                project.location.address
                + " | " + project.created_date}</p>
              <p>
                <mark
                  style={{
                    backgroundColor:
                      project.status === "closed"
                        ? "RGB(204, 204, 204, 0.5)"
                        : "rgb(30, 164, 116, 0.2)",
                  }}
                >
                  {project.status}
                </mark>
              </p>
            </div>
            <div className="card-right">
              {user && user.hosted_projects.includes(project.id) ? (
                <img
                  src={edit}
                  alt="Edit icon"
                  className="edit-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProject(project);
                    openModal("edit project");
                  }}
                />
              ) : (
                <button
                  className="sign-up-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProject(project);
                    openModal("project detail");
                  }}
                >
                  View detail
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
    {allCards()}
    </>
  );
};

export default ProjectCards


