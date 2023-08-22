import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormComponent() {
  const [contactData, setContactData] = useState({});
  
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await axios.get('https://shippingbackend-production.up.railway.app/api/shipmentdata', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setContactData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Contact Data</h1>
      <p>Customer Name: {fetchContactData.customer_name}</p>
      <p>Customer Email: {setContactData.customer_email}</p>
      {/* Display other fields here */}
    </div>
  );
}

export default FormComponent;
