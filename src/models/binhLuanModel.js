const mysql = require("mysql");
const db = require("./db.js");
const BinhLuan = function(binhLuan){
    this.id = tintuc.id;
    this.idBaiViet = binhLuan.idBaiViet;
    this.idNguoiDung = binhLuan.idNguoiDung;
    this.binhLuan = binhLuan.binhLuan;
};
BinhLuan.create = (newbinhluan , result)=>{
    db.query("INSERT INTO binhluan(idBaiViet,idNguoiDung,binhLuan,deleteitem) VALUES ('"+newbinhluan.idBaiViet+"','"+newbinhluan.idNguoiDung+"','"+newbinhluan.binhLuan+"',1)",(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        console.log("Create success ");
        result(null,{
            id:res.insertID, ...newbinhluan
        });
    });
};
BinhLuan.findById =  (idBinhLuan , result)=>{
    db.query(`SELECT * FROM binhluan where id = '${idBinhLuan}' and deleteitem = 1`,(err,res)=>{
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
BinhLuan.getAll = result=>{
    db.query(`SELECT * FROM binhluan where deleteitem = 1`,(err,res)=>{
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
BinhLuan.update = (id, binhluan, result)=>{
    db.query("UPDATE binhluan SET idBaiViet=?, idNguoiDung = ?, binhLuan=? WHERE id ='"+id+"' and deleteitem = 1",[binhluan.idBaiViet,binhluan.idNguoiDung,binhluan.binhLuan],
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
        console.log("Update",{id:id,...binhluan});
        result(null,{id:id,...binhluan});
        return; 
    });
};
BinhLuan.remove = (id,result) => {
    db.query("UPDATE  binhluan SET deleteitem = 0 WHERE id = ?",id,
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
BinhLuan.getBinhLuanWithIdBaiViet = (id,result) =>{
    db.query(`SELECT * FROM binhluan WHERE idBaiViet = '`+id+`' and deleteitem = 1`,(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("find success ",res[0]);
            result(null,res); 
            return; 
        }
        result({kind:"not_found"},null);
    });
};
BinhLuan.getBinhLuanByUserLogin = (username,result)=>{
    db.query(`SELECT * FROM binhluan WHERE idNguoiDung = '`+username+`' ORDER BY id DESC`,(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("find success ",res);
            result(null,res); 
            return; 
        }
        result({kind:"not_found"},null);
    });
};
BinhLuan.getBinhLuanAndBaiVietByUser = (username,result)=>{
    db.query(`select tintuc.tenbaiviet,binhluan.binhLuan from binhluan, tintuc where tintuc.id = binhluan.idBaiViet and idNguoiDung = '`+username+`'`,(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("find success ",res);
            result(null,res); 
            return; 
        }
        result({kind:"not_found"},null);
    });
}
module.exports = BinhLuan;