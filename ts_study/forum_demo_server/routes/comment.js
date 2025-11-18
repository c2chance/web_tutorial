var express = require('express')
var router = express.Router()

var dbManager = require('../db/db')
var FormatResponse = require('../format/response')

router.post('/create', function (req, res, next) {
    var params = req.body;
    var post_id = params.post_id;
    var content = params.content;
    var author_id = params.author_id;
    var reply_to = params.reply_to;

    if (!post_id || !author_id || !content) {
        res.status(404).json(FormatResponse.FormatResponse(false, 'missing parameters', ""))
        return
    }

    dbManager.createComment(post_id, author_id, reply_to, content, (success) => {
        if (success) {
            res.status(200).json(FormatResponse.FormatResponse(true, "", ""))
        } else {
            res.status(404).json(FormatResponse.FormatResponse(false, 'publish failure', ""))
        }
    })
})

router.delete('/delete', function (req, res, next) {
    var params = req.body;
    var id = params.id;
    if (!id) {
        res.status(404).json(FormatResponse.FormatResponse(false, 'missing parameters', ""))
        return;
    }

    dbManager.deleteComment(id, (success) => {
        if (success) {
            res.status(200).json(FormatResponse.FormatResponse(true, "", ""))
        } else {
            res.status(404).json(FormatResponse.FormatResponse(false, 'delete failure', ""))
        }
    })
})

router.get('/comments', function (req, res, next) {
    var params = req.query;
    var post_id = params.post_id;

    var offset = params.offset ? params.offset : 0;
    var limit = params.limit ? params.limit : 10;
    if (!post_id) {
        res.status(500).json(FormatResponse.FormatResponse(false, 'missing parameters', ""))
        return;
    }

    dbManager.queryComments(post_id, offset, limit, (data) => {
        res.status(200).json(FormatResponse.FormatResponse(true, "", data))
    })
})

module.exports = router;