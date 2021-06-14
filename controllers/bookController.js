/*
 * Import Module
 ****************/
const {
    selectAll, insertInto, updateOne, deleteOne, deleteAll
} = require('../store-sql')

/*
 * Controller
 *************/
exports.getBookJoinUser = (req, res) => {
    // Récupération des books en relation avec l'id de user = books.author_id
    let sql = `SELECT users.name, books.title, books.description, books.id
                   FROM users
                   LEFT OUTER JOIN books
                   ON users.id = books.author_id 
                   WHERE users.id = ${parseInt(req.params.id)} ;`

    db.query(sql, function (err, data, fields) {
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
    console.log('Controller POST BOOK: ', req.body)
    // SQL pour creer un book
    // (title, description, author_id)
    insertInto('books', { ...req.body }).then(() => {
        selectAll('books').then(data => {
            res.json({
                status: 200,
                listBook: data,
                message: "Add Book successfully"
            })
        })
    }).catch(err => console.log(err))
}
// Method Delete One
exports.deleteOne = (req, res) => {
    let author;
    // SQL pour récuperer l'id de l'author 
    let sqlResult = `SELECT books.author_id
                         FROM books
                         WHERE books.id = ${parseInt(req.params.id)} ;`;

    db.query(sqlResult, (errResult, result) => {
        if (errResult) throw errResult;

        console.log('controller delete: ', result)

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