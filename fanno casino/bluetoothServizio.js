const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

var router = express.Router();

// Middleware
//router.use(router)
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/signin', (req, res) => {
    
})

module.exports=router;