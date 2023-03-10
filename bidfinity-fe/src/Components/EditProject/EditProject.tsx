import React, { useState, useContext } from 'react';
import { AppContext } from '../App/AppContext';
import TableInput from '../TableInput/TableInput';

const EditProject: React.FC = () => {
  const { selectedProject, setSelectedProject } = useContext(AppContext);

  const [title, setTitle] = useState(selectedProject?.project_title);
  const [summary, setSummary] = useState(selectedProject?.project_summary);
  const [location, setLocation] = useState(selectedProject?.location);
  const [contact, setContact] = useState(selectedProject?.contact_information);
  const [status, setStatus] = useState(selectedProject?.status);
  const [selectedUploadId, setSelectedUploadId] = useState(selectedProject?.upload_id);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSummary(e.target.value);
  // const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => setContact(e.target.value);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value);
  const handleUploadChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedUploadId(parseInt(e.target.value));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSave({
    //   ...project,
    //   project_title: title,
    //   project_summary: summary,
    //   location: location,
    //   contact_information: contact,
    //   status: status,
    //   upload_id: selectedUploadId
    // });
    setSelectedProject(null); // reset selected project in context
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
      <center><h2>Edit project</h2></center>
      <label className="form-label">
        Project Title:
        <input type="text" value={title} onChange={handleTitleChange} className="form-input"/>
      </label>
      <br />
      <label className="form-label">
        Project Summary:
        <textarea value={summary} onChange={handleSummaryChange} className="form-textarea" />
      </label>
      <br />
      <label className="form-label">
        Location:
        {/* <input type="text" value={location} onChange={handleLocationChange} className="form-input"/> */}
      </label>
      <br />
      <label className="form-label">
        Contact Information:
        <input type="text" value={contact} onChange={handleContactChange} className="form-input" />
      </label>
      <br />
      <label className="form-label">
        Status:
        <select value={status} onChange={handleStatusChange} className="form-select">
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </label>
      <br />
      {/* <label className="form-label">
        Upload:
        <select value={selectedUploadId} onChange={handleUploadChange}>
          {uploads.map(upload => (
            <option key={upload.id} value={upload.id}>
              {upload.filename}
            </option>
          ))}
        </select>
      </label>
      <br /> */}
    
      <TableInput/>
      <button type="submit" className="log-in-button">Save</button>
    </form>
  );
};

export default EditProject;