import React, { createContext, useContext, useEffect, useRef } from "react";
import MqttService from "../services/mqttService";

const MQTT_BROKER_URL = "wss://test.mosquitto.org:8081";

const MqttContext = createContext<MqttService | null>(null);

export const useMqtt = () => {
  return useContext(MqttContext);
};

export const MqttProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mqttServiceRef = useRef<MqttService | null>(null);

  if (!mqttServiceRef.current) {
    mqttServiceRef.current = new MqttService(MQTT_BROKER_URL);
  }

  useEffect(() => {
    return () => {
      mqttServiceRef.current?.disconnect();
    };
  }, []);

  return (
    <MqttContext.Provider value={mqttServiceRef.current}>
      {children}
    </MqttContext.Provider>
  );
};
