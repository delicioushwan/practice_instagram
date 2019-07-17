const router = require('express').Router();
const models = require('../../database/models');
const sendUser = require('../sendUser');

router.post('/', (req, res) => {
  models.users.update(
    { about: req.body.input },
    { where: { id: req.cookies.user1 } },
  )
    .then(() => sendUser(req, res));
});

module.exports = router;
