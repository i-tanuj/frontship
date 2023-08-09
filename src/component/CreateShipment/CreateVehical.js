import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Nav,
  NavItem,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";


async function ContactData(getContact){

  await axios.get('https://shipment-backend.onrender.com/api/dispatcher',
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
async function updateBatch(id,vehicalplate,helper1, helper2,assigndriver,setModalIsOpenEdit,getBatchList){
  if (vehicalplate != "" && helper1 != "" && helper2 != "" && assigndriver != "") {
      await axios.post('https://shipment-backend.onrender.com/api/updatecreatshipment',
      {inst_hash: localStorage.getItem('inst_hash'),
      id : 3,
      vehicalplate:  vehicalplate,
      helper1: helper1,
      helper2: helper2,
      assigndriver: assigndriver,
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  ContactData(getBatchList)
  
  
  setModalIsOpenEdit(false)
  toast.success('Dispatcher Updated Successfully!', {
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
  const results = await axios.post('https://shipment-backend.onrender.com/api/deldispatcher',
      {
          id:ids
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
      if(results.status == 200){
          ContactData(getContact,DefaultgetContact);
      }
  }


function Createvehical() {
    const [rowCount, setRowCount] = useState(0);
    const [inquiries, setInquiries] = useState( );
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contact, getContact] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vehicalplate, setVehicalplate] = useState("");
    const [phone, setPhone] = useState("");
    const [batchList,getBatchList] = useState([]);


    const [defaultcontact, DefaultgetContact] = useState([]);


    useEffect(() => {
      ContactData(getContact,DefaultgetContact)   
   }, [])
    console.warn(contact)

    function handleInput(e){
        setName(e.target.value)
  }
  const currentDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });
  //************************************************************** */
  async function addBatch(name,vehicalplate,DateAndTime,getBatchList){
    if (name !== "" && vehicalplate!== "" ) {
      await axios.post('https://shipment-backend.onrender.com/api/addvehical',
      {
          inst_hash: localStorage.getItem('name'),
          name: name,
         vehicalplate:vehicalplate,
        DateAndTime: currentDate, // Adding current date and time to the data object
         
         
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}    
      )
      setModalIsOpen(false);
      toast.success('Helper Created Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
     
      ContactData(getBatchList);
  
  } else {
  document.getElementById("validate-batch").innerHTML=
    "*Please fill required field!";
  console.log("Error :", "Please fill required field");
  }
  
  }

  return (
    <section class="homedive ">

            
<Modal isOpen={modalIsOpen} className='main_modal_body pop-up-hpr'>
                <div className='title-header'>
                    <AiOutlineClose className='main_AiOutlineClose close-icon-hpr' onClick={()=>setModalIsOpen(false)}/>
                    <h5 className='card-header-01 text-center'>Create Vehical</h5>
                </div>
                <Form className='form-control-holder-hpr'>
                  <div className='row'>
                    <div className='col'>
                      <FormGroup>
                      <label class="form-label">Vehicle Name<span class="stra-icon">*</span></label>
                          <Input type="text" name="name" id="name" placeholder="Enter Vehicle Name" onBlur={(e) => handleInput(e)}/>
                      </FormGroup>
                    </div>
                    <div className='col'>
                      <FormGroup>
                      <label class="form-label">Vehicle plate Number<span class="stra-icon">*</span></label>
                          <Input type="text" name="vehicalplate" id="vehicalplate" placeholder="Enter Plate Number" onBlur={(e) => setVehicalplate(e.target.value)}/>
                      </FormGroup>
                    </div>
                  </div>
                    <p id="validate-batch" style={{ color: 'red' }}></p>
                    <Button variant="contained" className='main_botton  submit-btn' onClick={() => addBatch(name,vehicalplate,setModalIsOpen,getBatchList)}>Create Vehical</Button>

                </Form>
            </Modal>
            <div className="d-flex create-dispatcher align-items-center">
        <div className="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Vehical
          </button>
        </div>
      </div>
      <ToastContainer/>

   </section>
  )
}

export default Createvehical;


