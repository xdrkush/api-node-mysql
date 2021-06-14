exports.selectAll = (table) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${table}`;
        db.query(sql, (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}

// exports.selectKeys = (table, keys) => {
//     return new Promise((resolve, reject) => {
//         let sql = `SELECT ${ keys } from ${ table }`
//         db.query(sql, (err, data) => {
//             if (err) reject(err);
//             resolve(data)
//         })
//     })
// }

// exports.selectKeysWhere = (table, keys, where) => {
//     return new Promise((resolve, reject) => {
//         let sql = `SELECT ${ keys.toString() }
//                    FROM ${ table }
//                    WHERE books.id = ${parseInt(req.params.id)} ;`
//         db.query(sql, (err, data) => {
//             if (err) reject(err);
//             resolve(data)
//         })
//     })
// }