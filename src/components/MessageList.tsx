import React, { useEffect, useState } from "react";
import { useMqtt } from "../context/MqttContext";

interface MessageListProps {
  topic: string;
}

const MessageList: React.FC<MessageListProps> = ({ topic }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const mqttService = useMqtt();

  useEffect(() => {
    if (mqttService) {
      mqttService.subscribe(topic);
      mqttService.onMessage((receivedTopic, message) => {
        if (receivedTopic === topic) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }
  }, [mqttService, topic]);

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
