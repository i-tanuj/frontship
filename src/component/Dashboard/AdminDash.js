import React from 'react'
import '../../css/adminboard.css'

function AdminDash() {
  return (
    <div>
        	<div class="">
							<div class="admin-dashboard">
								<div class="title-header datepicker-admin">
									<h5 class="title-header-admin">Admin Dashboard</h5>
									<div  className='datepicker-date'>
										<input className='' type="date" name="from" id="from" />
										<input className='' type="date" name="to" id="to" />
									</div>
									
								</div>
								<div class="row card-holder">
								<div class="col-md-4 col-sm-6 col-xs-12">
									<div class="card-01 mb-3">
									  <div class="card-body">
									    <img src="/Assets/gif/truck.gif"/>	
									    <p class="card-text">Total Shipment</p>
									    <h2 class="text-left">100</h2>
									  </div>
									</div>
								</div>
								<div class="col-md-4 col-sm-6 col-xs-12">
									<div class="card-01 mb-3">
									  <div class="card-body">
									    <img src="/Assets/gif/complete.gif"/>	
									    <p class="card-text">Completed Shipment</p>
									    <h2 class="">80</h2>
									  </div>
									</div>
								</div>
								<div class="col-md-4 col-sm-6 col-xs-12">
									<div class="card-01 mb-3">
									  <div class="card-body">
									    <img src="/Assets/gif/payment.gif"/>	
									    <p class="card-text">Total Payment</p>
									    <h2 class="">2000</h2>
									  </div>
									</div>
								</div>
							</div>
							</div>
						</div>
    </div>
  )
}

export default AdminDash;