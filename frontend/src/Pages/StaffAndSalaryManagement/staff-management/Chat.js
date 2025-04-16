import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import queryString from "query-string";
import io from "socket.io-client";
import chatbg from "../../../Assets/chatbg2.jpg";
import chatbg3 from "../../../Assets/chatbg3.png";
import closeicon from "../../../Assets/closeIcon.png"; // Close Icon
import newlogo from "../../../Assets/newlogo.png";
import send from "../../../Assets/send.png";

const ENDPOINT = "http://localhost:5000"; // Ensure this matches your backend port

let socket;

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports: ["websocket"] });

    setName(name);
    setRoom(room);

    socket.emit("joinRoom", { username: name, room });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off("message");
      socket.off("roomData");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { user: name, text: message };

      socket.emit("sendMessage", newMessage, room);

      setMessages((prevMessages) => [...prevMessages]);

      setMessage("");
    }
  };

  return (
    <div className="flex w-full h-screen bg-black">
      {/* Left Sidebar */}
      <div
        className="w-1/4 p-6 rounded-lg shadow-lg bg-stone-950"
        style={{ backgroundImage: `url(${chatbg3})` }}
      >
        <div><img src={newlogo} alt="newlogo"/></div>
        <h3 className="mt-6 text-lg font-bold text-orange-600">Room Members</h3>
        <ul className="mt-4 space-y-2">
          {users.map((user, index) => (
            <li
              key={index}
              className="flex items-center gap-2 p-2 text-yellow-500 transition-colors duration-300 rounded-lg shadow hover:bg-black-300"
            >
              <div className="uppercase">{user}</div>
              <span className="w-2 h-2 mb-2 bg-green-600 rounded-full"></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-grow bg-white rounded-lg shadow-lg">
        <div className="relative flex justify-center py-3 text-orange-600 bg-black rounded-t-lg">
          <h2 className="text-2xl font-bold">Live Chat</h2>

          {/* Close Icon Button */}
          <button
            onClick={() => navigate("/Chatlogin")} // Navigate to ChatLogin.js
            className="absolute right-4 top-3"
          >
            <img src={closeicon} alt="Close Chat" className="w-3 h-3" />
          </button>
        </div>

        {/* Messages Container */}
        <div
          className="flex flex-col flex-grow p-4 overflow-y-auto bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${chatbg})` }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 my-2 rounded-lg max-w-[75%] inline-block ${
                msg.user === name
                  ? "bg-gray-900 text-right self-end border-gray-600 border-2"
                  : "bg-gray-700 text-left self-start border-gray-600 border-2"
              }`}
            >
              <strong className="font-semibold text-orange-600 uppercase">
                {msg.user}:{" "}
              </strong>
              <strong className="text-white">{msg.text}</strong>
            </div>
          ))}
        </div>

        {/* Fixed Input Box */}
        <div className="sticky bottom-0 flex items-center gap-2 p-4 bg-black border-t border-gray-800">
          <input
            type="text"
            className="flex-grow p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            type="submit"
            onClick={sendMessage}
            className="p-3 text-orange-600 bg-black border-2 border-gray-600 rounded-lg shadow-lg hover:bg-gray-950 focus:outline-none"
          >
            <img src={send} alt="send" className="w-8 h-8"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
