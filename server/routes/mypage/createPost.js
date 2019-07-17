const router = require('express').Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const models = require('../../database/models');
const sendPost = require('../sendPost');


AWS.config.loadFromPath(__dirname + '/../../config/awsconfig.json');
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'cloning-instagram',
    key: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

router.post('/', upload.array('uploadImage', 4), async (req, res) => {
  const pics = [];
  models.posts.create({ user_id: req.cookies.user1, content: req.body.content })
    .then((result) => {
      for (let i = 0; i < req.files.length; i++) {
        pics.push({ pic: req.files[i].location, post_id: result.id });
      }
    })
    .then(() => models.pictures.bulkCreate(pics)
      .then(() => sendPost(req, res)));
});

module.exports = router;
