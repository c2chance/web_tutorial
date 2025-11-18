const sqlite3 = require('sqlite3').verbose()
const dbName = './db/forum.db'
function queryAllUsersInfoFromDB(callback) {
    const db = new sqlite3.Database(dbName)
    const sql = 'SELECT * FROM user;'
    db.all(sql, [], (err, rows) => {
        callback(err, rows)
    })

    db.close()
}

function accountIfExist(account, callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `SELECT account FROM user where account = '${account}';`;
    
    db.all(sql, [], (err, rows) => {
        if (rows.length > 0) {
            callback(true)
        } else {
            callback(false)
        }
    })
    db.close();
}

function createAccount(nickname, account, password, callback) {
    const db = new sqlite3.Database(dbName);
    const sql = `INSERT INTO user (nickname, account, password) VALUES ('${nickname}', '${account}', '${password}');`;
    db.run(sql, (res, err) => {
        if (err) {
            callback(err, null)
        } else {
            db.get(`SELECT * FROM user WHERE account='${account}';`, (err, row) => {
                console.log(err)
                callback(null, row)
            })
        }
    })
    db.close()
}

function queryUser(account, callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `SELECT * FROM user where account = '${account}';`;
    db.get(sql, [], (err, row) => {
        callback(err, row)
    })
    db.close()
}

function queryAllCategories(callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `SELECT * FROM category order by 'position';`;
    db.all(sql, [], (err, rows) => {
        if (!err) {
            callback(rows);
        } else {
            callback(undefined)
        }
    })
    db.close()
}

function queryPosts(category, offset, limit, callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `SELECT id, category_id, title, summary, author_id, publish_time FROM post where category_id='${category}' order by publish_time DESC limit ${limit} offset ${offset};`;
    db.all(sql, [], (err, posts) => {
        if (!err) {
            if (posts.length == 0) {
                callback(posts)
                return
            }
            var queryCount = posts.length * 2;

            var currentQueryCount = 0
            for (var i = 0; i < posts.length; i++) {
                let post = posts[i]
                const sql1 = `SELECT * FROM user where id = ${post.author_id};`;
                db.get(sql1, (err, row) => {
                    post.author = row;
                    currentQueryCount += 1
                    if (currentQueryCount == queryCount) {
                        callback(posts)
                        db.close()
                    }
                })

                const sql2 = `SELECT * FROM category where id = ${post.category_id};`;
                db.get(sql2, (err, row) => {
                    post.category = row
                    currentQueryCount += 1
                    if (currentQueryCount == queryCount) {
                        callback(posts)
                        db.close()
                    }
                })
            }
        } else {
            callback()
            db.close()
        }
    })
}

function createPost(category_id, title, summary, content, author_id, callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `INSERT INTO post (category_id, title, summary, content, author_id)
        VALUES (${category_id}, '${title}', '${summary}', '${content}', ${author_id})`
    
    db.run(sql, (res, err) => {
        if (err) {
            callback(false)
        } else {
            callback(true)
        }
    })
    db.close()
}

function queryPostDetail(id, callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `SELECT * FROM post where id = ${id};`;
    db.get(sql, [], (err, post) => {
        if (!err) {
            if (!post) {
                callback()
                return
            }
            const sql1 = `SELECT * FROM user where id = ${post.author_id};`;
            db.get(sql1, (err, row) => {
                post.author = row
                const sql2 = `SELECT * FROM category where id = ${post.category_id};`;
                db.get(sql2, (err, row) => {
                    post.category = row
                    callback(post)
                    db.close()
                })                
            })
        } else {
            callback()
            db.close()
        }
    })

}

function deletePost(id, callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `DELETE FROM post WHERE id = ${id};`
    db.run(sql, (res, err) => {
        if (err) {
            callback(false)
        } else {
            callback(true)
        }
    })
    db.close()
}

function createComment(postId, author_id, reply_to, content, callback) {
    const db = new sqlite3.Database(dbName)
    var sql = ""
    if (reply_to) {
        sql = `INSERT INTO comment (post_id, author_id, reply_to, content)
        VALUES (${postId}, ${author_id}, ${reply_to}, '${content}');`
    } else {
        sql = `INSERT INTO comment (post_id, author_id, content)
            VALUES (${postId}, ${author_id}, '${content}');`
    }
    db.run(sql, (res, err) => {
        if (err) {
            callback(false)
        } else {
            callback(true)
        }
    })
    db.close()
}

function deleteComment(id, callback) {

    const db = new sqlite3.Database(dbName)
    const sql = `DELETE FROM comment WHERE id = ${id};`
    db.run(sql, (res, err) => {
        if (err) {
            callback(false)
        } else {
            callback(true)
        }
    })
    db.close()
}

function queryComments(postId, offset, limit, callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `SELECT * FROM comment where post_id='${postId}' order by publish_time DESC limit ${limit} offset ${offset};`;
    db.all(sql, [], (err, comments) => {
        if (!err) {
            if (comments.length == 0) {
                callback(comments)
                return
            }

            var queryCount = comments.length * 2
            var currentQueryCount = 0
            for (var i = 0; i < comments.length; i++) {
                let comment = comments[i]
                const sql1 = `SELECT * FROM user where id=${comment.author_id};`;
                db.get(sql1, (err, row) => {
                    comment.author = row
                    currentQueryCount += 1
                    if (currentQueryCount == queryCount) {
                        callback(comments)
                        db.close()
                    }
                })

                if (!comment.reply_to) {
                    currentQueryCount += 1
                } else {
                    const sql2 = `SELECT * FROM user where id=${comment.reply_to};`;
                    db.get(sql2, (err, row) => {
                        comment.reply = row
                        currentQueryCount += 1
                        if (currentQueryCount == queryCount) {
                            callback(comments)
                            db.close()
                        }
                    })
                }
            }
        } else {
            callback()
            db.close()
        }
    })

}

function searchPosts(keyword, offset, limit, callback) {
    const db = new sqlite3.Database(dbName)
    const sql = `SELECT id, category_id, title, summary, author_id, publish_time FROM post where title LIKE '%${keyword}%' order by publish_time DESC limit ${limit} offset ${offset};`;
    db.all(sql, [], (err, posts) => {
        if (!err) {
            if (posts.length == 0) {
                callback(posts)
                return
            }
            var queryCount = posts.length * 2;
            var currentQueryCount = 0;
            for (var i = 0; i < posts.length; i++) {
                let post = posts[i]
                const sql1 = `SELECT * FROM user where id = ${post.author_id};`;
                db.get(sql1, (err, row) => {
                    post.author = row;
                    currentQueryCount += 1
                    if (currentQueryCount == queryCount) {
                        callback(posts)
                        db.close()
                    }
                })
                const sql2 = `SELECT * FROM category where id = ${post.category_id};`;
                db.get(sql2, (err, row) => {
                    post.category = row;
                    currentQueryCount += 1
                    if (currentQueryCount == queryCount) {
                        callback(posts)
                        db.close()
                    }
                })
            }
        } else {
            callback()
            db.close()
        }
    })
}

module.exports = {
    queryAllUsersInfoFromDB,
    accountIfExist,
    createAccount,
    queryUser,
    queryAllCategories,
    queryPosts,
    createPost,
    queryPostDetail,
    deletePost,
    createComment,
    deleteComment,
    queryComments,
    searchPosts
}