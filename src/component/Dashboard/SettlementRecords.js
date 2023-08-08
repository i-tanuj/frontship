import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import Navbar from '../Navbar'
import {
  Form,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";

async function ContactData(getContact){

  await axios.get('https://shipment-backend.onrender.com/api/sattlementrecord',
  // { inst_hash: localStorage.getItem('inst_hash_manual') },
  {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  }
  )
  .then((res)=>{
      console.log(res.data);
      getContact(res.data);
  })
}
//************************************************************** */

async function updateRecord(id,full_name,amount,DateAndTime,getBatchList,setModalIsOpenEdit){
  if (amount) {
      await axios.post('https://shipment-backend.onrender.com/api/updaterecord',
      {inst_hash: localStorage.getItem('inst_hash'),
      id : id,
      full_name: full_name,
      amount: amount,
      DateAndTime: DateAndTime
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  ContactData(getBatchList)
  setModalIsOpenEdit(false)
} else {
  console.log("Error :", "Please fill required field");
}    
}

//************************************************************** */
async function deleteContact(ids,getContact,DefaultgetContact, ){
  const results = await axios.post('https://shipment-backend.onrender.com/api/delhelper',
      {
          id:ids
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  console.log(results);
      if(results.status == 200){
          ContactData(getContact,DefaultgetContact);
      }
  }


function SettlementRecords() {

    const [contact, getContact] = useState([]);
    
    const [full_name, setName] = useState('');
    const [id, setId] = useState('');
    const [amount, setAmount] = useState('');
    const [batchList,getBatchList] = useState([]);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [defaultcontact, DefaultgetContact] = useState([]);
    const [ids, setIds] = useState('');
    const [search,setSearch] =useState('');
  console.log(search)
  const [currentPage,setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex= lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
      ContactData(getContact,DefaultgetContact)   
   }, [])
    console.warn(contact)

    function handleInput(e){
        setName(e.target.value)
  }


  const handleUpdateClick = (id) => {
    axios.post(
      'https://shipment-backend.onrender.com/api/updateAmount',
      {
        inst_hash: localStorage.getItem('inst_hash'),
        id: id,
        full_name: full_name,
        amount: 0, // Set the wallet amount to 0
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    )
    .then((response) => {
      console.log(response.data);
      // Update the 'contact' state to reflect the changes
      const updatedContacts = contact.map(item => {
        if (item.id === id) {
          return {
            ...item,
            amount: 0, // Update the wallet amount to 0
          };
        }
        return item;
      });
      getContact(updatedContacts); // Update the state
    })
    .catch((error) => {
      console.error('Error updating data:', error);
    });
  };

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
  


  
// async function handleUpdateClick(id,full_name,amount,setModalIsOpenEdit,getBatchList){
//   if () {
//       await axios.post('https://shipment-backend.onrender.com/api/updateAmount',
//       {inst_hash: localStorage.getItem('inst_hash'),
//       id : id,
//       full_namename: full_name,
//       amount: amount
  
//       },
//       {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
//   )
//   ContactData(getBatchList)
//   setModalIsOpenEdit(false)
// } else {
//   document.getElementById("edit-validate-batch").innerHTML =
//     "*Please fill required field!";
//   console.log("Error :", "Please fill required field");
// }    
// }

  
  return (
    <section class="homedive ">

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
                    deleteContact(ids, getContact, DefaultgetContact)
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
                <h2>Settlement Record List</h2>
    
                </div>
                
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                    <div class="input-group input-group-lg">
                    <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                 <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search Here" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                      </div>
                </div>
             
            </div>
          
            <div className="row mt-3">
              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 '>
              <Navbar/>

                    </div>
                <div class="col view-table-new">
                    <div className='driver-view-list'>
                
                      <div className=''>
                        <h2>Settlement Records</h2>
                      </div>
                      <div class="w-50 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                      <div class="input-group input-group-lg">
                          <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                          <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search Here" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                        </div>
                    </div>
                      <div className='d-flex'>
                        {/* <div className='add-new-form-btn'>
                            <CreateHelper/>
                        </div> */}
                        <div className='Back-btn-01'><a href='#'>Back</a></div>
                      </div>
                    </div>
                    <table class="table align-middle bg-white rounded m-0" id="table-to-xls">
                        <thead class="tableheading">
                          <tr>
                            <th scope="col" class="borderre">No.</th>
                            <th scope="col">Driver Name</th>
                            <th scope="col">Wallet Amount</th>
                          <th scope="col" class="borderre1">Settled </th>
                          </tr>
                        </thead>
                      <tbody class="tbody">
  
        {
          records.filter((item)=>{
            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
          }).map((item,i)=>
            <tr key={i}>
                 <th scope="row"><span className="dispatcher-id">{i+1}</span></th>
            <td>{item.full_name}</td>
            <td>{item.amount}</td>
            <td>
            <button className='settled'  onClick={() => handleUpdateClick(item.id)} id={item.id}> settled</button>
            </td>
          </tr>
          )
        }
                    </tbody>
                  </table>
               <nav>
        <ul className='pagination'>
           <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}>Previous</a>
           </li>
           {
            numbers.map((n,i)=>{
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
              <a href='#' className='page-link' onClick={()=>changeCPage(n)}>{n}</a>
              </li>
            })
           }
             <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}>Next</a>
           </li>
        </ul>
      </nav>
                </div>

            </div>
        </div>
    </div>
   </section>
  )

  function prePage (){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }
  
  function changeCPage (id){
   setCurrentPage(id)
  }

  function nextPage (){
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }
  }
}

export default SettlementRecords;



