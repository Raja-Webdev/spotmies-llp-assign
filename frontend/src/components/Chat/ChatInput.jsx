import { useState } from "react";
import { useChat } from "../../contexts/ChatContext";
import Button from "../UI/Button";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { sendChatMessage, loading } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendChatMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !message.trim()}>
          Send
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
