import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Nav, NavItem, Form, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";

async function ContactData(getContact, id) {
  await axios
    .get("https://shipment-backend.onrender.com/createcustomer/creatcustomer", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res.data);
      getContact(res.data);
    });
}

async function VehicalData(getVehicle, id) {
  await axios
    .get("https://shipment-backend.onrender.com/vehical/creatvehical", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res.data);
      getVehicle(res.data);
    });
}

async function helperData(getHelper, id) {
  await axios
    .get("https://shipment-backend.onrender.com/vehical/creatvehical", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res.data);
      getHelper(res.data);
    });
}

async function assigndriverData(getAssigndrive, id) {
  await axios
    .get("https://shipment-backend.onrender.com/api/driver", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res.data);
      getAssigndrive(res.data);
    });
}

function DeliveryCreation() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [custoname, setCustoname] = useState("");
  const [custonum, setCustonum] = useState("");
  const [droplocation, setDroplocation] = useState("");
  const [dropdate, setDropdate] = useState("");
  const [selectshipment, setSelectshipment] = useState("");
  const [adddesc, setAdddesc] = useState("");
  const [vehicleplate, setVehicleplate] = useState("");
  const [helper, setHelper] = useState("");
  const [assigndriver, setAssigndriver] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customer, setCustomer] = useState([]);
  const [phoneno, setPhoneno] = useState('');

  const [contact, getContact] = useState([]);
  const [vehicle, getVehicle] = useState([]);
  const [helper1, getHelper] = useState([]);
  const [assidrive, getAssigndrive] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [phoneno, setPhoneno] = useState('');
  const [altphone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [ids, setIds] = useState('');
  const [modalIsOpenEdit,setModalIsOpenEdit] = useState(false);


  const [error, setError] = useState(false);
  const [succbtn, setSuccbtn] = useState();

  const handleCustomerChange = (event) => {
    
      setIds(customer.id);
      setName(customer.name);
      setEmail(customer.email);
      setPhoneno(customer.phoneno);
      setAltPhone(customer.altphone);
      setAddress(customer.address);
      setModalIsOpenEdit(true);
    
    setSelectedCustomer(event.target.value);
  };

  useEffect(() => {
    // Fetch the data from the API
    axios.get('https://shipment-backend.onrender.com/api/creatcustomer')
      .then(response => {
        setCustomer(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);

  useEffect(() => {
    VehicalData(getVehicle, DefaultgetContact);
  }, []);

  useEffect(() => {
    helperData(getHelper, DefaultgetContact);
  }, []);

  useEffect(() => {
    assigndriverData(getAssigndrive, DefaultgetContact);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      custoname,
      custonum,
      droplocation,
      dropdate,
      selectshipment,
      adddesc,
      vehicleplate,
      helper,
      assigndriver,
    };

    if (
      custoname.length == 0 ||
      custonum.length == 0 ||
      droplocation.length == 10 ||
      dropdate.length == 10 ||
      selectshipment.length == 0 ||
      droplocation.length == 0 ||
      adddesc.length == 0 ||
      vehicleplate.length == 0 ||
      helper.length == 0 ||
      assigndriver.length == 0
    ) {
      setError(true);
      setSuccbtn(
        <span className="" style={{ color: "green" }}>
          Submit Succesfully
        </span>
      );
    }
    if (
      custoname &&
      custonum &&
      droplocation &&
      dropdate &&
      selectshipment &&
      droplocation &&
      adddesc &&
      vehicleplate &&
      helper &&
      assigndriver
    ) {
      fetch("https://shipment-backend.onrender.com/api/adddeliverycreation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res, dataToSubmit);
        });
    } else {
      setSuccbtn(
        <span className="" style={{ color: "red" }}>
          Please fill all the field
        </span>
      );
    }
  };

  return (
    <div>
      <div className="card">
        <div className="">
          <div className="admin-dashboard">
            <div className="title-header"></div>
            <div className="row card-holder form-control-delivery">
              <form className="" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-4 w-50">
                    <label for="exampleInputEmail1" className="form-label">
                      Customers Name<span className="stra-icon">*</span>
                    </label>
              

                    <select name="full_name"  id="full_name" onChange={handleCustomerChange} value={selectedCustomer}>
                    
                    <option  value="">Select a Customer</option>
                    {customer.map((customer) => (
                      <option key={customer.id} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </select>

                    {error && custoname.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Select Customer*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Customer Contact Number
                      <span className="stra-icon">*</span>
                    </label>
                    <input
                      name="phone"
                      onChange={(e) => setCustonum(e.target.value)}
                      value={phoneno}
                      id="email"
                      placeholder="Enter Contact Number"
                      type="number"
                    />
                    {error && custonum.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter the valid Email*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Address (Drop Location)
                      <span className="stra-icon">*</span>
                    </label>
                    <input
                      name="droplocation"
                      onChange={(e) => setDroplocation(e.target.value)}
                      id="droplocation"
                      placeholder="Enter your drop location"
                      type="text"
                    />
                    {error && droplocation.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter the 10 Digit number*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Drop date<span className="stra-icon">*</span>{" "}
                    </label>
                    <input
                      name="date"
                      onChange={(e) => setDropdate(e.target.value)}
                      id="date"
                      placeholder="Date"
                      type="date"
                    />
                    {error && dropdate.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter the 10 Digit number*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Please Select<span className="stra-icon">*</span>
                    </label>
                    <select onChange={(e) => setSelectshipment(e.target.value)}>
                      <option value="">select option</option>

                      <option value="Shipment">Shipment</option>
                      <option value="Work Force">Work Force</option>
                    </select>
                    {error && selectshipment.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter pickup location*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Add Description<span className="stra-icon">*</span>{" "}
                    </label>
                    <input
                      name="description"
                      onChange={(e) => setAdddesc(e.target.value)}
                      id="description"
                      placeholder="Add description"
                      type="text"
                    />
                    {error && adddesc.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter drop location*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      vehicle plate<span className="stra-icon">*</span>
                    </label>
                    <select
                      class=""
                      aria-label="Default select example"
                      onChange={(e) => setVehicleplate(e.target.value)}
                    >
                      <option value="">Select Vehicle Plate</option>
                      {vehicle.map((item, i) => (
                        <option key={i}>
                          <option value={item.id}>{item.vehicalplate}</option>
                        </option>
                      ))}
                    </select>
                    {error && vehicleplate.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Enter Description*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Helper<span className="stra-icon">*</span>{" "}
                    </label>
                    <select
                      class=""
                      aria-label="Default select example"
                      onChange={(e) => setHelper(e.target.value)}
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
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Assign driver<span className="stra-icon">*</span>
                    </label>
                    <select
                      class=""
                      aria-label="Default select example"
                      onChange={(e) => setAssigndriver(e.target.value)}
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
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  value="Send Message"
                >
                  Create Task
                </button>
                <div className="succbtn mb-4">
                  {succbtn ? <p>{succbtn}</p> : null}
                </div>

                <div className="d-flex Another-Location"></div>
              </form>
              <div className="plus-icon Another-Location ">
                <button type="submit" onClick={() => setModalIsOpen(true)}>
                  <img src="/Assets/dash/plus.png" />
                  Add Another Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryCreation;
