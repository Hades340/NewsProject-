const slideModel = require("../models/slideModel.js");
const {checkFileUpload,checkParamaterURL} = require("../middleware/ValidateMiddleware.js");
exports.create = (req, res) => {
  if (checkFileUpload(req, res) == true) {
    const slide = new slideModel({
      img: req.file.filename
    });
    slideModel.create(slide, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Không thể thêm mới"
        });
      }
      else {
        res.send("success");
      }
    });
  }
};
exports.findAll = function (req, res) {
  slideModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.render("admin/slideList",{
      layout:"mainadmin",
      data
    });
  });
};
exports.findOne = (req, res) => {
  if(checkParamaterURL(req.params.slideId,res)== true){
    slideModel.findById(req.params.slideId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.slideId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.slideId
          });
        }
      } else res.render("admin/insUpSlide",{layout:"mainadmin",data});
    }); 
  }
};
exports.findOneJson = (req, res) => {
  if(checkParamaterURL(req.params.slideId,res)== true){
    slideModel.findById(req.params.slideId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.slideId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with id " + req.params.slideId
          });
        }
      } else res.send(data);
    }); 
  }
};
exports.update = (req, res) => {
  // Validate Request
  if (checkFileUpload(req, res) == true && checkParamaterURL(req.params.slideId,res) == true) {
    console.log(req.file.filename);
    slideModel.updateSlide(
      req.params.slideId,
      req.file.filename,
      (err, data) => {
        if (err) {
          if (err.kind === "Not_found") {
            res.status(404).send({
              message: `Not found with id ${req.params.slideId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating with id " + req.params.slideId
            });
          }
        } else res.status(200).send({message:"Update success"});
      }
    );
  }
};
exports.delete = (req, res) => {
  if(checkParamaterURL(req.params.slideId,res)== true){
    slideModel.removeSlide(req.params.slideId, (err, data) => {
      if (err) {
        if (err.kind === "Not_found") {
          res.status(404).send({
            message: `Not found  with id ${req.params.slideId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete  with id " + req.params.slideId
          });
        }
      } else res.send({ message: `  deleted successfully!` });
    });
  }
};
exports.getThreeSlide = (req, res) => {
  slideModel.getThreeSlide((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving..."
      });
    else res.send(data);
  });
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
        slideModel.removeSlide(element, (err, data) => {
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
