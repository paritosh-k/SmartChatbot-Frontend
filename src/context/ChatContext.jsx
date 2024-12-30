import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import { toast } from "react-toastify";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch messages from the selected chat
  useEffect(() => {
    if (selected) fetchMessages();
  }, [selected]);

  // Fetch all chats on initial render
  useEffect(() => {
    fetchChats();
  }, []);

  // Fetch AI response for the current prompt
  const fetchResponse = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    setNewRequestLoading(true);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC58dWZQP-PH1HZ0M5j7reRm-jMRF29J7Q",
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      const answer = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      const newMessage = { question: prompt, answer };

      // Append the new message
      setMessages((prev) => [...prev, newMessage]);
      setPrompt("");

      // Save the message to the server
      if (selected) {
        await axios.post(
          `${server}/api/chat/${selected}`,
          newMessage,
          { headers: { token: localStorage.getItem("token") } }
        );
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      toast.error("Something went wrong while fetching the response.");
    } finally {
      setNewRequestLoading(false);
    }
  };

  // Fetch all chats
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${server}/api/chat/all`, {
        headers: { token: localStorage.getItem("token") },
      });

      setChats(data);
      if (data.length > 0) setSelected(data[0]._id); // Automatically select the first chat
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // Fetch messages of the selected chat
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/chat/${selected}`, {
        headers: { token: localStorage.getItem("token") },
      });

      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new chat
  const createChat = async () => {
    setCreateLoading(true);
    try {
      await axios.post(
        `${server}/api/chat/new`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );

      fetchChats();
      toast.success("Chat created successfully.");
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Failed to create a new chat.");
    } finally {
      setCreateLoading(false);
    }
  };

  // Delete a chat
  const deleteChat = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/chat/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });

      toast.success(data.message);
      fetchChats();
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete the chat.");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLoading,
        selected,
        setSelected,
        loading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
