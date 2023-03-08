import React, { useContext } from 'react';
import { AppContext } from '../App/AppContext'; 
import "./ProjectDetail.css"

function ProjectDetail() {
  const { selectedProject } = useContext(AppContext);

  return (
    <>
      <center><h2>Project Detail</h2></center>
     <div className="project-detail-text">
      <p><strong>ID:</strong> {selectedProject?.id}</p>
      <p><strong>Title:</strong> {selectedProject?.project_title}</p>
      <p><strong>Created Date:</strong> {selectedProject?.created_date}</p>
      <p><strong>Location:</strong> {`${selectedProject?.location.lat}, ${selectedProject?.location.lng}`}</p>
      <p><strong>Summary:</strong> {selectedProject?.project_summary}</p>
      <p><strong>Status:</strong> {selectedProject?.status}</p>
      <p><strong>Contact Information:</strong> {selectedProject?.contact_information}</p>
      <p><strong>Upload ID:</strong> {selectedProject?.upload_id}</p>
      </div>
    </>

  );
}

export default ProjectDetail;
