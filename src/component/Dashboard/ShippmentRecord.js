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
 
  const [contact, getContact] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batchList, getBatchList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [ids, setIds] = useState("");
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
  const [filteredData, setFilteredData] = useState([]);
  const [showAllData, setShowAllData] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://shippingbackend-production.up.railway.app/api/mergeapidata')
      .then((response) => {
        setCustomerData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalIsOpenDelete(true);
  };


  const confirmDelete = () => {
    axios.delete(`https://shippingbackend-production.up.railway.app/api/deleteShipmentsby/${deleteId}`)
      .then(() => {
        setCustomerData((prevData) => prevData.filter((customer) => customer.shipment_id !== deleteId));
        toast.success('Shipment deleted successfully!');
        setModalIsOpenDelete(false);
        setTimeout(fetchData, 2000);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        toast.error('Error deleting data.');
        setModalIsOpenDelete(false);
      });
  };


  function handleInput(e) {
    setName(e.target.value);
  }

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

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

  useEffect(() => {
    filterData();
  }, [startDate, endDate, data]);

  
  useEffect(() => {
    // Initially display all data
    setFilteredData(data);
    setShowAllData(true);
  }, [data]); // Trigger when data changes


  const filterData = () => {
    const filterStartDate = new Date(startDate).getTime(); // Parse start date
    const filterEndDate = new Date(endDate).getTime(); // Parse end date

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.DateAndTime).getTime(); // Parse DateAndTime

      // Check if the item date is within the selected range
      return itemDate >= filterStartDate && itemDate <= filterEndDate;
    });

    setFilteredData(filteredData);
    setShowAllData(false); // Set showAllData to false after filtering
  };



  return (
    <section class="homedive ">

<Modal isOpen={modalIsOpenEdit} className='main_modal_body dispatcher-list-form'>
                <ModalBody className='modal_body'>
                  
                   <div className='title-header'>
                   <h5 className='main_h5'>Edit Shipment List</h5>
                <AiOutlineClose className='main_AiOutlineClose close-icon' onClick={()=>setModalIsOpenEdit(false)}/>

                   </div>
                </ModalBody>
                <Form className='form_main '>
                    <FormGroup>
                        <Input type="text" name="name" id="name" placeholder="Edit Name" onBlur={(e) => handleInput(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" name="email" id="email" placeholder="Edit Email" onBlur={(e) => setEmail(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="phone" id="phone" placeholder="Edit Phone Number " onBlur={(e) => {setPhone(e.target.value); console.log(e.target.value);}} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="pickuplocation" id="pickuplocation" placeholder="Edit Vehicle" onBlur={(e) => {setPhone(e.target.value); console.log(e.target.value);}} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="droplocation" id="droplocation" placeholder="Edit Driver" onBlur={(e) => {setPhone(e.target.value); console.log(e.target.value);}} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="droplocation" id="droplocation" placeholder="Edit Drop Location " onBlur={(e) => {setPhone(e.target.value); console.log(e.target.value);}} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="droplocation" id="droplocation" placeholder="Edit Drop Location " onBlur={(e) => {setPhone(e.target.value); console.log(e.target.value);}} />
                    </FormGroup>
                    <p id="edit-validate-batch" style={{ color: 'red' }}></p>
                    <Button variant="contained" className='main_botton' style={{backgroundColor: '#6A3187'}} >Edit Shipment List</Button>
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
                    <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search By Helper Name" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
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
                            {/* <th scope="col">Creation Date & Time</th> */}
                            {/* <th scope="col">Created By</th> */}
                            <th scope="col" class="borderre1">Action</th>
                          </tr>
                        </thead>
                      <tbody class="tbody">
  
                      {customerData
                    .filter((customer) => {
                      return (
                        search.trim() === "" ||
                        customer.customer_name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      );
                    })
                    .map((customer, i) => 
            <tr key={i}>
            <td>{customer.driver_name}</td>
            <td>{customer.customer_name}</td>
            <td className="Pickup-Location-table">{customer.pick_up_location+ " , " +   customer.drop_location}</td>
            <td>{customer.helper1}</td>
            <td>{customer.helper2}</td>
            <td>{customer.drop_date}</td>
            <td>{customer.vehicleplate}</td>
          

            <td>

            <button className='btn bt' 
                                       onClick={() => handleDelete(customer.shipment_id)}
            ><i class="bi bi-trash delete"></i></button>
         
            <Link to={`/view/${customer.shipment_id}`}>
              <button className='btn bt' >
            
            <i class="bi bi-eye">
            </i>
            </button>
            </Link>
            </td>
            
          </tr>
          )
        }
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


