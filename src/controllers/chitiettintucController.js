const ctTinTuc = require("../models/chiTietTinTucModel.js");
const { checkFileUpload, checkCTTintuc, checkParamaterURL } = require("../middleware/ValidateMiddleware.js");
exports.create = (req, res) => {
  if (checkFileUpload(req, res) == true && checkCTTintuc(req, res) == true) {
    const chitiettintuc = new ctTinTuc({
      idBaiViet: req.body.idBaiViet,
      chitietbaiviet: req.body.chitietbaiviet,
      hinhanh: req.file.filename,
    });
    ctTinTuc.create(chitiettintuc, (err, data) => {
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
  ctTinTuc.getAll((err, data) => {
    console.log(data);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.render("admin/cttintucList",{
      layout:"mainadmin",
      data:data
    });
  });
};

exports.findAllJson = function (req, res) {
  ctTinTuc.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.send(data)
  });
};

exports.findOne = (req, res) => {
  if (checkParamaterURL(req.params.cttintucID) == true) {
    ctTinTuc.findById(req.params.cttintucID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.cttintucID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.cttintucID
          });
        }
      } else res.render("admin/inUpCTTinTuc",{layout:"mainadmin",data});
    });
  }
};

exports.findOneJson = (req, res) => {
  if (checkParamaterURL(req.params.cttintucID) == true) {
    ctTinTuc.findById(req.params.cttintucID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.cttintucID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.cttintucID
          });
        }
      } else res.send(data);
    });
  }
};

exports.update = (req, res) => {
  // Validate Request
  if (checkCTTintuc(req, res)== true) {
    console.log(req.file);
    var hinhanh = req.file;
    if(hinhanh == undefined){
      hinhanh = req.body.hinhanh;
    }
    else{
      hinhanh = req.file.filename;
    }
    console.log(hinhanh);
    const chitiettintuc = new ctTinTuc({
      idBaiViet: req.body.idBaiViet,
      chitietbaiviet: req.body.chitietbaiviet,
      hinhanh: hinhanh,
    });
    ctTinTuc.updateCTTinTuc(
      req.params.cttintucID,
      chitiettintuc,
      (err, data) => {
        if (err) {
          if (err.kind === "Not_found") {
            res.status(404).send({
              message: `Not found with id ${req.params.cttintucID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating with id " + req.params.cttintucID
            });
          }
        } else res.status(200).send({message:"Update success"});
      }
    );
  }
};
exports.delete = (req, res) => {
  if (checkParamaterURL(req.params.cttintucID, res)== true) {
    ctTinTuc.removeCTTinTuc(req.params.cttintucID, (err, data) => {
      if (err) {
        if (err.kind === "Not_found") {
          res.status(404).send({
            message: `Not found  with id ${req.params.cttintucID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete  with id " + req.params.cttintucID
          });
        }
      } else res.send({ message: `  deleted successfully!` });
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
        ctTinTuc.removeCTTinTuc(element, (err, data) => {
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

};