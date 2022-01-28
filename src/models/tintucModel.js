const mysql = require("mysql");
const db = require("./db.js");
const TinTuc = function(tintuc){
    this.id = tintuc.id;
    this.idloai = tintuc.idloai;
    this.tenbaiviet = tintuc.tenbaiviet;
    this.hinhanh = tintuc.hinhanh;
    this.mieuta = tintuc.mieuta
};
TinTuc.create = (newTinTuc , result)=>{
    db.query("INSERT INTO tintuc(idloai,tenbaiviet,hinhanh,mieuta,deleteitem) VALUES ('"+newTinTuc.idloai+"','"+newTinTuc.tenbaiviet+"','"+newTinTuc.hinhanh+"','"+newTinTuc.mieuta+"',1)"
    ,(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        console.log("Create success ");
        result(null,{
            id:res.insertID, ...newTinTuc
        });
    });
};
TinTuc.findById =  (idTinTc , result)=>{
    db.query(`SELECT * FROM tintuc where id = ${idTinTc} and deleteitem = 1`,(err,res)=>{
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
TinTuc.getAll = result=>{
    db.query(`SELECT tintuc.*,loaitintuc.loaibaiviet FROM tintuc,loaitintuc where tintuc.deleteitem = 1 and loaitintuc.id = tintuc.idloai`,(err,res)=>{
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
TinTuc.updateTinTuc = (id, tintuc, result)=>{
    db.query("UPDATE tintuc SET idloai=?, tenbaiviet=?, hinhanh=?, mieuta=?,deleteitem = 1 WHERE id =?",[tintuc.idloai,tintuc.tenbaiviet,tintuc.hinhanh,tintuc.mieuta,id],
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
        console.log("Update",{id:id,...tintuc});
        result(null,{id:id,...tintuc});
        return; 
    });
};
TinTuc.removeTinTuc = (id,result) => {
    db.query("UPDATE tintuc SET deleteitem = 0 WHERE id = ?",id,
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

TinTuc.getTinTucByLoaiTin = (id,result) => {
    db.query("SELECT * FROM tintuc WHERE loaitin = ? and deleteitem = 1",id,
    (err,res)=>{
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

TinTuc.getMoreTinTucByLoaiTin = (id,result) =>{
    db.query(`SELECT * FROM tintuc where loaitin = ${id} LIMIT 3 and deleteitem = 1`,(err,res)=>{
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

module.exports = TinTuc