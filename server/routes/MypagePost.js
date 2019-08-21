const models = require('../database/models');


module.exports = async (req, res) => {
  try {
    const userInfo = () => {
      if (req.body.feed === req.cookies.user1 || req.body.feed === undefined) {
        return req.cookies.user1;
      }
      return req.body.feed;
    };
    const followings = await models.friends.findAll({
      where: { following_id: req.cookies.user1 },
    });
    const followers = await models.friends.findAll({
      where: { follower_id: req.cookies.user1 },
    });

    const posts = await models.posts.findAll({
      where: { user_id: userInfo() },
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
    res.send({ posts, followers, followings });
  } catch (e) {
    res.send(e);
  }
};
