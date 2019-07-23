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

router.post('/', (req, res) => {
  models.comments.create({
    user_id: req.cookies.user1,
    comment: req.body.comment,
    post_id: req.body.post_id,
  })
    .then(() => send(req.body, req, res));
});

module.exports = router;
