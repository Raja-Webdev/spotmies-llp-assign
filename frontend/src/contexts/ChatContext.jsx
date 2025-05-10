import { createContext, useContext, useState, useEffect } from "react";
import { getChatHistory, sendMessage } from "../services/chat";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChatHistory = async () => {
    try {
      setLoading(true);
      const history = await getChatHistory();
      setMessages(history);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendChatMessage = async (message) => {
    try {
      setLoading(true);
      const newMessage = { sender: "user", text: message };
      setMessages((prev) => [...prev, newMessage]);

      const aiResponse = await sendMessage(message);
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{ messages, loading, error, fetchChatHistory, sendChatMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
