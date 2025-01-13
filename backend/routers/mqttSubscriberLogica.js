const mongoose = require('mongoose');

const mqttService = require('./mqttLogica');
const Message = require('./../modelli/Message');
const database = require('./databaseConnectLogica');

const MQTT_HOST_NAME = 'mqtts://3108e050885c47239e3a43a637c7ddd1.s1.eu.hivemq.cloud';
const options = {
    keepalive: 60,
    clientId: 'subscriber' + Math.random().toString(36).substring(7),
    username: '3108e050885c47239e3a43a637c7ddd1',
    password: 'HiveMQ1!',
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false,
};

const mqttClient = new mqttService(MQTT_HOST_NAME, options);
mqttClient.connect();

let subscribedTopics = []; // Array per tenere traccia dei topic sottoscritti

mqttClient.mqttClient.on('message', (topic, message) => {
    console.log(`Received message: ${message.toString()} on topic: ${topic}`);

    database.connect();

    const newMessage = new Message({ topic: topic, message: message });
    newMessage.save()
        .then(() => {
            console.log('Topic saved to the database mqttSubscriberLogica');
        })
        .catch((err) => {
            console.error(`Error saving topic to the database. n${err}`);
        });
});

const subscribe = (topics, options = {}) => {
    if (Array.isArray(topics)) {
        topics.forEach((topic) => {
            if (!subscribedTopics.includes(topic)) {
                mqttClient.subscribe(topic, options);
                subscribedTopics.push(topic);
                console.log(`Sottoscritto al topic: ${topic}`);
            }
        });
    } else {
        if (!subscribedTopics.includes(topics)) {
            mqttClient.subscribe(topics, options);
            subscribedTopics.push(topics);
            console.log(`Sottoscritto al topic: ${topics}`);
        }
    }
};

const unsubscribe = (topic) => {
    mqttClient.mqttClient.unsubscribe(topic, (err) => {
        if (err) {
            console.error(`Errore nella cancellazione della sottoscrizione al topic ${topic}:`, err);
            throw err;
        }
        subscribedTopics = subscribedTopics.filter((t) => t !== topic);
        console.log(`Cancellata sottoscrizione al topic: ${topic}`);
    });
};

// Restituisce i topic sottoscritti
const getSubscribedTopics = () => subscribedTopics;

module.exports = { subscribe, unsubscribe, getSubscribedTopics };
