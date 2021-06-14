
exports.insertInto = (table, body) => {
    const key = [], val = []
    Object.entries(body).forEach(kv => {
        key.push(kv[0])
        val.push(kv[1])
    })

    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${table} ( ${key.toString() } ) values(?)`;
        db.query(sql, [val], (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}