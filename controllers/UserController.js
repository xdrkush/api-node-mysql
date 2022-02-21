const User = require("../models/UserModel");

class UserControllers {
  async get(req, res) {
    try {
      User.getAll((err, data) => {
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
            listUser: data,
            message: "users lists retrieved successfully",
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async post(req, res) {
    console.log("controller create User", req.body);
    const { name, email, mobile } = req.body;
    let newUser = new User({ name, email, mobile });
    try {
      User.create(newUser, (err, data) => {
        if (err) res.send(err);
        return res.send({
          method: req.method,
          status: 200,
          listUser: data,
          message: "Add Users successfully",
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async editOne(req, res) {
    console.log("body editOne", req.body, req.params.id);
    const { name, email, mobile } = req.body;
    console.log("controller create User", req.body);
    if (req.params.id && name && email && mobile) {
      let UserObj = new User({
        id: Number(req.params.id),
        name,
        email,
        mobile,
      });
      try {
        User.editOne(UserObj, (err, data) => {
          if (err) res.send(err);
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
    try {
      User.deleteOne(req.params.id, (err, data) => {
        if (err) res.send(err);
        else {
          return res.send({
            method: req.method,
            status: 200,
            listUser: data,
            message: "Delete Users successfully",
          });
        }
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
