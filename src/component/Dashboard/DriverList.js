import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../css/dispatchlist.css";
import Navbar from "../Navbar";
import CreateDriver from "./CreateDriver";

import { Form, FormGroup, Input, Button, Modal, ModalBody } from "reactstrap";

async function ContactData(getContact) {
  await axios
    .get("https://shipment-backend.onrender.com/api/driver", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      getContact(res.data);
    });
}
//************************************************************** */

//************************************************************** */
async function deleteContact(ids, getContact, DefaultgetContact) {
  const results = await axios.post(
    "https://shipment-backend.onrender.com/api/deldriver",
    {
      id: ids,
    },
    { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  console.log(results);
  if (results.status == 200) {
    ContactData(getContact, DefaultgetContact);
  }
}

async function updateBatch(
  id,
  full_name,
  email,
  password,
  phone,
  address,
  setModalIsOpenEdit,
  getBatchList
) {
  if (
    full_name != "" &&
    email != "" &&
    phone != "" &&
    address != "" &&
    password != ""
  ) {
    await axios.post(
      "https://shipment-backend.onrender.com/api/updatedriver",
      {
        inst_hash: localStorage.getItem("inst_hash"),
        id: id,
        full_name: full_name,
        email: email,
        phone: phone,
        password: password,
        address: address,
      },
      { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    ContactData(getBatchList);
    setModalIsOpenEdit(false);
  } else {
    document.getElementById("edit-validate-batch").innerHTML =
      "*Please fill required field!";
    console.log("Error :", "Please fill required field");
  }
}

function DriverList() {
  const [contact, getContact] = useState([]);
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [batchList, getBatchList] = useState([]);

  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [ids, setIds] = useState("");
  const [search, setSearch] = useState("");
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
    setFullName(e.target.value);
  }

  function handleEditClick(driver) {
    setIds(driver.id);
    setFullName(driver.full_name);
    setEmail(driver.email);
    setPhone(driver.phone);
    setAddress(driver.address);
    setPassword(driver.password);
    setModalIsOpenEdit(true);
  }

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
          <h5 className="main_h5">Edit Driver List</h5>
        </ModalBody>
        <Form className="form_main ">
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Edit Name"
              onChange={(e) => setFullName(e.target.value)}
              value={full_name}
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
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Edit Address "
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="password"
              id="password"
              placeholder="Edit Password"
              onChange={(e) => setPassword(e.target.value)}
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
                full_name,
                email,
                phone,
                address,
                password,
                setModalIsOpenEdit,
                getBatchList
              )
            }
          >
            Edit Driver List
          </Button>
        </Form>
      </Modal>

      <Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
        <ModalBody className="dispatcher-list-form">
          <AiOutlineClose
            className="main_AiOutlineClose close-icon"
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
              <h1>All Driver List</h1>
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
                  <h2>All Driver List</h2>
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
                <div className="d-flex">
                  <div className="add-new-form-btn">
                    <CreateDriver />
                  </div>
                  <div className="Back-btn-01">
                    <a href="#">Back</a>
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
                    <th scope="col" class="borderre">
                      Driver ID
                    </th>
                    <th scope="col">Driver Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">Address</th>
                    <th scope="col">password</th>
                    <th scope="col">Total Orders</th>

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
                        : item.full_name.toLowerCase().includes(search);
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <span className="dispatcher-id">{i + 1}</span>
                        </th>
                        {/* <td>{item.id}</td> */}
                        <td>{item.id}</td>
                        <td>{item.full_name}</td>
                        <td className="dis-email text-left">{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.password}</td>

                        <td>12</td>
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

export default DriverList;
