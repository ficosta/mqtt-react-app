import React from "react";
import useMqttMessages from "../hooks/useMqttMessages";

interface MessageListProps {
  topic: string;
}

const MessageList: React.FC<MessageListProps> = ({ topic }) => {
  const messages = useMqttMessages(topic);

  return (
    <div>
      <h2>Received Messages on {topic}:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
