import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon'; // Import the DateTime class from luxon

function FormComponent() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(''); // Initialize start date as empty
  const [endDate, setEndDate] = useState(''); // Initialize end date as empty
  const [searchTerm, setSearchTerm] = useState(''); // Initialize search term as empty

  useEffect(() => {
    axios.get('https://shipment-backend.onrender.com/api/creatcustomer')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with all data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle the date range filter
  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(data); // If either start or end date is empty, show all data
    } else {
      const filtered = data.filter(customer => {
        const formattedDate = DateTime.fromISO(customer.DateAndTime, { zone: 'Asia/Dubai' }); // Use Dubai time zone
        const start = DateTime.fromISO(startDate, { zone: 'Asia/Dubai' });
        const end = DateTime.fromISO(endDate, { zone: 'Asia/Dubai' });

        // Include dates within the selected date range, including the start and end dates
        return start.startOf('day') <= formattedDate.startOf('day') && formattedDate.startOf('day') <= end.startOf('day');
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, data]);

  // Function to handle the search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data); // If search term is empty, show all data
    } else {
      const filtered = data.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  return (
    <div>
      <h2>Customer Data</h2>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Phone No.</th>
            <th>Alternate Phone No.</th>
            <th>Address</th>
            <th>Date and Time (Dubai)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneno}</td>
              <td>{customer.altphone}</td>
              <td>{customer.address}</td>
              <td>
                {DateTime.fromISO(customer.DateAndTime, { zone: 'Asia/Dubai' }).toLocaleString(DateTime.DATETIME_MED)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormComponent;
