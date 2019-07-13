const router = require('express').Router();
const models = require('../../database/models');

router.get('/', async (req, res) => {
  try {
    const user = await models.users.findOne({
      where: { id: req.cookies.user1 },
      attributes: ['id', 'name', 'follower_count', 'following_count', 'post_count', 'about', 'main_image'],
    });
    const posts = await models.posts.findAll({
      where: { user_id: req.cookies.user1 },
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
    });
    res.send({ user, posts });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
