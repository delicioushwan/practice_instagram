const router = require('express').Router();
const models = require('../../database/models');

const sendNewPost = (req, res) => {
  models.posts.findAll({
    where: { user_id: req.cookies.user1 },
    include: [
      { model: models.pictures, as: 'pictures', attributes: ['pic'] },
      {
        model: models.comments,
        as: 'comments',
        attributes: ['comment', 'user_id', 'id'],
        include: [
          { model: models.users, as: 'users', attributes: ['name', 'main_image'] },
          { model: models.likes, as: 'likes', attributes: ['user_id'] },
        ],
      },
      { model: models.likes, as: 'likes', attributes: ['user_id'] },
      { model: models.users, as: 'users', attributes: ['name', 'main_image'] },
    ],
  })
    .then(result => res.send(result));
};

router.post('/', async (req, res) => {
  const checkLike = await models.likes.findOne({
    where: { user_id: req.cookies.user1, comment_id: req.body.comment_id },
  });
  if (checkLike) {
    models.likes.destroy({
      where: { id: checkLike.id },
    })
      .then(() => sendNewPost(req, res));
  } else {
    models.likes.create({ user_id: req.cookies.user1, comment_id: req.body.comment_id })
      .then(() => sendNewPost(req, res));
  }
});

module.exports = router;
