const router = require('express').Router();

router.use('/like', require('./like'));
router.use('/commentlike', require('./commentLike'));
router.use('/', require('./mypage'));

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
