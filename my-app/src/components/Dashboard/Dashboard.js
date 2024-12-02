import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList, logoutUser, editUser, deleteUser } from "../../redux/actions/authAction";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleEdit = (id) => {
    dispatch(editUser(editUser));
    navigate(`/edit/${id}`);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId))
      .then(() => {
        console.log(`User with ID ${userId} deleted successfully`);
        dispatch(fetchUserList());
      })
      .catch((error) => {
        console.error(`Failed to delete user with ID ${userId}:`, error.message);
        alert("Failed to delete user: " + error.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredUsers = users ? users.filter((user) => !user.isDeleted) : [];

  return (
    <div>
      {filteredUsers.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td><img src={user.image} alt={user.username} width="50" /></td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>
                  <button className="Edit" onClick={() => handleEdit(user.id)}>Edit</button>
                </td>
                <td>
                  <button className="Delete" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
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