import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverDropdown = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    // Fetch the data from the API
    axios.get('https://shippingbackend-production.up.railway.app/api/driver')
      .then(response => {
        setDrivers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };

  return (
    <div>
      <h2>Driver Dropdown</h2>
      <select onChange={handleDriverChange} value={selectedDriver}>
        <option value="">Select a driver</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.full_name}>
            {driver.full_name}
          </option>
        ))}
      </select>
      {selectedDriver && (
        <div>
          {/* <h3>Selected Driver:</h3> */}
          <p>{selectedDriver}</p>
        </div>
      )}
          <p>{selectedDriver}</p>
    </div>
  );
};

export default DriverDropdown;
