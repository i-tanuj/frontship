import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import Modal from 'react-modal';
import { toast, ToastContainer } from "react-toastify";


async function ContactData(getContact, id) {
  await axios
    .get(
      "http://localhost:5000/api/creatcustomer",
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((res) => {
      getContact(res.data);
    });
}

function FormComponent() {

  const [link, setLink] = useState("");
  const [link1, setLink1] = useState("");
  const [latitude, setLatitude] = useState("");
  const [latitude1, setLatitude1] = useState("");
  const [longitude, setLongitude] = useState("");
  const [longitude1, setLongitude1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/vehicledetails"
      );
      setVehicleDetails(response.data); // Assuming the API returns an array of vehicle details
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const [helpers, setHelpers] = useState([]);
  const [selectedHelper1, setSelectedHelper1] = useState("");
  const [selectedHelper2, setSelectedHelper2] = useState("");

  useEffect(() => {
    async function fetchHelpers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/createhelper"
        );
        setHelpers(response.data);
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    }
    fetchHelpers();
  }, []);



  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/driver"
      );
      const driversData = response.data;
      setDrivers(driversData);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  // Driver Dropdown end here

  const [selectshipdrop, setSelectshipdrop] = useState("");
  const [selectshipdrop1, setSelectshipdrop1] = useState("");
  const [adddescriptiondrop, setAdddescriptiondrop] = useState("");
  const [adddescriptiondrop1, setAdddescriptiondrop1] = useState("");

  const [vehicles, setVehicle] = useState([]);

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log("tanu "+selectedOptionValue);
    
    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customerdata/${selectedOptionValue}`
          );
          const selectedDispatcherData = response.data;
          setDispatcherData(selectedDispatcherData);
          console.log("tanu "+selectedOptionValue.name);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange1 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher1(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData1 = response.data;
        setDispatcherData1(selectedDispatcherData1);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange2 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher2(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData2 = response.data;
        setDispatcherData2(selectedDispatcherData2);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange3 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher3(selectedOptionValue);
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData3 = response.data;
        setDispatcherData3(selectedDispatcherData3);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const handleSelectVehicle = async (event) => {
    const selectedVehicleValue = event.target.value;
    setSelectedVehicle(selectedVehicleValue);
    console.log(selectedVehicleValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedVehicleValue) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/vehicledata/${selectedVehicleValue}`
        );
        const selectedVehicleData = response.data;
        setVehicleData(selectedVehicleData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const [dispatchers, setDispatchers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [selectedDispatcher1, setSelectedDispatcher1] = useState("");
  const [selectedDispatcher2, setSelectedDispatcher2] = useState("");
  const [selectedDispatcher3, setSelectedDispatcher3] = useState("");

  useEffect(() => {
    fetchDispatchers();
  }, []);

  const fetchDispatchers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/creatcustomer"
      );
      const dispatcherData = response.data;
      setDispatchers(dispatcherData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/vehicledetails"
      );
      const vehicleData = response.data;
      setVehicle(vehicleData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contact, getContact] = useState([]);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [dispatchname, setDispatchName] = useState("");
  const [discontactnum, setDiscontactnum] = useState("");

  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [altphone, setAltphone] = useState("");
  const [altphone1, setAltphone1] = useState("");
  const [phone, setPhone] = useState("");
  const [phone1, setPhone1] = useState("");
  const [pickuplocation, setPickuplocation] = useState("");
  const [pickuplocation1, setPickuplocation1] = useState("");
  const [pickupdate, setPickupdate] = useState("");
  const [dropdate, setDropdate] = useState("");
  const [dropdate1, setDropdate1] = useState("");
  const [pickupdate1, setPickupdate1] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [maplink, setmaplink] = useState("");


  const [dispatcherData1, setDispatcherData1] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [dispatcherData2, setDispatcherData2] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [dispatcherData3, setDispatcherData3] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [vehicleData, setVehicleData] = useState({
    id: "",
    name: "",
    email: "",
    vehicalplate: "",
  });

  const initialDispatcherData = {
    phoneno: "",
    email: "",
    altphone: "",
    phone: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
console.log()
    try {
      const response = await axios.post(
        "http://localhost:5000/api/newidshipment",
        {
          customer_name: dispatcherData.name,
          customer_contact: dispatcherData.phoneno,
          customer_email: dispatcherData.email,
          customer_alt_num: dispatcherData.altphone,
          pick_up_location: dispatcherData.address,
          pick_up_before: pickupdate,
          drop_date: dropdate,
          drop_date1: dropdate1,
          latitude: latitude,
          longitude: longitude,
          latitude1: latitude1,
          longitude1: longitude1,
          description: description,
          customer_name2: dispatcherData1.name,
          customer_contact2: dispatcherData1.phoneno,
          drop_location: dispatcherData1.address,
          drop_description: adddescriptiondrop,
          vehicleplate: selectedVehicle,
          helper1: helperData.name,
          helper2: helperData1.name,
          driver_id: selectedDriver.id,
          driver_name : selectedDriver.full_name,
          customer_name1: dispatcherData2.name,
          customer_contact1: dispatcherData2.phoneno,
          customer_email1: dispatcherData2.email,
          customer_alt_num1: dispatcherData2.altphone,
          pick_up_location1: dispatcherData2.address,
          pick_up_before1: pickupdate1,
          description1: description1,
          customer_name21: dispatcherData3.name,
          customer_contact21: dispatcherData3.phoneno,
          drop_location1: dispatcherData3.address,
          drop_description1: adddescriptiondrop1,
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
      setDispatcherData(initialDispatcherData);
      setName("");
      setPhone("");
      setPhone1("");
      setEmail("");
      setmaplink("");
      setAltphone("");
      setPickuplocation("");
      setPickupdate("");
      setDescription("");
      setDescription1("");
      setDispatchName("");
      setDiscontactnum("");
      setSelectshipdrop("");
      setAdddescriptiondrop("");
      setSelectedVehicle("");
      setSelectedHelper1("");
      selectedHelper1("");
      setSelectedHelper2("");
      setSelectedDriver("");
      setSelectedDispatcher("");
      setSelectedDispatcher1("");
      setSelectedDispatcher2("");
      setSelectedDispatcher3("");
      setDropdate("");
      setDropdate1("");
      // phoneno("");
      dispatcherData("");
      phone("");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkChange = (event) => {
    const newLink = event.target.value;
    setLink(newLink);

    // Use regular expression to extract latitude and longitude
    const match = newLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      setLatitude(match[1]);
      setLongitude(match[2]);
    } else {
      setLatitude("");
      setLongitude("");
    }
  };

  const handleLinkChange1 = (event) => {
    const newLink1 = event.target.value;
    setLink1(newLink1);

    // Use regular expression to extract latitude and longitude
    const matchs = newLink1.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (matchs) {
      setLatitude1(matchs[1]);
      setLongitude1(matchs[2]);
    } else {
      setLatitude1("");
      setLongitude1("");
    }
  };

  const availableDispatchersForSelectedDispatcher1 = dispatchers.filter(
    (dispatcher) => !selectedDispatcher.includes(dispatcher.id)
  );
  const availableDispatchersForSelectedDispatcher2 = dispatchers.filter(
    (dispatcher) =>
      !selectedDispatcher.includes(dispatcher.id) &&
      !selectedDispatcher1.includes(dispatcher.id)
  );
  const availableDispatchersForSelectedDispatcher3 = dispatchers.filter(
    (dispatcher) =>
      !selectedDispatcher.includes(dispatcher.id) &&
      !selectedDispatcher1.includes(dispatcher.id) &&
      !selectedDispatcher2.includes(dispatcher.id)
  );
  const [selectedHelper, setSelectedHelper] = useState("");
  const availableHelpersForSelectedHelper1 = helpers.filter(
    (helper) => !selectedHelper.includes(helper.id)
  );

  const [helperData, setHelperData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [helperData1, setHelperData1] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

  const handleSelectChange4 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedHelper(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/helperdata/${selectedOptionValue}`
        );
        const selectedHelperData = response.data;
        setHelperData(selectedHelperData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange5 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedHelper1(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/helperdata/${selectedOptionValue}`
        );
        const selectedHelperData1 = response.data;
        setHelperData1(selectedHelperData1);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(null); // Store the data being edited
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/mergeapidata')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(customer => {
        const formattedDate = DateTime.fromISO(customer.created_at, { zone: 'Asia/Dubai' });
        const start = DateTime.fromISO(startDate, { zone: 'Asia/Dubai' });
        const end = DateTime.fromISO(endDate, { zone: 'Asia/Dubai' });
        return start.startOf('day') <= formattedDate.startOf('day') && formattedDate.startOf('day') <= end.startOf('day');
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, data]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(customer =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const handleEditClick = (customer) => {
    setEditData({ ...customer });
    setIsEditing(true);
    setModalIsOpen(true);

    // Set the selected value for the "Customer Name" dropdown
    setSelectedDispatcher(customer.customer_name);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setEditData(null);
    setModalIsOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
    setModalIsOpen(false);
  };

  

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
            <th>pickup date</th>
            <th>Custome Name 2</th>
            <th>Phone No. 2</th>
            <th>Drop Location</th>
            <th>Drop Date</th>
            <th>Helper1</th>
            <th>Helper2</th>
            <th>Driver Name</th>
            <th>Date and Time (Dubai)</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.customer_email}</td>
              <td>{customer.customer_contact}</td>
              <td>{customer.customer_alt_num}</td>
              <td>{customer.pick_up_location}</td>
              <td>{customer.pick_up_before}</td>
              <td>{customer.customer_name2}</td>
              <td>{customer.customer_contact2}</td>
              <td>{customer.drop_location}</td>
              <td>{customer.drop_date}</td>
              <td>{customer.helper1}</td>
              <td>{customer.helper2}</td>
              <td>{customer.driver_name}</td>
              <td>
                {DateTime.fromISO(customer.created_at, { zone: 'Asia/Dubai' }).toLocaleString(DateTime.DATETIME_MED)}
              </td>
              <td>
                <button onClick={() => handleEditClick(customer)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Customer Data */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h3>Edit Customer Data</h3>
        {isEditing && editData && (
          <form>
            <label>Name:</label>
            <input
              type="text"
              value={editData.customer_name}
              onChange={(e) => setEditData({ ...editData, customer_name: e.target.value })}
            />
            <label>Email:</label>
            <input
              type="text"
              value={editData.customer_email}
              onChange={(e) => setEditData({ ...editData, customer_email: e.target.value })}
            />
            <label>Number:</label>
            <input
              type="text"
              value={editData.customer_contact}
              onChange={(e) => setEditData({ ...editData, customer_name: e.target.value })}
            />

<div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Name
                                <span className="stra-icon"></span>
                              </label>

                              <select
                value={selectedDispatcher} // Autofill the dropdown
                onChange={handleSelectChange}
                name="customer_name"
                id="customer_name"
              >
                <option value="">Select Customer</option>
                {dispatchers.map((dispatcher) => (
                  <option
                    key={dispatcher.id}
                    value={dispatcher.name}
                  >
                    {dispatcher.name}
                  </option>
                ))}
              </select>
                            </div>

                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Contact Number
                                <span className="stra-icon"></span>
                              </label>
                              <input
                                name="phoneno"
                                value={dispatcherData.phoneno}
                                onChange={(e) => setPhone(e.target.value)}
                                // readOnly
                                id="phoneno"
                                placeholder="Enter Contact Number"
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Email Address
                                <span className="stra-icon"></span>
                              </label>
                              <input
                                name="email"
                                value={dispatcherData.email}
                                id="email"
                                // value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email Address"
                                type="email"
                              />
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Alternate Number
                                <span className="stra-icon"></span>{" "}
                              </label>
                              <input
                                name="altphone"
                                id="altphone"
                                value={dispatcherData.altphone}
                                onChange={(e) => setAltphone(e.target.value)}
                                placeholder="Enter Alternate Number"
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Pick up Location
                                <span className="stra-icon"></span>
                              </label>
                              <input
                                name="pickuplocation"
                                // value={pickuplocation}
                                value={dispatcherData.address}
                                onChange={(e) =>
                                  setPickuplocation(e.target.value)
                                }
                                id="pickuplocation"
                                placeholder="Enter Pickup Location"
                                type="text"
                              />
                            </div>
                            </div>

            {/* Add similar input fields for other properties like email, phoneno, etc. */}
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default FormComponent;
