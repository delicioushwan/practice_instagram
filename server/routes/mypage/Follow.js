const router = require('express').Router();
const models = require('../../database/models');

const sendData = async (req, res) => {
  const followings = await models.friends.findAll({
    where: { following_id: req.cookies.user1 },
  });
  const followers = await models.friends.findAll({
    where: { follower_id: req.cookies.user1 },
  });
  res.send({ followings, followers });
};

router.post('/', async (req, res) => {
  const checkFriend = await models.friends.findOne({
    where: { follower_id: req.body.on, following_id: req.body.feed },
  });

  if (checkFriend) {
    models.friends.destroy({
      where: { id: checkFriend.id },
    })
      .then(() => sendData(req, res));
  } else {
    models.friends.create({ follower_id: req.body.on, following_id: req.body.feed })
      .then(() => sendData(req, res));
  }
});

module.exports = router;
