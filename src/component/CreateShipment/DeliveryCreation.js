import React, { useState, useEffect } from "react";
import "../../css/shippment.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeliveryCreation = () => {
  const [customername, setCustomername] = useState('');
  const [customernumber, setCustomernumber] = useState('');
  const [selectshipdrop, setSelectshipdrop] = useState('');
  const [dropdate, setDropdate] = useState('');
  const [adddescriptiondrop, setAdddescriptiondrop] = useState('');
  const [vehicleplate, setVehicleplate] = useState('');
  const [helper1, setHelper1] = useState('');
  const [helper2, setHelper2] = useState('');
  const [assigndriver, setAssigndriver] = useState('');

  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  // const [selectedDriver, setSelectedDriver] = useState('');
  // const [drivers, setDrivers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const [CustomersData, setCustomersData] = useState({
      id: "",
      name: "",
      email: "",
      phoneno: "",
    });
    const [VehiclesData, setVehiclesData] = useState({
      id: "",
      // name: "",
      vehicalplate: ""
    });
    useEffect(() => {
      // Fetch dispatcher data from the server and populate the state
      fetchCustomers();
    }, []);
    useEffect(() => {
      // Fetch dispatcher data from the server and populate the state
      fetchVehicles();
    }, []);
  
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://shippingbackend-production.up.railway.app/api/creatcustomer"
        );
        const customersData = response.data;
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching dispatchers:", error);
      }
    };
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://shippingbackend-production.up.railway.app/api/creatvehical"
        );
        const vehiclesData = response.data;
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching dispatchers:", error);
      }
    };
  
    const handleSelectVehicle = async (event) => {
      const selectedVehiclesValue = event.target.value;
      setSelectedVehicles(selectedVehiclesValue);
      console.log(selectedVehiclesValue);
  
      // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
      if (selectedVehiclesValue) {
        try {
          const response = await axios.get(
            `https://shippingbackend-production.up.railway.app/api/vehicledata/${selectedVehiclesValue}`
          );
          const selectedVehiclesData = response.data;
          setVehiclesData(selectedVehiclesData);
        } catch (error) {
          console.error("Error fetching selected dispatcher:", error);
        }
      }
    };
    const handleSelectChange = async (event) => {
      const selectedOptionValue = event.target.value;
      setSelectedCustomers(selectedOptionValue);
      console.log(selectedOptionValue);
  
      // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
      if (selectedOptionValue) {
        try {
          const response = await axios.get(
            `https://shippingbackend-production.up.railway.app/api/customerdata/${selectedOptionValue}`
          );
          const selectedCustomersData = response.data;
          setCustomersData(selectedCustomersData);
        } catch (error) {
          console.error("Error fetching selected dispatcher:", error);
        }
      }
    };
  

  const handleSubmit = async e => {
    e.preventDefault();
const trynumber = CustomersData.phoneno;
    try {
      const response = await axios.post('https://shippingbackend-production.up.railway.app/api/createshipment', { customername, trynumber, selectshipdrop, dropdate, adddescriptiondrop, vehicleplate, helper1, helper2, assigndriver, setModalIsOpenEdit, setModalIsOpen });
      console.log(response.data.message);
      // Clear the form fields after successful submission
      setCustomername('');
      setCustomernumber('');
      setSelectshipdrop('');
      setDropdate('');
      setAdddescriptiondrop('');
      setVehicleplate('');
      setHelper1('');
      setHelper2('');
      setAssigndriver('');
      toast.success('Shipment Created Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
  setModalIsOpenEdit(false);
  setModalIsOpen(false);


    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };




  return (
    <div>
    
      <div className="card">
        <div className="">
          <div className="admin-dashboard">
            <div className="title-header"></div>
            <div className="row card-holder form-control-delivery">
              <form className="" onSubmit={handleSubmit} 
              >
                <div className="row">
                  <div className="mb-4 w-50">
                    <label for="exampleInputEmail1" className="form-label">
                      Customers Name<span className="stra-icon">*</span>
                    </label>
          {/* <input type="text" value={customername} 
          onChange={e => setName(e.target.value)} 

          /> */}

          <select
                              value={selectedCustomers}
                              onChange={handleSelectChange}
                            // value={customername}
                            // onChange={(e) => setCustomername(e.target.value)}
                              name="name"
                              id="name"
                            >
                              <option value="">Select Customer Name</option>
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

              

                    {/* <select name="full_name"  id="full_name"
                     onChange={handleCustomerChange}
                    //  onChange={(e) => {setCustomername(e.target.value);}}

                    //  value={selectedCustomer}
                    value={customername}
                      >
                    
                    <option  value="">Select a Customer</option>
                    {customer.map((customer) => (
                      <option key={customer.id} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </select> */}

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
                              value={CustomersData.phoneno}
                            // value={customernumber}
                            onChange={(e) => setCustomernumber(e.target.value)}
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
               
                <div className="row">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      vehicle plate<span className="stra-icon">*</span>
                    </label>
          {/* <input type="text" value={vehicleplate} onChange={e => setVehicleplate(e.target.value)} /> */}
          <select
                              value={selectedVehicles}
                              
                              onChange={handleSelectVehicle}
                            // value={customername}
                            // onChange={(e) => setCustomername(e.target.value)}
                              name="vehicleplate"
                              id="vehicleplate"
                            >
                              <option value="">Select Vehicle Plate</option>
                              {vehicles.map((vehicles) => (
                                <option
                                  key={vehicles.id}
                                  value={vehicles.id}
                                  name="vehicleplate"
                              id="vehicleplate"
                                >
                                  {vehicles.name}
                                </option>
                              ))}
                            </select>
                    {/* <select
                      class=""
                      aria-label="Default select example"
                      value={vehicleplate}
                      onChange={(e) => {setVehicleplate(e.target.value);}}
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
                    )} */}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                      Helper 1<span className="stra-icon">*</span>{" "}
                    </label>
          {/* <input type="text" value={helper1} onChange={e => setHelper1(e.target.value)} /> */}
          <select
                              // value={selectedCustomers}
                              // onChange={handleSelectChange}
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
                                  {/* {customers.name} */}
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
                  <div className="row">
                  {/* <div className="mb-4 w-50">
                    <label className="form-label">
                      Please Select<span className="stra-icon">*</span>
                    </label>
                    <select 
                    // onChange={(e) => setSelectshipment(e.target.value)}
                    >
                      <option value="">select option</option>

                      <option value="Shipment">Shipment</option>
                      <option value="Work Force">Work Force</option>
                    </select>
                    {/* {error && selectshipment.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter pickup location*
                      </span>
                    ) : (
                      ""
                    )} 
                  </div> */}
                
                </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  value="Send Message"
                  onClick={() => setModalIsOpen(true)}
                  // onClick={() => updateBatch(id,customername,customernumber,selectshipdrop,adddescriptiondrop,vehicleplate,helper1,helper2)}
                >
                  Create Task
                </button>
                {/* <div className="succbtn mb-4">
                  {succbtn ? <p>{succbtn}</p> : null}
                </div> */}

                <div className="d-flex Another-Location"></div>
              </form>
              {/* <div className="plus-icon Another-Location ">
                <button type="submit" onClick={() => setModalIsOpen(true)}>
                  <img src="/Assets/dash/plus.png" />
                  Add Another Location
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>

    </div>
  );
};

export default DeliveryCreation;
