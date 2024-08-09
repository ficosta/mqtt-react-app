import mqtt, { MqttClient } from "mqtt";

class MqttService {
  private client: MqttClient | null = null;
  private subscriptions: string[] = [];
  private isConnected: boolean = false;

  constructor(brokerUrl: string) {
    console.log("Initializing MqttService");
    this.client = mqtt.connect(brokerUrl);

    this.client.on("connect", () => {
      console.log("Connected to MQTT Broker");

            // Log the clientId after connection
            if (this.client) {
              console.log(`Client ID: ${this.client.options.clientId}`);
            }

      this.isConnected = true;
      this.subscriptions.forEach((topic) => {
        this.client?.subscribe(topic, (err) => {
          if (err) {
            console.error(`Failed to subscribe to topic ${topic}:`, err);
          } else {
            console.log(`Successfully subscribed to topic ${topic}`);
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
      console.log(`Subscribing to topic: ${topic}`);
      this.client?.subscribe(topic, (err) => {
        if (err) {
          console.error(`Failed to subscribe to topic ${topic}:`, err);
        } else {
          console.log(`Successfully subscribed to topic ${topic}`);
        }
      });
    } else if (!this.subscriptions.includes(topic)) {
      this.subscriptions.push(topic);
    }
  }
  

  onMessage(callback: (topic: string, message: string) => void) {
    console.log("Attaching onMessage handler");
    this.client?.on("message", (topic, payload) => {
      console.log(`Received message on topic ${topic}: ${payload.toString()}`);
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

  public unsubscribe(topic: string) {
    if (this.client) {
      this.client.unsubscribe(topic, (err) => {
        if (err) {
          console.error(`Failed to unsubscribe from topic ${topic}:`, err);
        } else {
          console.log(`Successfully unsubscribed from topic ${topic}`);
        }
      });
    }
}
}

export default MqttService;
