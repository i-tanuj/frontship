import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateCustomer({ onDataCreated }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [altphone, setAltphone] = useState("");

  
  const [error, setError] = useState(false);
  const [modalPrivacy, setModalPrivacy] = useState(false);
  const [succbtn, setSuccbtn] = useState();

  const currentDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      name,
      email,
      phoneno,
      altphone,
      address,
      DateAndTime: currentDate, // Adding current date and time to the data object
    };



    if (name === '' || email === '' || phoneno === '' || altphone === '' || address === '') {
      setError(true);
      setSuccbtn(<span className="" style={{ color: 'red' }}>Please fill all the fields</span>);
    } else {
      setError(false);
      setSuccbtn('');
      axios.post('https://shippingbackend-production.up.railway.app/api/addcustomer', dataToSubmit)
        .then((response) => {
          console.log(response.data);
          setSuccbtn(<span className="" style={{ color: 'green' }}>Submitted Successfully</span>);
    setModalIsOpen(false);

    toast.success('Customer Created Successfully!', {
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
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body modal-form-body">
        <div className="card">
          <div className="">
            <div className="admin-dashboard">
              <div className="title-header">
                <h5 className="card-header-01 text-center">Create Customer</h5>
                <ModalBody className="close-icon-01">
                  <AiOutlineClose
                    className="main_AiOutlineClose"
                    onClick={() => setModalIsOpen(false)}
                    color="rgba(27, 38, 68, 1)"
                  />
                </ModalBody>
              </div>
              <div className="row card-holder">
                <form className="form-control-holder"  onSubmit={handleSubmit}>
                    <div className="row">
                  <div className="mb-4 w-50">
                    <label for="exampleInputEmail1" className="form-label">
                      Customer Name<span className="stra-icon">*</span>
                    </label>
                    <input
                      name="full_name"   
                      onChange={(e)=> setName(e.target.value)}          
                      id="first_name"
                      placeholder="Enter your name"
                      type="text"
                    />
               {error && name.length<=0?<span className="valid-form" style={{color:'red'}}>Please Enter full name*</span>:""}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                     Customer Email<span className="stra-icon">*</span>
                    </label>
                    <input
                      name="email"   
                      onChange={(e)=> setEmail(e.target.value)}          
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  {error && email.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the valid Email*</span>:""}

                  </div>
                  </div>
                  <div className="row">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                    Customer Contact Number<span className="stra-icon">*</span>
                    </label>
                    <input
                       name="phoneno"   
                       onChange={(e)=> setPhone(e.target.value)}          
                       id="phoneno"
                       placeholder="Enter your phone"
                       type="number"
                    />
                     {error && phoneno.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the 10 Digit number*</span>:""}

                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                    Customer Alternate Number<span className="stra-icon">*</span>{" "}
                    </label>
                    <input
                       name="phone"   
                       onChange={(e)=> setAltphone(e.target.value)}          
                       id="phone"
                       placeholder="Enter your Alternate Number"
                       type="number"
                    />
                  {error && altphone.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the 10 Digit number*</span>:""}

                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                    Customer Address<span className="stra-icon">*</span>{" "}
                    </label>
                    <input
                       name="address"   
                       onChange={(e)=> setAddress(e.target.value)}          
                       id="address"
                       placeholder="Enter Address"
                       type="name"
                    />
                  {error && altphone.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter Address*</span>:""}

                  </div>
                  </div>
                  <button type="submit" className="submit-btn"  value="Send Message">
                    Create Customer
                  </button>
                  <div className="succbtn mb-4" >{succbtn ? <p>{succbtn}</p> : null}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

                {/* Created Toast Container  */}
                <ToastContainer/>
      <div className="d-flex create-dispatcher align-items-center">
        <div className="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Create Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
