const router = require('express').Router();

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/findpassword', require('./findpassword'));


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
