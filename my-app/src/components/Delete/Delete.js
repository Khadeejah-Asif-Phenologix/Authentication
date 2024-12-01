import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/actions/authAction";

function Delete({ userId, onDeleteComplete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setIsDeleting(true);
    dispatch(deleteUser(userId))
      .then(() => {
        setIsDeleting(false);
        if (onDeleteComplete) {
          onDeleteComplete();
        }
        console.log("User Deleted Successfully");
      })
      .catch((error) => {
        setIsDeleting(false);
        console.error("Delete User Error:", error.message);
        alert("Failed to delete user: " + error.message);
      });
  };

  return (
    <button
      className="btn btn-danger"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}

export default Delete;