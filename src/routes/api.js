var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({"Api version:": 0.0})
});

module.exports = router;
