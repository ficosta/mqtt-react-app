import React, { useState } from "react";
import { useMqtt } from "../context/MqttContext";

interface MessageInputProps {
  topic: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ topic }) => {
  const [message, setMessage] = useState<string>("");
  const mqttService = useMqtt();

  const handleSendMessage = () => {
    if (mqttService && message) {
      mqttService.sendMessage(topic, message);
      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
