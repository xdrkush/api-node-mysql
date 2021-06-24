/*
 * Import Module
 ****************/

/*
 * Controller
 *************/

// Method Get
exports.get = async (req, res) => {
    res.json({
        status: 200,
        listBook: await query(`SELECT * FROM books`),
        message: "users lists retrieved successfully"
    })
}

exports.getBookJoinUser = async (req, res) => {
    // Récupération des books en relation avec l'id de user = books.author_id
    let sql = `SELECT users.name, books.title, books.description, books.id
               FROM users
               LEFT OUTER JOIN books
               ON users.id = books.author_id
               WHERE users.id = ${parseInt(req.params.id)};`

    res.json({
        status: 200,
        listBook: await query(sql),
        message: "get Book join User successfully"
    })
}

// Method Post
// & res book in relation with author_id of book added
exports.post = async (req, res) => {
    // SQL pour creer un books
    let sql = `INSERT INTO books (title,description,author_id) values(?)`;
    let values = [req.body.title, req.body.description, req.body.author_id];

    await query(sql, [values])

    // SQL pour récupérer les books en relation avec l'user qui à supprimer
    let sqlID = `SELECT users.name, books.title, books.description, books.id
                 FROM users
                 LEFT OUTER JOIN books
                 ON users.id = books.author_id 
                 WHERE users.id = ${parseInt(req.body.author_id)} ;`;

    res.json({
        status: 200,
        listBook: await query(sqlID),
        message: "Add Book successfully !"
    })

}

// Method Delete One
// & res book in relation with author_id of book deleted
exports.deleteOne = async (req, res) => {
    // SQL pour récuperer l'id de l'author 
    const sqlID = `SELECT books.author_id
                       FROM books
                       WHERE books.id = ${parseInt(req.params.id)} ;`;
    const ID = await query(sqlID)
    console.log('get author_id of Book deleted: ', ID[0].author_id)

    // SQL pour récupérer les livre en relation avec l'ID de l'author du livre supprimer
    let sql = `SELECT users.name, books.title, books.description, books.id
               FROM users
               LEFT OUTER JOIN books
               ON users.id = books.author_id 
               WHERE users.id = ${parseInt(ID[0].author_id)};`;

    // SQL pour delete le book
    let sqlDel = `DELETE FROM books WHERE id = ${parseInt(req.params.id)}`;
    await query(sqlDel)

    res.json({
        status: 200,
        listBook: await query(sql),
        message: "Delete Book successfully"
    })

}

// Method Delete All
exports.deleteAll = async (req, res) => {
    // SQL pour delete tout les users
    let sql = `DELETE FROM books`;
    await db.query(sql)

    res.json({
        status: 200,
        listBook: await query(`SELECT * FROM books`),
        message: "Delete All Users successfully"
    })
}