const Book = require("../models/BookModel");

class BookControllers {
  async getBook(req, res) {
    try {
      const book = new Book({});
      book.getAll().then((data) => {
        return res.send({
          method: req.method,
          status: 200,
          listBook: data,
          message: "get Book join User successfully",
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async post(req, res) {
    const { title, description, author_id } = req.body;
    let newBook = new Book({ title, description, author_id });
    console.log("controller create Book", req.body, newBook);
    try {
      newBook.create().then((data) => {
        return res.send({
          method: req.method,
          status: 200,
          listBook: data,
          message: "Add Book successfully",
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async getBookJoinUser(req, res) {
    const { id } = req.params;
    const book = new Book({ id });
    try {
      book.getBookJoinUser().then((data) => {
        return res.send({
          method: req.method,
          status: 200,
          listBook: data,
          message: "get Book join User successfully",
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(req, res) {
    const { id } = req.params;
    const book = new Book({});
    try {
      book.deleteOne().then((data) => {
        return res.send({
          method: req.method,
          status: 200,
          listBook: data,
          message: "Delete Book successfully",
        });
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookControllers;
