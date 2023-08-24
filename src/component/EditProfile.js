import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../css/navbar.css";
import axios from 'axios';
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

import { Input, Modal, ModalBody } from "reactstrap";

async function ContactData(getContact) {
  await axios
    .get("https://shippingbackend-production.up.railway.app/api/driver", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      getContact(res.data);
    });
}




function EditProfile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [full_name, setFullName] = useState("");
  
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  
  

    
    return (
      <div>
      <Modal isOpen={modalIsOpen} className="modal_body">
       
        
          <div class="">
	<div class="card-body">
  <div class="title-header">
		<h3 class="card-header-01 text-center">Edit Profile</h3>
    <ModalBody className="close-icon">
          <AiOutlineClose
            className="main_AiOutlineClose"
            onClick={() => setModalIsOpen(false)}
            color="rgba(27, 38, 68, 1)"
          />
        </ModalBody>
        </div>
		<div class="row card-holder">
    <div className="form-control-holder">
			<form className='mb-b'>
				<div class="form-group mb-4">
					<label for="exampleInputEmail1"  className='fontSize'>Name</label>
					{/* <input type="password" class="form-control form-control-sm"/> */}
          <Input
              type="text"
              name="name"
              id="name"
              placeholder="Edit Name"
              onChange={(e) => setFullName(e.target.value)}
              value={full_name}
            />  
				</div>
				<div class="form-group mb-4">
					<label for="exampleInputEmail1" className='fontSize'>Contact Number</label>
					{/* <input type="password" class="form-control form-control-sm"/> */}
                   <input type="password" name="newPassword" value={newPassword}  placeholder="Contact Number" className='form-control form-control-sm'/> 
				</div>
				<div class="form-group mb-4">
					<label for="exampleInputEmail1" className='fontSize'>Email ID</label>
					{/* <input type="password" class="form-control form-control-sm"/> */}
                   <input type="password" name="newPassword" value={newPassword}  placeholder="Email ID" className='form-control form-control-sm'/> 
				</div>
				<button type="submit" class="btn submit-btn">Update Profile</button>
			</form>
      </div>
           {message && <p>{message}</p>}
		</div>
	</div>
</div>

      </Modal>
      <div class="notification">
        <Nav>
          <div className="container d-flex justify-content-between">
            <Link to="">
              <NavItem>
                <img
                  src="/Assets/Navbar/profile.png"
                  onClick={() => setModalIsOpen(true)}
                />
              </NavItem>
            </Link>
          </div>
        </Nav>
      </div>
    </div>
  );
}

export default EditProfile;
