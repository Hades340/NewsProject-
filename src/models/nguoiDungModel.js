const mysql = require("mysql");
const db = require("./db.js");
const NguoiDung = function(nguoidung){
    this.username = nguoidung.username;
    this.password = nguoidung.password;
    this.ten = nguoidung.ten;
    this.diachi = nguoidung.diachi;
    this.sdt = nguoidung.sdt;
};
NguoiDung.create = (newNguoiDung , result)=>{
    db.query("INSERT INTO nguoidung(username,password,ten,diachi,sdt) VALUES('"+newNguoiDung.username+"','"+newNguoiDung.password+"','"+newNguoiDung.ten+"','"+newNguoiDung.diachi+"','"+newNguoiDung.sdt+"')",
    (err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        console.log("Create success ");
        result(null,{
            id:res.insertID, ...newNguoiDung
        });
    });
};
NguoiDung.findById =  (idNguoiDung , result)=>{
    db.query(`SELECT * FROM nguoidung where username = '${idNguoiDung}'`,(err,res)=>{
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
NguoiDung.getAll = result=>{
    db.query(`SELECT * FROM nguoidung`,(err,res)=>{
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
NguoiDung.updateNguoiDung = (username, nguoidung, result)=>{
    db.query("UPDATE nguoidung SET password=?, ten=?, diachi=?, sdt=?  WHERE username =?",[nguoidung.password,nguoidung.ten,nguoidung.diachi,nguoidung.diachi,username],
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
        console.log("Update",{username:username,...nguoidung});
        result(null,{username:username,...nguoidung}); 
        return; 
    });
};
NguoiDung.removeNguoiDung = (id,result) => {
    db.query("DELETE FROM nguoidung WHERE username = ?",id,
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

NguoiDung.login = (username,password,result)=>{
    db.query("SELECT * FROM nguoidung where username = ? and password =? ",[username,password],(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("find success ",username);
            result(null,username); 
            return; 
        }
        result({kind:"Not_found"},null);
    });
};
module.exports = NguoiDung