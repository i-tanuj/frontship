import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateHelper({ onDataCreated }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(false);
  const [succbtn, setSuccbtn] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      name,
      email,
      phoneno,
      address,
    };

    if (name === "" || email === "" || phoneno === "" || address === "") {
      setError(true);
      setSuccbtn(
        <span className="" style={{ color: "red" }}>
          Please fill all the fields
        </span>
      );
    } else {
      setError(false);
      setSuccbtn("");
      axios
        .post(
          "https://shippingbackend-production.up.railway.app/api/addhelper",
          dataToSubmit
        )
        .then((response) => {
          console.log(response.data);
          setSuccbtn(
            <span className="" style={{ color: "green" }}>
              Submitted Successfully
            </span>
          );
          setModalIsOpen(false);
          // fetchData();
          // Show Toastify notification for success
          toast.success('Helper Created Successfully!', {
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
          console.error("Error submitting data:", error);
          setSuccbtn(
            <span className="" style={{ color: "red" }}>
              Failed to submit data
            </span>
          );
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
                <h5 className="card-header-01 text-center">
                  Create Helper
                </h5>
                <ModalBody className="close-icon">
                  <AiOutlineClose
                    className="main_AiOutlineClose"
                    onClick={() => setModalIsOpen(false)}
                    color="rgba(27, 38, 68, 1)"
                  />
                </ModalBody>
              </div>
              <div className="row card-holder">
                <form className="form-control-holder" onSubmit={handleSubmit}>
                  
                  <div className="row">
                    <div className="mb-4 col-6">
                      <label for="exampleInputEmail1" className="form-label">
                      Helper Name<span className="stra-icon">*</span>
                      </label>
                      <input
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        placeholder="Enter your name"
                        type="text"
                      />
                      {error && name.length <= 0 ? (
                        <span className="valid-form" style={{ color: "red" }}>
                          Please Enter full name*
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mb-4  col-6">
                      <label className="form-label">
                        Email Address<span className="stra-icon">*</span>
                      </label>
                      <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                      />
                      {error && email.length <= 0 ? (
                        <span className="valid-form" style={{ color: "red" }}>
                          Please Enter the valid Email*
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
        <div className='row'>

                  <div className="mb-4 col-6">
                    <label className="form-label">
                      Phone Number<span className="stra-icon">*</span>
                    </label>
                    <input
                      name="phone"
                      onChange={(e) => setPhoneno(e.target.value)}
                      id="phone"
                      placeholder="Enter your phone"
                      type="number"
                    />
                    {error && phoneno.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter the 10 Digit number*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4 col-6">
                    <label className="form-label">
                      Address<span className="stra-icon">*</span>{" "}
                    </label>
                    <input
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                      id="address"
                      placeholder="Enter your Address"
                      type="text"
                    />
                    {/* {error && address.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Create your password*
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
                    Create Helper
                  </button>
                  <div className="succbtn mb-4">
                    {succbtn ? <p>{succbtn}</p> : null}
                  </div>
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
            Helper
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateHelper;
