const nguoidungModel = require("../models/nguoiDungModel.js");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config.js");
const session = require("express-session");
const res = require("express/lib/response");
const { cookie } = require("express/lib/response");
const { checkNguoiDung, checkParamaterURL, checkLogin,checkNguoiDungNotKey } = require("../middleware/ValidateMiddleware.js")
exports.create = (req, res) => {
  if (checkNguoiDungNotKey(req, res)== true) {
    const nguoidung = new nguoidungModel({
      username: req.body.username,
      password: req.body.password,
      ten: req.body.ten,
      diachi: req.body.diachi,
      sdt: req.body.sdt,
    });
    nguoidungModel.create(nguoidung, (err, data) => {
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
  nguoidungModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.render("admin/customerlist",{
      layout:"mainAdmin",
      data
    });
  });
};
exports.findOne = (req, res) => {
  if (checkParamaterURL(req.params.nguoidungID, res)== true) {
    nguoidungModel.findById(req.params.nguoidungID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.nguoidungID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.nguoidungID
          });
        }
      } else res.send(data);
    });
  }
};
exports.update = (req, res) => {
  // Validate Request
  if (checkParamaterURL(req.params.nguoidungID, res)== true && checkNguoiDung(req, res)== true) {
    nguoidungModel.updateNguoiDung(
      req.params.nguoidungID,
      new nguoidungModel(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "Not_found") {
            res.status(404).send({
              message: `Not found with id ${req.params.nguoidungID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating with id " + req.params.nguoidungID
            });
          }
        } else res.send(data);
      }
    );
  }
};
exports.delete = (req, res) => {
  if (checkParamaterURL(req.params.nguoidungID, res)== true) {
    nguoidungModel.removeNguoiDung(req.params.nguoidungID, (err, data) => {
      if (err) {
        if (err.kind === "Not_found") {
          res.status(404).send({
            message: `Not found  with id ${req.params.nguoidungID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete  with id " + req.params.nguoidungID
          });
        }
      } else res.send({ message: ` was deleted successfully!` });
    });
  }
};
exports.login = (req, res) => {
  if (checkLogin(req,res,[req.body.username,req.body.password])== true) {
    nguoidungModel.login(req.body.username,
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
          res.cookie("username", data);
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
    if (req.headers.cookie.username != '' || req.headers.cookie.username != null || req.headers.cookie.username != undefined) {
      res.clearCookie("username");
      res.status(200).send({message:"LogoutSucces"});
    }
  }
  else {
    res.status(200).send({message:"NotLogin"});
  }
}