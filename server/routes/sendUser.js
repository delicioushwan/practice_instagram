const models = require('../database/models');


module.exports = (req, res) => {
  try {
    models.users.findOne({
      where: { id: req.cookies.user1 },
      attributes: ['id', 'name', 'follower_count', 'following_count', 'post_count', 'about', 'main_image'],
    })
      .then(result => res.send(result));
  } catch (e) {
    res.send(e);
  }
};
