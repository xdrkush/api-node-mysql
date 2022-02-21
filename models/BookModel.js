/*
 *
 * Model de 'Article'
 ******************************/
const connection = require("../config/ConnectionDB");

class Book {
  constructor(book) {
    this.id = book.id,
    this.title = book.title,
    this.description = book.description,
    this.author_id = book.author_id;
  }

  // Get All
  getAll() {
    return new Promise((resolve, reject) => {
      connection.getConnection(function (err, conn) {
        if (err) reject(err);
        conn.query(`SELECT * FROM books;`, (err, data) => {
          if (err) reject(err);
          resolve(data);
          // Mettre fin à la connexion avec la db
          conn.release();
        });
      });
    });
  }

  // Create
  create() {
    const { title, description, author_id } = this;
    return new Promise((resolve, reject) => {
      connection.getConnection(function (err, conn) {
        if (err) reject(err);
        conn.query(`
              INSERT INTO books
                  SET title=:title, description=:description, author_id=:author_id
            `, { title, description, author_id }, (err, data) => {
            if (err) reject(err);
            conn.query(`
              SELECT users.name, books.title, books.description, books.id
                  FROM users
                  LEFT OUTER JOIN books
                  ON users.id = books.author_id 
                    WHERE users.id = :id ;
              `, { id: author_id }, (err, data) => {
                if (err) reject(err);
                resolve(data);
                conn.release();
              }
            );
          }
        );
      });
    });
  }

  // getBookJoinUser
  getBookJoinUser() {
    const { id } = this;
    return new Promise((resolve, reject) => {
      connection.getConnection(function (err, conn) {
        if (err) reject(err);
        conn.query(`
          SELECT users.name, books.title, books.description, books.id
              FROM users
              LEFT OUTER JOIN books
              ON users.id = books.author_id 
                  WHERE users.id = :id
        `, { id }, (err, data) => {
            if (err) reject(err);
            resolve(data);
            conn.release();
          }
        );
      });
    });
  }

  // Edit One
  deleteOne() {
    let author;
    return new Promise((resolve, reject) => {
      connection.getConnection(function (err, conn) {
        if (err) reject(err);
        conn.query(`
          SELECT books.author_id
            FROM books
              WHERE books.id = :id;
          `, { id }, (err, dataa) => {
            if (err) reject(err);
            // Ici on formate notre tableau
            Object.keys(dataa).forEach(function (key) {
              var row = dataa[key];
              author = row.author_id;
            });

            conn.query(`DELETE FROM books WHERE id = :id`, { id }, (err) => {
              if (err) reject(err);
              conn.query(`
                SELECT users.name, books.title, books.description, books.id
                FROM users
                LEFT OUTER JOIN books
                ON users.id = books.author_id 
                    WHERE users.id = :id;
                `, { id }, (err, data) => {
                  if (err) reject(err);
                  resolve(data);
                }
              );
              conn.release();
            });
          }
        );
      });
    });
  }
}

// Book
module.exports = Book;
