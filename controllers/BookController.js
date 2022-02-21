const Book = require("../models/BookModel");

class BookControllers {
  async getBook(req, res) {
    try {
      Book.getAll((err, data) => {
        console.log("data res", data);
        if (err) {
          console.log("err", err),
            res.status(500).send({
              message: err.message || "Une erreur est survenue",
            });
        } else {
          return res.send({
            method: req.method,
            status: 200,
            listBook: data,
            message: "get Book join User successfully",
          });
        }
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
      Book.create(newBook, (err, data) => {
        if (err) res.send(err);
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
    try {
      Book.getBookJoinUser(String(req.params.id), (err, data) => {
        console.log("dataid res", data);
        if (err) {
          console.log("err", err),
            res.status(500).send({
              message: err.message || "Une erreur est survenue",
            });
        } else {
          return res.send({
            method: req.method,
            status: 200,
            listBook: data,
            message: "get Book join User successfully",
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(req, res) {
    try {
      Book.deleteOne(req.params.id, (err, data) => {
        if (err) res.send(err);
        else {
          return res.send({
            method: req.method,
            status: 200,
            listBook: data,
            message: "Delete Book successfully",
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookControllers;
