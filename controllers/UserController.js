const User = require("../models/UserModel");

class UserControllers {
  async get(req, res) {
    try {
      const user = new User({});
      user
        .getAll()
        .then((data) => {
          return res.send({
            method: req.method,
            status: 200,
            listUser: data,
            message: "users lists retrieved successfully",
          });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async post(req, res) {
    const { name, email, mobile } = req.body;
    try {
      let newUser = new User({ name, email, mobile });
      newUser
        .create()
        .then((data) => {
          return res.send({
            method: req.method,
            status: 200,
            listUser: data,
            message: "Add Users successfully",
          });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }

  async editOne(req, res) {
    const { name, email, mobile } = req.body;
    if (req.params.id && name && email && mobile) {
      console.log("ici");
      let userid = new User({
        id: Number(req.params.id),
        name,
        email,
        mobile,
      });
      try {
        userid.editOne().then((data) => {
          return res.send({
            method: req.method,
            status: 200,
            listUser: data,
            message: "Update Users successfully",
          });
        });
      } catch (error) {
        throw error;
      }
    } else res.send("Error Request");
  }

  async deleteOne(req, res) {
    const userid = new User({ id: req.params.id });
    try {
      userid.deleteOne().then((data) => {
        return res.send({
          method: req.method,
          status: 200,
          listUser: data,
          message: "Delete Users successfully",
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteAll(req, res) {
    try {
      User.deleteAll((err, data) => {
        if (err) res.send(err);
        else {
          return res.json({
            method: req.method,
            status: 200,
            dbArticle: data,
            message: "Delete All Users successfully",
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserControllers;
