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


router.post('/notizie', (req, res) => {
    console.log('Request received');
    const request = req.body.inputText;
    const apiUrl = `https://chroniclingamerica.loc.gov/newspapers.json?state=${request}`;

    axios.get(apiUrl)
        .then(function(response) {
            const newspapers = response.data.newspapers;

            if (newspapers && newspapers.length > 0) {
                const newspaperDetails = newspapers.map(newspaper => ({
                    title: newspaper.title,
                    state: newspaper.state,
                    publisher: newspaper.publisher,
                    url: newspaper.url
                }));

                const JsonResponse = {
                    inputText: `Found ${newspapers.length} newspapers for the state: ${request}`,
                    newspapers: newspaperDetails
                };
                res.json(JsonResponse);
            } else {
                res.json({
                    inputText: `No newspapers found for the state: ${request}`,
                    newspapers: []
                });
            }
        })
        .catch(function(error) {
            console.error(error);
            res.json({
                inputText: "Error occurred while fetching data",
                newspapers: []
            });
        });
});

module.exports=router;