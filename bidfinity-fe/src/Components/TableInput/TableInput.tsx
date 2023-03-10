import React, { useContext, useState } from 'react';
import "./TableInput.css";
import { AppContext } from '../App/AppContext';

interface TableRow {
  itemName: string;
  quantity: string;
  description: string;
}

const TableInput: React.FC = () => {
  const { selectedProject } = useContext(AppContext);
  const [rows, setRows] = useState<TableRow[]>(selectedProject ? selectedProject.lineItems : []);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  const handleAddRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRows((prevRows) => [...prevRows, { itemName, quantity: quantity.toString(), description }]);;
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div>
      <div className="width">
        <label htmlFor="itemName" className="form-label">Name of Line Item:</label>
        <input className="form-input" type="text" id="itemName" name="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <br></br>
        <label htmlFor="quantity" className="form-label margin-top">Quantity:</label>
        <input className="form-input" type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
        <br></br>
        <label className="form-label margin-top" htmlFor="description">Description:</label>
        <textarea className="form-textarea" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br></br>
        <button onClick={handleAddRow} className="margin-top log-in-button">Add Row</button>
      </div>

      <table className="form-table ">
        <thead className="form-thead">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Qty</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.itemName}</td>
              <td>{row.quantity}</td>
              <td>{row.description}</td>
              <td>
                <button type="button" onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableInput;
