const router = require('express').Router();

router.get('/', (req, res) => {
  res.clearCookie('user');
  res.clearCookie('user1');
  res.send();
});

module.exports = router;
