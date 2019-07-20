const models = require('../database/models');


module.exports = (req, res) => {
  try {
    models.posts.findAll({
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
      order: [['id', 'DESC'], ['comments', 'id', 'DESC'], ['pictures', 'id']],
    })
      .then(result => res.send(result));
  } catch (e) {
    res.send(e);
  }
};
