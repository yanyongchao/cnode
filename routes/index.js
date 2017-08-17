var express = require('express');
var router = express.Router();
var JWT_SECRET = require('../cipher').JWT_SECRET;
var JWT = require('jsonwebtoken');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  (async () => {
    const user = await User.login(req.body);
    const token = JWT.sign({
      username: req.body.phoneNumber,
      iat: Date.now(),
      expire: Date.now() + 24 * 60
    }, JWT_SECRET);
    return {
      user: user,
      token: token
    }
  })()
    .then(r => {
      res.json(r);
    })
    .catch(e => {
      next(e);
    });
});

module.exports = router;
