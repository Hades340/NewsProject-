const mysql = require("mysql");
const db = require("./db.js");
const ChiTietTinTuc = function(chitiettintuc){
    this.id = chitiettintuc.id;
    this.idBaiViet = chitiettintuc.idBaiViet;
    this.chitietbaiviet = chitiettintuc.chitietbaiviet;
    this.hinhanh = chitiettintuc.hinhanh;
    this.deleteitem = chitiettintuc.deleteitem;
};
ChiTietTinTuc.create = (newCTTinTuc , result)=>{
    db.query("INSERT INTO chitiettintuc(idBaiViet,chitietbaiviet,hinhanh,deleteitem) VALUES ('"+newCTTinTuc.idBaiViet+"','"+newCTTinTuc.chitietbaiviet+"','"+newCTTinTuc.hinhanh+"',1)",(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        console.log("Create success ");
        result(null,{
            id:res.insertID, ...newCTTinTuc
        });
    });
};
ChiTietTinTuc.findById =  (idChiTiet , result)=>{
    db.query(`SELECT * FROM chitiettintuc where id = ${idChiTiet} and deleteitem = 1`,(err,res)=>{
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
        result({kind:"not found"},null);
    });
};
ChiTietTinTuc.getAll = result=>{
    db.query(`SELECT chitiettintuc.*, tintuc.tenbaiviet FROM chitiettintuc, tintuc where chitiettintuc.deleteitem = 1 and tintuc.id = chitiettintuc.idBaiViet`,(err,res)=>{
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
ChiTietTinTuc.updateCTTinTuc = (id, CTTinTuc, result)=>{
    db.query("UPDATE chitiettintuc SET idBaiViet=?, chitietbaiviet = ?, hinhanh=? WHERE id =? and deleteitem = 1",[CTTinTuc.idBaiViet,CTTinTuc.chitietbaiviet,CTTinTuc.hinhanh,id],
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
        console.log("Update",{id:id,...CTTinTuc});
        result(null,{id:id,...CTTinTuc});
        return; 
    });
};
ChiTietTinTuc.removeCTTinTuc = (id,result) => {
    db.query("UPDATE chitiettintuc SET deleteitem = 0 WHERE id = ?",id,
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
module.exports = ChiTietTinTuc;