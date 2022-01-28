const loaiTinTucModel = require("../models/loaiTinModels.js");
const { checkLoaiTin, checkParamaterURL} = require("../middleware/ValidateMiddleware");
exports.create = (req, res) => {
  if (checkLoaiTin(req, res) == true) {
    const loaiTinTuc = new loaiTinTucModel({
      loaibaiviet: req.body.loaibaiviet
    });
    loaiTinTucModel.create(loaiTinTuc, (err, data) => {
      console.log(loaiTinTuc);
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
  loaiTinTucModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.render('admin/listItem',
    {
        layout: 'mainadmin',
        data:data
    });
  }); 
};
exports.findAllJson = function (req, res) {
  loaiTinTucModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.send(data)
  }); 
};
exports.findOne = (req, res) => {
  if (checkParamaterURL(req.params.loaiTinTucID, res) == true) {
    loaiTinTucModel.findById(req.params.loaiTinTucID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.loaiTinTucID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.loaiTinTucID
          });
        }
      } else res.render('admin/insUpType',
      {
        data:data,
        layout:'mainadmin'
      });
    });
  }
};
exports.findOneJson = (req, res) => {
  if (checkParamaterURL(req.params.loaiTinTucID, res) == true) {
    loaiTinTucModel.findById(req.params.loaiTinTucID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.loaiTinTucID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.loaiTinTucID
          });
        }
      } else res.send(data);
    });
  }
};
exports.update = (req, res) => {
  // Validate Request
  if (checkLoaiTin(req, res) == true && checkParamaterURL(req.params.loaiTinTucID, res)== true) {
    loaiTinTucModel.updateLoaiTinTuc(
      req.params.loaiTinTucID,
      new loaiTinTucModel(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "Not_found") {
            res.status(404).send({
              message: `Not found with id ${req.params.loaiTinTucID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating with id " + req.params.loaiTinTucID
            });
          }
        } else res.status(200).send({message:"Update success"});
      }
    );
  }
};
exports.delete = (req, res) => {
  if(checkParamaterURL(req.params.loaiTinTucID,res)== true){
    loaiTinTucModel.removeLoaiTinTuc(req.params.loaiTinTucID, (err, data) => {
      if (err) {
        if (err.kind === "Not_found") {
          res.status(404).send({
            message: `Not found  with id ${req.params.loaiTinTucID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete  with id " + req.params.loaiTinTucID
          });
        }
      } else res.send({ message: `was deleted successfully!` });
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
        loaiTinTucModel.removeLoaiTinTuc(element, (err, data) => {
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