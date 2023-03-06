import React, { useContext } from "react";
import { AppContext } from '../App/AppContext';
import "./ProjectCards.css"
// @ts-ignore
import edit from "../../images/edit.png"

interface Project {
  id: number;
  project_title: string;
  created_date: string;
  location: string;
  project_summary: string;
  status: string;
  contact_information: string;
  upload_id: number;
}

const ProjectCards = () => {
  const { projectsData, user } = useContext(AppContext);
  const sortedProjectsData = projectsData.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());

  return (
    <div>
      {sortedProjectsData.map((project: Project) => (
        <div key={project.id} className="card">

          <div className="card-left">
            <h3>{project.project_title} </h3>
            <p>{project.project_summary}</p>
            <p>{project.location + " | " + project.created_date} </p>
            <p><mark style={{ backgroundColor: project.status === "completed" ? "RGB(204, 204, 204, 0.5)" : "rgb(30, 164, 116, 0.2)" }}>{project.status}</mark></p>
          </div>

          <div className="card-right">
            {user?.hosted_projects.includes(project.id) &&
              <img src={edit} alt="Edit icon" className="edit-icon" />}
            <button className="sign-up-button">View detail</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCards;
