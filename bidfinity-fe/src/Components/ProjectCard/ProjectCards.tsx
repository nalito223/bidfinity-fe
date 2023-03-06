import React, { useContext } from "react";
import { AppContext } from '../App/AppContext';
import "./ProjectCards.css"

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
  const { projectsData } = useContext(AppContext);
  const sortedProjectsData = projectsData.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());

  return (
    <div>
      {sortedProjectsData.map((project: Project) => (
        <div key={project.id} className="card">
          <h2>{project.project_title}</h2>
          <p>{project.project_summary}</p>
          <p>{project.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectCards;
