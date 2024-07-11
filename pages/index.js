var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var param = {};
  // param.success = 1; 
  param.message = 'Welcome'; 
  // res.render('index', { title: 'Express' });
  res.json(param);
});

module.exports = router;
