import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import "../css/navbar.css";
import axios from "axios";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Input, Modal, ModalBody } from "reactstrap";


function EditProfile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const [editData, setEditData] = useState({
    id: null,
    username: "",
    contact: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/identities");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function editDataItem(item) {
    setEditData(item);
    setModalIsOpen(true);
  }
  async function updateData() {
    try {
      await axios.put(`http://localhost:5000/api/updateadminapi/${editData.id}`, {
        username: editData.username,
        password: editData.password,
        contact: editData.contact,
      });
      toast.success("Admin Details Updated Successfully!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setModalIsOpen(false);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

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
                <form className="mb-b">
                  <div class="form-group mb-4">
                    <label for="exampleInputEmail1" className="fontSize">
                      User Name
                    </label>
                    {/* <input type="password" class="form-control form-control-sm"/> */}
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Edit User Name"
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="exampleInputEmail1" className="fontSize">
                      Contact Number
                    </label>
                    {/* <input type="password" class="form-control form-control-sm"/> */}
                    <input
                      type="text"
                      name="contact"
                      value={editData.contact}
                      onChange={(e) =>
                        setEditData({ ...editData, contact: e.target.value })
                      }
                      placeholder="Contact Number"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="exampleInputEmail1" className="fontSize">
                      Password
                    </label>
                    {/* <input type="password" class="form-control form-control-sm"/> */}
                    <input
                      type="text"
                      name="password"
                      value={editData.password}
                      onChange={(e) =>
                        setEditData({ ...editData, password: e.target.value })
                      }
                      placeholder="Password"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <button
                    // type="submit"
                    onClick={updateData}
                    class="btn submit-btn"
                  >
                    Update Profile
                  </button>
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
              {data.map((item, i) => (
                <NavItem>
                  <img
                    src="/Assets/Navbar/profile.png"
                    // onClick={() => setModalIsOpen(true)}
                    onClick={() => editDataItem(item)}
                  />
                </NavItem>
              ))}
            </Link>
<ToastContainer />
          </div>
        </Nav>
      </div>
    </div>
  );
}

export default EditProfile;
