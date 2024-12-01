import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList, logoutUser } from "../../redux/actions/authAction";
import './Dashboard.css';
import { Table } from 'react-bootstrap'; 
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate hook
  const { users, loading, error } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());  // Dispatch logout action
    navigate('/');  // Redirect to home (/) after logout
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users && users.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td><img src={user.image} alt={user.username} width="50" /></td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No users available.</p>
      )}

      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
