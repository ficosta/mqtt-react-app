import mqtt, { MqttClient } from "mqtt";

class MqttService {
  private client: MqttClient | null = null;
  private subscriptions: string[] = [];
  private isConnected: boolean = false;

  constructor(brokerUrl: string) {
    this.client = mqtt.connect(brokerUrl);

    this.client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      this.isConnected = true;
      this.subscriptions.forEach((topic) => {
        this.client?.subscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to subscribe to topic ${topic}:`, err);
          }
        });
      });
    });

    this.client.on("close", () => {
      console.log("Disconnected from MQTT Broker");
      this.isConnected = false;
    });
  }

  subscribe(topic: string) {
    if (this.isConnected) {
      this.client?.subscribe(topic, (err) => {
        if (err) {
          console.error(`Failed to subscribe to topic ${topic}:`, err);
        } else {
          console.log(`Subscribed to topic ${topic}`);
        }
      });
    } else {
      this.subscriptions.push(topic);
    }
  }

  onMessage(callback: (topic: string, message: string) => void) {
    this.client?.on("message", (topic, payload) => {
      callback(topic, payload.toString());
    });
  }

  sendMessage(topic: string, message: string) {
    if (this.client) {
      this.client.publish(topic, message);
    }
  }

  disconnect() {
    if (this.client) {
      this.client.end();
    }
  }
}

export default MqttService;
