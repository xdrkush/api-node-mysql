/*
 *
 * Model de 'User'
 ******************************/
const connection = require("../config/ConnectionDB");

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.mobile = user.mobile;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      connection.getConnection((error, conn) => {
        if (error) reject(error);
        conn.query(`SELECT * FROM users`, (err, data) => {
          if (err) reject(err);
          resolve(data);
          conn.release();
        });
      });
    });
  }

  create() {
    const { name, email, mobile } = this;
    return new Promise((resolve, reject) => {
      connection.getConnection(function (err, conn) {
        if (err) reject(err);
        conn.query(`
          INSERT INTO users
              SET name=:name, email=:email, mobile=:mobile
        `, { name, email, mobile }, (err, data) => {
            if (err) reject(err);
            conn.query(`SELECT * FROM users`, (err, data) => {
              if (err) reject(err);
              resolve(data);
              conn.release();
            });
          }
        );
      });
    });
  }

  editOne() {
    const { name, email, mobile, id } = this;
    return new Promise((resolve, reject) => {
      connection.getConnection(function (err, conn) {
        if (err) reject(err);
        conn.query( `
          UPDATE users 
              SET name = :name,
                  email = :email,
                  mobile = :mobile
              WHERE id = :id;
        `, { name, email, mobile, id }, (err, dataa) => {
            if (err) reject(err);
            conn.query(`SELECT * FROM users`, (err, data) => {
              if (err) reject(err);
              resolve(data);
            });
            conn.release();
          }
        );
      });
    });
  }

  deleteOne() {
    const { id } = this;
    return new Promise((resolve, reject) => {
      connection.getConnection(function (err, conn) {
        if (err) reject(err);
        conn.query( `DELETE FROM users WHERE id = :id`, { id }, (err, dataa) => {
          if (err) reject(err);
          conn.query(`SELECT * FROM users`, (err, data) => {
            if (err) reject(err);
            resolve(data);
            conn.release();
          });
        });
      });
    });
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      connection.getConnection(function (error, conn) {
        if (error) reject(error);
        conn.query(`DELETE FROM users`, (err, data) => {
          if (err) reject(err);
          conn.query(`SELECT * FROM users`, (errr, data) => {
            if (errr) reject(errr);
            resolve(data);
            conn.release();
          });
        });
      });
    });
  }
}

// Book
module.exports = User;
