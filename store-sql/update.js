exports.updateOne = (table, body, id) => {
    const set = []
    Object.entries(body).forEach(kv => set.push(` ${kv[0]} = '${kv[1]}'`))
    
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${ table } 
                     SET ${ set.toString() }
                   WHERE id = '${id}';`;

        db.query(sql, function (err, data) {
            if (err) reject(err);
            resolve(data)
        })
    })
}