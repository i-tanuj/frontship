import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../css/dispatchlist.css";
import { DateTime } from "luxon";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { Form, FormGroup, Input, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

async function ContactData(getContact, id) {
  await axios
    .get("https://shipment-backend.onrender.com/api/creatcustomer", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      getContact(res.data);
    });
}

function ShipmentRecords() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [dispatchname, setDispatchName] = useState("");
  const [discontactnum, setDiscontactnum] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Initialize search term as empty
  const [pickUpLocation, setPickUpLocation] = useState(""); // Pick-up Location
  const [dropLocation, setDropLocation] = useState(""); // Pick-up Location
  const [contact, getContact] = useState([]);
  const [name, setName] = useState("");
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
  const [selectedHelper1, setSelectedHelper1] = useState("");
  const [selectedHelper, setSelectedHelper] = useState("");
  const [helpers, setHelpers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [selectedDispatcher1, setSelectedDispatcher1] = useState("");
  const [selectedDispatcher2, setSelectedDispatcher2] = useState("");
  const [selectedDispatcher3, setSelectedDispatcher3] = useState("");
  const [searchText, setSearchText] = useState(""); // Search text for filtering by customer name
  const [editItem, setEditItem] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedCustomerName2, setSelectedCustomerName2] = useState("");
  const [selectedShipmentId, setSelectedShipmentId] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [customerNames, setCustomerNames] = useState([]);
  const [customerNames2, setCustomerNames2] = useState([]);
  const [driverIds, setDriverIds] = useState([]); // To store all driver IDs
  const [selectedHelper2, setSelectedHelper2] = useState("");
  const [helper1Options, setHelper1Options] = useState([]); // Helper 1 options
  const [helper2Options, setHelper2Options] = useState([]);
  const [customerContact, setCustomerContact] = useState(""); // Customer Contact
  const [customerContact2, setCustomerContact2] = useState(""); // Customer Contact
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAltNum, setCustomerAltNum] = useState(""); // Customer Alternate Number
  const [customerEmail, setCustomerEmail] = useState(""); // Customer Alternate Number
  const [customerEmail1, setCustomerEmail1] = useState(""); // Customer Alternate Number
  const [pickupDate, setPickupDate] = useState(""); // Customer Alternate Number
  const [dropDate, setDropDate] = useState(""); // Customer Alternate Number
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [altphone, setAltphone] = useState("");
  const [altphone1, setAltphone1] = useState("");
  const [phone, setPhone] = useState("");
  const [phone1, setPhone1] = useState("");
  const [pickuplocation, setPickuplocation] = useState("");
  const [pickuplocation1, setPickuplocation1] = useState("");
  const [pickupdate, setPickupdate] = useState("");
  const [dropdate, setDropdate] = useState("");
  const [dropdate1, setDropdate1] = useState("");
  const [pickupdate1, setPickupdate1] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [maplink, setmaplink] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectshipdrop, setSelectshipdrop] = useState("");
  const [adddescriptiondrop, setAdddescriptiondrop] = useState("");
  const [adddescriptiondrop1, setAdddescriptiondrop1] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [vehicles, setVehicle] = useState([]);
  const [link, setLink] = useState("");
  const [link1, setLink1] = useState("");
  const [latitude, setLatitude] = useState("");
  const [latitude1, setLatitude1] = useState("");
  const [longitude, setLongitude] = useState("");
  const [longitude1, setLongitude1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [filteredHelpers1, setFilteredHelpers1] = useState([]);
  const [filteredHelpers2, setFilteredHelpers2] = useState([]);
  function handleInput(e) {
    setName(e.target.value);
  }
  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

  const [dispatcherData1, setDispatcherData1] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [dispatcherData2, setDispatcherData2] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [dispatcherData3, setDispatcherData3] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [vehicleData, setVehicleData] = useState({
    id: "",
    name: "",
    email: "",
    vehicalplate: "",
  });

  const handleSelectChange1 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher1(selectedOptionValue);
    console.log(selectedOptionValue);
    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData1 = response.data;
        setDispatcherData1(selectedDispatcherData1);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const vehicleResponse = await axios.get(
          "https://shipment-backend.onrender.com/api/vehicledetails"
        );
        setVehicleDetails(vehicleResponse.data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }

      try {
        const helperResponse = await axios.get(
          "https://shipment-backend.onrender.com/api/createhelper"
        );
        setHelpers(helperResponse.data);
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    }
    fetchData();
  }, []);

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleHelper1Change = (event) => {
    setSelectedHelper1(event.target.value);
  };

  const handleHelper2Change = (event) => {
    setSelectedHelper2(event.target.value);
  };

  useEffect(() => {
    setFilteredHelpers1(
      helpers.filter((helper) => helper.name !== selectedHelper2)
    );
  }, [selectedHelper2, helpers]);

  useEffect(() => {
    setFilteredHelpers2(
      helpers.filter((helper) => helper.name !== selectedHelper1)
    );
  }, [selectedHelper1, helpers]);

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/vehicledetails"
      );
      const vehicleData = response.data;
      setVehicle(vehicleData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  useEffect(() => {
    async function fetchHelpers() {
      try {
        const response = await axios.get(
          "https://shipment-backend.onrender.com/api/createhelper"
        );
        setHelpers(response.data);
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    }
    fetchHelpers();
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("https://shipment-backend.onrender.com/api/mergeapidata")
      .then((response) => {
        setData(response.data);
        const names = response.data.map((item) => item.customer_name);
        setCustomerNames(names);

        const names2 = response.data.map((item) => item.customer_name2);
        setCustomerNames2(names2);

        const ids = response.data.map((item) => item.driver_name);
        const uniqueDriverIds = [...new Set(ids)];
        setDriverIds(uniqueDriverIds);

        const helper1Options = response.data.map((item) => item.helper1);
        const uniqueHelper1Options = [...new Set(helper1Options)];
        setHelper1Options(uniqueHelper1Options);

        const helper2Options = response.data.map((item) => item.helper2);
        const uniqueHelper2Options = [...new Set(helper2Options)];
        setHelper2Options(uniqueHelper2Options);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSelectVehicle = async (event) => {
    const selectedVehicleValue = event.target.value;
    setSelectedVehicle(selectedVehicleValue);
    console.log(selectedVehicleValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedVehicleValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/vehicledata/${selectedVehicleValue}`
        );
        const selectedVehicleData = response.data;
        setVehicleData(selectedVehicleData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  useEffect(() => {
    fetchDispatchers();
  }, []);

  const fetchDispatchers = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/creatcustomer"
      );
      const dispatcherData = response.data;
      setDispatchers(dispatcherData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(data); // If either start or end date is empty, show all data
    } else {
      const filtered = data.filter((customer) => {
        const formattedDate = DateTime.fromISO(customer.created_at, {
          zone: "UTC",
        }); // Assuming the database time is in UTC
        const start = DateTime.fromISO(startDate, { zone: "UTC" });
        const end = DateTime.fromISO(endDate, { zone: "UTC" });

        // Include dates within the selected date range, including the start and end dates
        return (
          start.startOf("day") <= formattedDate.startOf("day") &&
          formattedDate.startOf("day") <= end.startOf("day")
        );
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, data]);

  // Function to handle the search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data); // If search term is empty, show all data
    } else {
      const filtered = data.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const handleSelectChange2 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher2(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData2 = response.data;
        setDispatcherData2(selectedDispatcherData2);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange3 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher3(selectedOptionValue);
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData3 = response.data;
        setDispatcherData3(selectedDispatcherData3);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData = response.data;
        setDispatcherData(selectedDispatcherData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  useEffect(() => {
    axios
      .get("https://shipment-backend.onrender.com/api/mergeapidata")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((customer) => {
        const formattedDate = DateTime.fromISO(customer.created_at, {
          zone: "Asia/Dubai",
        });
        const start = DateTime.fromISO(startDate, { zone: "Asia/Dubai" });
        const end = DateTime.fromISO(endDate, { zone: "Asia/Dubai" });
        return (
          start.startOf("day") <= formattedDate.startOf("day") &&
          formattedDate.startOf("day") <= end.startOf("day")
        );
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, data]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const [editData, setEditData] = useState({
    id: null,
    driver_id: "",
    customer_name: "",
    pick_up_location: "",
    helper1: "",
    helper2: "",
    drop_date: "",
    vehicleplate: "",
    pick_up_before: "",
  });

  const [helperData, setHelperData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

  const handleSelectChange5 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedHelper1(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/helperdata/${selectedOptionValue}`
        );
        const selectedHelperData1 = response.data;
        setHelperData1(selectedHelperData1);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const [helperData1, setHelperData1] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    async function fetchHelpers() {
      try {
        const response = await axios.get(
          "https://shipment-backend.onrender.com/api/createhelper"
        );
        setHelpers(response.data);
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    }
    fetchHelpers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/driver"
      );
      const driversData = response.data;
      setDrivers(driversData);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const availableHelpersForSelectedHelper1 = helpers.filter(
    (helper) => !selectedHelper.includes(helper.id)
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://shipment-backend.onrender.com/api/mergeapidata")
      .then((response) => {
        setCustomerData(response.data);
        // console.log(data.customer_contact);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalIsOpenDelete(true);
  };

  const confirmDelete = () => {
    axios
      .delete(
        `https://shipment-backend.onrender.com/api/deleteShipmentsby/${deleteId}`
      )
      .then(() => {
        setCustomerData((prevData) =>
          prevData.filter((item) => item.shipment_id !== deleteId)
        );
        const updatedData = data.filter(
          (item) => item.shipment_id !== deleteId
        );
        setData(updatedData);
        toast.success("Shipment deleted successfully!");
        setModalIsOpenDelete(false);
        setTimeout(fetchData, 2000);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        toast.error("Error deleting data.");
        setModalIsOpenDelete(false);
      });
  };

  const exportToExcel = () => {
    const dataToExport = filteredData.map((item) => ({
      "Customer Name": item.customer_name,
      "Pickup Date": item.pick_up_before,
      "Customer Contact": item.customer_contact,
      "Customer Alternate Number": item.customer_alt_num,
      "Customer Email": item.customer_email,
      "Pickup Location": item.pick_up_location,
      "Customer Name 1": item.customer_name2,
      "Customer Contact 1": item.customer_contact2,
      "Drop Location": item.drop_location,
      "Drop Date": item.drop_date,
      "Vehicle Plate No.": item.vehicleplate,
      "Helper 1": item.helper1,
      "Helper 2": item.helper2,
      "Driver Name": item.driver_name,
      "Shipment Id": item.shipment_id,
      "Create Date": item.created_at,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(blob, "Shipment_Details.xlsx");
  };

  const handleSelectChange4 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedHelper(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/helperdata/${selectedOptionValue}`
        );
        const selectedHelperData = response.data;
        setHelperData(selectedHelperData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  function editDataItem(customer) {
    setEditData(customer);
    setModalIsOpenEdit(true);
  }

  const saveEditedData = () => {
    const updatedData = {
      customer_name: selectedDispatcher,
      customer_contact: customerContact,
      customer_alt_num: customerAltNum,
      customer_email: customerEmail, // Add this line for customer email
      pick_up_location: pickUpLocation,
      pick_up_before: pickupDate,
      customer_name2: selectedDispatcher1,
      customer_contact2: customerContact2,
      drop_location: dropLocation,
      drop_date: dropDate,
      helper1: selectedHelper1,
      helper2: selectedHelper2,
      driver_name: selectedDriverId,
      vehicleplate: selectedVehicle,
    };

    // Make a PUT request to update the data
    axios
      .put(
        `https://shipment-backend.onrender.com/api/updatecustomer/${editItem.id}`,
        updatedData
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        toast.success("Shipment Details Updated Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setModalIsOpenEdit(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setModalIsOpenEdit(true);
    setSelectedCustomerName(item.customer_name);
    setSelectedCustomerName2(item.customer_name2);
    setSelectedShipmentId(item.shipment_id);
    setSelectedVehicle(item.vehicleplate);
    setSelectedDriverId(item.driver_name);
    setSelectedHelper1(item.helper1);
    setSelectedHelper2(item.helper2);
    setPickupDate(item.pick_up_before);
    setDropDate(item.drop_date);
    setSelectedDispatcher(item.customer_name);
    setSelectedDispatcher1(item.customer_name2);
    setCustomerContact2(item.customer_contact2);
    // console.log("2nd "+ item.customer_contact);

    const selectedCustomer = data.find(
      (customer) => customer.customer_name === item.customer_name
    );

    if (selectedCustomer) {
      setCustomerContact(selectedCustomer.customer_contact);
      setCustomerContact2(selectedCustomer.customer_contact2);
      // console.log("3nd "+ selectedCustomer.customer_contact);
      setCustomerAltNum(selectedCustomer.customer_alt_num);
      setPickUpLocation(selectedCustomer.pick_up_location);
      setDropLocation(selectedCustomer.drop_location);
      setCustomerEmail(selectedCustomer.customer_email);
      setCustomerEmail1(selectedCustomer.customer_email1);
    }
  };

  const initialDispatcherData = {
    phoneno: "",
    email: "",
    altphone: "",
    phone: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log();
    try {
      const response = await axios.post(
        "https://shipment-backend.onrender.com/api/newidshipment",
        {
          customer_name: dispatcherData.name,
          customer_contact: dispatcherData.phoneno,
          customer_email: dispatcherData.email,
          customer_alt_num: dispatcherData.altphone,
          pick_up_location: dispatcherData.address,
          pick_up_before: pickupdate,
          drop_date: dropdate,
          drop_date1: dropdate1,
          latitude: latitude,
          longitude: longitude,
          latitude1: latitude1,
          longitude1: longitude1,
          description: description,
          customer_name2: dispatcherData1.name,
          customer_contact2: dispatcherData1.phoneno,
          drop_location: dispatcherData1.address,
          drop_description: adddescriptiondrop,
          vehicleplate: selectedVehicle,
          helper1: helperData.name,
          helper2: helperData1.name,
          driver_id: selectedDriver.id,
          driver_name: selectedDriver.full_name,
          customer_name1: dispatcherData2.name,
          customer_contact1: dispatcherData2.phoneno,
          customer_email1: dispatcherData2.email,
          customer_alt_num1: dispatcherData2.altphone,
          pick_up_location1: dispatcherData2.address,
          pick_up_before1: pickupdate1,
          description1: description1,
          customer_name21: dispatcherData3.name,
          customer_contact21: dispatcherData3.phoneno,
          drop_location1: dispatcherData3.address,
          drop_description1: adddescriptiondrop1,
        }
      );

      setModalIsOpen(false);
      toast.success("Shipment successfully created!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setDispatcherData(initialDispatcherData);
      setName("");
      setPhone("");
      setPhone1("");
      setEmail("");
      setmaplink("");
      setAltphone("");
      setPickuplocation("");
      setPickupdate("");
      setDescription("");
      setDescription1("");
      setDispatchName("");
      setDiscontactnum("");
      setSelectshipdrop("");
      setAdddescriptiondrop("");
      setSelectedVehicle("");
      setSelectedHelper1("");
      selectedHelper1("");
      setSelectedHelper2("");
      setSelectedDriver("");
      setSelectedDispatcher("");
      setSelectedDispatcher1("");
      setSelectedDispatcher2("");
      setSelectedDispatcher3("");
      setDropdate("");
      setDropdate1("");
      // phoneno("");
      dispatcherData("");
      phone("");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkChange = (event) => {
    const newLink = event.target.value;
    setLink(newLink);

    // Use regular expression to extract latitude and longitude
    const match = newLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      setLatitude(match[1]);
      setLongitude(match[2]);
    } else {
      setLatitude("");
      setLongitude("");
    }
  };

  const handleLinkChange1 = (event) => {
    const newLink1 = event.target.value;
    setLink1(newLink1);

    // Use regular expression to extract latitude and longitude
    const matchs = newLink1.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (matchs) {
      setLatitude1(matchs[1]);
      setLongitude1(matchs[2]);
    } else {
      setLatitude1("");
      setLongitude1("");
    }
  };

  const availableDispatchersForSelectedDispatcher1 = dispatchers.filter(
    (dispatcher) => !selectedDispatcher.includes(dispatcher.id)
  );
  const availableDispatchersForSelectedDispatcher2 = dispatchers.filter(
    (dispatcher) =>
      !selectedDispatcher.includes(dispatcher.id) &&
      !selectedDispatcher1.includes(dispatcher.id)
  );
  const availableDispatchersForSelectedDispatcher3 = dispatchers.filter(
    (dispatcher) =>
      !selectedDispatcher.includes(dispatcher.id) &&
      !selectedDispatcher1.includes(dispatcher.id) &&
      !selectedDispatcher2.includes(dispatcher.id)
  );

  const handleEditClick = (customer) => {
    setEditData({ ...customer });
    setIsEditing(true);
    setModalIsOpen(true);

    // Set the selected value for the "Customer Name" dropdown
    setSelectedDispatcher(customer.customer_name);
    setSelectedDispatcher1(customer.customer_name2);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setEditData(null);
    setModalIsOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
    setModalIsOpen(false);
  };

  return (
    <section class="homedive ">
      <Modal
        isOpen={modalIsOpenEdit}
        className="main_modal_body dispatcher-list-form"
      >
        <ModalBody className="modal_body new-icon">
          <AiOutlineClose
            className="main_AiOutlineClose close-icon"
            onClick={() => setModalIsOpenEdit(false)}
          />
          <h5 className="main_h5">Edit Shipment Details</h5>
        </ModalBody>
        <Form className="form_main ">
          <div className="row">
            <h5 className="pb-4 text-center">Pickup Details</h5>
            <div className="col-6">
              <label>Customer Name:</label>
              <FormGroup>
                <select
                  value={selectedDispatcher} // Autofill the dropdown
                  onChange={handleSelectChange}
                  name="customer_name"
                  id="customer_name"
                >
                  <option value="">Select Customer</option>
                  {dispatchers.map((dispatcher) => (
                    <option key={dispatcher.id} value={dispatcher.name}>
                      {dispatcher.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Customer Contact:</label>
              <FormGroup>
                <input
                  name="phoneno"
                  value={customerContact}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phoneno"
                  placeholder="Enter Contact Number"
                  type="number"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <FormGroup>
                <label>Customer Alternate Number:</label>
                <input
                  name="altphone"
                  id="altphone"
                  value={customerAltNum}
                  onChange={(e) => setAltphone(e.target.value)}
                  placeholder="Enter Alternate Number"
                  type="number"
                />
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Customer Email ID:</label>
              <FormGroup>
                <input
                  name="email"
                  value={customerEmail}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  type="email"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label> Pick up Location</label>

              <FormGroup>
                <input
                  name="pickuplocation"
                  value={pickUpLocation}
                  onChange={(e) => setPickuplocation(e.target.value)}
                  id="pickuplocation"
                  placeholder="Enter Pickup Location"
                  type="text"
                />
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Pickup Date:</label>

              <FormGroup>
                <input
                  type="text"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </FormGroup>
            </div>
          </div>
          <h5 className="p-4 text-center">Delivery Details</h5>
          <div className="row">
            <div className="col-6">
              <label>Customer Name:</label>
              <FormGroup>
                <select
                  value={selectedDispatcher1} // Autofill the dropdown
                  onChange={handleSelectChange1}
                  name="customer_name"
                  id="customer_name"
                >
                  <option value="">Select Customer</option>
                  {dispatchers.map((dispatcher) => (
                    <option key={dispatcher.id} value={dispatcher.name}>
                      {dispatcher.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Customer Contact:</label>
              <FormGroup>
                <input
                  name="phoneno"
                  value={customerContact2}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phoneno"
                  placeholder="Enter Contact Number"
                  type="number"
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label> Drop Location</label>
              <FormGroup>
                <input
                  name="pickuplocation"
                  // value={pickuplocation}
                  value={dropLocation}
                  onChange={(e) => setPickuplocation(e.target.value)}
                  id="pickuplocation"
                  placeholder="Drop Location"
                  type="text"
                />
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Drop Date:</label>

              <FormGroup>
                <input
                  type="text"
                  value={dropDate}
                  onChange={(e) => setDropDate(e.target.value)}
                />
              </FormGroup>
            </div>
          </div>
          <h5 className="p-4 text-center">Driver and Helpers Details</h5>

          <div className="row">
            <div className="col-6">
              <label>Helper 1:</label>
              <FormGroup>
                <select value={selectedHelper1} onChange={handleHelper1Change}>
                  <option value="">Select a helper</option>
                  {filteredHelpers1.map((helper, index) => (
                    <option key={index} value={helper.name}>
                      {helper.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Helper 2:</label>
              <FormGroup>
                <select value={selectedHelper2} onChange={handleHelper2Change}>
                  <option value="">Select a helper</option>
                  {filteredHelpers2.map((helper, index) => (
                    <option key={index} value={helper.name}>
                      {helper.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label>Vehicle Number:</label>
              <FormGroup>
                <select value={selectedVehicle} onChange={handleVehicleChange}>
                  <option value="">Select a vehicle</option>
                  {vehicleDetails.map((vehicle, index) => (
                    <option key={index} value={vehicle.vehicalplate}>
                      {vehicle.vehicalplate}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Driver ID:</label>
              <FormGroup>
                <select
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                >
                  {driverIds.map((full_name, index) => (
                    <option key={index} value={full_name}>
                      {full_name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>

          <p id="edit-validate-batch" style={{ color: "red" }}></p>
          <Button
            variant="contained"
            className="main_botton"
            style={{ backgroundColor: "#6A3187" }}
            onClick={saveEditedData}
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
            <Button outline onClick={confirmDelete}>
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
          <div class="row justify-content-between">
            <div class="w-30 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 nameuser w-auto">
              <h2>Shipment List</h2>
            </div>

            <div className="datepicker-date-comm w-auto">
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
                {/* <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search By Helper Name" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} /> */}

                <input
                  style={{ fontSize: "15px" }}
                  className="form-control me-2 serch-filed"
                  aria-label="Search"
                  type="text"
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="export-btn">
                  <button
                    className="create-dispatcher p-3 mt-0 mx-3"
                    onClick={exportToExcel}
                  >
                    Export to Excel
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-0">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 "></div>
            <div class="col p-0">
              <table
                class="table align-middle bg-white rounded m-0 dwf-shipment-rec"
                id="table-to-xls"
              >
                <thead class="tableheading">
                  <tr>
                    <th scope="col">Pickup Details</th>
                    <th scope="col">Delivery Details</th>
                    <th scope="col">Driver Name</th>
                    <th scope="col">Helper 1</th>
                    <th scope="col">Helper 2</th>
                    <th scope="col">Vehicle Plate No.</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Task Status</th>

                    <th scope="col" class="borderre1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.pick_up_before}
                        <br></br>
                        {item.customer_name},<br></br> {item.customer_contact},{" "}
                        <br></br>
                        {item.pick_up_location}
                      </td>
                      <td>
                        {item.drop_date},<br></br> {item.customer_name2}
                        <br></br> {item.customer_contact2}, <br></br>{" "}
                        {item.drop_location}
                      </td>
                      <td>{item.driver_name}</td>
                      <td>{item.helper1}</td>
                      <td>{item.helper2}</td>
                      <td>{item.vehicleplate}</td>
                      <td className="date-td">{item.created_at}</td>
                      <td>
                        {item.pick_up_status === 1 ? (
                          <span
                            className="px-3 py-2 rounded-pill"
                            style={{ color: "white", background: "orange", fontSize: "12px" }}
                          >
                            ASSIGNED
                          </span>
                        ) : item.pick_up_status === 2 ? (
                          <span
                            className="px-2 py-2 rounded-pill"
                            style={{ color: "white", background: "blue", fontSize: "12px" }}
                          >
                            INPROGRESS
                          </span>
                        ) : item.pick_up_status === 3 ? (
                          <span
                            className="px-2 py-2 rounded-pill"
                            style={{ color: "white", background: "green", fontSize: "12px" }}
                          >
                            SUCCESSFUL
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn1"
                          onClick={() => openEditModal(item)}
                        >
                          <i class="bi bi-pen"></i>
                        </button>
                        <button
                          className="btn bt"
                          onClick={() => handleDelete(item.shipment_id)}
                        >
                          <i class="bi bi-trash delete"></i>
                        </button>
                        <Link to={`/view/${item.shipment_id}`}>
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

export default ShipmentRecords;
