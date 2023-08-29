import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";



async function ContactData(getContact, id) {
  await axios
    .get(
      "https://shippingbackend-production.up.railway.app/api/createhelper",
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((res) => {
      // console.log(res.data);
      getContact(res.data);
    });
}

function Testdispatcher() {
  const [link, setLink] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");



  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  // Vehicle Dropdown end here

  // Helper Dropdown login start here

  // const [helpers, setHelpers] = useState([]);
  const [selectedHelper1, setSelectedHelper1] = useState("");
  const [selectedHelper2, setSelectedHelper2] = useState("");

  useEffect(() => {
    async function fetchHelpers() {
      try {
        const response = await axios.get(
          "https://shippingbackend-production.up.railway.app/api/createhelper"
        );
        setHelpers(response.data);
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    }
    fetchHelpers();
  }, []);


 
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
          `https://shippingbackend-production.up.railway.app/api/helperdata/${selectedOptionValue}`
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

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shippingbackend-production.up.railway.app/api/helperdata/${selectedOptionValue}`
        );
        const selectedHelperData1 = response.data;
        setHelperData1(selectedHelperData1);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const [helpers, setHelpers] = useState([]);
  const [selectedHelper, setSelectedHelper] = useState("");
  // const [selectedHelper1, setSelectedHelper1] = useState("");

  useEffect(() => {
    fetchHelpers();
  }, []);

  const fetchHelpers = async () => {
    try {
      const response = await axios.get(
        "https://shippingbackend-production.up.railway.app/api/createhelper"
      );
      const helperData = response.data;
      setHelpers(helperData);
    } catch (error) {
      console.error("Error fetching Helpers:", error);
    }
  };

  const [contact, getContact] = useState([]);
  const [defaultcontact, DefaultgetContact] = useState([]);
  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);

 


    // Filter out selectedDispatcher's ID from dispatchers list to create options for selectedDispatcher1
    const availableHelpersForSelectedHelper1 = helpers.filter(
      helper => !selectedHelper.includes(helper.id)
      );
  


  return (
    <div>
      <div className="mb-4 w-50">
        <label className="form-label">
          Customer Helper 1
          <span className="stra-icon"></span>
        </label>

        <select
          value={selectedHelper}
          onChange={handleSelectChange4}
        >
          <option value="">Select Helper 1</option>
          {helpers.map((helper) => (
            <option
              key={helper.id}
              value={helper.id}
            >
              {helper.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 w-50">
        <label className="form-label">
          Helper Name
          <span className="stra-icon">*</span>
        </label>

        <select
          value={selectedHelper1}
          onChange={handleSelectChange5}
        >
          <option value="">Select Customer</option>
          {availableHelpersForSelectedHelper1.map((helper) => (
            <option
              key={helper.id}
              value={helper.id}
            >
              {helper.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Testdispatcher;
