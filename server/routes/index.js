const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');
const models = require('../database/models');


router.use('/home', require('./home'));

router.use((req, res, next) => {
  jwt.verify(req.cookies.user, secretObj.secret, (e, result) => {
    if (e) {
      res.status(401).send('invalid');
    }
    if (result) {
      models.users.findOne({
        where: { user_account: result.signInUserId },
      })
        .then(() => next())
        .catch(() => res.status(401).send('invalid'));
    }
  });
});
router.use('/feed', require('./feed'));
router.use('/mypage', require('./mypage'));

module.exports = router;
