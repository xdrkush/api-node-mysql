/*
 * Import Module
 ****************/
const {
    insertInto, selectOneByID, deleteByID, joinWithID, selectAll
} = require('../store-sql')

/*
 * Controller
 *************/

// Method Join with id
exports.getAllBook = async (req, res) => {
    console.log('Controller getAll Book: ', req.params.id)
    res.json({
        status: 200,
        listBook: await selectAll('books'),
        message: "get Book join User successfully"
    })
}

// Method Join with id
exports.getBookJoinUser = async (req, res) => {
    console.log('Controller getBookJoinUser: ', req.params.id)
    // Récupération des books en relation avec l'id de user = books.author_id
    // ('table1', 'table2', 'users.id', 'books.author_id', 2)

    res.json({
        status: 200,
        listBook: await joinWithID('users', 'books', 'users.id', 'books.author_id', req.params.id),
        message: "get Book join User successfully"
    })
}

// Method Post
exports.post = async (req, res) => {
    console.log('Controller POST BOOK: ', req.body)
    // SQL pour creer un book
    // (title, description, author_id)
    await insertInto('books', { ...req.body })

    res.json({
        status: 200,
        listBook: await joinWithID('users', 'books', 'users.id', 'books.author_id', req.body.author_id),
        message: "Add Book successfully"
    })
}

// Method Delete One
// On veux supprimer un libvre et récupérer en réponse les livre de l'author du livre supprimer
exports.deleteOne = async (req, res) => {
    // author sera égale à { author_id: 1 }
    // Récupération de l'author (id)
    let authorID = await selectOneByID('books', 'books.author_id', req.params.id)

    // Supression de notre book
    await deleteByID('books', req.params.id)
    
    res.json({
        status: 200,
        listBook: await joinWithID('users', 'books', 'users.id', 'books.author_id', authorID.author_id),
        message: "get Book join User successfully"
    })

}