
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg"; // Ensure this image is placed in the correct path

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
      className="flex items-center justify-center h-screen bg-cover bg-center  "
      style={{ backgroundImage: `url(${bg})` }}
      
    >
        <div className="absolute inset-0 bg-black/70"></div>
      <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg w-96 absolute  max-w-sm  bg-white/10 backdrop-blur-lg  border border-orange-500/40">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-gray-300 font-semibold">Member Name:</label>
          <input
            type="text"
            className="p-3 border border-gray-700 bg-white text-black rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="text-gray-300 font-semibold mt-4">Chat Room Name:</label>
          <input
            type="text"
            className="p-3 border border-gray-700 bg-white text-black rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter chat room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-4 bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>

        </form>
            

        
      </div>
    </div>
  );
};

export default Login;
