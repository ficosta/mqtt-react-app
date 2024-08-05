import React, { createContext, useContext, useEffect, useState } from "react";
import MqttService from "../services/mqttService";

const MQTT_BROKER_URL = "wss://test.mosquitto.org:8081";

const MqttContext = createContext<MqttService | null>(null);

export const useMqtt = () => {
  return useContext(MqttContext);
};

export const MqttProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mqttService] = useState(new MqttService(MQTT_BROKER_URL));

  useEffect(() => {
    return () => {
      mqttService.disconnect();
    };
  }, [mqttService]);

  return (
    <MqttContext.Provider value={mqttService}>{children}</MqttContext.Provider>
  );
};
