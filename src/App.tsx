import React from "react";
import MessageInput from "./components/MessageInput";
import MessageList from "./components/MessageList";
import { MqttProvider } from "./context/MqttContext";

const App: React.FC = () => {
  return (
    <MqttProvider>
      <div>
        <h1>MQTT React App</h1>
        <MessageInput topic="vite/react2" />
        <MessageInput topic="vite/react1" />
        <MessageList topic="vite/react2" />
        <MessageList topic="vite/react1" />
      </div>
    </MqttProvider>
  );
};

export default App;
