const router = require('express').Router();
const models = require('../../database/models');

router.get('/', async (req, res) => {
  try {
    const loggedUser = await models.users.findOne({
      where: { id: req.cookies.user1 },
      attributes: ['user_account'],
    });
    const posts = await models.posts.findAll({
      include: [
        { model: models.likes, as: 'likes', attributes: ['user_id'] },
        { model: models.users, as: 'users', attributes: ['name', 'main_image', 'user_account'] },
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
    res.send({ posts, on: req.cookies.user1, loggedUser: loggedUser.user_account });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
