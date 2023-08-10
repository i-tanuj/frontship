import React, { useState, useEffect } from "react";
import "../../css/shippment.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// async function ContactData(getContact, id) {
//   await axios
//     .get("https://shipment-backend.onrender.com/createcustomer/creatcustomer", {
//       headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
//     })
//     .then((res) => {
//       console.log(res.data);
//       getContact(res.data);
//     });
// }

// async function VehicalData(getVehicle, id) {
//   await axios
//     .get("https://shipment-backend.onrender.com/vehical/creatvehical", {
//       headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
//     })
//     .then((res) => {
//       console.log(res.data);
//       getVehicle(res.data);
//     });
// }

// async function helperData(getHelper, id) {
//   await axios
//     .get("https://shipment-backend.onrender.com/vehical/creatvehical", {
//       headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
//     })
//     .then((res) => {
//       console.log(res.data);
//       getHelper(res.data);
//     });
// }

// async function assigndriverData(getAssigndrive, id) {
//   await axios
//     .get("https://shipment-backend.onrender.com/api/driver", {
//       headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
//     })
//     .then((res) => {
//       console.log(res.data);
//       getAssigndrive(res.data);
//     });
// }


// async function updateBatch(id, customername, customernumber, selectshipdrop, adddescriptiondrop, vehicleplate, helper1, helper2){
//   if (customername != "" && customernumber != "") {
//       await axios.post('https://shipment-backend.onrender.com/api/updatedelivery',
//       {inst_hash: localStorage.getItem('inst_hash'),
//       id : id,
//       customername: customername,
//       customernumber: customernumber,
//       selectshipdrop: selectshipdrop,
//       adddescriptiondrop: adddescriptiondrop,
//       vehicleplate: vehicleplate,
//       helper1: helper1,
//       helper2: helper2
//       },
//       {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
//   )
//   // ContactData(getBatchList)
//   // setModalIsOpenEdit(false)
// } else {
//   document.getElementById("edit-validate-batch").innerHTML =
//     "*Please fill required field!";
//   console.log("Error :", "Please fill required field");
// }    
// }

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
  const [selectedDriver, setSelectedDriver] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState("");



    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const [CustomersData, setCustomersData] = useState({
      id: "",
      name: "",
      email: "",
      phoneno: "",
    });
    useEffect(() => {
      // Fetch dispatcher data from the server and populate the state
      fetchCustomers();
    }, []);
  
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/creatcustomer"
        );
        const customersData = response.data;
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching dispatchers:", error);
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
            `http://localhost:5000/api/customerdata/${selectedOptionValue}`
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

    try {
      const response = await axios.post('http://localhost:5000/api/createshipment', { customername, customernumber, selectshipdrop, dropdate, adddescriptiondrop, vehicleplate, helper1, helper2, assigndriver, setModalIsOpenEdit, setModalIsOpen });
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


  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // const [custoname, setCustoname] = useState("");
  // const [custonum, setCustonum] = useState("");
  // const [droplocation, setDroplocation] = useState("");
  // const [dropdate, setDropdate] = useState("");
  // // const [selectshipment, setSelectshipment] = useState("");
  // const [adddesc, setAdddesc] = useState("");
  // const [helper, setHelper] = useState("");
  // const [assigndriver, setAssigndriver] = useState("");
  // const [selectedCustomer, setSelectedCustomer] = useState('');
  // const [customer, setCustomer] = useState([]);
  // // const [helper2, setHelper2] = useState('');

  // const [contact, getContact] = useState([]);
  // const [vehicle, getVehicle] = useState([]);
  // const [assidrive, getAssigndrive] = useState([]);
  // const [address, setAddress] = useState("");
  // const [defaultcontact, DefaultgetContact] = useState([]);
  // const [id, setId] = useState('');
  // const [modalIsOpenEdit,setModalIsOpenEdit] = useState(false);


  // const [error, setError] = useState(false);
  // const [succbtn, setSuccbtn] = useState();

  // const handleCustomerChange = (event) => {
    
  //     setId(customer.id);
  //     setName(customer.customername);
  //     setCustomernumber(customer.customernumber);
  //     setSelectshipdrop(customer.selectshipdrop);
  //     setDropdate(customer.selectshipdrop);
  //     setAdddescriptiondrop(customer.adddescriptiondrop);
  //     setVehicleplate(customer.vehicleplate);
  //     setHelper1(customer.helper1);
  //     setHelper2(customer.helper2);
  //     setAssigndriver(customer.assigndriver);

  //     setModalIsOpenEdit(true);
    
  //   setSelectedCustomer(event.target.value);
  // };

//   useEffect(() => {
//     // Fetch the data from the API
//     axios.get('https://shipment-backend.onrender.com/api/creatcustomer')
//       .then(response => {
//         setCustomer(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     ContactData(getContact, DefaultgetContact);
//   }, []);

//   useEffect(() => {
//     VehicalData(getVehicle, DefaultgetContact);
//   }, []);

//   // useEffect(() => {
//   //   helperData(getHelper, DefaultgetContact);
//   // }, []);

//   useEffect(() => {
//     assigndriverData(getAssigndrive, DefaultgetContact);
//   }, []);


  
// const [customername, setCustomername] = useState('');
// const [customernumber, setCustomernumber] = useState('');
// const [selectshipdrop, setSelectshipdrop] = useState('');
// const [adddescriptiondrop, setAdddescriptiondrop] = useState('');
// const [vehicleplate, setVehicleplate] = useState('');
// const [helper1, setHelper1] = useState('');
// const [helper2, setHelper2] = useState('');


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch('https://shipment-backend.onrender.com/api/updatedelivery', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ customername, customernumber, selectshipdrop, adddescriptiondrop, vehicleplate, helper1, helper2 }),
//     });

//     if (response.ok) {
//       console.log('Data submitted successfully');
//       // You can reset the form here
//     } else {
//       console.error('Data submission failed');
//     }
//   } catch (error) {
//     console.error('Error submitting data:', error);
//   }
// };



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
                      Drop date<span className="stra-icon">*</span>{" "}
                    </label>
          <input type="date" value={dropdate} onChange={e => setDropdate(e.target.value)} />
                    {/* <input
                      name="date"
                      onChange={(e)  => { setDropdate(e.target.value);}}
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
                              value={selectedCustomers}
                              onChange={handleSelectChange}
                            // value={customername}
                            // onChange={(e) => setCustomername(e.target.value)}
                              name="name"
                              id="name"
                            >
                              <option value="">Select Vehical Plate</option>
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
                              value={selectedCustomers}
                              onChange={handleSelectChange}
                            // value={customername}
                            // onChange={(e) => setCustomername(e.target.value)}
                              name="name"
                              id="name"
                            >
                              <option value="">Select Helper2</option>
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
                  <div className="mb-4 w-100">
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
