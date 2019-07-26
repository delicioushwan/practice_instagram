const router = require('express').Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const models = require('../../database/models');
const sendUser = require('../sendUser');

AWS.config = require(__dirname + '/../../config/awsconfig.js');
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

router.post('/', upload.single('main_image'), async (req, res) => {
  models.users.update(
    { main_image: req.file.location },
    { where: { id: req.cookies.user1 } },
  ).then(() => sendUser(req, res));
});

module.exports = router;
