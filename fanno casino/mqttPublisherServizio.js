const mqttService = require("../backend/routers/mqttServizio");


// Change this to point to your MQTT broker
const MQTT_HOST_NAME = "mqtts://3108e050885c47239e3a43a637c7ddd1.s1.eu.hivemq.cloud";
const options = {
  keepalive: 60,
  clientId: "client" + Math.random().toString(36).substring(7),
  username: "3108e050885c47239e3a43a637c7ddd1",
  password: "HiveMQ1!",
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  rejectUnauthorized: false // Ignora certificati non riconosciuti
};

var mqttClient = new mqttService(MQTT_HOST_NAME, options);
mqttClient.connect();

exports.publishMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topic;
    const message = req.body.message;

    console.log(`Request Topic :: ${topic}`);
    console.log(`Request Message :: ${message}`);

    mqttClient.publish(topic, message, {});
    res
      .status(200)
      .json({ status: "200", message: "Sucessfully published MQTT Message" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};