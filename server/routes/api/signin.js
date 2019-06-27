const router = require('express').Router();
const models = require('../../database/models');


router.post('/', (req, res) => {
  const {
    signInUserId, signInPassword,
  } = req.body;
  models.users.findOne({
    where: {
      user_id: signInUserId, password: signInPassword,
    },
  })
    .then((result) => {
      if (result === null) {
        return res.status(401).send('invalid');
      }
      return res.send('ok');
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
