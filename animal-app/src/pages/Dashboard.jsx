import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [myAnimals, setMyAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAnimals = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await axios.get("http://127.0.0.1:8000/animals/", {
        headers: { Authorization: `Bearer ${token}` },
        params: { addedBy: user.username },
      });
      setMyAnimals(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("access");
        navigate("/login");
      } else {
        console.error("Error fetching animals:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyAnimals();
  }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold my-8 text-center">
        {user.username}'s Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading your animals...</p>
      ) : myAnimals.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't added any animals yet.
        </p>
      ) : (
        <div>
          {/* Refresh button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={fetchMyAnimals}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>

          {/* Animal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
