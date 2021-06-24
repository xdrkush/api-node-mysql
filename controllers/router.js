/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router()

/*
 * Controller
 *************/
const userController = require('./userController')
const bookController = require('./bookController')

/*
 * Router
 ***********/

// User
router.route('/user')
    .get(userController.get)
    .post(userController.post)
    .delete(userController.deleteAll)

// User ID
router.route('/user/:id')
    .get(userController.getID)
    .put(userController.editOne)
    .delete(userController.deleteOne)

// User ID
router.route('/getuser/:name')
    .get(userController.getByKey)

// Book
router.route('/book')
    .get(bookController.getAllBook)
    .post(bookController.post)

// Book ID
router.route('/book/:id')
    .delete(bookController.deleteOne)

router.route('/book/user/:id')
    .get(bookController.getBookJoinUser)

/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;