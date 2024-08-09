import { useEffect, useState } from "react";
import { useMqtt } from "../context/MqttContext";

const useMqttMessages = (topic: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const mqttService = useMqtt();

  useEffect(() => {
    if (mqttService) {
      console.log(`Subscribing and setting up listener for topic: ${topic}`);
      mqttService.subscribe(topic);
      mqttService.onMessage((receivedTopic, message) => {
        if (receivedTopic === topic) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }

    // Cleanup: Unsubscribe from the topic when the component unmounts
    return () => {
      if (mqttService) {
        mqttService.unsubscribe(topic); // Use the new unsubscribe method
      }
    };
  }, [mqttService, topic]);

  return messages;
};

export default useMqttMessages;
