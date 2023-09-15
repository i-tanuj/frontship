import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FormComponent() {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://shippingbackend-production.up.railway.app/api/mergeapidata')
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
            {/* Add more table headers as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.shipment_id}</td>
              {/* Add more table cells for other data */}
              <td>
                <Link to={`/details/${customer.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormComponent;
