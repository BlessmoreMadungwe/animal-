import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimalCard from "../components/AnimalCard";

const Dashboard = ({ user }) => {
  const [myAnimals, setMyAnimals] = useState([]);

  useEffect(() => {
    const fetchMyAnimals = async () => {
      try {
        const token = localStorage.getItem("access"); // JWT token
        const res = await axios.get(
          `http://127.0.0.1:8000/animals/?addedBy=${user.username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMyAnimals(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchMyAnimals();
  }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold my-8 text-center">
        {user.username}'s Dashboard
      </h1>

      {myAnimals.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't added any animals yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myAnimals.map((animal, index) => (
            <AnimalCard key={index} animal={animal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
