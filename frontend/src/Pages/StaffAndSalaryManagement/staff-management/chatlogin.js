import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../../Assets/bg.jpg"; // Ensure this image is placed in the correct path

const Login = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && room.trim()) {
      navigate(`/chat?name=${name}&room=${room}`);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-center bg-cover "
      style={{ backgroundImage: `url(${bg})` }}
      
    >
        <div className="absolute inset-0 bg-black/70"></div>
      <div className="absolute max-w-sm p-8 bg-black border rounded-lg shadow-lg bg-opacity-60 w-96 bg-white/10 backdrop-blur-lg border-orange-500/40">
        <h2 className="mb-4 text-2xl font-bold text-center text-orange-500">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="font-semibold text-gray-300">Member Name:</label>
          <input
            type="text"
            className="p-3 mt-1 text-black uppercase bg-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="mt-4 font-semibold text-gray-300">Chat Room Name:</label>
          <input
            type="text"
            className="p-3 mt-1 text-black bg-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter chat room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />

          <button
            type="submit"
            className="py-3 mt-4 text-white transition duration-300 bg-orange-500 rounded-lg shadow-md hover:bg-orange-600"
          >
            Login
          </button>

        </form>
            

        
      </div>
    </div>
  );
};

export default Login;
