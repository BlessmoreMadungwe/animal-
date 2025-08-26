import React from "react";
import { useNavigate } from "react-router-dom";

const Index = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login"); // redirect back to login
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username || "User"}!</h1>
      <p className="mb-4">This is your dashboard. You can now access protected pages.</p>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Index;
