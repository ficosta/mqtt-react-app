import React, { createContext, useContext, useEffect, useRef } from "react";
import MqttService from "../services/mqttService";

const MqttContext = createContext<MqttService | null>(null);

export const useMqtt = () => {
  return useContext(MqttContext);
};

interface MqttProviderProps {
  children: React.ReactNode;
  brokerUrl: string;
}

export const MqttProvider: React.FC<MqttProviderProps>= ({ children, brokerUrl  }) => {
  const mqttServiceRef = useRef<MqttService | null>(null);

  if (!mqttServiceRef.current) {
    mqttServiceRef.current = new MqttService(brokerUrl);
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
