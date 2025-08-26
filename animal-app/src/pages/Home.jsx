import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Home = ({ user }) => {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  const fetchAnimals = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) return;

      const res = await axios.get("http://127.0.0.1:8000/animals/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnimals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchAnimals();
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <p className="mb-4">
          You need to <Link className="text-blue-500" to="/login">login</Link> to see animals.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Animals List</h1>

      {animals.length === 0 ? (
        <p>No animals reported yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animals.map((animal) => (
            <div key={animal.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{animal.name}</h2>
              <p className="text-gray-600">Reported by: {animal.reported_by}</p>
              <p className="text-gray-500 text-sm">
                Created at: {new Date(animal.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/add-animal")}
      >
        Add Animal
      </button>
    </div>
  );
};

export default Home;
