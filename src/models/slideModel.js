const mysql = require("mysql");
const db = require("./db.js");
const Slide = function(slide){
    this.img = slide.img;
};
Slide.create = (newSlide , result)=>{
    console.log(newSlide.img);
    db.query("INSERT INTO slide(img) VALUES('"+newSlide.img+"')",(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        console.log("Create success ");
        result(null,{
            id:res.insertID, ...newSlide
        });
    });
};
Slide.findById =  (idSilde , result)=>{
    db.query(`SELECT * FROM slide where id = '${idSilde}'`,(err,res)=>{
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
Slide.getAll = result=>{
    db.query(`SELECT * FROM slide`,(err,res)=>{
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
Slide.getThreeSlide = result =>{
    db.query(`SELECT * FROM slide ORDER BY id DESC LIMIT 3`,(err,res)=>{
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
Slide.updateSlide = (id, imgName, result)=>{
    db.query("UPDATE slide SET img = '"+imgName+"' WHERE id = '"+id+"'",
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
        console.log("Update",{id:id});
        result(null,{id:id}); 
        return; 
    });
};
Slide.removeSlide = (id,result) => {
    db.query("DELETE FROM slide WHERE id = ?",id,
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

module.exports = Slide