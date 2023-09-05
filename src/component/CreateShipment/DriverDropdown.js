import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import react-modal
import { Link } from 'react-router-dom';
function DriverDropdown() {
  // State to store the fetched data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State to manage the selected item and modal visibility
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:5000/api/mergeapidata')
      .then((response) => {
        // Set the data in the state
        setData(response.data);
        setLoading(false); // Mark loading as false
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Mark loading as false in case of an error
      });
  }, []); // Empty dependency array ensures this effect runs only once


 
  return (
    <div className="container">
      <h1>Shipment Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customer_name}</td>
                <td>{item.customer_email}</td>
                <td>{item.customer_contact}</td>
                <td>
                  {/* Use Link to navigate to the DetailsPage */}
                  <Link to={`/testdispatcher/${item.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DriverDropdown;
