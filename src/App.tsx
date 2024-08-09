import React from "react";
import MessageInput from "./components/MessageInput";
import MessageList from "./components/MessageList";
import { MqttProvider } from "./context/MqttContext";

const App: React.FC = () => {
  const brokerUrl = "wss://test.mosquitto.org:8081"; // Replace with your actual broker URL


  return (
    <MqttProvider brokerUrl={brokerUrl}>
      <div>
        <h1>MQTT React App</h1>
        <MessageInput topic="vite/react2" />
        <MessageList topic="vite/react2" />
        <MessageList topic="vite/ABC" />
      </div>
    </MqttProvider>
  );
};

export default App;
