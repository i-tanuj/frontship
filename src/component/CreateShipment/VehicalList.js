import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../css/dispatchlist.css";
import Navbar from "../Navbar";
import CreateVehical from "../CreateShipment/CreateVehical";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";

import "react-toastify/dist/ReactToastify.css";

import { Form, FormGroup, Input, Button, Modal, ModalBody } from "reactstrap";

async function ContactData(getContact) {
  await axios
    .get( 
      "https://shippingbackend-production.up.railway.app/api/creatvehical",
      // { inst_hash: localStorage.getItem('inst_hash_manual') },
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((res) => {
      console.log(res.data);
      getContact(res.data);
    });
}
//************************************************************** */

const currentDate = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  hour12: true,
});

// async function updateBatch(id,name,vehicalplate,setModalIsOpenEdit,getBatchList){
//   if (name != "" && vehicalplate != "") {
//       await axios.post('https://shippingbackend-production.up.railway.app/api/updatevehical',
//       {inst_hash: localStorage.getItem('inst_hash'),
//       id : id,
//       name: name,
//       vehicalplate: vehicalplate,
//       DateAndTime: currentDate, // Adding current date and time to the data object
//       },
//       {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
//   )
//   ContactData(getBatchList)
//   toast.success('Vehical Updated Successfully!', {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//   });
//   setModalIsOpenEdit(false)
//   // Reload the page after the update is successful
//   window.location.reload();
// } else {
//   document.getElementById("edit-validate-batch").innerHTML =
//     "*Please fill required field!";
//   console.log("Error :", "Please fill required field");
// }
// }

async function updateBatch(
  id,
  name,
  vehicalplate,
  setModalIsOpenEdit,
  getBatchList
) {
  if (name !== "" && vehicalplate !== "") {
    await axios.post(
      "https://shippingbackend-production.up.railway.app/api/updatevehical",
      {
        inst_hash: localStorage.getItem("inst_hash"),
        id: id,
        name: name,
        vehicalplate: vehicalplate,
        DateAndTime: currentDate, // Adding current date and time to the data object
      },
      { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    // ContactData(getContact,DefaultgetContact);

    // Update the batch list data without refreshing the page
    await getBatchList();

    toast.success("Vehicle Updated Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });

    setModalIsOpenEdit(false);
    // ContactData(getContact,DefaultgetContact);
    window.location.reload();
  } else {
    document.getElementById("edit-validate-batch").innerHTML =
      "*Please fill required fields!";
    console.log("Error:", "Please fill required fields");
  }
}

//************************************************************** */
async function deleteContact(ids, getContact, DefaultgetContact) {
  const results = await axios.post(
    "https://shippingbackend-production.up.railway.app/api/delvehical",
    {
      id: ids,
    },
    { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  toast.success("Vehical Deleted Successfully!", {
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

function VehicalList() {
  const [data, setData] = useState([]);

  const [contact, getContact] = useState([]);
  const [name, setName] = useState("");
  const [vehicalplate, setVehicalplate] = useState("");
  const [batchList, getBatchList] = useState([]);

  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [ids, setIds] = useState("");
  const [search, setSearch] = useState("");
  console.log(search);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);
  console.warn(contact);

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
        "https://shippingbackend-production.up.railway.app/api/creatvehical"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  function handleInput(e) {
    setName(e.target.value);
  }

  function handleEditClick(helper) {
    setIds(helper.id);
    setName(helper.name);
    setVehicalplate(helper.vehicalplate);
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
          <h5 className="main_h5">Edit Vehical List</h5>
        </ModalBody>
        <Form className="form_main ">
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Edit Vehicle Name"
              onChange={(e) => handleInput(e)}
              value={name}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              name="vehicalplate"
              id="vehicalplate"
              placeholder="Edit Vehicle Number"
              onChange={(e) => {
                setVehicalplate(e.target.value);
              }}
              value={vehicalplate}
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
                vehicalplate,
                setModalIsOpenEdit,
                getBatchList
              )
            }
          >
            Update Vehical List
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
              <h2>All Vehical List</h2>
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
                  <h2>All Vehical List</h2>
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
                    <CreateVehical />
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
                    <th scope="col">Vehical Name</th>
                    {/* <th scope="col">Vehical Email</th> */}
                    {/* <th scope="col">Vehical Phone number</th> */}
                    <th scope="col">Vehical plate</th>
                    <th scope="col">Registration Date</th>

                    <th scope="col" class="borderre1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  {filteredData.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <span className="dispatcher-id">{i + 1}</span>
                        </th>
                        <td>{item.name}</td>
                        <td>{`#` + item.vehicalplate}</td>
                        <td>{item.DateAndTime}</td>
                        <td>
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
      <ToastContainer />
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

export default VehicalList;
