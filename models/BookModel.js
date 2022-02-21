/*
 *
 * Model de 'Article'
 ******************************/
const connection = require("../config/ConnectionDB");

// Model
const Book = function (book) {
    this.id = book.id,
    this.title = book.title,
    this.description = book.description,
    this.author_id = book.author_id;
};

// Get All
Book.getAll = function (result) {
  connection.getConnection(function (error, conn) {
    if (error) throw error;
    conn.query(`SELECT * FROM books;`, (error, data) => {
      if (error) throw error;
      result(null, data);
      // Mettre fin à la connexion avec la db
      conn.release();
    });
  });
};

// Create
Book.create = function (newBook, result) {
  const { title, description, author_id } = newBook;
  connection.getConnection(function (error, conn) {
    if (error) throw error;
    conn.query(
      `
        INSERT INTO books
            SET title=:title, description=:description, author_id=:author_id
    `,
      { title, description, author_id },
      (error, data) => {
        if (error) throw error;
        conn.query(
          `SELECT users.name, books.title, books.description, books.id
              FROM users
              LEFT OUTER JOIN books
              ON users.id = books.author_id 
                 WHERE users.id = :id ;
          `, { id: author_id }, (error, data) => {
            if (error) throw error;
            result(null, data);
            conn.release();
          }
        );
      }
    );
  });
};

// getBookJoinUser
Book.getBookJoinUser = function (id, result) {
  connection.getConnection(function (error, conn) {
    if (error) throw error;
    conn.query(
      `
        SELECT users.name, books.title, books.description, books.id
            FROM users
            LEFT OUTER JOIN books
            ON users.id = books.author_id 
                WHERE users.id = :id
      `, { id }, (error, data) => {
        if (error) throw error;
        result(null, data);
        conn.release();
      }
    );
  });
};

// Edit One
Book.deleteOne = function (id, result) {
  let author;
  connection.getConnection(function (error, conn) {
    conn.query(
      `
      SELECT books.author_id
        FROM books
           WHERE books.id = :id;
      `,
      { id },
      (error, dataa) => {
        if (error) throw error;

        // Ici on formate notre tableau
        Object.keys(dataa).forEach(function (key) {
          var row = dataa[key];
          author = row.author_id;
        });

        conn.query(`DELETE FROM books WHERE id = :id`, { id }, (error) => {
          if (error) throw error;
          conn.query(
            `SELECT users.name, books.title, books.description, books.id
                FROM users
                LEFT OUTER JOIN books
                ON users.id = books.author_id 
                    WHERE users.id = :id;`,
            { id },
            (error, data) => {
              if (error) throw error;
              result(null, data);
            }
          );
          conn.release();
        });
      }
    );
  });
};

// Book
module.exports = Book;
