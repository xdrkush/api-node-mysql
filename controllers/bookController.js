/*
 * Import Module
 ****************/
const {
    selectAll, insertInto, selectOneByID, deleteByID, joinWithID
} = require('../store-sql')

/*
 * Controller
 *************/
// Method Join with id
exports.getBookJoinUser = (req, res) => {
    console.log('Controller getBookJoinUser: ', req.params.id)
    // Récupération des books en relation avec l'id de user = books.author_id
    // ('table1', 'table2', 'users.id', 'books.author_id', 2)
    joinWithID('users', 'books', 'users.id', 'books.author_id', req.params.id).then(data => {
        console.log(data)
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
        joinWithID('users', 'books', 'users.id', 'books.author_id', req.body.author_id).then(data => {
            res.json({
                status: 200,
                listBook: data,
                message: "Add Book successfully"
            })
        })
    }).catch(err => console.log(err))
}

// Method Delete One
// On veux supprimer un libvre et récupérer en réponse les livre de l'author du livre supprimer
exports.deleteOne = (req, res) => {
    // author sera égale à { author_id: 1 }
    let authorID;
    // Récupération de l'author (id)
    selectOneByID('books', 'books.author_id', req.params.id).then(dataO => {
        Object.keys(dataO).forEach(key => authorID = dataO[key])

        // Supression de notre book
        deleteByID('books', req.params.id).then(d => {
            // recupération des books de l'user
            joinWithID('users', 'books', 'users.id', 'books.author_id', authorID).then(data => {
                console.log('dele', data)
                res.json({
                    status: 200,
                    listBook: data,
                    message: "get Book join User successfully"
                })
            })
        })
    })

}