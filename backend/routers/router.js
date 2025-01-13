const express = require('express');
const router = express.Router();
var subscribe = require('./mqttSubscribeServizio');

router.use(subscribe);

// Middleware di log per tutte le richieste
router.use((req, res, next) => {
    console.log('API chiamata:', req.path);
    next();
});

module.exports = router;