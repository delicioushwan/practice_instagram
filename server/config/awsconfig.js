require('dotenv').config();

module.exports = {
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  region: 'ap-northeast-2',
};
