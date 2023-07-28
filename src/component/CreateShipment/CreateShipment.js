import React, { useState,useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Nav, NavItem, Form, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import DeliveryCreation from "./DeliveryCreation";


async function ContactData(getContact,id){

  await axios.get('http://localhost:5000/dispatcher/dispatcher',
  {
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  }
  )
  .then((res)=>{
      console.log(res.data);
      getContact(res.data);
  })
}

function CreateShipment() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contact, getContact] = useState([]);
  const [defaultcontact, DefaultgetContact] = useState([]);


  const [dispatchname, setDispatchName] = useState("");
  const [discontactnum, setDiscontactnum] = useState("");
  const [disaltnum,setDisaltnum] = useState("");
  const [dispatchemail , setDispatchemail] = useState("");
  const [pickuplocation, setPickuplocation] = useState("");
  const [pickupbeforedate, setPickupbeforedate] = useState("");
  const [selectshipment , setSelectshipment] = useState("");
  const [adddescription , setAdddescription] = useState("");

    //  const dispatchname = req.body.dispatchname;
    //           const discontactnum = req.body.discontactnum;
    //           const disaltnum = req.body.disaltnum;
    //           const dispatchemail = req.body.dispatchemail;
    //           const pickuplocation = req.body.pickuplocation;
    //           const pickupbeforedate = req.body.pickupbeforedate;
    //           const selectshipment = req.body.selectshipment;
    //           const adddescription = req.body.adddescription;
 
  const [error, setError] = useState(false);
  const [modalPrivacy, setModalPrivacy] = useState(false);
  const [succbtn, setSuccbtn] = useState();

    useEffect(() => {
    ContactData(getContact,DefaultgetContact)   
 }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      dispatchname,
      discontactnum,
      disaltnum,
      dispatchemail,
      pickuplocation,
      pickupbeforedate,
      selectshipment,
      adddescription,
      //   date:fullDate,
    };

    if (
      dispatchname.length == 0 ||
      discontactnum.length == 0 ||
      disaltnum.length == 10 ||
      dispatchemail.length == 10 ||
      pickuplocation.length == 0 ||
      pickupbeforedate.length == 0 ||
      selectshipment.length == 0 ||
      adddescription.length == 0
    ) {
      setError(true);
      setSuccbtn(
        <span className="" style={{ color: "green" }}>
          Submit Succesfully
        </span>
      );
    }
    if (dispatchname&&discontactnum&&disaltnum&&dispatchemail&&pickuplocation&&pickupbeforedate&&selectshipment&&adddescription) {
      fetch(
           "http://localhost:5000/pickupcreation/addtotalshipmentrecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res, dataToSubmit);
        });
    } else {
      setSuccbtn(
        <span className="" style={{ color: "red" }}>
          Please fill all the field
        </span>
      );
    }
  };

  return (
    <div>

      <Modal isOpen={modalIsOpen} className="modal_body modal-form-body">
      
        <div className="delivery-pickup-form-holder">
        <div className="card">
        <ModalBody className="close-icon">
                  <AiOutlineClose
                    className="main_AiOutlineClose"
                    onClick={() => setModalIsOpen(false)}
                    color="rgba(27, 38, 68, 1)"
                  />
                </ModalBody>
          <div className="">
            <div className="admin-dashboard">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active card-header-01 text-center" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Pickup Creation</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link card-header-01 text-center" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Delivery Creation</button>
              </li>
            </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <div className="row card-holder">
                  <form className="form-control-holder"  onSubmit={handleSubmit}>
                    <div className="row">
                      {/* <div className="mb-4 w-50">
                        <label for="exampleInputEmail1" className="form-label">
                        Customers Full name<span className="stra-icon">*</span>
                        </label>
                        <input
                          name="full_name"   
                          onChange={(e)=> setCustoname(e.target.value)}          
                          id="first_name"
                          placeholder="Enter your name"
                          type="text"
                        />
                  {error && custoname.length<=0?<span className="valid-form" style={{color:'red'}}>Please Enter full name*</span>:""}
                      </div> */}

                   <div className="mb-4 w-50">
                        <label className="form-label">
                        Dispatcher Name<span className="stra-icon">*</span>
                        </label>
                        <select  onChange={(e)=> setDispatchName(e.target.value)}>
                         <option value="">Select Dispatcher</option>
  
                  {/* {
                    contact.map((item)=>
                    <option key={item.id}>
                    <option value="">{item.name}</option>
                   </option>
                    )
                  } */}
                   {
                    contact.map((item,i)=>
                    <option key={i}>
                    <option value={item.id}>{item.name}</option>
                   </option>
                    )
                  }
                  
                   </select>
               {error &&  dispatchname.length<=0?<span className="valid-form" style={{color:'red'}}>Please Enter full name*</span>:""}

                    </div>

                      <div className="mb-4 w-50">
                        <label className="form-label">
                        Customers Email<span className="stra-icon">*</span>
                        </label>
                        <input
                          name="email"   
                          onChange={(e)=> setDispatchemail(e.target.value)}          
                          id="email"
                          placeholder="Enter your email"
                          type="email"
                        />
                      {error && dispatchemail.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the valid Email*</span>:""}

                      </div>
                    </div>
                  <div className="row">
                      <div className="mb-4 w-50">
                        <label className="form-label">
                        Customers Contact Number<span className="stra-icon">*</span>
                        </label>
                        <input
                          name="phone"   
                          onChange={(e)=> setDiscontactnum(e.target.value)}          
                          id="phone"
                          placeholder="Enter your phone"
                          type="number"
                        />
                        {error && discontactnum.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the 10 Digit number*</span>:""}

                      </div>
                      <div className="mb-4 w-50">
                        <label className="form-label">
                        Customers Alternate Contact Number<span className="stra-icon">*</span>{" "}
                        </label>
                        <input
                          name="phone"   
                          onChange={(e)=> setDisaltnum(e.target.value)}          
                          id="phone"
                          placeholder="Enter alternate number"
                          type="number"
                        />
                      {error && disaltnum.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the 10 Digit number*</span>:""}

                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-4 w-50">
                        <label className="form-label">
                        Customers Pickup Location<span className="stra-icon">*</span>
                        </label>
                        <input
                          name="pickuplocation"   
                          onChange={(e)=> setPickuplocation(e.target.value)}          
                          id="pickuplocation"
                          placeholder="pickup Location"
                          type="text"
                        />
                        {error && pickuplocation.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter pickup location*</span>:""}

                      </div>
                      <div className="mb-4 w-50">
                        <label className="form-label">
                        Customers Drop Location<span className="stra-icon">*</span>{" "}
                        </label>
                        <input
                          name="date"   
                          onChange={(e)=> setPickupbeforedate(e.target.value)}          
                          id="date"
                          placeholder="Drop Location"
                          type="date"
                        />
                      {error && pickupbeforedate.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter drop location*</span>:""}

                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-4 w-50">
                        <label className="form-label">
                        Please Select<span className="stra-icon">*</span>
                        </label>
                        <select class="" aria-label="Default select example" onChange={(e)=>setSelectshipment(e.target.value)}>
                        <option selected>Open this select menu</option>
                        <option value="Shipment">Shipment</option>
                        <option value="Force work">Force Work</option>
                      </select> 
                {error && pickupbeforedate.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter drop location*</span>:""}

                    </div>
                      <div className="mb-4 w-50">
                        <label className="form-label">
                        Add Description<span className="stra-icon">*</span>{" "}
                        </label>
                        <input
                          name="description"   
                          onChange={(e)=> setAdddescription(e.target.value)}          
                          id="description"
                          placeholder="Description"
                          type="text"
                        />
                      {error && adddescription.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Enter Description*</span>:""}

                      </div>
                    </div>
                    <button type="submit" className="submit-btn"  value="Send Message">
                      Create Shipment
                    </button>
                    <div className="succbtn mb-4" >{succbtn ? <p>{succbtn}</p> : null}</div>
                  </form>
              </div>
              
            </div>
            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                <div>
                <DeliveryCreation/>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        
        </div>
        
      </Modal>
      <div className="d-flex create-dispatcher-01 align-items-center">
        <div className="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Create New Shipment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateShipment;
