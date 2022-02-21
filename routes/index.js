/*
 * Import Module
 * ************* */

const router = require("express").Router();

// Controllers
const UserController = require('../controllers/UserController');
const BookController = require('../controllers/BookController');

/*
 * Routes
 * ****** */

// User
router.route('/user')
    .get(new UserController().get)
    .post(new UserController().post)
    .delete(new UserController().deleteAll)

// User ID
router.route('/user/:id')
    .put(new UserController().editOne)
    .delete(new UserController().deleteOne)

// Book
router.route('/book')
    .get(new BookController().getBook)
    .post(new BookController().post)

// Book ID
router.route('/book/:id')
    .delete(new BookController().deleteOne)

router.route('/book/user/:id')
    .get(new BookController().getBookJoinUser)

/*
 * / Routes
 * ******** */

module.exports = router;