const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');

module.exports = ((req, res) => jwt.verify(req.cookies.user, secretObj.secret, (e, result) => {
  if (e) {
    res.status(401).send('invalid');
  }
  if (result) {
    return result.signInUserId;
  }
}));
