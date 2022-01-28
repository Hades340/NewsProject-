const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,"./src/views/img/")
    },
    filename: function(req, file, cb){
      cb(null,Date.now()+ file.originalname);
    }
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" ||file.mimetype == "image/png"){
      cb(null,true);
    }
    else{
      cb(null,false);
    }
};
const upload = multer({
  storage:storage,
  fileFilter: fileFilter,
  limits:
  {
    fileSize:2 * 1024 * 1024
   }
}).single("hinhanh")


module.exports = [upload]