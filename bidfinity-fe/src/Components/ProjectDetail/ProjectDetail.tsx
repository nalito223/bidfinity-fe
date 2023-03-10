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
        <button onClick={handlePrint} className="log-in-button">Print</button>
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
          {selectedProject?.location.address}
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
        {/* <p>
          <strong>Upload ID:</strong> {selectedProject?.upload_id}
        </p> */}
     

      <table className="form-table ">
        <thead className="form-thead">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Qty</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {selectedProject?.lineItems.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.itemName}</td>
              <td>{row.quantity}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default ProjectDetail;