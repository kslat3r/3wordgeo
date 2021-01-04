const express = require('express');
const router = express.Router();
const getLatLon = require('../helpers/get-lat-lon');

router.get('/words/:word1-:word2-:word3', (req, res) => res.send(getLatLon([req.params.word1, req.params.word2, req.params.word3])));

module.exports = router;
