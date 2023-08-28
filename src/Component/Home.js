import React, { useState } from "react";
import "../Component/Home.css"; 

const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "", });

  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value, });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClick) {
      const tempTableData = [...tableData]; 
      tempTableData[editIndex] = inputs; 
      setTableData(tempTableData);
      setEditClick(false);
      setInputs({ name: "",email: "", });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({ name: "",email: "", });
    }
  };
const handleDelete = (index) => {
    const filterData = tableData.filter((_, i) => i !== index);
    setTableData(filterData);
};

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1 className="text-center"> Student Login</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}/>
          </div>
          <button type="submit" className="submit-button">
            {editClick ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEdit(index)}
                    className="edit-button" > Edit </button>
                  <button onClick={() => handleDelete(index)}
                    className="delete-button"> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
