import React, { useState, useEffect } from "react";
import axios from "axios";

function Testdispatcher() {
  const [dispatchers, setDispatchers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch dispatcher data from the server and populate the state
    fetchDispatchers();
  }, []);

  const fetchDispatchers = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/dispatcher"
      );
      const dispatcherData = response.data;
      setDispatchers(dispatcherData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/fetchData/${selectedOptionValue}`
        );
        const selectedDispatcherData = response.data;
        setDispatcherData(selectedDispatcherData);
    } catch (error) {
        //   console.log(selectedDispatcherData);
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  return (
    <div>
      <h1>Dispatcher Data</h1>
      <select value={selectedDispatcher} onChange={handleSelectChange}>
        <option value="">Select Dispatcher</option>
        {dispatchers.map((dispatcher) => (
          <option key={dispatcher.id} value={dispatcher.id}>
            {dispatcher.name}
          </option>
        ))}
      </select>
      <div>
        <label>ID:</label>
        <input type="text" value={dispatcherData.id} readOnly />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" value={dispatcherData.name} readOnly />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={dispatcherData.email} readOnly />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={dispatcherData.phone} readOnly />
      </div>
    </div>
  );
}

export default Testdispatcher;
