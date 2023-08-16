import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropdownExample = () => {
  const [driverDetails, setDriverDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://shippingbackend-production.up.railway.app/api/driverdetails');
      setDriverDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <select>
        <option value="">Select Driver</option>
        {driverDetails.map(driver => (
          <option key={driver.id} value={driver.id}>
            {driver.full_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownExample;
