const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');
const models = require('../../database/models');


router.post('/', (req, res) => {
  const {
    signInUserId, signInPassword,
  } = req.body;

  models.users.findOne({
    where: {
      user_account: signInUserId, password: signInPassword,
    },
  })
    .then((result) => {
      if (result === null) {
        return res.status(401).send('invalid');
      }
      const token = jwt.sign({ signInUserId }, secretObj.secret);
      res.cookie('user', token);
      res.cookie('user1', result.id);
      return res.send({ data: 'ok', token, user: result.id });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
