const router = require('express').Router();
const models = require('../../database/models');
const sendPost = require('../sendPost');

router.post('/', async (req, res) => {
  const checkLike = await models.likes.findOne({
    where: { user_id: req.cookies.user1, comment_id: req.body.comment_id },
  });
  if (checkLike) {
    models.likes.destroy({
      where: { id: checkLike.id },
    })
      .then(() => sendPost(req, res));
  } else {
    models.likes.create({ user_id: req.cookies.user1, comment_id: req.body.comment_id })
      .then(() => sendPost(req, res));
  }
});

module.exports = router;
