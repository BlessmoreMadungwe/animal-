import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAnimal = ({ user }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        "http://127.0.0.1:8000/animals/",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Animal added successfully!");
      navigate("/"); // redirect to home
    } catch (err) {
      console.error(err);
      alert("Failed to add animal.");
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Animal</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Animal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={handleAdd}
      >
        Add Animal
      </button>
    </div>
  );
};

export default AddAnimal;
