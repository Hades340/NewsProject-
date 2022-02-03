const tintucModel = require("../models/tintucModel.js");
const {checkFileUpload,checkTinTuc,checkParamaterURL} = require("../middleware/ValidateMiddleware.js");
exports.create = (req, res) => {
  if (checkFileUpload(req, res) == true && checkTinTuc(req,res)== true) {
    console.log(req.file);
    if (!req.body) {
      res.status(400).send({
        message: "data is null"
      });
    }
    const tintuc = new tintucModel({
      idloai: req.body.idloai,
      tenbaiviet: req.body.tenbaiviet,
      hinhanh: req.file.filename,
      mieuta: req.body.mieuta,
      chitiettintuc:req.body.chitiettintuc
    });
    tintucModel.create(tintuc, (err, data) => {
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
  tintucModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.render('admin/newsList',
    {
      layout:'mainadmin',
      data:data
    });
  });
};

exports.findFour = function (req, res) {
  tintucModel.getFourTinTuc((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.send(data);
  });
};


exports.findAllJson = function (req, res) {
  tintucModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.send(data)
  });
};

exports.findOne = (req, res) => {
  if(checkParamaterURL(req.params.tintucID,res)== true){
    tintucModel.findById(req.params.tintucID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.tintucID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.tintucID
          });
        }
      } else res.render("admin/insUpNews",{
        layout:"mainadmin",
        data
      });
    });
  }
};
exports.findOneJson = (req, res) => {
  if(checkParamaterURL(req.params.tintucID,res)== true){
    tintucModel.findById(req.params.tintucID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(200).send({
            message: `Not found with id ${req.params.tintucID}.`
          });
        } else {
          res.status(200).send({
            message: "Error retrieving with id " + req.params.tintucID
          });
        }
      } else res.send(data);
    });
  }
};

exports.update = (req, res) => {
  // Validate Request
  if (checkTinTuc(req,res)== true && checkParamaterURL(req.params.tintucID)== true) {
    var hinhanh = req.file;
    if(hinhanh == undefined){
      hinhanh = req.body.hinhanh;
    }
    else{
      hinhanh = req.file.filename;
    }
    const tintuc = new tintucModel({
      idloai: req.body.idloai,
      tenbaiviet: req.body.tenbaiviet,
      hinhanh: hinhanh,
      mieuta: req.body.mieuta,
      chitiettintuc:req.body.chitiettintuc
    });
    tintucModel.updateTinTuc(
      req.params.tintucID,
      tintuc,
      (err, data) => {
        if (err) {
          if (err.kind === "Not_found") {
            res.status(404).send({
              message: `Not found with id ${req.params.tintucID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating with id " + req.params.tintucID
            });
          }
        } else res.status(200).send({message:"Update success"});
      }
    );
  }
};
exports.delete = (req, res) => {
  if(checkParamaterURL(req.params.tintucID)== true){
    tintucModel.removeTinTuc(req.params.tintucID, (err, data) => {
      if (err) {
        if (err.kind === "Not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.tintucID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete with id " + req.params.tintucID
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
        tintucModel.removeTinTuc(element, (err, data) => {
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
exports.getTinTucByLoaiTin =  (req, res) => {
  if(checkParamaterURL(req.params.tintucID,res) == true){
    tintucModel.getTinTucByLoaiTin(req.params.tintucID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(200).send({
            message: `Not found with id ${req.params.tintucID}.`
          });
        } else {
          res.status(200).send({
            message: "Error retrieving with id " + req.params.tintucID
          });
        }
      } else res.send(data);
    });
  }
};

