/*
 *
 * Model de 'User'
 ******************************/
const connection = require("../config/ConnectionDB");

// Model User
const User = function (article) {
    this.id = article.id
    this.name = article.name
    this.email = article.email
    this.mobile = article.mobile;
};

// Get All
User.getAll = function (result) {
  connection.getConnection(function (error, conn) {
    if (error) throw error;
    conn.query(`SELECT * FROM users`, (error, data) => {
      if (error) throw error;
      result(null, data);
      // Mettre fin à la connexion avec la db
      conn.release();
    });
  });
};

// Create
User.create = function (newUsers, result) {
  const { name, email, mobile } = newUsers;
  connection.getConnection(function (error, conn) {
    conn.query(
      `
        INSERT INTO users
            SET name=:name, email=:email, mobile=:mobile
      `, { name, email, mobile }, (error, data) => {
        if (error) throw error;
        conn.query(`SELECT * FROM users`, (error, data) => {
          if (error) throw error;
          result(null, data);
          conn.release();
        });
      }
    );
  });
};

// Edit One
User.editOne = function (articleObj, result) {
  const { name, email, mobile, id } = articleObj;
  console.log("edit", typeof articleObj.id);
  connection.getConnection(function (error, conn) {
    conn.query(
      `
        UPDATE users 
            SET name = :name,
                email = :email,
                mobile = :mobile
            WHERE id = :id;
      `, { name, email, mobile, id }, (error, data) => {
        if (error) throw error;
        conn.query(`SELECT * FROM users`, (error, data) => {
          if (error) throw error;
          result(null, data);
        });
        conn.release();
      }
    );
  });
};

// Delete One
User.deleteOne = function (id, result) {
  connection.getConnection(function (error, conn) {
    conn.query(`DELETE FROM users WHERE id = :id`, { id }, (error, data) => {
      if (error) throw error;
      conn.query(`SELECT * FROM users`, (error, data) => {
        if (error) throw error;
        result(null, data);
        conn.release();
      });
    });
  });
};

// Delete All
User.deleteAll = function (result) {
  connection.getConnection(function (error, conn) {
    conn.query(`DELETE FROM users`, (error, data) => {
      if (error) throw error;
      conn.query(`SELECT * FROM users`, (error, data) => {
        if (error) throw error;
        result(null, data);
        conn.release();
      });
    });
  });
};

// Book
module.exports = User;
