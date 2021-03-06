const router = require('express').Router();
const models = require('../../database/models');
const MypagePost = require('../MypagePost');
const FeedPost = require('../FeedPost');

const send = (body, req, res) => {
  if (body.currentPage === 'Feed') {
    return FeedPost(req, res);
  }
  return MypagePost(req, res);
};

router.post('/', async (req, res) => {
  try {
    const checkLike = await models.likes.findOne({
      where: { user_id: req.cookies.user1, comment_id: req.body.comment_id },
    });
    if (checkLike) {
      models.likes.destroy({
        where: { id: checkLike.id },
      })
        .then(() => send(req.body, req, res));
    } else {
      models.likes.create({ user_id: req.cookies.user1, comment_id: req.body.comment_id })
        .then(() => send(req.body, req, res));
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
