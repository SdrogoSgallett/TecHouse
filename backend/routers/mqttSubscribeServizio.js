const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mqttSubscriber = require('./mqttSubscriberLogica');

var router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// API per sottoscriversi a un topic
router.post('/subscribe', (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ success: false, message: "Topic non valido!" });
    }

    try {
        mqttSubscriber.subscribe(topic, {});
        res.json({ success: true, message: `Subscribed to topic: ${topic}` });
    } catch (error) {
        console.error(`Errore nella sottoscrizione a ${topic}:`, error);
        res.status(500).json({ success: false, message: "Errore nella sottoscrizione.", error });
    }
});

// API per annullare la sottoscrizione a un topic
router.post('/unsubscribe', (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ success: false, message: "Topic non valido!" });
    }

    try {
        mqttSubscriber.unsubscribe(topic);
        res.json({ success: true, message: `Unsubscribed from topic: ${topic}` });
    } catch (error) {
        console.error(`Errore nella cancellazione della sottoscrizione a ${topic}:`, error);
        res.status(500).json({ success: false, message: "Errore nella cancellazione della sottoscrizione.", error });
    }
});


router.get('/topics', (req, res) => {
    try {
        const topics = mqttSubscriber.getSubscribedTopics();
        res.json({ success: true, topics });
    } catch (error) {
        console.error('Errore nel recupero dei topic sottoscritti:', error);
        res.status(500).json({ success: false, message: "Errore nel recupero dei topic sottoscritti.", error });
    }
});

module.exports=router;