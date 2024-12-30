import React from "react";
import { ChatData } from "../context/ChatContext";

const Header = () => {
  const { chats } = ChatData();

  return (
    <header className="bg-gray-800 p-4 rounded-md shadow-md text-white">
      {/* Greeting Message */}
      <div className="flex flex-col items-start space-y-2">
        <h1 className="text-2xl font-semibold">
          Hello! 👋 How can I assist you today?
        </h1>
        {chats && chats.length === 0 && (
          <p className="text-sm text-gray-400">
            Start by creating a new chat to continue your journey.
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
