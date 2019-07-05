const router = require('express').Router();
const models = require('../../database/models');


router.get('/', async (req, res) => {
  try {
    const user = await models.users.findOne({
      where: { id: req.query.user },
      attributes: ['id', 'name', 'follower_count', 'following_count', 'post_count', 'about', 'main_image'],
    });
    const posts = await models.posts.findAll({
      where: { user_id: req.query.user },
      include: { model: models.pictures, as: 'pictures', attributes: ['pic'] },
    });

    res.send({ user, posts });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
