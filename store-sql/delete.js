exports.deleteOne = (table, values) => {
    return new Promise((resolve, reject) => {
        // SQL pour delete un users à partir de son id
        let sql = `DELETE FROM ${ table }  WHERE id = ?`;
        db.query(sql, [values], function (err, data, fields) {
            if (err) reject(err);
            resolve(data)
        })
    })
}

exports.deleteAll = (table) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${ table }`;
        db.query(sql, function (err, data, fields) {
            if (err) reject(err);
            resolve(data)
        })
    })
}