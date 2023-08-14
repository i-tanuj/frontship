import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [customername, setName] = useState('');
  const [customernumber, setNumber] = useState('');
  const [selectshipdrop, setSelectshipdrop] = useState('');
  const [dropdate, setDropdate] = useState('');
  const [adddescriptiondrop, setAdddescriptiondrop] = useState('');
  const [vehicleplate, setVehicleplate] = useState('');
  const [helper1, setHelper1] = useState('');
  const [helper2, setHelper2] = useState('');
  const [assigndriver, setAssigndriver] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('https://shippingbackend-production.up.railway.app/api/createshipment', { customername, customernumber, selectshipdrop, dropdate, adddescriptiondrop, vehicleplate, helper1, helper2, assigndriver });
      console.log(response.data.message);
      // Clear the form fields after successful submission
      setName('');
      setNumber('');
      setSelectshipdrop('');
      setDropdate('');
      setAdddescriptiondrop('');
      setVehicleplate('');
      setHelper1('');
      setHelper2('');
      setAssigndriver('');

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Submit Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input type="text" value={customername} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Customer Number
          <input type="number" value={customernumber} onChange={e => setNumber(e.target.value)} />
        </label>
        <br />
        <label>
          Drop Location
          <input type="text" value={selectshipdrop} onChange={e => setSelectshipdrop(e.target.value)} />
        </label>
        <br />
        <label>
          Drop Date
          <input type="date" value={dropdate} onChange={e => setDropdate(e.target.value)} />
        </label>
        <br />
        <label>
          Add Description
          <input type="text" value={adddescriptiondrop} onChange={e => setAdddescriptiondrop(e.target.value)} />
        </label>
        <br />
        <label>
          Vehical Number
          <input type="text" value={vehicleplate} onChange={e => setVehicleplate(e.target.value)} />
        </label>
        <br />
        <label>
          Helper 1
          <input type="text" value={helper1} onChange={e => setHelper1(e.target.value)} />
        </label>
        <br />
        <label>
          Helper 2
          <input type="text" value={helper2} onChange={e => setHelper2(e.target.value)} />
        </label>
        <br />
        <label>
          Assign Driver Name
          <input type="text" value={assigndriver} onChange={e => setAssigndriver(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
