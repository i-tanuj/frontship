import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import Navbar from '../Navbar'
import CreateDriver from './CreateDriver'


import {
  Nav,
  NavItem,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";

import { Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";


async function ShippingData(getContact){

    await axios.get('https://shippingbackend-production.up.railway.app/api/shipmentdata',
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

async function ContactData(getContact){

  await axios.get('https://shippingbackend-production.up.railway.app/api/shipmentdata',
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




function DriverList() {
    const [contactData, setContactData] = useState({});
    const [rowCount, setRowCount] = useState(0);
    const [inquiries, setInquiries] = useState( );
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contact, getContact] = useState([]);
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [batchList,getBatchList] = useState([]);


    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [modalIsOpenEdit,setModalIsOpenEdit] = useState(false);
    const [defaultcontact, DefaultgetContact] = useState([]);
    const [ids, setIds] = useState('');
    const [search,setSearch] =useState('');
//   console.log(search)
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
   
    // console.warn(contact)

    function handleInput(e){
        setFullName(e.target.value)
  }

  return (
    <section class="homedive ">
  <div class="rightdiv px-3 py-5">
        <div class="container">
            <div className="row mt-3">
              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 '>
              <Navbar/>

                    </div>
                    
                <div class="col view-table-shipment">
                    <div className='Back-btn py-4'><a href='/'>Back</a></div>
                  <div className='view-table-shipment-header'>
                        <div className=''>
                        <h2>All Driver List</h2>
                        </div>
                        <div className=''>
                        <h2>All Driver List</h2>
                        </div>
                        <div className=''>
                        <h2>All Driver List</h2>
                        </div>
                  </div>
                  
                  <div className='shipment-header-row'>
                        <div className='column-one'>
                            <div>
                                <p className='shiping-label'>Customers Name <span>*</span></p>
                                <p className='shiping-input'>{contactData.customer_name}</p>
           



                                {
          records.filter((item)=>{
            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
          }).map((item,i)=>
            <tr key={i}>
            <td>{item.customer_name}</td>
            <td>{item.customer_contact}</td>
            <td>{item.customer_email}</td>
            <td>{item.pick_up_location}</td>
            <td>{item.drop_location}</td>
            <td>

            </td>
            
          </tr>
          )
        }





                            </div>
                            <div>
                                <p className='shiping-label'>Pick up Location <span>*</span></p>
                                <p className='shiping-input'>8502 Preston Rd. Inglewood, Maine 98380</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Pick up POD Details <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                            
                        </div>
                        <div className='column-two'>
                        <div>
                                <p className='shiping-label'>Customer’s Contact Number<span>*</span></p>
                                <p className='shiping-input'>(219) 555-0114</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Pick up date & time<span>*</span></p>
                                <p className='shiping-input'>12 Jul, 12:23 PM</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Dispatcher ID <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                        </div>
                        <div className='column-three'>
                        <div>
                                <p className='shiping-label'>Customer’s Email Number <span>*</span></p>
                                <p className='shiping-input'>nathan.roberts@example.com</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Description<span>*</span></p>
                                <p className='shiping-input'>Lorem ipsum dolor sit amet consectetur. Varius posuere lacus lectus quisque </p>
                            </div>
                            <div>
                                <p className='shiping-label'>Sign DC Dispatcher <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                        </div>
                        
                  </div>
                  <h3 className='Delivery-Documents'>1 Delivery Documents</h3>
                  
                  <div className='shipment-header-row'>
                        <div className='column-one'>
                            <div>
                                <p className='shiping-label'>Customers Name<span>*</span></p>
                                <p className='shiping-input'>Cameron Williamson</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Drop Location<span>*</span></p>
                                <p className='shiping-input'>2715 Ash Dr. San Jose, South Dakota 83475</p>
                            </div>
                            <div>
                                <p className='shiping-label'>POD Stamp <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                            
                        </div>
                        <div className='column-two'>
                        <div>
                                <p className='shiping-label'>Customer’s Contact Number<span>*</span></p>
                                <p className='shiping-input'>(808) 555-0111</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Drop date <span>*</span></p>
                                <p className='shiping-input'>12 Jul</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Receivers ID <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                        </div>
                        <div className='column-three'>
                        <div>
                                <p className='shiping-label'>Customer’s Email Number* <span>*</span></p>
                                <p className='shiping-input'>jackson.graham@example.com</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Description <span>*</span></p>
                                <p className='shiping-input'>Lorem ipsum dolor sit amet consectetur. Varius posuere lacus lectus quisque </p>
                            </div>
                            <div>
                                <p className='shiping-label'>Receivers Signature<span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                        </div>
                        
                  </div>
                  <h3 className='Delivery-Documents'>2 Delivery Documents</h3>
                  <div className='shipment-header-row'>
                        <div className='column-one'>
                            <div>
                                <p className='shiping-label'>Customers Name<span>*</span></p>
                                <p className='shiping-input'>Cameron Williamson</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Drop Location<span>*</span></p>
                                <p className='shiping-input'>2715 Ash Dr. San Jose, South Dakota 83475</p>
                            </div>
                            <div>
                                <p className='shiping-label'>POD Stamp <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                            
                        </div>
                        <div className='column-two'>
                        <div>
                                <p className='shiping-label'>Customer’s Contact Number<span>*</span></p>
                                <p className='shiping-input'>(808) 555-0111</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Drop date <span>*</span></p>
                                <p className='shiping-input'>12 Jul</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Receivers ID <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                        </div>
                        <div className='column-three'>
                        <div>
                                <p className='shiping-label'>Customer’s Email Number* <span>*</span></p>
                                <p className='shiping-input'>jackson.graham@example.com</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Description <span>*</span></p>
                                <p className='shiping-input'>Lorem ipsum dolor sit amet consectetur. Varius posuere lacus lectus quisque </p>
                            </div>
                            <div>
                                <p className='shiping-label'>Receivers Signature<span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                        </div>
                        
                  </div>
                  <div className='shipment-header-row pb-5'>
                        <div className='column-one'>
                            <div>
                                <p className='shiping-label'>Driver Name<span>*</span></p>
                                <p className='shiping-input'>Jacob Jones</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Vehicle Plate<span>*</span></p>
                                <p className='shiping-input'>#CBWE12</p>
                            </div>
                            
                        </div>
                        <div className='column-two'>
                        <div>
                                <p className='shiping-label'>Helper1 Name<span>*</span></p>
                                <p className='shiping-input'>Cody Fisher</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Created by<span>*</span></p>
                                <p className='shiping-input'>Admin</p>
                            </div>
                        </div>
                        <div className='column-three'>
                        <div>
                                <p className='shiping-label'>Helper2 Name <span>*</span></p>
                                <p className='shiping-input'>Bessie Cooper</p>
                            </div>
                        </div>
                        
                  </div>
               <nav>
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

export default DriverList;
