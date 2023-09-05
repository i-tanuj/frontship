import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Testdispatcher() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://shippingbackend-production.up.railway.app/api/shipmentdata/${id}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container">
      <h1>Details Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>ID: {data.id}</p>
          <p>Name: {data.customer_name}</p>
          <p>Email: {data.customer_email}</p>
          <p>Contact: {data.customer_contact}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default Testdispatcher;
