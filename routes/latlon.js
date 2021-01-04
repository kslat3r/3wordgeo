const express = require('express');
const router = express.Router();
const getWords = require('../helpers/get-words');

router.get('/lat/:lat/lon/:lon', (req, res) => res.send(getWords(req.params.lat, req.params.lon)));

module.exports = router;
