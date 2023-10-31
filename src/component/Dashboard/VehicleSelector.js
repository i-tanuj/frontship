import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleSelector = () => {
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [helpers, setHelpers] = useState([]);
  const [selectedHelper1, setSelectedHelper1] = useState('');
  const [selectedHelper2, setSelectedHelper2] = useState('');
  const [filteredHelpers1, setFilteredHelpers1] = useState([]);
  const [filteredHelpers2, setFilteredHelpers2] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const vehicleResponse = await axios.get("https://shipment-backend.onrender.com/api/vehicledetails");
        setVehicleDetails(vehicleResponse.data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }

      try {
        const helperResponse = await axios.get("https://shipment-backend.onrender.com/api/createhelper");
        setHelpers(helperResponse.data);
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    }
    fetchData();
  }, []);

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleHelper1Change = (event) => {
    setSelectedHelper1(event.target.value);
  };

  const handleHelper2Change = (event) => {
    setSelectedHelper2(event.target.value);
  };

  useEffect(() => {
    setFilteredHelpers1(helpers.filter((helper) => helper.name !== selectedHelper2));
  }, [selectedHelper2, helpers]);

  useEffect(() => {
    setFilteredHelpers2(helpers.filter((helper) => helper.name !== selectedHelper1));
  }, [selectedHelper1, helpers]);

  return (
    <div>
      <div>
        <label>Select a Vehicle:</label>
        <select value={selectedVehicle} onChange={handleVehicleChange}>
          <option value="">Select a vehicle</option>
          {vehicleDetails.map((vehicle, index) => (
            <option key={index} value={vehicle.name}>
              {vehicle.name}
            </option>
          ))}
        </select>
        {selectedVehicle && <p>Selected Vehicle: {selectedVehicle}</p>}
      </div>
      <div>
        <label>Select Helper 1:</label>
        <select value={selectedHelper1} onChange={handleHelper1Change}>
          <option value="">Select a helper</option>
          {filteredHelpers1.map((helper, index) => (
            <option key={index} value={helper.name}>
              {helper.name}
            </option>
          ))}
        </select>
        {selectedHelper1 && <p>Selected Helper 1: {selectedHelper1}</p>}
      </div>
      <div>
        <label>Select Helper 2:</label>
        <select value={selectedHelper2} onChange={handleHelper2Change}>
          <option value="">Select a helper</option>
          {filteredHelpers2.map((helper, index) => (
            <option key={index} value={helper.name}>
              {helper.name}
            </option>
          ))}
        </select>
        {selectedHelper2 && <p>Selected Helper 2: {selectedHelper2}</p>}
      </div>
    </div>
  );
};

export default VehicleSelector;
