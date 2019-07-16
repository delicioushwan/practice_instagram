const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const secretObj = require('../config/jwt');
const models = require('../database/models');

AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'cloning-instagram',
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
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

router.post('/upload', upload.single('uploadImage'), (req, res, next) => {
  console.log(res.result);
  console.log('req.file', req.file);
  console.log('req.body', req.body);
  res.send('Uploaded!');
});


module.exports = router;
