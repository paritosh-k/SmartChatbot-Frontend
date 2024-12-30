import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete, MdPushPin } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat, pinChat, unpinChat } = ChatData();
  const { logoutHandler, userInfo } = UserData();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const deleteChatHandler = (id) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  const filteredChats = chats.filter((chat) =>
    chat.latestMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedChats = chats.filter((chat) => chat.isPinned);
  const recentChats = chats.filter((chat) => !chat.isPinned);

  return (
    <nav
      className={`fixed inset-0 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} transform transition-transform z-50 md:relative md:translate-x-0 md:w-1/4 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      aria-label="Sidebar"
    >
      <button
        className="absolute top-4 right-4 md:hidden text-2xl p-2 rounded-full hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
        onClick={toggleSidebar}
        aria-label="Close Sidebar"
      >
        <IoIosCloseCircle />
      </button>

      <div className="text-center py-8 border-b border-gray-700">
        <h1 className="text-blue-500 text-3xl font-bold">ChatBot</h1>
        {userInfo && <p className="text-sm text-gray-400 mt-2">Logged in as: {userInfo.username || "User"}</p>}
      </div>

      <div className="p-4 flex justify-between items-center">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 focus:ring-2 focus:ring-blue-500">
          {isDarkMode ? <MdOutlineLightMode size={24} /> : <MdDarkMode size={24} />}
        </button>
      </div>

      <div className="p-4">
        <button onClick={createChat} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500">
          {createLod ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-3 bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="py-4 px-4">
        <h3 className="font-semibold">Pinned Chats</h3>
        {pinnedChats.length === 0 && <p className="text-gray-400">No pinned chats yet</p>}
        {pinnedChats.map((chat) => (
          <div key={chat._id} className="flex justify-between items-center mt-4">
            <div onClick={() => clickEvent(chat._id)} className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <div className="text-sm">{chat.latestMessage}</div>
            </div>
            <button onClick={() => unpinChat(chat._id)} className="text-red-600 hover:text-red-800">
              <MdPushPin />
            </button>
          </div>
        ))}
      </div>

      <div className="py-4 px-4">
        <h3 className="font-semibold">Recent Chats</h3>
        {recentChats.map((chat) => (
          <div key={chat._id} className="flex justify-between items-center mt-4">
            <div onClick={() => clickEvent(chat._id)} className="text-sm">{chat.latestMessage}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => pinChat(chat._id)} className="text-blue-600 hover:text-blue-800">
                <MdPushPin />
              </button>
              <button onClick={() => deleteChatHandler(chat._id)} className="text-red-600 hover:text-red-800">
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-center py-2 border-t border-gray-700">
        <button onClick={logoutHandler} className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg focus:ring-2 focus:ring-red-500">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
