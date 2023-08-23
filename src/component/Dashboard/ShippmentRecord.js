import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'

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


async function ContactData(getContact){

  await axios.get('https://shippingbackend-production.up.railway.app/api/shipmentdata',
  // { inst_hash: localStorage.getItem('inst_hash_manual') },
  {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  }
  )
  .then((res)=>{
      console.log(res.data);
      getContact(res.data);
  })
}
//************************************************************** */
async function updateBatch(id,name,email,phone,setModalIsOpenEdit,getBatchList){
  if (name != "" && email != "" && phone != "") {
      await axios.post('https://shippingbackend-production.up.railway.app/api/updatedispatcher',
      {inst_hash: localStorage.getItem('inst_hash'),
      id : id,
      name: name,
      email: email,
      phone: phone,
  
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  ContactData(getBatchList)
  setModalIsOpenEdit(false)
} else {
  document.getElementById("edit-validate-batch").innerHTML =
    "*Please fill required field!";
  console.log("Error :", "Please fill required field");
}    
}

//************************************************************** */
async function deleteContact(ids,getContact,DefaultgetContact ){
  const results = await axios.post('https://shippingbackend-production.up.railway.app/api/delcreatshipment',
      {
          id:ids
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  console.log(results);
      if(results.status == 200){
          ContactData(getContact,DefaultgetContact);
      }
  }


function DispatchList() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
    const [contact, getContact] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [batchList,getBatchList] = useState([]);


    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [modalIsOpenEdit,setModalIsOpenEdit] = useState(false);
    const [defaultcontact, DefaultgetContact] = useState([]);
    const [ids, setIds] = useState('');
    const [search,setSearch] =useState('');
  const [currentPage,setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex= lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
      ContactData(getContact,DefaultgetContact)   
   }, [])
    console.warn(contact)

    function handleInput(e){
      setName(e.target.value)
  }


  
  function exportToExcel() {
    const data = contact.map((item) => [
      item.id,
      item.driver_id,
      item.pick_up_location,
      item.drop_location,
      item.vehicleplate,
      item.helper1,
      'Success',
      item.created_at,
    ]);
  
    const ws = XLSX.utils.aoa_to_sheet([
      ['Task ID', 'Driver ID', 'Pickup Location', 'Drop Location', 'Vehicle Number', 'Helper Name', 'Status', 'Date And Time'],
      ...data,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payment Records');
  
    const blob = new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
      type: 'application/octet-stream',
    });
  
    FileSaver.saveAs(blob, 'PaymentRecords.xlsx');
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
  

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  
  const filteredData = data.filter((item) => {
    if (startDate && endDate) {
      const itemDate = new Date(item.DateAndTime);
      return itemDate >= startDate && itemDate <= endDate;
    }
    return true;
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shippingbackend-production.up.railway.app/api/shipmentdata"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  
  
  


  return (
    <section class="homedive ">

<Modal isOpen={modalIsOpenEdit} className='main_modal_body dispatcher-list-form'>
                <ModalBody className='modal_body'>
                <AiOutlineClose className='main_AiOutlineClose close-icon' onClick={()=>setModalIsOpenEdit(false)}/>
                   <h5 className='main_h5'>Edit Dispatcher List</h5>
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
                    <p id="edit-validate-batch" style={{ color: 'red' }}></p>
                    <Button variant="contained" className='main_botton' style={{backgroundColor: '#6A3187'}} onClick={() => updateBatch(ids,name,email,phone,setModalIsOpenEdit,getBatchList)}>Edit Dispatcher List</Button>
                </Form>
            </Modal>

<Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
          <ModalBody className="">
            <AiOutlineClose
              className="main_AiOutlineClose"
              onClick={() => setModalIsOpenDelete(false)}
              color="black"
            />
          </ModalBody>
          <Form className="">
            <h3 style={{ color: "grey", textAlign: "center" }}>
              Do you really want to delete?
            </h3>
            <div
              className="d-flex justify-content-center"
              style={{ marginBottom: "50px" }}
            >
              <Button
                outline
                onClick={() => {
                    deleteContact(ids, getContact, DefaultgetContact)
                  setModalIsOpenDelete(false);
                }}
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
                <span className="calender-icon">
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="Start Date"
                        />
                        <img className="calender-icon" src="assets/dashboard/calendar.png" alt="" />
                      </span>
                      <span className="calender-icon">
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndDateChange}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="End Date"
                        />
                        <img class="calender-icon" src="assets/dashboard/calendar.png" alt="" />
                      </span>
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
                    <table class="table align-middle bg-white rounded m-0" id="table-to-xls">
                        <thead class="tableheading">
                          <tr>
                             <th scope="col" class="borderre">S.No</th>
                             <th scope="col" class="borderre">Task Id</th>
                             <th scope="col" class="borderre">Driver Details</th>
                            <th scope="col">Delivery Details</th>
                            <th scope="col">Vehicle</th>
                            <th scope="col">Helper</th>
                            <th scope="col">Task Status</th>
                            <th scope="col">Creation Date & Time</th>
                            <th scope="col">Created By</th>
                            <th scope="col" class="borderre1">Action</th>
                          </tr>
                        </thead>
                      <tbody class="tbody">
  
        {
          filteredData.filter((item)=>{
            return search.toLowerCase() === '' ? item : item.helper1.toLowerCase().includes(search)
          }).map((item,i)=>
            <tr key={i}>
                 <th scope="row"><span className="dispatcher-id">{i+1}</span></th>
            <td>{item.id}</td>
            <td>{item.driver_id}</td>
            <td>{item.pick_up_location+ " , " +   item.drop_location}</td>
            <td>{item.vehicleplate}</td>
            <td>{item.helper1}</td>
            <td>{"pending"}</td>
            <td>{item.created_at}</td>
            {/* <td className="dis-email text-left">{item.droplocation}<br></br>{item.dropdate}<br></br></td> */}
            <td>{"Manager Dashboard"}</td>

            <td>
            <button className='btn btn1' onClick={()=>{setModalIsOpenEdit(true); setIds(item.id)}}><i class="bi bi-pen"></i></button>
            <button className='btn bt' onClick={()=>{setModalIsOpenDelete(true); setIds(item.id);}}><i class="bi bi-trash delete"></i></button>
            <a href='/view'><button className='btn bt' ><i class="bi bi-eye"></i></button></a>
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

export default DispatchList


