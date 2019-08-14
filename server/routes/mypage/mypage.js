const router = require('express').Router();
const models = require('../../database/models');

router.get('/', async (req, res) => {
  try {
    const userInfo = req.query.feed === undefined ? req.cookies.user1 : req.query.feed;
    console.log('*************************************', req.query.feed, userInfo);
    const user = await models.users.findOne({
      where: { id: userInfo },
      attributes: ['id', 'name', 'follower_count', 'following_count', 'post_count', 'about', 'main_image'],
    });
    const posts = await models.posts.findAll({
      where: { user_id: userInfo },
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
    const followings = await models.friends.findAll({
      where: { follower_id: userInfo },
    });
    const followers = await models.friends.findAll({
      where: { following_id: userInfo },
    });

    res.send({
      user,
      posts,
      on: req.cookies.user1,
      followings,
      followers,
    });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
