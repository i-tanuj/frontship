import React,{useState,useEffect} from 'react'
import axios from 'axios';
import '../../css/dispatchlist.css'
import Navbar from '../Navbar'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function ContactData(getContact){

  await axios.get('https://shippingbackend-production.up.railway.app/api/sattlementrecord',
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




function SettlementRecords() {

    const [contact, getContact] = useState([]);
    
    const [full_name, setName] = useState('');
    const [driver_id, setDriver_id] = useState('');
    const [id, setId] = useState('');
    const [amount, setAmount] = useState('');
    const [batchList,getBatchList] = useState([]);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [defaultcontact, DefaultgetContact] = useState([]);
    const [ids, setIds] = useState('');
    const [search,setSearch] =useState('');
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

  
  const handleUpdateClick = (driver_id) => {
    const updateddatetime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
    });
    console.log("dr"+driver_id);
    axios.post(
      'https://shippingbackend-production.up.railway.app/api/updateAmount',
      {
        inst_hash: localStorage.getItem('inst_hash'),
        id: id,
        driver_id: driver_id,
        full_name: full_name,
        settlement_amount: 0, // Set the wallet amount to 0
        status: 2,
        updateddatetime: updateddatetime,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    )
    .then((response) => {
      // Update the 'contact' state to reflect the changes
      const updatedContacts = contact.map(item => {
        if (item.driver_id === driver_id) {
          return {
            ...item,
            settlement_amount: 0, // Update the wallet amount to 0
            status: 2,
          };
        }
        return item;
      });
      toast.success('Amount Settled Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      getContact(updatedContacts); // Update the state
    })
    .catch((error) => {
      console.error('Error updating data:', error);
    });
  };
  
  return (
    <section class="homedive ">

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
                        <div className='Back-btn-01'><a href='/'>Back</a></div>
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
            {/* <td>{console.log(item.driver_id)}</td> */}
            <td>{item.settlement_amount}</td>
            <td>
            <button className='Settle-amount  '  onClick={() => handleUpdateClick(item.driver_id)} id={item.driver_id}>Settled Amount</button>
            {/* console.log(item.id); */}
            {/* console.log("ids"+item.id); */}
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
    <ToastContainer/>

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



