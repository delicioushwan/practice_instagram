const router = require('express').Router();
const models = require('../../database/models');

router.get('/', async (req, res) => {
  try {
    const posts = await models.posts.findAll({
      offset: 0,
      limit: 10,
      include: [
        { model: models.likes, as: 'likes', attributes: ['user_id'] },
        { model: models.users, as: 'users', attributes: ['name', 'main_image'] },
        {
          model: models.comments,
          as: 'comments',
          attributes: ['comment', 'user_id', 'id'],
          include: [
            { model: models.users, as: 'users', attributes: ['name', 'main_image'] },
            { model: models.likes, as: 'likes', attributes: ['user_id'] },
          ],
        },
        { model: models.pictures, as: 'pictures', attributes: ['pic'] },
      ],
      order: [['id', 'DESC'], ['comments', 'id', 'DESC'], ['pictures', 'id']],
    });
    res.send({ posts, user: req.cookies.user1 });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
