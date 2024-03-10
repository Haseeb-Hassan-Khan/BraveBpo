import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [genderFilter, setGenderFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://randomuser.me/api/?results=100');
      setUsers(response.data.results);
      setFilteredUsers(response.data.results);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (genderFilter) {
      filtered = filtered.filter(user => user.gender.toLowerCase() === genderFilter.toLowerCase());
    }

    if (searchTerm) {
      filtered = filtered.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.dob.date.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (genderFilter && searchTerm.toLowerCase() === genderFilter.toLowerCase()) ||
        (parseInt(searchTerm) && user.dob.age === parseInt(searchTerm))
      );
    }
    

    setFilteredUsers(filtered);
  }, [users, genderFilter, searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const navigate = useNavigate();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleClick = (uuid) => {
    navigate(`/user/${uuid}`); 
  };

  return (
    <div className="container mx-auto p-4 overflow-y-hidden">
      <h1 className="text-3xl font-bold mb-4 text-blue-500 px-4">Brave Bpo 2.0</h1>

      <div className="mb-4">
        <label className="mr-2 px-4">Gender:</label>
        <select
          className="p-2"
          onChange={(e) => setGenderFilter(e.target.value)}
          value={genderFilter}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder={`Search by name, DOB, or email ${genderFilter ? `(${genderFilter})` : ''}`}
          className="p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="mx-auto max-w-8xl px-4"> 
          <div className="col-8 mx-auto"> {}
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">View Profile</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.login.uuid} className={index % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-200 hover:bg-gray-100'}>
                    <td className="px-6 py-4 whitespace-no-wrap">{`${user.name.first} ${user.name.last}`}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{user.gender}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{user.dob.age}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{user.dob.date}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleClick(user.login.uuid)}>Go to</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="mx-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-arrow-right">Previous</i>
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredUsers.length / usersPerPage)))}
          className="mx-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
        >
          <i className="fas fa-chevron-right">Next</i>
        </button>
      </div>
    </div>
  );
};

export default App;
