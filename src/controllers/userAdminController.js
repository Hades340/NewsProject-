const userAdmin = require("../models/userAdminModel.js");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config.js");
const { checkParamaterURL, checkLogin } = require("../middleware/ValidateMiddleware.js")
exports.create = (req, res) => {
  if (checkLogin(req,res,[req.body.username,req.body.password])== true) {
    const user = new userAdmin({
      username: req.body.username,
      password: req.body.password
    });
    userAdmin.create(user, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Không thể thêm mới"
        });
      }
      else {
        res.send(data);
      }
    });
  }
};
exports.findAll = function (req, res) {
  userAdmin.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.render("admin/userList",{
      layout:"mainadmin",
      data
    });
  });
};
exports.findOne = (req, res) => {
  if (checkParamaterURL(req.params.userId)== true) {
    userAdmin.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.userId
          });
        }
      } else res.send(data);
    });
  }
};
exports.update = (req, res) => {
  // Validate Request
  if (checkParamaterURL(req.params.userId, res)== true && checkLogin(req,res,[req.body.passwordNews,req.body.password])== true) {
    userAdmin.updateUserAdmin(
      req.params.userId,
      req.body.password,
      req.body.passwordNews,
      (err, data) => {
        if (err) {
          if (err.kind === "Not_found") {
            res.status(404).send({
              message: `Not found with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating with id " + req.params.userId
            });
          }
        } else res.send(data);
      }
    );
  }
};
exports.delete = (req, res) => {
  if(checkParamaterURL(req.params.userId,res)== true){
    userAdmin.removeUserAdmin(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "Not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete with id " + req.params.userId
          });
        }
      } else res.send({ message: `Deleted successfully!` });
    });
  }
};

exports.deleteMany = (req, res) => {
  if (req.body) {
    var arrayId = [];
    arrayId = req.body.idArray;
    if (arrayId.length === 0) {
      res.send({
        message: "Not found list id "
      });
    }
    else {
      var listArrayErr = [];
      arrayId.forEach(element => {
        userAdmin.removeUserAdmin(element, (err, data) => {
          if (err) {
            listArrayErr.push(element);
          }
        });
      });
      if (listArrayErr.length === 0) {
        res.status(200).send({
          message: "Delete all value is success"
        });
      }
      else {
        res.status(500).send({
          message: "Can't delete id" + listArrayErr
        });
      }
    }
  }
  else {
    res.send({
      message: "request không có body"
    });
  }
}

exports.login = (req, res) => {
  if(checkLogin(req,res,[req.body.username,req.body.password])== true){
    userAdmin.login(req.body.username,
      req.body.password,
      (err, data) => {
        if (err) {
          if (err.kind === "Not_found") {
            res.status(200).send({
              message: `Username or password is not correct`
            });
          } else {
            res.status(500).send({
              message: "False in server"
            });
          }
        } else {
          const access = jwt.sign({dataItem:data},config.access_token,{
            expiresIn:'10h'
          });
          res.cookie("usernameAdmin", data);
          //res.cookie("token","Beaer "+access);
          res.send({
            data,
            access
          });
        }
      });
  }
};
exports.logout = (req, res) => {
  if (req.headers.cookie != null) {
    if (req.headers.cookie.usernameAdmin != '' || req.headers.cookie.usernameAdmin != null  || req.headers.cookie.usernameAdmin != undefined) {
      res.clearCookie("usernameAdmin");
      res.status(200).send("LogoutSucces");
    }
  }
  else {
    res.status(200).send("NotLogin");
  }
}