const mysql = require("mysql");
const db = require("./db.js");
const UserAdmin = function(user){
    this.username = user.username;
    this.password = user.password;
};
UserAdmin.create = (newUserAdmin , result)=>{
    db.query("INSERT INTO UserAdmin(username,password) VALUES('"+newUserAdmin.username+"','"+newUserAdmin.password+"')",(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        console.log("Create success ");
        result(null,{
            username:res.username, ...newUserAdmin
        });
    });
};
UserAdmin.findById =  (idUserAdmin , result)=>{
    db.query(`SELECT * FROM UserAdmin where username = '${idUserAdmin}'`,(err,res)=>{
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
UserAdmin.getAll = result=>{
    db.query(`SELECT * FROM UserAdmin`,(err,res)=>{
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
UserAdmin.updateUserAdmin = (username, password,newsPass, result)=>{
    db.query("SELECT * FROM UserAdmin where username = '"+username+"' and password = '"+password+"'",(err,res)=>{
        if(err){
            console.log("Error",err);
            result(err,null);
            return;
        }
        if(res.length == 0){
            result({kind:"Not_found"},null);
            return;
        }
        else{
            db.query("UPDATE UserAdmin SET password= '"+newsPass+"' WHERE username = '"+username+"'",
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
                console.log("Update",{username:username,...username});
                result(null,{username:username,...username});
                return; 
            });
        }
    });
};
UserAdmin.removeUserAdmin = (id,result) => {
    db.query("DELETE FROM UserAdmin WHERE username = '"+id+"'",
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
UserAdmin.login = (username, password,result) =>{
    db.query("SELECT * FROM UserAdmin where username = '"+username+"' and password = '"+password+"'",(err,res)=>{
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
module.exports = UserAdmin