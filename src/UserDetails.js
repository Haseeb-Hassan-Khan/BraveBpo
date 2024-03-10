// UserDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
  const { uuid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?seed=${uuid}`);
        setUser(response.data.results[0]);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [uuid]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      <div className="max-w-md bg-white shadow-md rounded-md overflow-hidden"> {/* Added max width */}
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-xl font-bold">{`${user.name.title}. ${user.name.first} ${user.name.last}`}</h1>
          <p className="text-gray-600">{user.email}</p>
          <div className="mt-4">
            <p><span className="font-semibold">Gender:</span> {user.gender}</p>
            <p><span className="font-semibold">Age:</span> {user.dob.age}</p>
            <p><span className="font-semibold">Date of Birth:</span> {user.dob.date}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold">Cell:</span> {user.cell}</p>
            <p><span className="font-semibold">Location:</span> {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Back</Link> {/* Added back button */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
