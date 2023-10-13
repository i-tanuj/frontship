import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../css/dispatchlist.css";
import Navbar from "../Navbar";
import CreateDriver from "./CreateDriver";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Input, Button, Modal, ModalBody } from "reactstrap";


function DriverList() {
  const [contact, getContact] = useState([]);
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
  const [filteredData, setFilteredData] = useState([]);
  const [showAllData, setShowAllData] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDataCreated = () => {
    fetchData();
  };


  
  const [editData, setEditData] = useState({
    id: null,
    full_name: "",
    email: "",
    phone: "",
    address: "",
    altpassword: "",
  });


  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/driver"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  
  async function deleteData(id) {
    setSelectedItemId(id); // Store the selected item's ID
    setModalIsOpenDelete(true); // Open the modal
  }


async function confirmDelete(id) {
  try {
    await axios.delete(`https://shipment-backend.onrender.com/api/driverdelete/${selectedItemId}`);
    // Remove the deleted item from the local state
    const updatedData = data.filter((item) => item.id !== selectedItemId);
    setData(updatedData);
    setModalIsOpenDelete(false); // Close the modal
    toast.success('Driver Deleted Successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}



function editDataItem(item) {
  setEditData(item );
  setModalIsOpenEdit(true);
}
async function updateData() {
  try {
    await axios.put(
      `https://shipment-backend.onrender.com/api/updatedriver/${editData.id}`,
      {
        full_name: editData.full_name,
        email: editData.email,
        phone: editData.phone,
        address: editData.address,
        altpassword : editData.altpassword,
      }
    );
    toast.success('Driver Updated Successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    setModalIsOpenEdit(false);
    fetchData(); // Refresh data after update
  } catch (error) {
    console.error("Error updating data:", error);
  }
}




useEffect(() => {
  filterData();
}, [startDate, endDate, data]);


useEffect(() => {
  // Initially display all data
  setFilteredData(data);
  setShowAllData(true);
}, [data]); // Trigger when data changes

const filterData = () => {
  const filterStartDate = new Date(startDate).getTime(); // Parse start date
  const filterEndDate = new Date(endDate).getTime(); // Parse end date

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.DateAndTime).getTime(); // Parse DateAndTime

    // Check if the item date is within the selected range
    return itemDate >= filterStartDate && itemDate <= filterEndDate;
  });

  setFilteredData(filteredData);
  setShowAllData(false); // Set showAllData to false after filtering
};



  function exportToExcel() {
    const data = contact.map((item) => [
      item.full_name,
      item.email,
      item.phone,
      item.address,
      item.altpassword,
    ]);
  
    const ws = XLSX.utils.aoa_to_sheet([
      ['Driver Name', 'Email', 'Phone Number', 'Address', 'Password'],
      ...data,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Driver Records');
  
    const blob = new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
      type: 'application/octet-stream',
    });
  
    FileSaver.saveAs(blob, 'DriverRecords.xlsx');
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
              value={editData.full_name}
          onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Edit Email"
              value={editData.email}
          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="phone"
              id="phone"
              placeholder="Edit Phone Number "
              value={editData.phone}
          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Edit Address "
              value={editData.address}
          onChange={(e) => setEditData({ ...editData, address: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="password"
              id="password"
              placeholder="Edit Password"
            
              value={editData.altpassword}
          onChange={(e) => setEditData({ ...editData, altpassword: e.target.value })}
            />
          </FormGroup>
          <p id="edit-validate-batch" style={{ color: "red" }}></p>
          <Button
            variant="contained"
            className="main_botton"
            style={{ backgroundColor: "#6A3187" }}
            onClick={updateData}
          >
            Update Driver List
          </Button>
        </Form>
      </Modal>

      <Modal isOpen={modalIsOpenDelete} onRequestClose={() => setModalIsOpenDelete(false)} className="modal_body-delete">
        <ModalBody className="delete-popup-icon-holder">
        <div className="delete-popup-icon">
        <h3 class="card-header-01" style={{ color: "grey", textAlign: "center" }}>
            Do you really want to delete?
          </h3>
        
          <AiOutlineClose
            className="main_AiOutlineClose close-icon"
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
            <Button
              outline
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
                <div className='datepicker-date-comm'>
                {/* <span className="calender-icon"> */}
                <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
                        {/* <img className="calender-icon" src="assets/dashboard/calendar.png" alt="" /> */}
                      {/* </span> */}
                      {/* <span className="calender-icon"> */}
                      <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
                        {/* <img class="calender-icon" src="assets/dashboard/calendar.png" alt="" /> */}
                      {/* </span> */}
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
                    <CreateDriver onDataCreated={handleDataCreated}/>
                  </div>
                       <div className="export-btn">
            <button className="create-dispatcher p-3 mt-0 mx-3" onClick={exportToExcel}>Export to Excel</button>
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
                {showAllData ? (
          filteredData.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    }).map((item, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <span className="dispatcher-id">{i + 1}</span>
                        </th>
                        <td>{item.id}</td>
                        <td>{item.full_name}</td>
                        <td className="dis-email text-left">{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.altpassword}</td>

                        <td>10</td>
                        <td>
                          <button
                            className="btn btn1"
                            onClick={() => editDataItem(item)}

                          >
                            <i class="bi bi-pen"></i>
                          </button>
                          <button
                            className="btn bt"
                            onClick={() => {
                                 deleteData(item.id);
                            }}
                          >
                            <i class="bi bi-trash delete"></i>
                          </button>
                        </td>
                      </tr>

          ))
        ) : filteredData.length === 0 ? (
          <td className="">No data found for the selected date range.</td>
        ) : (
          filteredData.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    }).map((item, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <span className="dispatcher-id">{i + 1}</span>
                        </th>
                        <td>{item.id}</td>
                        <td>{item.full_name}</td>
                        <td className="dis-email text-left">{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.altpassword}</td>

                        <td>10</td>
                        <td>
                          <button
                            className="btn btn1"
                            onClick={() => editDataItem(item)}

                          >
                            <i class="bi bi-pen"></i>
                          </button>
                          <button
                            className="btn bt"
                            onClick={() => {
                                 deleteData(item.id);
                            }}
                          >
                            <i class="bi bi-trash delete"></i>
                          </button>
                        </td>
                      </tr>
          ))
        )}
                  {/* {filteredData.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.full_name.toLowerCase().includes(search);
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <span className="dispatcher-id">{i + 1}</span>
                        </th>
                        <td>{item.id}</td>
                        <td>{item.full_name}</td>
                        <td className="dis-email text-left">{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.altpassword}</td>

                        <td>10</td>
                        <td>
                          <button
                            className="btn btn1"
                            onClick={() => editDataItem(item)}

                          >
                            <i class="bi bi-pen"></i>
                          </button>
                          <button
                            className="btn bt"
                            onClick={() => {
                                 deleteData(item.id);
                            }}
                          >
                            <i class="bi bi-trash delete"></i>
                          </button>
                        </td>
                      </tr>
                    ))} */}
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

export default DriverList;