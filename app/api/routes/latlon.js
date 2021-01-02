const express = require('express');
const router = express.Router();
const getThreeWords = require('../helpers/get-three-words');

router.get('/lat/:lat/lon/:lon', (req, res) => res.send(getThreeWords(req.params.lat, req.params.lon)));

module.exports = router;
