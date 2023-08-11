import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal
} from "reactstrap";


async function ContactData(getContact){

  await axios.get('https://shippingbackend-production.up.railway.app/api/dispatcher',
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

async function addBatch(name,email,phoneno,address,setModalIsOpen,getBatchList){
  if (name !== "" && email !== "" && phoneno !== "" && address!== "" ) {
    await axios.post('https://shippingbackend-production.up.railway.app/api/addhelper',
    {
        inst_hash: localStorage.getItem('name'),
        name: name,
       email: email,
       phoneno: phoneno,
       address:address,
    },
    {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}    
    )
    ContactData(getBatchList);
    setModalIsOpen(false);

       // Show Toastify notification for success
       toast.success('Helper successfully created!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

} else {
document.getElementById("validate-batch").innerHTML=
  "*Please fill required field!";
console.log("Error :", "Please fill required field");
}

}
//************************************************************** */
async function updateBatch(id,vehicalplate,helper1, helper2,assigndriver,setModalIsOpenEdit,getBatchList){
  if (vehicalplate != "" && helper1 != "" && helper2 != "" && assigndriver != "") {
      await axios.post('https://shippingbackend-production.up.railway.app/api/updatecreatshipment',
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
  const results = await axios.post('https://shippingbackend-production.up.railway.app/api/deldispatcher',
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


  function CreateHelper() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contact, getContact] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [batchList,getBatchList] = useState([]);
    const [modalIsOpenEdit,setModalIsOpenEdit] = useState(false);

    const [defaultcontact, DefaultgetContact] = useState([]);

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
                   <AiOutlineClose className='main_AiOutlineClose close-icon-hpr'   onClick={()=>setModalIsOpen(false)}/>
                   <h5 className='card-header-01 text-center'>Create Helper</h5>
                  </div>
                <Form className='form-control-holder-hpr'>
                  <div className='row'>
                    <div className='col-6'>
                    <FormGroup>
                        <label class="form-label">Helper Name<span class="stra-icon">*</span></label>
                        <Input type="text" name="name" id="name" placeholder=" Enter helper Name" onBlur={(e) => handleInput(e)}/>
                    </FormGroup>
                    </div>
                    <div className='col-6'>
                    <FormGroup>
                        <label class="form-label">Helper’s Email Address<span class="stra-icon">*</span></label>
                        <Input type="email" name="email" id="email" placeholder="Enter Email Address" onBlur={(e) => setEmail(e.target.value)}/>
                    </FormGroup>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                    
                    <FormGroup>
                        <label class="form-label">Helper’s Contact Number<span class="stra-icon">*</span></label>
                        <Input type="number" name="phoneno" id="phoneno" placeholder="Helper’s Contact Number*" onBlur={(e) => setPhoneno(e.target.value)}/>
                    </FormGroup>
                    </div>
                    <div className='col-6'>
                    <FormGroup>
                        <label class="form-label">Helper’s Address*<span class="stra-icon">*</span></label>
                        <Input type="text" name="address" id="address" placeholder="Enter Address" onBlur={(e) => setAddress(e.target.value)}/>
                    </FormGroup>
                    </div>
                    </div>
                    <p id="validate-batch" style={{ color: 'red' }}></p>
                    <Button variant="contained" className='main_botton submit-btn'  onClick={() => addBatch(name,email,phoneno,address,setModalIsOpen,getBatchList)}>Create Helper</Button>

                </Form>
            </Modal>

{/* Created Toast Container  */}
<ToastContainer/>

            <div className="d-flex create-dispatcher align-items-center">
        <div className="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Helper
          </button>
        </div>
      </div>
   </section>
  )
}

export default CreateHelper;


