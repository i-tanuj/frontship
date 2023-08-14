import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import DeliveryCreation from "./DeliveryCreation";

async function ContactData(getContact, id) {
  await axios
    .get("https://shippingbackend-production.up.railway.app/api/creatcustomer", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      // console.log(res.data);
      getContact(res.data);
    });
}
async function VehicleData(getVehicle, id) {
  await axios
    .get("https://shippingbackend-production.up.railway.app/api/driver", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      // console.log(res.data);
      getVehicle(res.data);
    });
}


function CreateShipment() {

  const [customername, setCustomername] = useState('');
  const [customernumber, setCustomernumber] = useState('');
  const [selectshipdrop, setSelectshipdrop] = useState('');
  const [dropdate, setDropdate] = useState('');
  const [adddescriptiondrop, setAdddescriptiondrop] = useState('');
  const [vehicleplate, setVehicleplate] = useState('');
  const [helper1, setHelper1] = useState('');
  const [helper2, setHelper2] = useState('');
  const [assigndriver, setAssigndriver] = useState('');

  // const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicle] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");


  const [vehicleData, setVehicleData] = useState({
    id: "",
    name: "",
    vehicalplate: "",
  });


  
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
  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
  });
  
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
        "https://shippingbackend-production.up.railway.app/api/creatcustomer"
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
  
  useEffect(() => {
    VehicleData(getVehicle, DefaultgetVehicle);
  }, []);



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [altphone, setAltphone] = useState('');
  const [phone, setPhone] = useState('');
  const [pickuplocation, setPickuplocation] = useState('');
  const [pickupdate, setPickupdate] = useState('');
  const [adddescription, setAdddescription] = useState('');
  const [selectshipment, setSelectshipment] = useState('');


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://shippingbackend-production.up.railway.app/api/addtotalshipmentrecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, altphone, pickuplocation, pickupdate, selectshipment, adddescription }),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        // You can reset the form here
      } else {
        console.error('Data submission failed');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };



  return (
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body modal-form-body">
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
                {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active card-header-01 text-center"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected="true"
                    >
                    </button>
                  </li> */}
                  <h2 className="py-3 text-center">
                      Shipment Creation

                  </h2>
                  {/* <li class="nav-item" role="presentation">
                    <button
                      class="nav-link card-header-01 text-center"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    >
                      Delivery Creation
                    </button>
                  </li> */}
                {/* </ul> */}
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
                      <h3 className="text-center pt-2 pb-4">Pickup Details</h3>
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Customer Name
                              <span className="stra-icon"></span>
                            </label>

                            <select
                              value={selectedDispatcher}
                              onChange={handleSelectChange}
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
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

                            {/* {error && dispatchname.selected <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter full name*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>

                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Customer Contact Number
                              <span className="stra-icon"></span>
                            </label>
                            <input
                              name="phone"
                              value={dispatcherData.phoneno}
                            // value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                              // readOnly
                              id="phone"
                              placeholder="Enter Contact Number"
                              type="number"
                            />
                            {/* {error && dispatchemail.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the valid Email*
                              </span>
                            ) : (
                              ""
                            )} */}
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
                            {/* {error && discontactnum.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the 10 Digit number*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Customer Alternate Number
                              <span className="stra-icon">*</span>{" "}
                            </label>
                            <input
                              name="altphone"
                            //   onChange={(e) => setAltphone(e.target.value)}
                              id="altphone"
                              // value={altphone}
                              value={dispatcherData.altphone}

                              onChange={(e) => setAltphone(e.target.value)}
                              placeholder="Enter Alternate Number"
                              type="number"
                            />
                            {/* <input
                              name="email"
                              value={dispatcherData.email}
                              id="email"
                              // value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Email Address"
                              type="email"
                            /> */}
                            {/* {error && disaltnum.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the 10 Digit number*
                              </span>
                            ) : (
                              ""
                            )} */}
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
                            //   onChange={(e) =>
                            //     setPickuplocation(e.target.value)
                            //   }
                            value={pickuplocation}
                            onChange={(e) => setPickuplocation(e.target.value)}
                              id="pickuplocation"
                              placeholder="Enter Pickup Location"
                              type="text"
                            />
                            {/* {error && pickuplocation.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter pickup location*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Pick up Before<span className="stra-icon">*</span>{" "}
                            </label>
                            <input
                              name="pickupdate"
                            //   onChange={(e) =>
                            //     setPickupdate(e.target.value)
                            //   }
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
                            {/* {error && pickupbeforedate.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Select*
                              </span>
                            ) : (
                              ""
                            )} */}
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
                      <h3 className="text-center pt-3 pb-4">Delivery Details</h3>


                      <div className="row">
                  <div className="mb-4 w-50">
                    <label for="exampleInputEmail1" className="form-label">
                      Customers Name<span className="stra-icon">*</span>
                    </label>
          {/* <input type="text" value={customername} 
          onChange={e => setName(e.target.value)} 

          /> */}
          <select
                              value={selectedDispatcher}
                              onChange={handleSelectChange}
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
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

       

                    {/* {error && custoname.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Select Customer*
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Customer Contact Number
                      <span className="stra-icon">*</span>
                    </label>
          {/* <input type="number" value={customernumber} onChange={e => setNumber(e.target.value)} /> */}

          <input
                              name="phone"
                              value={dispatcherData.phoneno}
                            // value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                              // readOnly
                              id="phone"
                              placeholder="Enter Contact Number"
                              type="number"
                            />
                    {/* {error && custonum.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter the valid Email*
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Address (Drop Location)
                      <span className="stra-icon">*</span>
                    </label>
          <input type="text" value={selectshipdrop} onChange={e => setSelectshipdrop(e.target.value)} />

                    {/* <input
                      name="droplocation"
                      onChange={(e) => {setSelectshipdrop(e.target.value);}}
                      id="droplocation"
                      value={selectshipdrop}
                      placeholder="Enter your drop location"
                      type="text"
                    />
                    {error && droplocation.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter the 10 Digit number*
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>
               
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Add Description<span className="stra-icon">*</span>{" "}
                    </label>
          <input type="text" value={adddescriptiondrop} onChange={e => setAdddescriptiondrop(e.target.value)} />

                    {/* <input
                      name="description"
                      onChange={(e) =>{ setAdddescriptiondrop(e.target.value);}}
                      id="description"
                      value={adddescriptiondrop}
                      placeholder="Add description"
                      type="text"
                    />
                    {error && adddesc.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter drop location*
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>

                </div>
                <div className="plus-icon Another-Location ">
                <button type="submit" onClick={() => setModalIsOpen(true)}>
                  <img src="/Assets/dash/plus.png" />
                  Add Another Location
                </button>
              </div>
               
                <div className="row pt-5">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      vehicle plate<span className="stra-icon">*</span>
                    </label>
          <select
                              value={selectedVehicle}
                              onChange={handleSelectVehicle}
                              name="vehicalplate"
                              id="vehicalplate"
                            >
                              <option value="">Select Customer</option>
                              {vehicles.map((vehicle) => (
                                <option
                                  key={vehicle.id}
                                  value={vehicle.id}
                                  name="vehicalplate"
                              id="vehicalplate"
                                >
                                  {vehicle.vehicalplate}
                                </option>
                              ))}
                            </select>
                 
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Helper 1<span className="stra-icon">*</span>{" "}
                    </label>
          {/* <input type="text" value={helper1} onChange={e => setHelper1(e.target.value)} /> */}
          <select
                              value={selectedCustomers}
                              onChange={handleSelectChange}
                            // value={customername}
                            // onChange={(e) => setCustomername(e.target.value)}
                              name="name"
                              id="name"
                            >
                              <option value="">Select Helper1</option>
                              {customers.map((customers) => (
                                <option
                                  key={customers.id}
                                  value={customers.id}
                                  name="name"
                              id="name"
                                >
                                  {customers.name}
                                </option>
                              ))}
                            </select>
                    {/* <select
                      class=""
                      aria-label="Default select example"
                      value={helper1}
                      onChange={(e) => { setHelper1(e.target.value);}}
                    >
                      <option selected>Select Helper</option>
                      {
                        helper1.map((item, i) => (
                        <option key={i}>
                          <option value={item.id}>{item.name}</option>
                        </option>
                      ))}
                    </select>
                    {error && helper.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Enter Description*
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>
                </div>
                <div className="row">
                <div className="mb-4 w-50">
                    <label className="form-label">
                      Helper 2<span className="stra-icon">*</span>{" "}
                    </label>
          {/* <input type="text" value={helper2} onChange={e => setHelper2(e.target.value)} /> */}

          <select
                              // value={selectedCustomers}
                              // onChange={handleSelectChange}
                            // value={customername}
                            // onChange={(e) => setCustomername(e.target.value)}
                              name="name"
                              id="name"
                            >
                              <option value="">Select Helper2</option>
                              {customers.map((customers) => (
                                <option
                                  // key={customers.id}
                                  // value={customers.id}
                                  name="name"
                              id="name"
                                >
                                  {/* {customers.name} */}
                                </option>
                              ))}
                            </select>
                    {/* <select
                      class=""
                      aria-label="Default select example"
                      value={helper2}
                      onChange={(e) => { setHelper2(e.target.value); }}
                    >
                      <option selected>Select Helper</option>
                      {helper1.map((item, i) => (
                        <option key={i}>
                          <option value={item.id}>{item.name}</option>
                        </option>
                      ))}
                    </select>
                    {error && helper.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Enter Description*
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Assign driver<span className="stra-icon">*</span>
                    </label>
          {/* <input type="text" value={assigndriver} onChange={e => setAssigndriver(e.target.value)} /> */}

          <select
                              value={selectedCustomers}
                              onChange={handleSelectChange}
                            // value={customername}
                            // onChange={(e) => setCustomername(e.target.value)}
                              name="name"
                              id="name"
                            >
                              <option value="">Select Driver Name</option>
                              {customers.map((customers) => (
                                <option
                                  // key={customers.id}
                                  // value={customers.id}
                                  name="name"
                              id="name"
                                >
                                  {/* {customers.name} */}
                                </option>
                              ))}
                            </select>
                    {/* <select
                      class=""
                      aria-label="Default select example"
                      onChange={(e) => {setAssigndriver(e.target.value);}}
                    >
                      <option>Select Driver</option>
                      {assidrive.map((item, i) => (
                        <option key={i}>
                          <option value={item.id}>{item.full_name}</option>
                        </option>
                      ))}
                    </select>
                    {error && assigndriver.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Enter Description*
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>
                  </div>




                        <button
                          type="submit"
                          className="submit-btn"
                          value="Send Message"
                        //   onClick={() => addBatch(name,email,phone,altphone,pickuplocation,pickupdate,selectshipment,adddescription)}
                        >
                          Create Task
                        </button>
                        {/* <div className="succbtn mb-4">
                          {succbtn ? <p>{succbtn}</p> : null}
                        </div> */}
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
                    <div>
                      {/* <DeliveryCreation /> */}
                    </div>
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
    </div>
  );
}

export default CreateShipment;
