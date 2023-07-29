import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'


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

import { Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";

async function ContactData(getContact){

  await axios.get('https://shippment-dfx.onrender.com/api/dispatcher',
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
async function addBatch(name,vehicalplate,setModalIsOpen,getBatchList){
  if (name != "" && vehicalplate!= "" ) {
    await axios.post('https://shippment-dfx.onrender.com/api/addvehical',
    {
        inst_hash: localStorage.getItem('name'),
        name: name,
       vehicalplate:vehicalplate,
       
    },
    {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}    
    )
    ContactData(getBatchList);
    setModalIsOpen(false);

} else {
document.getElementById("validate-batch").innerHTML=
  "*Please fill required field!";
console.log("Error :", "Please fill required field");
}

}
//************************************************************** */
async function updateBatch(id,vehicalplate,helper1, helper2,assigndriver,setModalIsOpenEdit,getBatchList){
  if (vehicalplate != "" && helper1 != "" && helper2 != "" && assigndriver != "") {
      await axios.post('https://shippment-dfx.onrender.com/api/updatecreatshipment',
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



} else {
  document.getElementById("edit-validate-batch").innerHTML =
    "*Please fill required field!";
  console.log("Error :", "Please fill required field");
}    
}

//************************************************************** */
async function deleteContact(ids,getContact,DefaultgetContact ){
  const results = await axios.post('https://shippment-dfx.onrender.com/api/deldispatcher',
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


    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [modalIsOpenEdit,setModalIsOpenEdit] = useState(false);
    const [defaultcontact, DefaultgetContact] = useState([]);
    const [ids, setIds] = useState('');


    useEffect(() => {
      ContactData(getContact,DefaultgetContact)   
   }, [])
    console.warn(contact)

    function handleInput(e){
        setName(e.target.value)
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
   </section>
  )
}

export default Createvehical;


