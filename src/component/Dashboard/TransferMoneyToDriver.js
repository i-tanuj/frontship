import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
// import "../../css/shippment.css";
import '../../css/transfermoneytodriver.css'
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TransferMoneyToDriver() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shipment_id, setShipmentid] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [succbtn, setSuccbtn] = useState();
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    // Fetch the data from the API
    axios.get('https://shipment-backend.onrender.com/api/driver')
      .then(response => {
        setDrivers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };
  const currentDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });
  // const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      full_name: selectedDriver,
      shipment_id,
      amount,
      DateAndTime: currentDate, // Adding current date and time to the data object

    };

    if (selectedDriver === '' || shipment_id === '' || amount === '') {
      setError(true);
      setSuccbtn(<span className="" style={{ color: 'red' }}>Please fill all the fields</span>);
    } else {
      setError(false);
      setSuccbtn('');
      axios.post('https://shipment-backend.onrender.com/api/payment', dataToSubmit)
        .then((response) => {
          console.log(response.data);
          setSuccbtn(<span className="" style={{ color: 'green' }}>Submitted Successfully</span>);
    setModalIsOpen(false);
    toast.success("Transfer Amount Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
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
                <h5 className="card-header-01 text-center">Transfer money to Driver</h5>
                <ModalBody className="close-icon">
                  <AiOutlineClose
                    className="main_AiOutlineClose"
                    onClick={() => setModalIsOpen(false)}
                    color="rgba(27, 38, 68, 1)"
                  />
                </ModalBody>
              </div>
              <div className="row card-holder">
                <form className="form-control-holder" onSubmit={handleSubmit} >
                    
                  <div className="d-flex Transfer-form">
                  <div className="mb-4">
                    <label for="exampleInputEmail1" className="form-label">
                    Driver Name<span className="stra-icon">*</span>
                    </label>
                  
                    <select name="full_name"  id="full_name" onChange={handleDriverChange} value={selectedDriver}>
                    
        <option  value="">Select a driver</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.full_name}>
            {driver.full_name}
          </option>
        ))}
      </select>


                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                    Shipment ID<span className="stra-icon">*</span>
                    </label>
                    <input 
                       name="shipment_id"   
                       onChange={(e)=> setShipmentid(e.target.value)}          
                       id="shipment_id"
                       placeholder="Enter Shipment ID"
                       type="number"
                    />
                    
                     {error && shipment_id.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter Shipment ID*</span>:""}

                  </div>
                  </div>

                  <div className="mb-4 w-50 Transfer-form ">
                    <label className="form-label">
                    Transfer Amount<span className="stra-icon">*</span>
                    </label>
                    <input
                       name="amount"   
                       onChange={(e)=> setAmount(e.target.value)}          
                       id="amount"
                       placeholder="Enter Amount"
                       type="number"
                    />
                     {error && amount.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter Amount*</span>:""}

                  </div>
                  <button type="submit" className="submit-btn"  value="Send Message">
                  Transfer Amount
                  </button>
                  <div className="succbtn mb-4" >{succbtn ? <p>{succbtn}</p> : null}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="d-flex shipment-bnt">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            Transfer money to Driver
          </button>
      </div>
    </div>
  );
}

export default TransferMoneyToDriver;
