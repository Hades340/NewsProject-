const mysql = require("mysql");
const db = require("./db.js");
const LoaiTinTuc = function(LoaiTinTuc){
    this.loaibaiviet = LoaiTinTuc.loaibaiviet;
};
LoaiTinTuc.create = (newLoaiTinTuc , result)=>{
    db.query("INSERT INTO loaitintuc(loaibaiviet,deleteitem) VALUES('"+newLoaiTinTuc.loaibaiviet+"',1)",(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        console.log("Create success ");
        result(null,{
            id:res.insertID, ...newLoaiTinTuc
        });
    });
};
LoaiTinTuc.findById =  (idTinTc , result)=>{
    db.query(`SELECT * FROM loaitintuc where id = '${idTinTc}' and deleteitem = 1`,(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("find success ",res[0]);
            result(null,res[0]); 
            return; 
        }
        result({kind:"not_found"},null);
    });
};
LoaiTinTuc.getAll = result=>{
    db.query(`SELECT * FROM loaitintuc where deleteitem = 1`,(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        console.log("find success ",res);
        result(null,res); 
        return; 
    });
};
LoaiTinTuc.updateLoaiTinTuc = (id, loaitintuc, result)=>{
    db.query("UPDATE loaitintuc SET loaibaiviet=? WHERE id =?",[loaitintuc.loaibaiviet,id],
    (err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind:"Not_found"},null);
            return;
        }
        console.log("Update",{id:id,...loaitintuc});
        result(null,{id:id,...loaitintuc}); 
        return; 
    });
};
LoaiTinTuc.removeLoaiTinTuc = (id,result) => {
    db.query("UPDATE loaitintuc SET deleteitem = 0 WHERE id =?",id,
    (err,res)=>{
        if(err){
            console.log("Error",err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind:"Not_found"},null);
            return;
        }
        console.log("DELETE",id);
        result(null,res); 
        return; 
    });
};
module.exports = LoaiTinTuc;