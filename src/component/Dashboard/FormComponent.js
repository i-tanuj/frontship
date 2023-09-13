import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerData.css'; // You can create a CSS file for styling

function FormComponent() {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:5000/api/mergeapidata')
      .then((response) => {
        setCustomerData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="customer-data">
      <h2>Customer Details</h2>
      <table>
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Vehicle Plate</th>
            <th>Helper 1</th>
            <th>Helper 2</th>
            <th>Driver ID</th>
            <th>Driver Name</th>
            <th>Status</th>
            <th>Pick-up Status</th>
            <th>Customer Name</th>
            <th>Customer Contact</th>
            <th>Customer Email</th>
            <th>Customer Alt Number</th>
            <th>Pick-up Location</th>
            <th>Pick-up Before</th>
            <th>Drop Date</th>
            <th>Shipment Type</th>
            <th>Customer Name 2</th>
            <th>Customer Contact 2</th>
            <th>Drop Location</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.shipment_id}</td>
              <td>{customer.vehicleplate}</td>
              <td>{customer.helper1}</td>
              <td>{customer.helper2}</td>
              <td>{customer.driver_id}</td>
              <td>{customer.driver_name}</td>
              <td>{customer.status}</td>
              <td>{customer.pick_up_status}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.customer_contact}</td>
              <td>{customer.customer_email}</td>
              <td>{customer.customer_alt_num}</td>
              <td>{customer.pick_up_location}</td>
              <td>{customer.pick_up_before}</td>
              <td>{customer.drop_date}</td>
              <td>{customer.shipment_type}</td>
              <td>{customer.customer_name2}</td>
              <td>{customer.customer_contact2}</td>
              <td>{customer.drop_location}</td>
              {/* Add more table cells for other data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormComponent;
