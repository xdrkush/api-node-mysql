/*
 * Import Module
 ****************/

/*
 * Controller
 *************/

// Method get All books
exports.getBook = async (req, res) => {
    // Récupération des books en relation avec l'id de user = books.author_id
    let sql = `SELECT * FROM books;`

    await db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            listBook: data,
            message: "get Book join User successfully"
        })
    })
}

// Method get book join with id (users) author_id
exports.getBookJoinUser = async (req, res) => {
    // Récupération des books en relation avec l'id de user = books.author_id
    let sql = `SELECT users.name, books.title, books.description, books.id
                   FROM users
                   LEFT OUTER JOIN books
                   ON users.id = books.author_id 
                   WHERE users.id = ${parseInt(req.params.id)} ;`

    await db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            listBook: data,
            message: "get Book join User successfully"
        })
    })
}


// Method Post
exports.post = async (req, res) => {
    // SQL pour creer un books
    let sql = `INSERT INTO books (title,description,author_id) values(?)`;
    let values = [
        req.body.title,
        req.body.description,
        req.body.author_id
    ];

    await db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        // SQL pour récupérer les books en relation avec l'user qui à supprimer
        let sql = `SELECT users.name, books.title, books.description, books.id
                       FROM users
                       LEFT OUTER JOIN books
                       ON users.id = books.author_id 
                       WHERE users.id = ${parseInt(req.body.author_id)} ;`;

        db.query(sql, (error, dataRes, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listBook: dataRes,
                message: "Add Book successfully"
            })
        })
    })
}

// Method Delete One books & res book join with author_id book deleted
exports.deleteOne = async (req, res) => {
    let author;
    // SQL pour récuperer l'id de l'author 
    let sqlResult = `SELECT books.author_id
                         FROM books
                         WHERE books.id = ${parseInt(req.params.id)} ;`;

    await db.query(sqlResult, (errResult, result) => {
        if (errResult) throw errResult;

        // Ici on formate notre tableau
        Object
            .keys(result)
            .forEach(function (key) {
                var row = result[key];
                author = row.author_id
            })

        // SQL pour supprimer notre books
        let sqlDel = `DELETE FROM books WHERE id = ${parseInt(req.params.id)}`;
        db.query(sqlDel, function (errDel) {
            if (errDel) throw errDel;

            // SQL pour retrouver les books en relations avec l'users qui a supprimer le books
            let sql = `SELECT users.name, books.title, books.description, books.id
                           FROM users
                           LEFT OUTER JOIN books
                           ON users.id = books.author_id 
                           WHERE users.id = ${parseInt(author)};`;

            db.query(sql, (err, data) => {
                if (err) throw err;
                res.json({
                    status: 200,
                    listBook: data,
                    message: "Delete Book successfully"
                })
            })
        })

    })

}