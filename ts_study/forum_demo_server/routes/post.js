var express = require('express')
var router = express.Router()

var dbManager = require('../db/db')
var FormatResponse = require('../format/response')

router.get('/categories', function (req, res, next) {
    dbManager.queryAllCategories((data) => {
        res.status(200).json(FormatResponse.FormatResponse(true, "", data))
    })
})

router.get('/posts', function (req, res, next) {
    var params = req.query;
    var category_id = params.category_id;
    var offset = params.offset ? params.offset : 0;
    var limit = params.limit ? params.limit : 10;
    if (!category_id) {
        res.status(500).json(FormatResponse.FormatResponse(false, "missing parameters", ""))
        return
    }

    dbManager.queryPosts(category_id, offset, limit, (data) => {
        res.status(200).json(FormatResponse.FormatResponse(true, "", data))
    })
})

router.post('/create', function (req, res, next) {
    var params = req.body;
    var category_id = params.category_id;
    var title = params.title;
    var summary = params.summary;
    var content = params.content;
    var author_id = params.author_id;
    if (!title || !summary || !content || !author_id) {
        res.status(404).json(FormatResponse.FormatResponse(false, "Missing parameters", ""))
        return;
    }

    dbManager.createPost(category_id, title, summary, content, author_id, (success) => {
        if (success) {
            res.status(200).json(FormatResponse.FormatResponse(true, "", ""))
        } else {
            res.status(404).json(FormatResponse.FormatResponse(false, "publish failure", ""))
        }
    })
})

router.get('/detail', function (req, res, next) {
    var params = req.query;
    var id = params.id;
    if (!id) {
        res.status(404).json(FormatResponse.FormatResponse(false, 'missing parameters', ""))
        return;
    }

    dbManager.queryPostDetail(id, (data) => {
        if (data) {
            res.status(200).json(FormatResponse.FormatResponse(true, "", data))
        } else {
            res.status(404).json(FormatResponse.FormatResponse(false, 'the post no exist', ""))
        }
    })
})

router.delete('/delete', function (req, res, next) {
    var params = req.body;
    var id = params.id;
    if (!id) {
        res.status(404).json(FormatResponse.FormatResponse(false, 'missing parameters', ""))
        return
    }

    dbManager.deletePost(id, (success) => {
        if (success) {
            res.status(200).json(FormatResponse.FormatResponse(true, "", ""))
        } else {
            res.status(404).json(FormatResponse.FormatResponse(false, "delete post failure", ""))
        }
    })
})

router.get('/search', function (req, res, next) {
    var params = req.query;
    var keyword = params.keyword;

    var offset = params.offset ? params.offset : 0;
    var limit = params.limit ? params.limit : 10;
    if (!keyword) {
        res.status(500).json(FormatResponse.FormatResponse(false, 'Missing parameters', ""))
        return
    }

    dbManager.searchPosts(keyword, offset, limit, (data) => {
        res.status(200).json(FormatResponse.FormatResponse(true, "", data))
    })
})

module.exports = router;