import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../css/dispatchlist.css";
import Navbar from "../Navbar";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { toast, ToastContainer } from "react-toastify";

import { Form, FormGroup, Input, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";

function ShipmentDetails() {
  const [contact, getContact] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  function handleInput(e) {
    setName(e.target.value);
  }

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://shippingbackend-production.up.railway.app/api/mergeapidata')
      .then((response) => {
        setCustomerData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalIsOpenDelete(true);
  };


  if (loading) {
    return <p>Loading...</p>;
  }

 

  const confirmDelete = () => {
    axios.delete(`https://shippingbackend-production.up.railway.app/api/deleteShipmentsby/${deleteId}`)
      .then(() => {
        setCustomerData((prevData) => prevData.filter((customer) => customer.shipment_id !== deleteId));
        toast.success('Shipment deleted successfully!');
        setModalIsOpenDelete(false);
        setTimeout(fetchData, 2000);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        toast.error('Error deleting data.');
        setModalIsOpenDelete(false);
      });
  };

  function exportToExcel() {
    const data = contact.map((item) => [
      item.driver_id,
      item.customer_name,
      item.pick_up_location,
      item.helper1,
      item.helper2,
      item.drop_date,
      item.vehicleplate,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      [
        "Driver Name",
        "Customer Name.",
        "Delivery Details",
        "Helper 1",
        "Helper 2",
        "Date & Time Of Delivery",
        "Vehicle Plate No.",
      ],
      ...data,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Shipment Records");

    const blob = new Blob(
      [s2ab(XLSX.write(wb, { bookType: "xlsx", type: "binary" }))],
      {
        type: "application/octet-stream",
      }
    );

    FileSaver.saveAs(blob, "ShipmentRecords.xlsx");
  }

  // Convert data to array buffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filteredData = data.filter((item) => {
    if (startDate && endDate) {
      const itemDate = new Date(item.DateAndTime);
      return itemDate >= startDate && itemDate <= endDate;
    }
    return true;
  });

  return (
    <section class="homedive ">
      <Modal
        isOpen={modalIsOpenEdit}
        className="main_modal_body dispatcher-list-form"
      >
        <ModalBody className="modal_body">
          <AiOutlineClose
            className="main_AiOutlineClose close-icon"
            onClick={() => setModalIsOpenEdit(false)}
          />
          <h5 className="main_h5">Edit Dispatcher List</h5>
        </ModalBody>
        <Form className="form_main ">
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Edit Name"
              onBlur={(e) => handleInput(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Edit Email"
              onBlur={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="phone"
              id="phone"
              placeholder="Edit Phone Number "
              onBlur={(e) => {
                setPhone(e.target.value);
                console.log(e.target.value);
              }}
            />
          </FormGroup>
          <p id="edit-validate-batch" style={{ color: "red" }}></p>
          <Button
            variant="contained"
            className="main_botton"
            style={{ backgroundColor: "#6A3187" }}
          >
            Update Shipment List
          </Button>
        </Form>
      </Modal>

      <Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
        <ModalBody className="delete-popup-icon-holder">
          <div className="delete-popup-icon">
            <h3
              class="card-header-01"
              style={{ color: "grey", textAlign: "center" }}
            >
              Do you really want to delete?
            </h3>
            <AiOutlineClose
              className="main_AiOutlineClose close-icon-delete"
              onClick={() => setModalIsOpenDelete(false)}
              color="black"
            />
          </div>
        </ModalBody>
        <Form className="">
          <div
            className="d-flex justify-content-center mt-5"
            style={{ marginBottom: "50px" }}
          >
            <Button outline 
            onClick={confirmDelete}
            >
              Yes
            </Button>
            &nbsp;
            <Button outline onClick={() => setModalIsOpenDelete(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>

      <div class="rightdiv px-3 py-2">
        <div class="container-fluid table-header-title">
          <div class="row">
            <div class="w-50 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 nameuser">
              <h2>Shipment Record</h2>
            </div>
            <div class="w-50 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              <div class="input-group input-group-lg">
                <span
                  style={{ backgroundColor: "#fff" }}
                  class="input-group-text"
                  id="basic-addon1"
                >
                  <i class="bi bi-search"></i>
                </span>
                <input
                  style={{ fontSize: "15px" }}
                  className="form-control me-2 serch-filed"
                  type="search"
                  placeholder="Search Here"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row pt-0">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
              <Navbar />
            </div>
            <div class="col p-0 shipment-view-pending-cencal">
              <div className="driver-view-list">
                <div className="">
                  <h2>Shipment List</h2>
                </div>

                <div className="datepicker-date-comm">
                  <span className="calender-icon">
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Start Date"
                    />
                    <img
                      className="calender-icon"
                      src="assets/dashboard/calendar.png"
                      alt=""
                    />
                  </span>
                  <span className="calender-icon">
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="End Date"
                    />
                    <img
                      class="calender-icon"
                      src="assets/dashboard/calendar.png"
                      alt=""
                    />
                  </span>
                </div>

                <div class="w-30 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                  <div class="input-group input-group-lg">
                    <span
                      style={{ backgroundColor: "#fff" }}
                      class="input-group-text"
                      id="basic-addon1"
                    >
                      <i class="bi bi-search"></i>
                    </span>
                    <input
                      style={{ fontSize: "15px" }}
                      className="form-control me-2 serch-filed"
                      type="search"
                      placeholder="Search Here"
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="export-btn">
                    <button
                      className="create-dispatcher p-3 mt-0 mx-3"
                      onClick={exportToExcel}
                    >
                      Export to Excel
                    </button>
                  </div>
                  <div className="Back-btn-01">
                    <a href="/">Back</a>
                  </div>
                </div>
              </div>
              <table
                class="table align-middle bg-white rounded m-0"
                id="table-to-xls"
              >
                <thead class="tableheading">
                  <tr>
                    {/* <th scope="col" class="borderre">No.</th> */}
                    <th scope="col">Driver Name</th>
                    <th scope="col">Customers Name</th>
                    <th scope="col">Delivery Detail</th>
                    <th scope="col">Helper 1</th>
                    <th scope="col">Helper 2</th>
                    <th scope="col">Date & Time of Delivery</th>
                    <th scope="col">Vehicle Plate No.</th>
                    <th scope="col" class="borderre1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  {customerData
                    .filter((customer) => {
                      return (
                        search.trim() === "" ||
                        customer.customer_name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      );
                    })
                    .map((customer, i) => (
                      <tr key={i}>
                        {/* <th scope="row"><span className="dispatcher-id">{i+1}</span></th> */}
                        {/* <td>{item.id}</td> */}
                        <td>{customer.driver_id}</td>
                        <td>{customer.customer_name}</td>
                        <td>{customer.pick_up_location}</td>
                        <td>{customer.helper1}</td>
                        <td>{customer.helper2}</td>
                        <td>{customer.drop_date}</td>
                        <td>{customer.vehicleplate}</td>
                        <td>
                          {/* <button className="btn bt"><a href="#" class="eye"><i class="bi bi-pen"></i></a></button> */}
                          {/* <button className='btn btn1' onClick={()=>{setModalIsOpenEdit(true); setIds(item.id)}}><i class="bi bi-pen"></i></button> */}
                          <button
                            className="btn bt"
                            onClick={() => handleDelete(customer.shipment_id)}
                          >
                            <i class="bi bi-trash delete"></i>
                          </button>
                          {/* <a href='/view'> */}
                          <Link to={`/view/${customer.id}`}>
                            <button className="btn bt">
                              <i class="bi bi-eye"></i>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={prePage}>
                      Previous
                    </a>
                  </li>
                  {numbers.map((n, i) => {
                    <li
                      className={`page-item ${
                        currentPage === n ? "active" : ""
                      }`}
                      key={i}
                    >
                      <a
                        href="#"
                        className="page-link"
                        onClick={() => changeCPage(n)}
                      >
                        {n}
                      </a>
                    </li>;
                  })}
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={nextPage}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default ShipmentDetails;
