import React, { useState } from 'react';
import axios from 'axios';
import '../../css/shipmentlist.css'; // Import your custom CSS for styling

function FormComponent() {
  const [name, setName] = useState('');
  const [vehicalplate, setVehicalPlate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const currentDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !vehicalplate) {
      setResponseMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://shippingbackend-production.up.railway.app/api/addvehical',
        {
          name,
          vehicalplate,
          DateAndTime: currentDate,
        }
      );

      setResponseMessage(response.data.message);

      // Clear the form
      setName('');
      setVehicalPlate('');
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Add Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="vehicalplate">Vehicle Plate:</label>
          <input
            type="text"
            id="vehicalplate"
            value={vehicalplate}
            onChange={(e) => setVehicalPlate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Vehicle'}
          </button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default FormComponent;
