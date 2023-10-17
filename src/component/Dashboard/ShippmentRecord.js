import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


function ShipmentRecords() {
   const [pickUpLocation, setPickUpLocation] = useState(''); // Pick-up Location

  const [contact, getContact] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleplate, setVehicleplate] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedHelper1, setSelectedHelper1] = useState("");
  const [selectedHelper, setSelectedHelper] = useState("");
  const [helpers, setHelpers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [selectedDispatcher1, setSelectedDispatcher1] = useState("");
  const [selectedDispatcher2, setSelectedDispatcher2] = useState("");
  const [selectedDispatcher3, setSelectedDispatcher3] = useState("");
  const [searchText, setSearchText] = useState(""); // Search text for filtering by customer name
  const [editItem, setEditItem] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedShipmentId, setSelectedShipmentId] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [customerNames, setCustomerNames] = useState([]);
  const [driverIds, setDriverIds] = useState([]); // To store all driver IDs
  // const [selectedHelper1, setSelectedHelper1] = useState(''); // Helper 1 dropdown
  const [selectedHelper2, setSelectedHelper2] = useState("");
  const [helper1Options, setHelper1Options] = useState([]); // Helper 1 options
  const [helper2Options, setHelper2Options] = useState([]);
  const [customerContact, setCustomerContact] = useState(''); // Customer Contact
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerAltNum, setCustomerAltNum] = useState(''); // Customer Alternate Number
  const [customerEmail, setCustomerEmail] = useState(''); // Customer Alternate Number
  const [pickupDate, setPickupDate] = useState(''); // Customer Alternate Number
  const [filteredData, setFilteredData] = useState([]); // Filtered data

  function handleInput(e) {
    setName(e.target.value);
  }
  const [altphone, setAltphone] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  const [showAllData, setShowAllData] = useState(true);

  const [selectedDriver, setSelectedDriver] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/mergeapidata')
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

  useEffect(() => {
    // Filter data based on the search and date filter
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.created_at);
      const customerName = item.customer_name.toLowerCase();
      const searchTextLower = searchText.toLowerCase();

      const dateCondition = !startDate || !endDate || (itemDate >= new Date(startDate) && itemDate <= new Date(endDate));
      const searchCondition = !searchText || customerName.includes(searchTextLower);

      return dateCondition && searchCondition;
    });

    setFilteredData(filtered);
  }, [data, startDate, endDate, searchText]);

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

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData = response.data;
        setDispatcherData(selectedDispatcherData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const [editData, setEditData] = useState({
    id: null,
    driver_id: "",
    customer_name: "",
    pick_up_location: "",
    helper1: "",
    helper2: "",
    drop_date: "",
    vehicleplate: "",
    pick_up_before: "",
  });

  const [helperData, setHelperData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

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
  const [helperData1, setHelperData1] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

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

  const availableHelpersForSelectedHelper1 = helpers.filter(
    (helper) => !selectedHelper.includes(helper.id)
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/mergeapidata")
      .then((response) => {
        setCustomerData(response.data);
        // console.log(data.customer_contact);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalIsOpenDelete(true);
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  const confirmDelete = () => {
    axios
      .delete(
        `http://localhost:5000/api/deleteShipmentsby/${deleteId}`
      )
      .then(() => {
        setCustomerData((prevData) =>
          prevData.filter((item) => item.shipment_id !== deleteId)
        );
        const updatedData = data.filter(
          (item) => item.shipment_id !== deleteId
        );
        setData(updatedData);
        toast.success("Shipment deleted successfully!");
        setModalIsOpenDelete(false);
        setTimeout(fetchData, 2000);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        toast.error("Error deleting data.");
        setModalIsOpenDelete(false);
      });
  };

  function exportToExcel() {
    const data = contact.map((item) => [
      item.driver_id,
      item.customer_name,
      item.pick_up_location,
      item.helper1,
      item.helper2,
      item.drop_date,
      item.vehicleplate,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      [
        "Driver Name",
        "Customer Name.",
        "Delivery Details",
        "Helper 1",
        "Helper 2",
        "Date & Time Of Delivery",
        "Vehicle Plate No.",
      ],
      ...data,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Shipment Records");

    const blob = new Blob(
      [s2ab(XLSX.write(wb, { bookType: "xlsx", type: "binary" }))],
      {
        type: "application/octet-stream",
      }
    );

    FileSaver.saveAs(blob, "ShipmentRecords.xlsx");
  }

  // Convert data to array buffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

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

  function editDataItem(customer) {
    setEditData(customer);
    setModalIsOpenEdit(true);
  }
  
  const saveEditedData = () => {
    const updatedData = {
      customer_name: selectedCustomerName,
      customer_contact: customerContact,
      customer_email: customerEmail, // Add this line for customer email
      helper1: selectedHelper1,
      helper2: selectedHelper2,
      driver_id: selectedDriverId,
      customer_alt_num: customerAltNum,
    };

    // Make a PUT request to update the data
    axios.put(`http://localhost:5000/api/updatecustomer/${editItem.id}`, updatedData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        toast.success("Shipment Details Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
              });
      setModalIsOpenEdit(false);

      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };
  
  const openEditModal = (item) => {
    setEditItem(item);
    setModalIsOpenEdit(true);
    setSelectedCustomerName(item.customer_name);
    setSelectedShipmentId(item.shipment_id);
    setSelectedVehicle(item.vehicleplate);
    setSelectedDriverId(item.driver_id);
    setSelectedHelper1(item.helper1);
    setSelectedHelper2(item.helper2);
    setPickupDate(item.pick_up_before);

    const selectedCustomer = data.find((customer) => customer.customer_name === item.customer_name);

    if (selectedCustomer) {
      setCustomerContact(selectedCustomer.customer_contact);
      setCustomerAltNum(selectedCustomer.customer_alt_num);
      setPickUpLocation(selectedCustomer.pick_up_location);
      setCustomerEmail(selectedCustomer.customer_email);
    }
  };

  return (
    <section class="homedive ">
   <Modal
        isOpen={modalIsOpenEdit}
        className="main_modal_body dispatcher-list-form"
      >
        <ModalBody className="modal_body">
          <AiOutlineClose
            className="main_AiOutlineClose close-icon"
            onClick={() => setModalIsOpenEdit(false)}
          />
          <h5 className="main_h5">Edit Shipment Details</h5>
        </ModalBody>
        <Form className="form_main ">
    <div className="row">
        <div className="col-6">
          <label>Customer Name:</label>
          <FormGroup>
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
          </FormGroup>
        </div>
          <div className="col-6">
          <label>Customer Contact:</label>
          <FormGroup>
          <input
            type="text"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
          />
          </FormGroup>
          </div>
          </div>

          <div className="row">
        <div className="col-6">
          <FormGroup>
          <label>Customer Alternate Number:</label>
          <input
            type="text"
            value={customerAltNum}
            onChange={(e) => setCustomerAltNum(e.target.value)}
          />
          </FormGroup>
          </div>
          <div className="col-6">
          <label>Shipment ID:</label>
          <FormGroup>
          <input
            type="text"
            value={selectedShipmentId}
            onChange={(e) => setSelectedShipmentId(e.target.value)}
          />
          </FormGroup>
          </div>
          </div>

          <div className="row">
        <div className="col-6">
          <label>Customer Email:</label>

          <FormGroup>
          <input
            type="text"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
          </FormGroup>
          </div>
          <div className="col-6">

          <label>Pickup Date:</label>

          <FormGroup>
          <input
            type="text"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
          </FormGroup>
          </div>
          </div>

          <div className="row">
        <div className="col-6">
          <label>Helper 1:</label>
          <FormGroup>
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
          </FormGroup>
          </div>
          <div className="col-6">

          <label>Helper 2:</label>
          <FormGroup>
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
          </FormGroup>
          </div>
          </div>


          <div className="row">
        <div className="col-6">
          <label>Vehicle Number:</label>
          <FormGroup>
          <input
            type="text"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          />
          </FormGroup>
          </div>
          <div className="col-6">

          <label>Driver ID:</label>
          <FormGroup>
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
          </FormGroup>
          </div>
          </div>
          <label>Pick-up Location:</label>
          <FormGroup>
          <input
            type="text"
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
          />
          </FormGroup>

          <p id="edit-validate-batch" style={{ color: "red" }}></p>
          <Button
            variant="contained"
            className="main_botton"
            style={{ backgroundColor: "#6A3187" }}
            onClick={saveEditedData}
          >
            Update Shipment List
          </Button>
        </Form>
      </Modal>

<Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
          <ModalBody className="delete-popup-icon-holder">
          <div className="delete-popup-icon">
              <h3 class="card-header-01" style={{ color: "grey", textAlign: "center" }}>
                Do you really want to delete?
              </h3>
              <AiOutlineClose
                className="main_AiOutlineClose close-icon-delete"
                onClick={() => setModalIsOpenDelete(false)}
                color="black"
              />
            </div>
          </ModalBody>
          <Form className="">
          
            <div
              className="d-flex justify-content-center mt-5"
              style={{ marginBottom: "50px" }}
            >
              <Button
                outline
                onClick={confirmDelete}
              >
                Yes
              </Button>
              &nbsp;
              <Button outline onClick={() => setModalIsOpenDelete(false)}>
              Cancel
              </Button>
            </div>
          </Form>
        </Modal>
     
    
  
  
    <div class="rightdiv px-3 py-2">
        <div class="container-fluid table-header-title">
            <div class="row justify-content-between">
              <div class="w-30 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 nameuser w-auto">
                <h2>Shipment List</h2>
              </div>

              <div  className='datepicker-date-comm w-auto'>
              <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
                             <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
									</div>



              <div class="w-30 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                  <div class="input-group input-group-lg">
                    <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                    {/* <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search By Helper Name" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} /> */}

                    <input
                      style={{ fontSize: "15px" }}
                      className="form-control me-2 serch-filed"
                      type="search"
                      aria-label="Search"
                      placeholder="Search by Customer Name"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <div className="export-btn">
            <button className="create-dispatcher p-3 mt-0 mx-3" onClick={exportToExcel}>Export to Excel</button>
          </div>
                  </div>
                  
              </div>
             
            </div>
          
            <div className="row pt-0">
              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 '>
            
                    </div>
                <div class="col p-0">
                    <table class="table align-middle bg-white rounded m-0 dwf-shipment-rec" id="table-to-xls">
                        <thead class="tableheading">
                          <tr>
                             <th scope="col" class="borderre">Driver Name</th>
                             <th scope="col" class="borderre">Customers Name</th>
                             <th scope="col" class="borderre">Delivery Detail</th>
                            <th scope="col" >Helper1</th>
                            <th scope="col">Helper2</th>
                            <th scope="col">Date & Time of Delivery</th>
                            <th scope="col">Vehicle Plate No.</th>
                            <th scope="col" class="borderre1">Action</th>
                          </tr>
                        </thead>
                      <tbody class="tbody">
  
                      {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.driver_name}
                      </td>
                      <td>
                       {item.customer_name}                    
                      </td>
                      <td>{item.drop_location}</td>
                      <td>{item.helper1}</td>
                      <td>{item.helper2}</td>
                      <td>{item.pick_up_before} <br/> {item.drop_date} </td>
                      <td>{item.vehicleplate}</td>
                      <td>
                        <button
                          className="btn btn1"
                          onClick={() => openEditModal(item)}
                        >
                          <i class="bi bi-pen"></i>
                        </button>
                        <button
                          className="btn bt"
                          onClick={() => handleDelete(item.shipment_id)}
                        >
                          <i class="bi bi-trash delete"></i>
                        </button>
                        <Link to={`/view/${item.shipment_id}`}>
                          <button className="btn bt">
                            <i class="bi bi-eye"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                    </tbody>
                  </table>
               <nav>
        <ul className='pagination'>
           <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}>Previous</a>
           </li>
           {
            numbers.map((n,i)=>{
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
              <a href='#' className='page-link' onClick={()=>changeCPage(n)}>{n}</a>
              </li>
            })
           }
             <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}>Next</a>
           </li>
        </ul>
      </nav>
                </div>

            </div>
        </div>
    </div>
   </section>
  )

  function prePage (){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }
  
  function changeCPage (id){
   setCurrentPage(id)
  }

  function nextPage (){
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }
  }
}

export default ShipmentRecords


