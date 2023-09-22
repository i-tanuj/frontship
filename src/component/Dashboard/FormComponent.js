import React, { useState, useEffect } from 'react';

const FormComponent = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showAllData, setShowAllData] = useState(true); // Use showAllData state to control display

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [startDate, endDate, data]);

  useEffect(() => {
    // Initially display all data
    setFilteredData(data);
    setShowAllData(true);
  }, [data]); // Trigger when data changes

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://shippingbackend-production.up.railway.app/api/createhelper'
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = () => {
    const filterStartDate = new Date(startDate).getTime(); // Parse start date
    const filterEndDate = new Date(endDate).getTime(); // Parse end date

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.DateAndTime).getTime(); // Parse DateAndTime

      // Check if the item date is within the selected range
      return itemDate >= filterStartDate && itemDate <= filterEndDate;
    });

    setFilteredData(filteredData);
    setShowAllData(false); // Set showAllData to false after filtering
  };

  return (
    <div>
      <h1>Date Filter Example</h1>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <ul>
        {showAllData ? (
          filteredData.map((item) => (
            <li key={item.id}>
              {item.DateAndTime} - {item.email}
            </li>
          ))
        ) : filteredData.length === 0 ? (
          <li>No data found for the selected date range.</li>
        ) : (
          filteredData.map((item) => (
            <li key={item.id}>
              {item.DateAndTime} - {item.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FormComponent;
