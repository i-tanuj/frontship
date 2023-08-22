import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../css/dispatchlist.css";
import Navbar from "../Navbar";
import CreateDispatch from "./CreateDispatch";
import DatePicker from "react-datepicker";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, FormGroup, Input, Button, Modal, ModalBody } from "reactstrap";

async function ContactData(getContact) {
  await axios
    .get(
      "https://shippingbackend-production.up.railway.app/api/dispatcher",
      // { inst_hash: localStorage.getItem('inst_hash_manual') },
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((res) => {
      getContact(res.data);
    });
}
//************************************************************** */

async function updateBatch(
  id,
  name,
  email,
  phone,
  password,
  setModalIsOpenEdit,
  getBatchList
) {
  if (name !== "" && email !== "" && phone !== "" && password !== "") {
    await axios.post(
      "https://shippingbackend-production.up.railway.app/api/updatedispatcher",
      {
        inst_hash: localStorage.getItem("inst_hash"),
        id: id,
        name: name,
        email: email,
        phone: phone,
        password: password,
      },
      { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    ContactData(getBatchList);
    setModalIsOpenEdit(false);
    toast.success('Dispatcher Updated Successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  } else {
    document.getElementById("edit-validate-batch").innerHTML =
      "*Please fill required field!";
    console.log("Error :", "Please fill required field");
  }
}

//************************************************************** */
async function deleteContact(ids, getContact, DefaultgetContact) {
  const results = await axios.post(
    "https://shippingbackend-production.up.railway.app/api/deldispatcher",
    {
      id: ids,
    },
    { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  toast.success('Dispatcher Deleted Successfully!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });
  if (results.status == 200) {
    ContactData(getContact, DefaultgetContact);
  }
}

function DispatchList() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [contact, getContact] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [batchList, getBatchList] = useState([]);

  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [ids, setIds] = useState("");
  const [search, setSearch] = useState("");
  // console.log(search);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);
  console.warn(contact);

  function handleInput(e) {
    setName(e.target.value);
  }

  function handleEditClick(dispatcher) {
    setIds(dispatcher.id);
    setName(dispatcher.name);
    setEmail(dispatcher.email);
    setPhone(dispatcher.phone);
    setPassword(dispatcher.password);
    setModalIsOpenEdit(true);
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
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shippingbackend-production.up.railway.app/api/createhelper"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


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
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Edit Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="phone"
              id="phone"
              placeholder="Edit Phone Number "
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="password"
              id="password"
              placeholder="Edit Password "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </FormGroup>
          <p id="edit-validate-batch" style={{ color: "red" }}></p>
          <Button
            variant="contained"
            className="main_botton"
            style={{ backgroundColor: "#6A3187" }}
            onClick={() =>
              updateBatch(
                ids,
                name,
                email,
                phone,
                password,
                setModalIsOpenEdit,
                getBatchList
              )
            }
          >
            Edit Dispatcher List
          </Button>
        </Form>
      </Modal>

      <Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
        <ModalBody className="">
          <AiOutlineClose
            className="main_AiOutlineClose"
            onClick={() => setModalIsOpenDelete(false)}
            color="black"
          />
        </ModalBody>
        <Form className="">
          <h3 style={{ color: "grey", textAlign: "center" }}>
            Do you really want to delete?
          </h3>
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "50px" }}
          >
            <Button
              outline
              onClick={() => {
                deleteContact(ids, getContact, DefaultgetContact);
                setModalIsOpenDelete(false);
              }}
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

      <div class="rightdiv px-3 py-5">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 nameuser">
              <h1>All Dispatcher List</h1>

              {/* <p>May 22, 2023</p>  */}
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
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

          <div className="row mt-3">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
              <Navbar />
            </div>
            <div class="col view-table-new">
              <div className="driver-view-list">
                <div className="">
                  <h2>All Dispatcher List</h2>
                </div>
                <div  className='datepicker-date-comm'>
                <span className="calender-icon">
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="Start Date"
                        />
                        <img className="calender-icon" src="assets/dashboard/calendar.png" alt="" />
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
                        <img class="calender-icon" src="assets/dashboard/calendar.png" alt="" />
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
                <div className="add-new-form-btn">
                    <CreateDispatch />
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
                    <th scope="col" class="borderre">
                      No.
                    </th>
                    <th scope="col">Dispatcher Id</th>
                    <th scope="col">Dispatcher Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Phone number</th>

                    <th scope="col" class="borderre1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  {records
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <span className="dispatcher-id">{i + 1}</span>
                        </th>
                        {/* <td>{item.id}</td> */}
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td className="dis-email text-left">{item.email}</td>
                        <td>{item.password}</td>
                        <td>{item.phone}</td>
                        <td>
                          {/* <button className="btn bt"><a href="#" class="eye"><i class="bi bi-pen"></i></a></button> */}
                          <button
                            className="btn btn1"
                            onClick={() => handleEditClick(item)}
                          >
                            <i class="bi bi-pen"></i>
                          </button>
                          <button
                            className="btn bt"
                            onClick={() => {
                              setModalIsOpenDelete(true);
                              setIds(item.id);
                            }}
                          >
                            <i class="bi bi-trash delete"></i>
                          </button>
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
      <ToastContainer/>

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

export default DispatchList;
