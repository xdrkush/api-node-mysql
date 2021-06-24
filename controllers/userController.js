/*
 * Import Module
 ****************/
const {
    selectAll, selectAllById, selectAllByKey, insertInto, updateOne, deleteById, deleteAll
} = require('../store-sql')

/*
 * Controller
 *************/

// Method Get
exports.get = async (req, res) => {
    console.log('Controller GET USER: ')
    res.json({
        status: 200,
        listUser: await selectAll('users'),
        message: "users lists retrieved successfully"
    })
}

// Method GetID
exports.getID = async (req, res) => {
    console.log('Controller GET USER ID: ')
    res.json({
        status: 200,
        user: await selectAllById('users', req.params.id),
        message: "users lists retrieved successfully"
    })
}

// Method GetByKey
exports.getByKey = async (req, res) => {
    res.json({
        status: 200,
        user: await selectAllByKey('users', req.params),
        message: "users lists retrieved successfully"
    })
}

// Method Post
exports.post = async (req, res) => {
    console.log('Controller POST USER: ', req.body)
    // values = (name, email, mobile)
    await insertInto('users', { ...req.body })

    res.json({
        status: 200,
        listUser: await selectAll('users'),
        message: "Add Users successfully"
    })
}

// Method Edit One User
exports.editOne = async (req, res) => {
    console.log('Controller EditOne USER: ', req.body)
    // values = (name, email, mobile)
    await updateOne('users', { ...req.body }, req.params.id)

    res.json({
        status: 200,
        listUser: await selectAll('users'),
        message: "Update Users successfully"
    })
}

// Method Delete One
exports.deleteOne = async (req, res) => {
    console.log('Controller DeleteOne USER: ', req.params.id)
    await deleteById('users', req.params.id)

    res.json({
        status: 200,
        listUser: await selectAll('users'),
        message: "Delete Users successfully"
    })
}

// Method Delete All
exports.deleteAll = async (req, res) => {
    console.log('Controller DeleteAll User: ')
    await deleteAll('users')
    
    res.json({
        status: 200,
        listUser: await selectAll('users'),
        message: "Delete All Users successfully"
    })
}