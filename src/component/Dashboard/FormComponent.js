import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function FormComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');
  const [selectedShipmentId, setSelectedShipmentId] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedHelper1, setSelectedHelper1] = useState('');
  const [selectedHelper2, setSelectedHelper2] = useState('');
  const [customerNames, setCustomerNames] = useState([]);
  const [driverIds, setDriverIds] = useState([]);
  const [helper1Options, setHelper1Options] = useState([]);
  const [helper2Options, setHelper2Options] = useState([]);
  const [customerContact, setCustomerContact] = useState(''); // Customer Contact
  const [customerAddress, setCustomerAddress] = useState(''); // Customer Address
  const [customerAltNum, setCustomerAltNum] = useState(''); // Customer Alternate Number
  const [pickUpLocation, setPickUpLocation] = useState(''); // Pick-up Location

  useEffect(() => {
    axios.get('https://shippingbackend-production.up.railway.app/api/mergeapidata')
      .then((response) => {
        setData(response.data);
        const names = response.data.map((item) => item.customer_name);
        setCustomerNames(names);

        const ids = response.data.map((item) => item.driver_id);
        const uniqueDriverIds = [...new Set(ids)];
        setDriverIds(uniqueDriverIds);

        const helper1Options = response.data.map((item) => item.helper1);
        const uniqueHelper1Options = [...new Set(helper1Options)];
        setHelper1Options(uniqueHelper1Options);

        const helper2Options = response.data.map((item) => item.helper2);
        const uniqueHelper2Options = [...new Set(helper2Options)];
        setHelper2Options(uniqueHelper2Options);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.created_at);
    const customerName = item.customer_name.toLowerCase();
    const searchTextLower = searchText.toLowerCase();

    const dateCondition = !startDate || !endDate || (itemDate >= new Date(startDate) && itemDate <= new Date(endDate));
    const searchCondition = !searchText || customerName.includes(searchTextLower);

    return dateCondition && searchCondition;
  });

  const openEditModal = (item) => {
    setEditItem(item);
    setIsEditModalOpen(true);
    setSelectedCustomerName(item.customer_name);
    setSelectedShipmentId(item.shipment_id);
    setSelectedVehicle(item.vehicleplate);
    setSelectedDriverId(item.driver_id);
    setSelectedHelper1(item.helper1);
    setSelectedHelper2(item.helper2);

    // Find the selected customer by name
    const selectedCustomer = data.find((customer) => customer.customer_name === item.customer_name);

    // Populate customer-related fields
    if (selectedCustomer) {
      setCustomerContact(selectedCustomer.customer_contact);
      setCustomerAltNum(selectedCustomer.customer_alt_num);
      setPickUpLocation(selectedCustomer.pick_up_location);
    }
  };

  const closeEditModal = () => {
    setEditItem(null);
    setIsEditModalOpen(false);
    setSelectedCustomerName('');
    setSelectedShipmentId('');
    setSelectedVehicle('');
    setSelectedDriverId('');
    setSelectedHelper1('');
    setSelectedHelper2('');
    setCustomerContact('');
    setCustomerAltNum('');
    setPickUpLocation('');
  };

  const saveEditedData = () => {
    // Implement your logic to save the edited data here
    // After saving, you can call closeEditModal() to close the edit modal.
  };

  return (
    <div>
      <h1>Listing Data</h1>
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
          placeholder="Search by Customer Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Shipment ID</th>
              <th>Customer Contact</th>
              <th>Customer Address</th>
              <th>Customer Alternate Number</th>
              <th>Date</th>
              <th>Edit</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customer_name}</td>
                <td>{item.shipment_id}</td>
                <td>{item.customer_contact}</td>
                <td>{item.pick_up_location}</td>
                <td>{item.customer_alt_num}</td>
                <td>{item.created_at}</td>
                <td>
                  <button onClick={() => openEditModal(item)}>Edit</button>
                </td>
                <td>
                  {/* <button onClick={() => openViewPopup(item)}>View</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Data Modal"
      >
        <h2>Edit Data</h2>
        <div>
          <label>Customer Name:</label>
          <select
            value={selectedCustomerName}
            onChange={(e) => setSelectedCustomerName(e.target.value)}
          >
            {customerNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Shipment ID:</label>
          <input
            type="text"
            value={selectedShipmentId}
            onChange={(e) => setSelectedShipmentId(e.target.value)}
          />
        </div>
        <div>
          <label>Vehicle Number:</label>
          <input
            type="text"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          />
        </div>
        <div>
          <label>Driver ID:</label>
          <select
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(e.target.value)}
          >
            {driverIds.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Helper 1:</label>
          <select
            value={selectedHelper1}
            onChange={(e) => setSelectedHelper1(e.target.value)}
          >
            {helper1Options.map((helper, index) => (
              <option key={index} value={helper}>
                {helper}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Helper 2:</label>
          <select
            value={selectedHelper2}
            onChange={(e) => setSelectedHelper2(e.target.value)}
          >
            {helper2Options.map((helper, index) => (
              <option key={index} value={helper}>
                {helper}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Customer Contact:</label>
          <input
            type="text"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
          />
        </div>
        <div>
          <label>Customer Address:</label>
          <input
            type="text"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Customer Alternate Number:</label>
          <input
            type="text"
            value={customerAltNum}
            onChange={(e) => setCustomerAltNum(e.target.value)}
          />
        </div>
        <div>
          <label>Pick-up Location:</label>
          <input
            type="text"
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
          />
        </div>
        <button onClick={saveEditedData}>Save</button>
        <button onClick={closeEditModal}>Cancel</button>
      </Modal>
    </div>
  );
}

export default FormComponent;
