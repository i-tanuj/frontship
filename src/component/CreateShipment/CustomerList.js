import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import Navbar from '../Navbar'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";

import CreateCustomer from './CreateCustomer';

async function ContactData(getContact){

  await axios.get('https://shipment-backend.onrender.com/api/creatcustomer',
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

async function updateBatch(id,name,email,phoneno,altphone,address,setModalIsOpenEdit,getBatchList){
  if (name != "" && email != "" && phoneno != "" && altphone != "") {
      await axios.post('https://shipment-backend.onrender.com/api/updatecustomer',
      {inst_hash: localStorage.getItem('inst_hash'),
      id : id,
      name: name,
      email: email,
      phoneno: phoneno,
      altphone: altphone,
      address: address
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  ContactData(getBatchList)
  setModalIsOpenEdit(false)
  toast.success("Customer Updated Successfully!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });
} else {
  document.getElementById("edit-validate-batch").innerHTML =
    "*Please fill required field!";
  console.log("Error :", "Please fill required field");
}    
}

//************************************************************** */
async function deleteContact(ids,getContact,DefaultgetContact ){
  const results = await axios.post('https://shipment-backend.onrender.com/api/delcustomer',
      {
          id:ids
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  toast.success("Customer Deleted Successfully!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });
      if(results.status == 200){
          ContactData(getContact,DefaultgetContact);
      }
  }


function CustomerList() {
    const [contact, getContact] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [altphone, setAltPhone] = useState("");
    const [address, setAddress] = useState("");
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

  
  function handleEditClick(customer) {
    setIds(customer.id);
    setName(customer.name);
    setEmail(customer.email);
    setPhoneno(customer.phoneno);
    setAltPhone(customer.altphone);
    setAddress(customer.address);
    setModalIsOpenEdit(true);
  }

  return (
    <section class="homedive ">

<Modal isOpen={modalIsOpenEdit} className='main_modal_body dispatcher-list-form'>
                <ModalBody className='modal_body'>
                <AiOutlineClose className='main_AiOutlineClose close-icon' onClick={()=>setModalIsOpenEdit(false)}/>
                   <h5 className='main_h5'>Edit Customer List</h5>
                </ModalBody>
                <Form className='form_main '>
                    <FormGroup>
                        <Input type="text" name="name" id="name" placeholder="Edit Name"   onChange={(e) => handleInput(e)} value={name}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" name="email" id="email" placeholder="Edit Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="phoneno" id="phoneno" placeholder="Edit Phone Number " onChange={(e) => {setPhoneno(e.target.value);}} value={phoneno}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="altphone" id="altphone" placeholder="Edit Alternate number " onChange={(e) => {setAltPhone(e.target.value); }} value={altphone} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="address" id="address" placeholder="Edit Address" onChange={(e) => {setAddress(e.target.value);  }} value={address} />
                    </FormGroup>
                    <p id="edit-validate-batch" style={{ color: 'red' }}></p>
                    <Button variant="contained" className='main_botton' style={{backgroundColor: '#6A3187'}} onClick={() => updateBatch(ids,name,email,phoneno,altphone,address,setModalIsOpenEdit,getBatchList)}>Edit Customer List</Button>
                </Form>
            </Modal>

 <Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
          <ModalBody className="dispatcher-list-form">
            <AiOutlineClose
              className="main_AiOutlineClose close-icon"
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
     
    
  
  
    <div class="rightdiv px-3 py-5">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                    <div class="input-group input-group-lg">
                    <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                 <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search Here" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                      </div>
                </div>
             
            </div>
          
            <div className="row mt-3">
              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 '>
              <Navbar/>

                    </div>
                <div class="col view-table-new">
                    <div className='driver-view-list'>
                      <div className=''>
                        <h2>All Customer List</h2>
                      </div>
                      <div class="w-50 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                          <div class="input-group input-group-lg">
                            <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                            <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search Here" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                          </div>
                      </div>
                      <div className='d-flex'>
                        <div className='add-new-form-btn'>
                        <CreateCustomer/>  
                        </div>
                        <div className='Back-btn-01'><a href='/'>Back</a></div>
                      </div>
                    </div>

                    <table class="table align-middle bg-white rounded m-0" id="table-to-xls">
                        <thead class="tableheading">
                          <tr>
                            <th scope="col" class="borderre">No.</th>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Registration Date</th>
                            <th scope="col" class="borderre1">Action</th>
                          </tr>
                        </thead>
                      <tbody class="tbody">
  
        {
          records.filter((item)=>{
            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
          }).map((item,i)=>
            <tr key={i}>
                 <th scope="row"><span className="dispatcher-id">{i+1}</span></th>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.phoneno}</td>
            <td className="dis-email text-left">{item.email}</td>
            <td>{item.address}</td>
            <td>{item.DateAndTime}</td>
            <td>
            {/* <button className="btn bt"><a href="#" class="eye"><i class="bi bi-pen"></i></a></button> */}
            <button className='btn btn1' onClick={() => handleEditClick(item)}><i class="bi bi-pen"></i></button>
              <button className='btn bt' onClick={()=>{setModalIsOpenDelete(true); setIds(item.id);}}><i class="bi bi-trash delete"></i></button>
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
    <ToastContainer />

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

export default CustomerList;


