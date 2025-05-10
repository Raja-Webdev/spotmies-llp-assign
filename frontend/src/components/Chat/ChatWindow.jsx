import { useEffect } from "react";
import { useChat } from "../../contexts/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Spinner from "../UI/Spinner";

const ChatWindow = () => {
  const { messages, loading, fetchChatHistory } = useChat();

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {loading && <Spinner />}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
