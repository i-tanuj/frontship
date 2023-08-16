import React from 'react';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentRecords from './component/Dashboard/PaymentRecords';
import SettlementRecords from './component/Dashboard/SettlementRecords';
import SettlementHistory from './component/Dashboard/SettlementHistory';
// import AmountZero from './component/Dashboard/AmountZero';
import Testdispatcher from './component/CreateShipment/Testdispatcher';
import FormComponent from './component/Dashboard/FormComponent';

const Login = React.lazy(() => import("./component/Login"));
const VerifyOTP =  React.lazy(() => import("./component/VerifyOTP"))
const ForgetPassword =  React.lazy(() => import("./component/ForgetPassword"))
const HomePage = React.lazy(() => import("./component/HomePage"));
const DispatchList = React.lazy(() => import("./component/Dashboard/DispatchList"));
const DriverList = React.lazy(() => import("./component/Dashboard/DriverList"));
// const VehicalForm = React.lazy(() => import("./component/CreateShipment/CreateVehical"));
const HelperList = React.lazy(() => import("./component/CreateShipment/HelperList"))
const VehicalList = React.lazy(() => import("./component/CreateShipment/VehicalList"))
// const TransferMoneyToDriver = React.lazy(() => import("./component/Dashboard/TransferMoneyToDriver"))
const CustomerList = React.lazy(() => import("./component/CreateShipment/CustomerList"))
const paymentRecords = React.lazy(() => import("./component/Dashboard/PaymentRecords"))
const settlementRecord = React.lazy(() => import("./component/Dashboard/SettlementRecords"))
const settlementHistory = React.lazy(() => import("./component/Dashboard/SettlementHistory"))

const ViewShipment = React.lazy(() => import("./component/Dashboard/ViewShipment"))
const DelaydShip = React.lazy(() => import("./component/Dashboard/DelaydShip"))
const PendingShip = React.lazy(() => import("./component/Dashboard/PendingShip"))
const formcomponent = React.lazy(() => import("./component/Dashboard/FormComponent"))
const PickupCreation = React.lazy(() => import("./component/CreateShipment/PickupCreation"))
const DropdownComponent = React.lazy(() => import("./component/CreateShipment/DropdownComponent"))
// const Testdispatcher = React.lazy(() => import("./component/CreateShipment/Testdispatcher"))
// const Try = React.lazy(() => import("./component/Dashboard/Try"))




const DriverDropdown = React.lazy(() => import("./component/CreateShipment/DriverDropdown"))


function App() {
  const tokendata =localStorage.getItem("jwt"); 

  return (
    <>
      <Router>
        <React.Suspense fallback={<div className='d-flex justify-content-center align-items-center'>
        </div>}>
          <Routes>
            <Route exact path="/" element={tokendata ?  <HomePage /> :<Login/>}/> 
            <Route exact path="/" element={tokendata ?  <HomePage /> :<Login/>}/>
            <Route exact path="/verifyOTP" element={<VerifyOTP/>}/>
            <Route exact path="/ForgetPassword" element={<ForgetPassword/>}/>
            <Route exact path="/dispatchList" element={<DispatchList/>}/>
            <Route exact path="/driverList" element={<DriverList/>}/>
            {/* <Route exact path="/vehical" element={<VehicalForm/>}/> */}
            <Route  exact path="/helperList" element={<HelperList/>}/>
            <Route  exact path="/vehicalList" element={<VehicalList/>}/>
            <Route  exact path="/customerList" element={<CustomerList/>}/>
            <Route  exact path="/paymentRecords" element={<PaymentRecords/>}/>
            <Route  exact path="/settlementRecord" element={<SettlementRecords/>}/>
            <Route  exact path="/settlementhistory" element={<SettlementHistory/>}/>
            {/* <Route  exact path="/try" element={<Try/>}/> */}

            <Route  exact path="/view" element={<ViewShipment />}/>
            <Route  exact path="/delayd" element={<DelaydShip/>}/>
            <Route  exact path="/pending" element={<PendingShip/>}/>

            <Route  exact path="/driverdropdown" element={<DriverDropdown/>}/>
            <Route  exact path="/testdispatcher" element={<Testdispatcher/>}/>
            <Route  exact path="/pickupcreation" element={<PickupCreation/>}/>
            <Route  exact path="/formcomponent" element={<FormComponent/>}/>
            <Route  exact path="/dropdowncomponent" element={<DropdownComponent/>}/>


          </Routes>
        </React.Suspense>
      </Router>
    </>
  );
}

export default App;
