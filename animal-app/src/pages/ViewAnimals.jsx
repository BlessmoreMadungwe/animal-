import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewAnimals = ({ user }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchAnimals = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://127.0.0.1:8000/animals/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnimals(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Failed to load animals.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [user, navigate]);

  if (loading) return <p className="text-center">Loading animals...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Animals</h1>
      {animals.length === 0 ? (
        <p>No animals found.</p>
      ) : (
        <ul className="space-y-4">
          {animals.map((animal) => (
            <li
              key={animal.id}
              className="border rounded-lg p-4 flex items-center space-x-4 shadow"
            >
              {animal.image ? (
                <img
                  src={`http://127.0.0.1:8000${animal.image}`}
                  alt={animal.name}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded">
                  No Img
                </div>
              )}
              <span className="text-lg font-semibold">{animal.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAnimals;
