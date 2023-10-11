import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function FormComponent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedDriverName, setSelectedDriverName] = useState(''); // Add state for driver name
  const [dispatcherData, setDispatcherData] = useState({
    name: '',
    phoneno: '',
    email: '',
    altphone: '',
    address: '',
  });

  useEffect(() => {
    // Fetch driver data from the API and populate the state
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        "https://shippingbackend-production.up.railway.app/api/driver"
      );
      const driversData = response.data;
      setDrivers(driversData);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/newidshipment",
        {
          customer_name: dispatcherData.name,
          customer_contact: dispatcherData.phoneno,
          customer_email: "test@gmail.com",
          customer_alt_num: "545666666",
          pick_up_location: dispatcherData.address,
          // Other data fields...

          driver_id: selectedDriver, // Insert driver_id
          driver_name: selectedDriverName, // Insert driver_name

          // Other data fields...
        },
      );

      setModalIsOpen(false);
      toast.success("Shipment successfully created!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

      // Reset all the form fields after successful submission
      setDispatcherData({
        name: '',
        phoneno: '',
        email: '',
        altphone: '',
        address: '',
      });

      setSelectedDriver(''); // Reset selectedDriver
      setSelectedDriverName(''); // Reset selectedDriverName

      // Other reset code...

    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Shipment Form</h1>
      <form onSubmit={handleSubmit}>
        <h2>Dispatcher Data</h2>
        <div>
          <label htmlFor="dispatcher-name">Name:</label>
          <input
            type="text"
            id="dispatcher-name"
            value={dispatcherData.name}
            onChange={(e) => setDispatcherData({ ...dispatcherData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="dispatcher-phoneno">Phone Number:</label>
          <input
            type="text"
            id="dispatcher-phoneno"
            value={dispatcherData.phoneno}
            onChange={(e) => setDispatcherData({ ...dispatcherData, phoneno: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="driver-select">Select Driver:</label>
          <select
            id="driver-select"
            value={selectedDriver}
            onChange={(e) => {
              setSelectedDriver(e.target.value);
              const selectedDriverObject = drivers.find(driver => driver.id === e.target.value);
              setSelectedDriverName(selectedDriverObject ? selectedDriverObject.full_name : '');
            }}
            required
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.full_name}
              </option>
            ))}
          </select>
        </div>
        {/* Add more form fields as needed */}
        <button type="submit" disabled={isLoading}>Submit</button>
      </form>
    </div>
  );
}

export default FormComponent;
