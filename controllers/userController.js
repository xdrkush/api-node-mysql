/*
 * Import Module
 ****************/
const {
    selectAll, selectAllById, selectAllByKey, insertInto, updateOne, deleteOne, deleteAll
} = require('../store-sql')
const { deleteById } = require('../store-sql/delete')

/*
 * Controller
 *************/

// Method Get
exports.get = async (req, res) => {
    console.log('Controller GET USER: ')

    await selectAll('users').then(data => {
        res.json({
            status: 200,
            listUser: data,
            message: "users lists retrieved successfully"
        })
    }).catch(err => console.log(err))
}

// Method GetID
exports.getID = async (req, res) => {
    await selectAllById('users', req.params.id).then(data => {
        res.json({
            status: 200,
            user: data,
            message: "users lists retrieved successfully"
        })
    }).catch(err => console.log(err))
}

// Method GetByKey
exports.getByKey = async (req, res) => {
    await selectAllByKey('users', req.params).then(data => {
        res.json({
            status: 200,
            user: data,
            message: "users lists retrieved successfully"
        })
    }).catch(err => console.log(err))
}

// Method Post
exports.post = async (req, res) => {
    console.log('Controller POST USER: ', req.body)

    // SQL pour creer un users
    // values = (name, email, mobile)
    await insertInto('users', { ...req.body }).then(async () => {
        await selectAll('users').then(data => {
            res.json({
                status: 200,
                listUser: data,
                message: "Add Users successfully"
            })
        })
    }).catch(err => console.log(err))
}

// Method Edit One User
exports.editOne = (req, res) => {
    console.log('Controller EditOne USER: ', req.body)

    updateOne('users', { ...req.body }, req.params.id).then(() => {
        selectAll('users').then(data => {
            res.json({
                status: 200,
                listUser: data,
                message: "Update Users successfully"
            })
        })
    }).catch(err => console.log(err))
}

// Method Delete One
exports.deleteOne = (req, res) => {
    console.log('Controller DeleteOne USER: ', req.params.id)
    deleteById('users', req.params.id).then(() => {
        selectAll('users').then(data => {
            res.json({
                status: 200,
                listUser: data,
                message: "Delete Users successfully"
            })
        })
    })
}

// Method Delete All
exports.deleteAll = (req, res) => {
    deleteAll('users').then(() => {
        selectAll('users').then(data => {
            res.json({
                status: 200,
                listUser: data,
                message: "Delete All Users successfully"
            })
        })
    })
}