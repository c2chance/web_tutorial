var express = require('express')
var router = express.Router()

var dbManager = require('../sqlite3_db/db')
router.get('/', function (req, res, next) {
    dbManager.queryAllUsersInfoFromDB((err, data) => {
        res.status(200).json(data)
    })
})
module.exports = router