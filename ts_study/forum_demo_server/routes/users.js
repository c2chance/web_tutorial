var express = require('express');
var router = express.Router();

var dbManager = require('../db/db')

var FormatResponse = require('../format/response')

/* GET users listing. */
router.get('/', function (req, res, next) {
  dbManager.queryAllUsersInfoFromDB((err, data) => {
    res.status(200).json(data)
  })
});

router.post('/create', function (req, res, next) {
  var params = req.body;
  var account = params.account;
  var password = params.password;
  var nickname = params.nickname;

  if (!account || !password || !nickname) {
    res.status(404).json(FormatResponse.FormatResponse(false, 'missing parameters'));
    return;
  }

  dbManager.accountIfExist(account, (exist) => {
    if (exist) {
    res
      .status(409)
      .json(
        FormatResponse.FormatResponse(
          false,
          "the account has been existed, please change to register"
        )
      );

    } else {
      dbManager.createAccount(nickname, account, password, (err, user) => {
        if (err) {
          res.status(404).json(FormatResponse.FormatResponse(false, 'register failure'))
        } else {
          res.status(200).json(FormatResponse.FormatResponse(true, "", user))
        }
      })
    }
  })
})

router.get('/login', function (req, res, next) {
  var params = req.query;
  var account = params.account;
  var password = params.password

  if (!account || !password) {
    res.status(404).json(FormatResponse.FormatResponse(false, 'the account and password will not empty', ""))
    return;
  }

  dbManager.queryUser(account, (err, user)=> {
    console.log(password, user)
    if(user) {
      if (user.password == password) {
        res.status(200).json(FormatResponse.FormatResponse(true, "", user))
      } else {
        res.status(500).json(FormatResponse.FormatResponse(false, "password error", ""))
      }
    } else {
      res.status(404).json(FormatResponse.FormatResponse(false, "not exist account, please register first", ""))
    }
  })
})

module.exports = router;
