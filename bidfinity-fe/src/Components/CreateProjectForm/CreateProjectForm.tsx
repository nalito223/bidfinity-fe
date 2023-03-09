import React, { useState, useContext } from 'react';
import { AppContext } from '../App/AppContext';
import TableInput from '../TableInput/TableInput';

interface TableRow {
  itemName: string;
  quantity: number;
  description: string;
}
// onSuccess

const CreateProjectForm: React.FC = () => {
  const { } = useContext(AppContext);

  const [projectData, setProjectData] = useState({
    id: 0,
    project_title: '',
    created_date: '',
    location: { lat: 0, lng: 0, address: '' },
    project_summary: '',
    status: '',
    contact_information: '',
    upload_id: 0,
    viewPermission: []
  });

  const [tableData, setTableData] = useState<TableRow[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // addProject(projectData);
    // onSuccess();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleTablePrint = (data: TableRow[]) => {
    setTableData(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="width">
        <h2>Create Project</h2>

        <label htmlFor="project_title" className="form-label">Project Title:</label>
        <input
          className="form-input"
          type="text"
          id="project_title"
          name="project_title"
          value={projectData.project_title}
          onChange={handleChange}
          required
        />
        <br></br>
        <label htmlFor="created_date" className="form-label">Created Date:</label>
        <input
          className="form-input"
          type="date"
          id="created_date"
          name="created_date"
          value={projectData.created_date}
          onChange={handleChange}
          required
        />
        <br></br>
        <label htmlFor="location" className="form-label">Location:</label>
        <input
          className="form-input"
          type="text"
          id="location"
          name="location"
          value={projectData.location.address}
          onChange={(event) =>
            setProjectData({
              ...projectData,
              location: { ...projectData.location, address: event.target.value },
            })
          }
          required
        />
        <br></br>
        <label htmlFor="project_summary" className="form-label"> Project Summary:</label>
        <textarea
          className="form-textarea"
          id="project_summary"
          name="project_summary"
          value={projectData.project_summary}
          onChange={handleChange}
          required
        />
        <br></br>
        <label htmlFor="status" className="form-label">Status:</label>
        <select id="status" name="status" value={projectData.status} onChange={handleChange} required className="form-select">
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <br></br>
        <label htmlFor="contact_information" className="form-label">Contact Information:</label>
        <input
          className="form-input"
          type="email"
          id="contact_information"
          name="contact_information"
          value={projectData.contact_information}
          onChange={handleChange}
          required
        />
        <br></br>
        <h3>Add line items</h3>
        <TableInput onPrint={handleTablePrint} />
        <button type="submit" className="log-in-button">Create Project</button>

      </form>

      {tableData.length > 0 && (
        <div>
          <h2>Table Data:</h2>
          <table>
            <thead>
              <tr>
                <th>Name of Line Item</th>
                <th>Quantity</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.itemName}</td>
                  <td>{row.quantity}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  </div>
  )
}

export default CreateProjectForm