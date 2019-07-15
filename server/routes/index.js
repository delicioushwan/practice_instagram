const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');
const models = require('../database/models');

let AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
let s3 = new AWS.S3();

let multer = require("multer");
let multerS3 = require('multer-s3');
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'cloning-instagram',
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    }
  })
});



router.use('/home', require('./home'));

router.use((req, res, next) => {
  jwt.verify(req.cookies.user, secretObj.secret, (e, result) => {
    if (e) {
      res.status(401).send('invalid');
    }
    if (result) {
      models.users.findOne({
        where: { user_account: result.signInUserId },
      })
        .then(() => next())
        .catch(() => res.status(401).send('invalid'));
    }
  });
});
router.use('/feed', require('./feed'));
router.use('/mypage', require('./mypage'));
router.post('/upload', upload.array('uploadImage', 1), function (req, res, next) {
  res.send("Uploaded!");
});


module.exports = router;
