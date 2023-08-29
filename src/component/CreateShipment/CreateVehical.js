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


function Createvehical({ onDataCreated }) {
    const [rowCount, setRowCount] = useState(0);
    const [inquiries, setInquiries] = useState( );
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contact, getContact] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vehicalplate, setVehicalplate] = useState("");
    const [phone, setPhone] = useState("");
    const [batchList,getBatchList] = useState([]);


    const [error, setError] = useState(false);
    const [modalPrivacy, setModalPrivacy] = useState(false);
    const [succbtn, setSuccbtn] = useState();
    const [defaultcontact, DefaultgetContact] = useState([]);

  const currentDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      name,
      vehicalplate,
      DateAndTime: currentDate, // Adding current date and time to the data object
    };



    if (name === '' || vehicalplate === '') {
      setError(true);
      setSuccbtn(<span className="" style={{ color: 'red' }}>Please fill all the fields</span>);
    } else {
      setError(false);
      setSuccbtn('');
      axios.post('https://shippingbackend-production.up.railway.app/api/addvehical', dataToSubmit)
        .then((response) => {
          console.log(response.data);
          setSuccbtn(<span className="" style={{ color: 'green' }}>Submitted Successfully</span>);
    setModalIsOpen(false);

    toast.success('Vehicle Created Successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    onDataCreated();
        })
        .catch((error) => {
          console.error('Error submitting data:', error);
          setSuccbtn(<span className="" style={{ color: 'red' }}>Failed to submit data</span>);
        });
    }


  };


  return (
    <section class="homedive ">

            
<Modal isOpen={modalIsOpen} className='main_modal_body pop-up-hpr'>
                <div className='title-header'>
                    <AiOutlineClose className='main_AiOutlineClose close-icon-hpr' onClick={()=>setModalIsOpen(false)}/>
                    <h5 className='card-header-01 text-center'>Create Vehicle</h5>
                </div>
                <Form className='form-control-holder-hpr'  onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col'>
                      <FormGroup>
                      <label class="form-label">Vehicle Name<span class="stra-icon">*</span></label>
                          <Input type="text" name="name" id="name" placeholder="Enter Vehicle Name" onBlur={(e) => setName(e.target.value)}/>
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
                    <Button variant="contained" className='main_botton  submit-btn' type='submit'>Create Vehical</Button>

                </Form>
            </Modal>
            <div className="d-flex create-dispatcher align-items-center">
        <div className="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Vehicle
          </button>
        </div>
      </div>
      <ToastContainer/>

   </section>
  )
}

export default Createvehical;
