import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import Accordion from "react-bootstrap/Accordion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function ContactData(getContact, id) {
  await axios
    .get(
      "https://shippingbackend-production.up.railway.app/api/creatcustomer",
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((res) => {
      // console.log(res.data);
      getContact(res.data);
    });
}

function CreateShipment() {
  // Vehicle Dropdown login start here

  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shippingbackend-production.up.railway.app/api/vehicledetails"
      );
      setVehicleDetails(response.data); // Assuming the API returns an array of vehicle details
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  // Vehicle Dropdown end here

  // Helper Dropdown login start here

  const [helpers, setHelpers] = useState([]);
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

  // Helper Dropdown end here

  // Driver Dropdown start here

  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

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

  // Driver Dropdown end here

  const [selectshipdrop, setSelectshipdrop] = useState("");
  const [selectshipdrop1, setSelectshipdrop1] = useState("");
  const [adddescriptiondrop, setAdddescriptiondrop] = useState("");
  const [adddescriptiondrop1, setAdddescriptiondrop1] = useState("");

  const [vehicles, setVehicle] = useState([]);

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shippingbackend-production.up.railway.app/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData = response.data;
        setDispatcherData(selectedDispatcherData);
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
          `https://shippingbackend-production.up.railway.app/api/customerdata/${selectedOptionValue}`
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

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shippingbackend-production.up.railway.app/api/customerdata/${selectedOptionValue}`
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
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shippingbackend-production.up.railway.app/api/customerdata/${selectedOptionValue}`
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
          `https://shippingbackend-production.up.railway.app/api/vehicledata/${selectedVehicleValue}`
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
        "https://shippingbackend-production.up.railway.app/api/creatcustomer"
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
        "https://shippingbackend-production.up.railway.app/api/vehicledetails"
      );
      const vehicleData = response.data;
      setVehicle(vehicleData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contact, getContact] = useState([]);
  const [vehicle, getVehicle] = useState([]);
  const [defaultvehicle, DefaultgetVehicle] = useState([]);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [dispatchname, setDispatchName] = useState("");
  const [discontactnum, setDiscontactnum] = useState("");
  const [disaltnum, setDisaltnum] = useState("");
  const [dispatchemail, setDispatchemail] = useState("");
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);

  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [altphone, setAltphone] = useState("");
  const [altphone1, setAltphone1] = useState("");
  const [phone, setPhone] = useState("");
  const [phone1, setPhone1] = useState("");
  const [pickuplocation, setPickuplocation] = useState("");
  const [pickuplocation1, setPickuplocation1] = useState("");
  const [pickupdate, setPickupdate] = useState("");
  const [pickupdate1, setPickupdate1] = useState("");
  const [adddescription, setAdddescription] = useState("");
  const [adddescription1, setAdddescription1] = useState("");
  const [selectshipment, setSelectshipment] = useState("");
  const [selectshipment1, setSelectshipment1] = useState("");

  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
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
    // ... other fields
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://shippingbackend-production.up.railway.app/api/createshipments",
        {
          customer_name: dispatcherData.name,
          customer_contact: dispatcherData.phoneno,
          customer_email: dispatcherData.email,
          customer_alt_num: dispatcherData.altphone,
          pick_up_location: pickuplocation,
          pick_up_before: pickupdate,
          shipment_type: selectshipment,
          description: adddescription,
          customer_name2: dispatcherData1.name,
          customer_contact2: dispatcherData1.phoneno,
          drop_location: selectshipdrop,
          drop_description: adddescriptiondrop,
          vehicleplate: selectedVehicle,
          helper1: selectedHelper1,
          helper2: selectedHelper2,
          driver_id: selectedDriver,
          customer_name1:dispatcherData2.name,
          customer_contact1:dispatcherData2.phoneno,
          customer_email1:dispatcherData2.email,
          customer_alt_num1:dispatcherData2.altphone,
          pick_up_location1:pickuplocation1,
          pick_up_before1:pickupdate1,
          shipment_type1:selectshipment1,
          description1:adddescription1,
          customer_name21:dispatcherData3.name,
          customer_contact21:dispatcherData3.phoneno,
          drop_location1:selectshipdrop1,
          drop_description1:adddescriptiondrop1,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setModalIsOpen(false);

      // Show Toastify notification for success
      toast.success("Shipment successfully created!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

      console.log("Data successfully submitted:", response.data);
      console.log("customer id:", dispatcherData.id);
      console.log("customer id 2:", dispatcherData.id);
      // You can display a success message or perform any other actions here

      // Clear form fields after successful submission
      setDispatcherData(initialDispatcherData);
      setName("");
      setPhone("");
      setEmail("");
      setAltphone("");
      setPickuplocation("");
      setPickupdate("");
      setSelectshipment("");
      setAdddescription("");
      setDispatchName("");
      setDiscontactnum("");
      setSelectshipdrop("");
      setAdddescriptiondrop("");
      setSelectedVehicle("");
      setSelectedHelper1("");
      setSelectedHelper2("");
      setSelectedDriver("");
      setSelectedDispatcher("");
      setSelectedDispatcher1("");
      setSelectedDispatcher2("");
      setSelectedDispatcher3("");
      // phoneno("");
      dispatcherData("");
      phone("");
    } catch (error) {
      console.error("Error submitting data:", error);
      // You can display an error message or perform any other error handling here
    }
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} className="admin-section-map-modal modal_body modal-form-body">
        <div className="delivery-pickup-form-holder">
          <div className="card">
            <ModalBody className="close-icon">
              <AiOutlineClose
                className="main_AiOutlineClose"
                onClick={() => setModalIsOpen(false)}
                color="rgba(27, 38, 68, 1)"
              />
            </ModalBody>
            <div className="">
              <div className="admin-dashboard">
                <h2 className="py-3 text-center "> Shipment Creation</h2>
                
                <div className="admin-section-admin-01">
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home-tab-pane"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      tabindex="0"
                    >
                      <div className="row card-holder">
                        <form
                          className="form-control-holder"
                          onSubmit={handleSubmit}
                        >
                          <h3 className="text-center pt-2 pb-4">
                            Pickup Details
                          </h3>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Name
                                <span className="stra-icon"></span>
                              </label>

                              <select
                                value={selectedDispatcher}
                                onChange={handleSelectChange}
                                name="customer_name"
                                id="customer_name"
                              >
                                <option value="">Select Customer</option>
                                {dispatchers.map((dispatcher) => (
                                  <option
                                    key={dispatcher.id}
                                    value={dispatcher.id}
                                    name="customer_name"
                                    id="customer_name"
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
                                <span className="stra-icon">*</span>{" "}
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
                                <span className="stra-icon">*</span>
                              </label>
                              <input
                                name="pickuplocation"
                                value={pickuplocation}
                                onChange={(e) =>
                                  setPickuplocation(e.target.value)
                                }
                                id="pickuplocation"
                                placeholder="Enter Pickup Location"
                                type="text"
                              />
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Pick up Before<span className="stra-icon">*</span>{" "}
                              </label>
                              <input
                                name="pickupdate"
                                value={pickupdate}
                                onChange={(e) => setPickupdate(e.target.value)}
                                id="pickupdate"
                                placeholder="Drop Location"
                                type="datetime-local"
                              />

                              {/* {error && pickupbeforedate.length <= 0 ? (
                                <span
                                  className="valid-form"
                                  style={{ color: "red" }}
                                >
                                  Please Enter Pick Up location*
                                </span>
                              ) : (
                                ""
                              )} */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Please Select<span className="stra-icon">*</span>
                              </label>
                              <select
                                name="selectshipment"
                                id="selectshipment"
                                class=""
                                aria-label="Default select example"
                                onChange={(e) =>
                                  setSelectshipment(e.target.value)
                                }
                                value={selectshipment}
                              >
                                <option selected>Select Here</option>
                                <option value="Shipment">Shipment</option>
                                <option value="Force work">Force Work</option>
                              </select>
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Add Description<span className="stra-icon"></span>{" "}
                              </label>
                              <input
                                name="adddescription"
                                onChange={(e) =>
                                  setAdddescription(e.target.value)
                                }
                                value={adddescription}
                                id="adddescription"
                                placeholder="Description"
                                type="text"
                              />
                              {/* {error && adddescription.length <= 0 ? (
                                <span
                                  className="valid-form"
                                  style={{ color: "red" }}
                                >
                                  Enter Description*
                                </span>
                              ) : (
                                ""
                              )} */}
                            </div>
                          </div>
                          <h3 className="text-center pt-3 pb-4">
                            Delivery Details
                          </h3>

                          <div className="row">
                            <div className="mb-4 w-50">
                              <label
                                for="exampleInputEmail1"
                                className="form-label"
                              >
                                Customers Name<span className="stra-icon">*</span>
                              </label>

                              <select
                                value={selectedDispatcher1}
                                onChange={handleSelectChange1}
                                name="name"
                                id="name"
                              >
                                <option value="">Select Customer</option>
                                {dispatchers.map((dispatcher) => (
                                  <option
                                    key={dispatcher.id}
                                    value={dispatcher.id}
                                    name="name"
                                    id="name"
                                  >
                                    {dispatcher.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Contact Number
                                <span className="stra-icon">*</span>
                              </label>

                              <input
                                name="phone"
                                value={dispatcherData1.phoneno}
                                // value={phone}
                                onChange={(e) => setPhone1(e.target.value)}
                                // readOnly
                                id="phone"
                                placeholder="Enter Contact Number"
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Address (Drop Location)
                                <span className="stra-icon">*</span>
                              </label>
                              <input
                                type="text"
                                value={selectshipdrop}
                                onChange={(e) =>
                                  setSelectshipdrop(e.target.value)
                                }
                              />
                            </div>

                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Add Description
                                <span className="stra-icon">*</span>{" "}
                              </label>
                              <input
                                type="text"
                                value={adddescriptiondrop}
                                onChange={(e) =>
                                  setAdddescriptiondrop(e.target.value)
                                }
                              />

                              {/*                    
                      {error && adddesc.length <= 0 ? (
                        <span className="valid-form" style={{ color: "red" }}>
                          Please Enter drop location*
                        </span>
                      ) : (
                        ""
                      )}  */}
                            </div>
                          </div>

                          {/* accordian start here */}

                          <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                <div className="plus-icon Another-Location">
                                  {" "}
                                  <img src="/Assets/dash/plus.png" /> Add Another
                                  Location
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="row">
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Customer Name
                                      <span className="stra-icon"></span>
                                    </label>

                                    <select
                                      value={selectedDispatcher2}
                                      onChange={handleSelectChange2}
                                      name="customer_name"
                                      id="customer_name"
                                    >
                                      <option value="">Select Customer</option>
                                      {dispatchers.map((dispatcher) => (
                                        <option
                                          key={dispatcher.id}
                                          value={dispatcher.id}
                                          name="customer_name"
                                          id="customer_name"
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
                                      value={dispatcherData2.phoneno}
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
                                      value={dispatcherData2.email}
                                      id="email"
                                      // value={email}
                                      onChange={(e) => setEmail1(e.target.value)}
                                      placeholder="Enter Email Address"
                                      type="email"
                                    />
                                  </div>
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Customer Alternate Number
                                      <span className="stra-icon">*</span>{" "}
                                    </label>
                                    <input
                                      name="altphone"
                                      id="altphone"
                                      value={dispatcherData2.altphone}
                                      onChange={(e) =>
                                        setAltphone1(e.target.value)
                                      }
                                      placeholder="Enter Alternate Number"
                                      type="number"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Pick up Location
                                      <span className="stra-icon">*</span>
                                    </label>
                                    <input
                                      name="pickuplocation"
                                      value={pickuplocation1}
                                      onChange={(e) =>
                                        setPickuplocation1(e.target.value)
                                      }
                                      id="pickuplocation"
                                      placeholder="Enter Pickup Location"
                                      type="text"
                                    />
                                  </div>
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Pick up Before
                                      <span className="stra-icon">*</span>{" "}
                                    </label>
                                    <input
                                      name="pickupdate"
                                      value={pickupdate1}
                                      onChange={(e) =>
                                        setPickupdate1(e.target.value)
                                      }
                                      id="pickupdate"
                                      placeholder="Drop Location"
                                      type="datetime-local"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Please Select
                                      <span className="stra-icon">*</span>
                                    </label>
                                    <select
                                      name="selectshipment"
                                      id="selectshipment"
                                      class=""
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setSelectshipment1(e.target.value)
                                      }
                                      value={selectshipment1}
                                    >
                                      <option selected>Select Here</option>
                                      <option value="Shipment">Shipment</option>
                                      <option value="Force work">
                                        Force Work
                                      </option>
                                    </select>
                                  </div>
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Add Description
                                      <span className="stra-icon"></span>{" "}
                                    </label>
                                    <input
                                      name="adddescription"
                                      onChange={(e) =>
                                        setAdddescription1(e.target.value)
                                      }
                                      value={adddescription1}
                                      id="adddescription"
                                      placeholder="Description"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <h3 className="text-center pt-3 pb-4">
                                  Delivery Details
                                </h3>

                                <div className="row">
                                  <div className="mb-4 w-50">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Customers Name
                                      <span className="stra-icon">*</span>
                                    </label>

                                    <select
                                      value={selectedDispatcher3}
                                      onChange={handleSelectChange3}
                                      name="name"
                                      id="name"
                                    >
                                      <option value="">Select Customer</option>
                                      {dispatchers.map((dispatcher) => (
                                        <option
                                          key={dispatcher.id}
                                          value={dispatcher.id}
                                          name="name"
                                          id="name"
                                        >
                                          {dispatcher.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Customer Contact Number
                                      <span className="stra-icon">*</span>
                                    </label>

                                    <input
                                      name="phone"
                                      value={dispatcherData3.phoneno}
                                      // value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                      // readOnly
                                      id="phone"
                                      placeholder="Enter Contact Number"
                                      type="number"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Address (Drop Location)
                                      <span className="stra-icon">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={selectshipdrop1}
                                      onChange={(e) =>
                                        setSelectshipdrop1(e.target.value)
                                      }
                                    />
                                  </div>

                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Add Description
                                      <span className="stra-icon">*</span>{" "}
                                    </label>
                                    <input
                                      type="text"
                                      value={adddescriptiondrop1}
                                      onChange={(e) =>
                                        setAdddescriptiondrop1(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>

                          {/* accordian end here */}

                          <div className="row pt-5">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                vehicle plate<span className="stra-icon">*</span>
                              </label>

                              <select
                                id="vehicleDropdown"
                                value={selectedVehicle}
                                onChange={(e) =>
                                  setSelectedVehicle(e.target.value)
                                }
                              >
                                <option value="">Select a Vehicle</option>
                                {vehicleDetails.map((vehicle) => (
                                  <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.name} - {vehicle.model}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Helper 1<span className="stra-icon">*</span>{" "}
                              </label>
                              <select
                                value={selectedHelper1}
                                onChange={(e) =>
                                  setSelectedHelper1(e.target.value)
                                }
                              >
                                <option value="">Select a Helper</option>
                                {helpers.map((helper) => (
                                  <option key={helper.id} value={helper.name}>
                                    {helper.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Helper 2<span className="stra-icon">*</span>{" "}
                              </label>

                              <select
                                value={selectedHelper2}
                                onChange={(e) =>
                                  setSelectedHelper2(e.target.value)
                                }
                              >
                                <option value="">Select a Helper</option>
                                {helpers.map((helper) => (
                                  <option key={helper.id} value={helper.name}>
                                    {helper.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Assign driver<span className="stra-icon">*</span>
                              </label>

                              <select
                                value={selectedDriver}
                                onChange={(e) =>
                                  setSelectedDriver(e.target.value)
                                }
                              >
                                <option value="">Select Driver</option>
                                {drivers.map((driver) => (
                                  <option key={driver.id} value={driver.id}>
                                    {driver.full_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="submit-btn"
                            value="Send Message"
                          >
                            Create Task
                          </button>
                        </form>
                      </div>
                    </div>

                    <div
                      class="tab-pane fade"
                      id="profile-tab-pane"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                      tabindex="0"
                    >
                      <div></div>
                    </div>
                  </div>
                  <div className="form-map-section">
                      <div><img src="assets/dashboard/map-img.png" alt="" /></div>
                  </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="d-flex create-dispatcher-01 align-items-center">
        <div className="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Create New Shipment
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateShipment;
