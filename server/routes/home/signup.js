const router = require('express').Router();
const models = require('../../database/models');


router.post('/', (req, res) => {
  const {
    signUpUserId, signUpPassword, signUpEmail, signUpName,
  } = req.body;
  models.users.create({
    user_account: signUpUserId, password: signUpPassword, email: signUpEmail, name: signUpName,
  })
    .then(() => {
      res.send('ok');
    })
    .catch((err) => {
      if (err.errors[0].message === 'user_account_UNIQUE must be unique') {
        res.status(409).send('not_unique_id');
      }
      res.send(err.errors);
    });
});

module.exports = router;
