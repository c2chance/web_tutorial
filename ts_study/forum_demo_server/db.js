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