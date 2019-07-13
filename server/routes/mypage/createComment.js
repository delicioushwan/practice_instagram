const router = require('express').Router();
const models = require('../../database/models');
const sendPost = require('../sendPost');

router.post('/', (req, res) => {
  models.comments.create({
    user_id: req.cookies.user1,
    comment: req.body.comment,
    post_id: req.body.post_id,
  })
    .then(() => sendPost(req, res));
});

module.exports = router;
