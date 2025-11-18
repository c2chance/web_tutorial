const sqlite3 = require('sqlite3').verbose()

const dbName = './sqlite3_db/forum.db'

function queryAllUsersInfoFromDB(callback) {
    // open DB
    const db = new sqlite3.Database(dbName)

    const sql = 'SELECT * FROM user;'

    db.all(sql, [], (err, rows) => {
        callback(err, rows)
    })

    db.close()
}

module.exports = {
    queryAllUsersInfoFromDB
}