import React, { useContext, useRef } from 'react';
import { AppContext } from '../App/AppContext';
import './ProjectDetail.css';
import { useReactToPrint } from 'react-to-print';

function ProjectDetail() {
  const { selectedProject } = useContext(AppContext);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 2cm;
      }
    `
  });
  

  return (
    <>
      <center>
        <h2>Project Detail</h2>
        <button onClick={handlePrint}>Print</button>
      </center>
      <div className="project-detail-text" ref={componentRef}>
        <p>
          <strong>ID:</strong> {selectedProject?.id}
        </p>
        <p>
          <strong>Title:</strong> {selectedProject?.project_title}
        </p>
        <p>
          <strong>Created Date:</strong> {selectedProject?.created_date}
        </p>
        <p>
          <strong>Location:</strong>{' '}
          {`${selectedProject?.location.lat}, ${selectedProject?.location.lng}`}
        </p>
        <p>
          <strong>Summary:</strong> {selectedProject?.project_summary}
        </p>
        <p>
          <strong>Status:</strong> {selectedProject?.status}
        </p>
        <p>
          <strong>Contact Information:</strong>{' '}
          {selectedProject?.contact_information}
        </p>
        <p>
          <strong>Upload ID:</strong> {selectedProject?.upload_id}
        </p>
      </div>
    </>
  );
}

export default ProjectDetail;