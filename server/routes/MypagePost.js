const models = require('../database/models');


module.exports = (req, res) => {
  try {
    const userInfo = () => {
      if (req.body.feed === req.cookies.user1 || req.body.feed === undefined) {
        return req.cookies.user1;
      }
      return req.body.feed;
    };
    models.posts.findAll({
      where: { user_id: userInfo() },
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
      .then(result => res.send({ posts: result }));
  } catch (e) {
    res.send(e);
  }
};
