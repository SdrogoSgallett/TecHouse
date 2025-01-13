const mqtt = require("mqtt");


class MQTTService {
  constructor(host, options) {
    this.mqttClient = null;
    this.host = host;
    this.options = options;
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, this.options);

    // MQTT Callback for 'error' event
    this.mqttClient.on("error", (err) => {
      console.log("Errore MQTT:", err);
      this.mqttClient.end();
    });

    // MQTT Callback for 'connect' event
    this.mqttClient.on("connect", () => {
      console.log("MQTT client connesso");
    });

    this.mqttClient.on("close", () => {
      console.log("Connessione MQTT chiusa");
    });
  }

  publish(topic, message, options) {
    this.mqttClient.publish(topic, message, options);
  }

  subscribe(topic, options) {
    this.mqttClient.subscribe(topic, options);
  }
}

module.exports = MQTTService;