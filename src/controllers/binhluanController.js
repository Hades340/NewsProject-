const binhLuanModel = require("../models/binhLuanModel.js");
const { checkParamaterURL, checkBinhLuan } = require("../middleware/ValidateMiddleware.js");
const { parseCookies } = require("../utils/GetCookie.js");
exports.create = (req, res) => {
  if (checkBinhLuan(req, res) == true) {
    const binhluan = new binhLuanModel({
      idBaiViet: req.body.idBaiViet,
      idNguoiDung: parseCookies(req).username,
      binhLuan: req.body.binhLuan,
    });
    binhLuanModel.create(binhluan, (err, data) => {
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
  binhLuanModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.send(data);
  });
};
exports.findOne = (req, res) => {
  if (checkParamaterURL(req.params.binhLuanID, res) == true) {
    binhLuanModel.findById(req.params.binhLuanID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.binhLuanID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.binhLuanID
          });
        }
      } else res.send(data);
    });
  }
};
exports.update = (req, res) => {
  // Validate Request
  if (checkBinhLuan(req, res) == true) {
    if (req.body.idNguoiDung.toLowerCase() == parseCookies(req).username.toLowerCase()) {
      binhLuanModel.update(
        req.params.binhLuanID,
        new binhLuanModel(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "Not_found") {
              res.status(404).send({
                message: `Not found with id ${req.params.binhLuanID}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating with id " + req.params.binhLuanID
              });
            }
          } else res.send({ message: `Update successfully!` });
        }
      );
    }
    else {
      res.status(403).send({ message: `User login can't update this comments` });
    }
  }
};
exports.delete = (req, res) => {
  if (checkParamaterURL(req.params.binhLuanID, res) == true) {
    if (req.body.idNguoiDung.toLowerCase() == parseCookies(req).username.toLowerCase()) {
      binhLuanModel.remove(req.params.binhLuanID, (err, data) => {
        if (err) {
          if (err.kind === "Not_found") {
            res.status(404).send({
              message: `Not found with id ${req.params.binhLuanID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete with id " + req.params.binhLuanID
            });
          }
        } else res.send({ message: `Deleted successfully!` });
      });
    }
    else{
      res.status(403).send({ message: `User login can't delete this comments` });
    }
  }
};

exports.getBinhLuanWithIdBaiViet = (req, res) => {
  if (checkParamaterURL(req.params.baivietID, res) == true) {
    binhLuanModel.getBinhLuanWithIdBaiViet(req.params.baivietID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(200).send({
            message: `Not found with id ${req.params.baivietID}.`
          });
        } else {
          res.status(200).send({
            message: "Error retrieving with id " + req.params.baivietID
          });
        }
      } else res.send(data);
    });
  }
};
exports.getBinhLuanByUserLogin = (req, res) => {
  if (checkParamaterURL(parseCookies(req).username, res) == true) {
    binhLuanModel.getBinhLuanWithIdBaiViet(parseCookies(req).username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(200).send({
            message: `Not found with id ${parseCookies(req).username}.`
          });
        } else {
          res.status(200).send({
            message: "Error retrieving with id " + parseCookies(req).username
          });
        }
      } else res.send(data);
    });
  }
};
exports.getBinhLuanAndBaiVietByUser = (req, res) => {
  if (checkParamaterURL(req.params.username, res) == true) {
    binhLuanModel.getBinhLuanWithIdBaiViet(req.params.username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.username
          });
        }
      } else res.send(data);
    });
  }
};