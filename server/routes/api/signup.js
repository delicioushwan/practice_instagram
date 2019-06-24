const router = require('express').Router();
const models = require('../../database/models');


router.post('/', (req, res) => {
  console.log(JSON.stringify(req.body));
  const { userId, password, email, userName } = req.body;
  models.users.create({ user_id: userId, password, email, name: userName })
    .then(res.send())
    .catch((err) => {
      throw err(err);
    });
  res.send();
});

module.exports = router;
