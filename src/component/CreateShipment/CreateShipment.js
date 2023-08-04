import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Nav, NavItem, Form, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import DeliveryCreation from "./DeliveryCreation";

async function ContactData(getContact, id) {
  await axios
    .get("https://shipment-backend.onrender.com/api/dispatcher", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res.data);
      getContact(res.data);
    });
}

function CreateShipment() {
  const [dispatchers, setDispatchers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    // Fetch dispatcher data from the server and populate the state
    fetchDispatchers();
  }, []);

  const fetchDispatchers = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/dispatcher"
      );
      const dispatcherData = response.data;
      setDispatchers(dispatcherData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/fetchData/${selectedOptionValue}`
        );
        const selectedDispatcherData = response.data;
        setDispatcherData(selectedDispatcherData);
      } catch (error) {
        //   console.log(selectedDispatcherData);
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contact, getContact] = useState([]);
  const [defaultcontact, DefaultgetContact] = useState([]);

  const [dispatchname, setDispatchName] = useState("");
  const [discontactnum, setDiscontactnum] = useState("");
  const [disaltnum, setDisaltnum] = useState("");
  const [dispatchemail, setDispatchemail] = useState("");
  const [pickuplocation, setPickuplocation] = useState("");
  const [pickupbeforedate, setPickupbeforedate] = useState("");
  const [selectshipment, setSelectshipment] = useState("");
  const [adddescription, setAdddescription] = useState("");
  const [ids, setIds] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [phone, setPhone] = useState("");
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);

  const [error, setError] = useState(false);
  const [modalPrivacy, setModalPrivacy] = useState(false);
  const [succbtn, setSuccbtn] = useState();

  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);

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
    };

    // if (
    //   dispatchname.length == 0 ||
    //   discontactnum.length == 0 ||
    //   disaltnum.length == 0 ||
    //   dispatchemail.length == 0 ||
    //   pickuplocation.length == 0 ||
    //   pickupbeforedate.length == 0 ||
    //   selectshipment.length == 0 ||
    //   adddescription.length == 0
    // ) {
    //   setError(true);
    //   setSuccbtn(
    //     <span className="" style={{ color: "green" }}>
    //       Submit Succesfully
    //     </span>
    //   );
    // }
    if (
      dispatchname &&
      discontactnum &&
      disaltnum &&
      dispatchemail &&
      pickuplocation &&
      pickupbeforedate &&
      selectshipment &&
      adddescription
    ) {
      fetch(
        "http://localhost:5000/api/addtotalshipmentrecord",
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

  function handleEditClick(dispatcher) {
    setIds(dispatcher.id);
    setName(dispatcher.name);
    setEmail(dispatcher.email);
    setPhoneno(dispatcher.phone);
    // setAltPhone(customer.altphone);
    // setAddress(customer.address);
    setModalIsOpenEdit(true);
  }

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
                    <button
                      class="nav-link active card-header-01 text-center"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected="true"
                    >
                      Pickup Creation
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link card-header-01 text-center"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    >
                      Delivery Creation
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabindex="0"
                  >
                    <div className="row card-holder">
                      <form
                        className="form-control-holder"
                        onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Dispatcher Name
                              <span className="stra-icon">*</span>
                            </label>

                            <select
                              value={selectedDispatcher}
                              onChange={handleSelectChange}
                              name="dispatchname"
                              id="dispatchname"
                            >
                              <option value="">Select Dispatcher</option>
                              {dispatchers.map((dispatcher) => (
                                <option
                                  key={dispatcher.id}
                                  value={dispatcher.id}
                                  name="dispatchname"
                              id="dispatchname"
                                >
                                  {dispatcher.name}
                                </option>
                              ))}
                            </select>

                            {error && dispatchname.selected <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter full name*
                              </span>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Dispatcher Contact Number
                              <span className="stra-icon">*</span>
                            </label>
                            <input
                              name="discontactnum"
                              value={dispatcherData.phone}
                              readOnly
                              id="discontactnum"
                              placeholder="Enter Contact Number"
                              type="number"
                            />
                            {/* {error && dispatchemail.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the valid Email*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Dispatcher Email Address
                              <span className="stra-icon">*</span>
                            </label>
                            <input
                              name="dispatchemail"
                              value={dispatcherData.email} readOnly
                              id="dispatchemail"
                              placeholder="Enter Email Address"
                              type="email"
                            />
                            {/* {error && discontactnum.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the 10 Digit number*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Dispatcher Alternate Number
                              <span className="stra-icon">*</span>{" "}
                            </label>
                            <input
                              name="disaltnum"
                              onChange={(e) => setDisaltnum(e.target.value)}
                              id="disaltnum"
                              placeholder="Enter Alternate Number"
                              type="number"
                            />
                            {/* {error && disaltnum.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the 10 Digit number*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Pic kup Location
                              <span className="stra-icon">*</span>
                            </label>
                            <input
                              name="pickuplocation"
                              onChange={(e) =>
                                setPickuplocation(e.target.value)
                              }
                              id="pickuplocation"
                              placeholder="Enter Pickup Location"
                              type="text"
                            />
                            {/* {error && pickuplocation.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter pickup location*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Pick up Before<span className="stra-icon">*</span>{" "}
                            </label>
                            <input
                              name="pickupbeforedate"
                              onChange={(e) =>
                                setPickupbeforedate(e.target.value)
                              }
                              id="pickupbeforedate"
                              placeholder="Drop Location"
                              type="date"
                            />
                            {/* {error && pickupbeforedate.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter Pick Up location*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Please Select<span className="stra-icon">*</span>
                            </label>
                            <select
                            name="selectshipment"
                            id="selectshipment"
                              class=""
                              aria-label="Default select example"
                              onChange={(e) =>
                                setSelectshipment(e.target.value)
                              }
                            >
                              <option selected>Select Here</option>
                              <option value="Shipment">Shipment</option>
                              <option value="Force work">Force Work</option>
                            </select>
                            {/* {error && pickupbeforedate.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Select*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Add Description<span className="stra-icon"></span>{" "}
                            </label>
                            <input
                              name="adddescription"
                              onChange={(e) =>
                                setAdddescription(e.target.value)
                              }
                              id="adddescription"
                              placeholder="Description"
                              type="text"
                            />
                            {/* {error && adddescription.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Enter Description*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="submit-btn"
                          value="Send Message"
                        >
                          Save & Next
                        </button>
                        {/* <div className="succbtn mb-4">
                          {succbtn ? <p>{succbtn}</p> : null}
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile-tab-pane"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                    tabindex="0"
                  >
                    <div>
                      <DeliveryCreation />
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
