import React, { useState } from 'react';
import axios from 'axios';

const Try = () => {
  const [id, setId] = useState(''); // State to store the ID value

  const handleUpdateAmount = async () => {
    try {
      // Replace 'http://localhost:5000' with your actual API URL
      await axios.put(`http://localhost:5000/api/update-total-amount/${id}`);
      console.log('Total amount updated to 0 successfully');
    } catch (error) {
      console.error('Error updating total amount:', error);
    }
  };

  return (
    <div>
      <h1>Update Total Amount to 0</h1>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleUpdateAmount}>Update Amount</button>
    </div>
  );
};

export default Try;
