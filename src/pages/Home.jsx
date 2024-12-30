import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Theme toggle state
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const { fetchResponse, messages, prompt, setPrompt, newRequestLoading, loading, chats } = ChatData();

  const messageContainerRef = useRef();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  return (
    <div
      className={`flex h-screen overflow-hidden ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleSidebar}
          className="p-4 bg-gray-800 text-white text-2xl focus:ring-2 focus:ring-gray-600 md:hidden"
          aria-label="Toggle Sidebar"
        >
          <GiHamburgerMenu />
        </button>

        {/* Header */}
        <Header />

        {/* Theme Toggle */}
        <div className="p-4 flex justify-end">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
          >
            {isDarkMode ? <MdOutlineLightMode size={24} /> : <MdDarkMode size={24} />}
          </button>
        </div>

        {/* Chat Section */}
        <div
          ref={messageContainerRef}
          className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? "bg-gray-800" : "bg-gray-200"} rounded-lg shadow-md`}
        >
          {loading ? (
            <LoadingBig />
          ) : (
            <div>
              {messages.length > 0 ? (
                messages.map((msg, i) => (
                  <div key={i} className="mb-6">
                    {/* User Message */}
                    <div className="flex gap-3 items-start mb-4">
                      <div className="flex items-center justify-center bg-blue-600 text-white text-2xl w-10 h-10 rounded-full">
                        <CgProfile />
                      </div>
                      <div className="bg-blue-600 text-white p-4 rounded-lg w-full">
                        {msg.question}
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex gap-3 items-start">
                      <div className="flex items-center justify-center bg-gray-700 text-white text-2xl w-10 h-10 rounded-full">
                        <FaRobot />
                      </div>
                      <div
                        className="bg-gray-700 text-white p-4 rounded-lg w-full"
                        dangerouslySetInnerHTML={{ __html: msg.answer }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No chat yet.</p>
              )}

              {newRequestLoading && (
                <div className="mt-4 flex justify-center">
                  <LoadingSmall />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Form */}
        {chats.length > 0 && (
          <div className={`p-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-200"} md:relative fixed bottom-0 left-0 right-0`}>
            <form onSubmit={submitHandler} className="flex items-center space-x-2">
              <input
                className="flex-grow p-4 bg-gray-800 rounded-l-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <button
                type="submit"
                className="p-4 bg-blue-600 hover:bg-blue-700 rounded-r-lg text-white text-2xl focus:ring-2 focus:ring-blue-500"
              >
                <IoMdSend />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
