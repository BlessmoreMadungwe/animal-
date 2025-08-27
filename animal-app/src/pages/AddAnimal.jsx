import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAnimal = ({ user }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Please enter an animal name.");
      return;
    }
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      await axios.post("http://127.0.0.1:8000/animals/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Animal added successfully!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add animal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Animal</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Animal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full mb-2"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        disabled={loading}
        className={`p-2 rounded w-full ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
        }`}
        onClick={handleAdd}
      >
        {loading ? "Adding..." : "Add Animal"}
      </button>
    </div>
  );
};

export default AddAnimal;
