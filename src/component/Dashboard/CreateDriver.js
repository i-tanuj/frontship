import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import '../../css/shippment.css'
import axios from 'axios';
import { Nav, NavItem, Form, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";

function CreateDriver() {
    // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);


    const [full_name, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(false);
    const [modalPrivacy, setModalPrivacy] = useState(false);
    const [succbtn, setSuccbtn] = useState();
    const [modalIsOpenEdit,setModalIsOpenEdit] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      full_name,
      email,
      phone,
      password,
      address,
      // setModalIsOpenEdit
      //   date:fullDate,
    };


    if (full_name === '' || email === '' || phone === '' || password === '' || address === '') {
      setError(true);
      setSuccbtn(<span className="" style={{ color: 'red' }}>Please fill all the fields</span>);
    } else {
      setError(false);
      setSuccbtn('');
      axios.post('https://shippment-dfx.onrender.com/api/adddriver', dataToSubmit)
        .then((response) => {
          console.log(response.data);
          setSuccbtn(<span className="" style={{ color: 'green' }}>Submitted Successfully</span>);
    setModalIsOpen(false);
        })
        .catch((error) => {
          console.error('Error submitting data:', error);
          setSuccbtn(<span className="" style={{ color: 'red' }}>Failed to submit data</span>);
        });
    }

    // if (
    //   full_name.length == 0 ||
    //   email.length == 0 ||
    //   phone.length == 10 ||
    //   password.length == 0 ||
    //   address.length == 0
    // ) {
    //   setError(true);
    //   setSuccbtn(
    //     <span className="" style={{ color: "green" }}>
    //       Submit Succesfully
    //     </span>
    //   );
    // }
    // setModalIsOpen(false);
    // if (full_name&&email&&phone&&password&&address) {
    //   fetch(
    //        "https://shippment-dfx.onrender.com/api/adddriver",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(dataToSubmit),
    //     }
    //     )
    //     .then((res) => res.json())
    //     .then((res) => {
    //       console.log(res, dataToSubmit);
    //     });

        
    // } else {
    //   setSuccbtn(
    //     <span className="" style={{ color: "red" }}>
    //       Please fill all the field
    //     </span>
    //   );
    // }
  };
  

  return (
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body modal-form-body">
     
        
          <div class="card">
	<div class="">
							<div class="admin-dashboard">
								<div class="title-header">
									<h5 class="card-header-01 text-center">Create Driver</h5>
                                    <ModalBody className="close-icon">
          <AiOutlineClose
            className="main_AiOutlineClose"
            onClick={() => setModalIsOpen(false)}
            color="rgba(27, 38, 68, 1)"
          />
        </ModalBody>
								</div>
								<div class="row card-holder">
									<form class="form-control-holder" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                    <label for="exampleInputEmail1" className="form-label">
                      Full name<span className="stra-icon">*</span>
                    </label>
                    <input
                      name="full_name"   
                      onChange={(e)=> setFullname(e.target.value)}          
                      id="first_name"
                      placeholder="Enter your name"
                      type="text"
                    />
               {error && full_name.length<=0?<span className="valid-form" style={{color:'red'}}>Please Enter full name*</span>:""}
                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                      Email<span className="stra-icon">*</span>
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
                  <div className="mb-4">
                    <label className="form-label">
                      Phone Number<span className="stra-icon">*</span>
                    </label>
                    <input
                       name="phone"   
                       onChange={(e)=> setPhone(e.target.value)}          
                       id="phone"
                       placeholder="Enter your number"
                       type="number"
                    />
                     {error && phone.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the 10 Digit number*</span>:""}

                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                      Address<span className="stra-icon">*</span>
                    </label>
                    <input
                       name="address"   
                       onChange={(e)=> setAddress(e.target.value)}          
                       id="address"
                       placeholder="Enter your address"
                       type="text"
                    />
                     {error && address.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter your address*</span>:""}

                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                      Password<span className="stra-icon">*</span>{" "}
                    </label>
                    <input
                       name="password"   
                       onChange={(e)=> setPassword(e.target.value)}          
                       id="password"
                       placeholder="Enter your password"
                       type="text"
                    />
                  {error && password.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter Password*</span>:""}

                  </div>
									  <button type="submit" class="submit-btn">Create Driver</button>
                                      <div className="succbtn mb-4" >{succbtn ? <p>{succbtn}</p> : null}</div>
									</form>
								</div>
							</div>	
						</div>
            </div>

           </Modal>
                	<div class="d-flex create-dispatcher align-items-center">
                        <div class="plus-icon">							    
                            <button type="submit"  onClick={() => setModalIsOpen(true)}><img src="/Assets/dash/plus.png"/>Driver</button>
                        </div>
                    </div>
    </div>
  );
}

export default CreateDriver;
