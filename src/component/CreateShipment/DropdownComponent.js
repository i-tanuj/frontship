import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DropdownComponent() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('https://shippingbackend-production.up.railway.app/api/driverdetails'); // Replace with your backend API endpoint
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User Details</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>Name: {user.full_name}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Address: {user.address}</p>
                        <p>Encrypted Password: {user.password}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropdownComponent;
