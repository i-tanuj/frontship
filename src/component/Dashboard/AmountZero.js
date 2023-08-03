// src/AmountZero.js

import React from 'react';

function AmountZero({ id }) {
  const handleUpdateClick = () => {
    // Make a POST request to the backend to update the amount
    fetch('http://localhost:5000/updateAmount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div className="App">
      <h1>Update Amount</h1>
      <p>Selected ID: {id}</p>
      <button onClick={handleUpdateClick}>Update Amount</button>
    </div>
  );
}

export default AmountZero;


// // src/App.js

// import React, { useState } from 'react';
// // import './App.css';

// function AmountZero() {
//   const [id, setId] = useState('');

//   const handleUpdateClick = () => {
//     // Make a POST request to the backend to update the amount
//     fetch('http://localhost:5000/updateAmount', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error('Error updating data:', error);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>Update Amount</h1>
//       <input
//         type="text"
//         placeholder="Enter ID"
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//       />
//       <button onClick={handleUpdateClick}>Update Amount</button>
//     </div>
//   );
// }

// export default AmountZero;
