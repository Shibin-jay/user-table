import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [nameSortOrder, setNameSortOrder] = useState("asc");
  const [idSortOrder, setIdSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleNameSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameSortOrder === "asc") {
        return nameA < nameB ? -1 : 1;
      } else {
        return nameA > nameB ? -1 : 1;
      }
    });
    setNameSortOrder(nameSortOrder === "asc" ? "desc" : "asc");
    setUsers(sortedUsers);
  };

  const handleIdSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (idSortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setIdSortOrder(idSortOrder === "asc" ? "desc" : "asc");
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user.address.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="heading">User Table</h1>

      {/* Filter Input */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by City"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* Sort Buttons */}
      <div className="sort-buttons">
        <button className="sort-btn" onClick={handleNameSort}>
          Sort by Name ({nameSortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
        <button className="sort-btn" onClick={handleIdSort}>
          Sort by ID ({idSortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
