const router = require('express').Router();
const mailer = require('nodemailer');
const Content = require('../../findpasswordform');
const models = require('../../database/models');


const transporter = mailer.createTransport({
  service: 'naver',
  auth: {
    user: 'tmdghks752@naver.com',
    pass: 'wjdtmdghks',
  },
});

router.post('/', (req, res) => {
  const {
    findPasswordId, findPasswordEmail,
  } = req.body;
  models.users.findOne({
    where: {
      user_id: findPasswordId, email: findPasswordEmail,
    },
  })
    .then((result) => {
      const random = Math.floor(Math.random() * 100000000) + Math.floor(Math.random() * 100000000);
      if (result === null) {
        return res.status(401).send('invalid');
      }
      return transporter.sendMail(Content({ email: findPasswordEmail, pass: random }),
        ((err, info) => {
          if (err) {
            console.log(err);
          } else {
            models.users.update({ password: random }, { where: { user_id: findPasswordId } })
              .then(() => res.send('ok'))
              .catch((error) => {
                res.send(error);
              });
          }
          transporter.close();
        }));
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
