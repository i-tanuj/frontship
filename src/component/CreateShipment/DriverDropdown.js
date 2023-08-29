import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"; // Import the modal component library

function DriverDropdown() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    email: "",
    phoneno: "",
    address: "",
  }); // State for edit form

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://shippingbackend-production.up.railway.app/api/createhelper"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function deleteData(id) {
    setSelectedItemId(id);
    setModalIsOpen(true);
  }

  async function confirmDelete() {
    try {
      await axios.delete(`https://shippingbackend-production.up.railway.app/api/helperdelete/${selectedItemId}`);
      const updatedData = data.filter((item) => item.id !== selectedItemId);
      setData(updatedData);
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  function editDataItem(item) {
    setEditData(item);
    setEditModalIsOpen(true);
  }

  async function updateData() {
    try {
      await axios.put(
        `https://shippingbackend-production.up.railway.app/api/updatehelperapi/${editData.id}`,
        {
          name: editData.name,
          email: editData.email,
          phoneno: editData.phoneno,
          address: editData.address,
        }
      );
      setEditModalIsOpen(false);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneno}</td>
              <td>{item.address}</td>
              <td>
                <button onClick={() => editDataItem(item)}>Edit</button>
                <button onClick={() => deleteData(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <button onClick={confirmDelete}>Yes</button>
        <button onClick={() => setModalIsOpen(false)}>No</button>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModalIsOpen} onRequestClose={() => setEditModalIsOpen(false)}>
        <h2>Edit Item</h2>
        <input
          type="text"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        />
        <input
          type="text"
          value={editData.email}
          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
        />
        <input
          type="text"
          value={editData.phoneno}
          onChange={(e) => setEditData({ ...editData, phoneno: e.target.value })}
        />
        <input
          type="text"
          value={editData.address}
          onChange={(e) => setEditData({ ...editData, address: e.target.value })}
        />
        <button onClick={updateData}>Update</button>
        <button onClick={() => setEditModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default DriverDropdown;
