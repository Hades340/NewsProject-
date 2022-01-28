const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");
const { parseCookies } = require("../utils/GetCookie.js");
function checkRouterAdmin(req, res, next) {
    if (req.originalUrl.indexOf("admin/") != -1) {
        if (req.headers.cookie != null) {
            const cookieList = parseCookies(req);
            if (cookieList.usernameAdmin != '' && cookieList.usernameAdmin != null && cookieList.usernameAdmin != undefined) {

                //return checkToken(req, res, next, cookieList.usernameAdmin);
                return next();
            }
            else {
                res.status(403).json({
                    message: "access denied"
                })
            }
        }
        else {
            res.status(403).json({
                message: "access denied"
            })
        }
    }
    else {
        return next();
    }
}
function checkBinhLuanUser(req, res, next) {
    if (req.originalUrl.indexOf("binhluan") != -1) {
        if (req.headers.cookie != null) {
            const cookieList = parseCookies(req);
            if (cookieList.username != '' && cookieList.username != null && cookieList.username != undefined) {
                //return checkToken(req, res, next, cookieList.username);
                return next();
            } else {
                res.status(403).json({
                    message: "access denied to binh luan"
                })
            }
        }
        else {
            res.status(403).json({
                message: "access denied to binh luan"
            })
        }
    }
    else {
        return next();
    }
}
function checkToken(req, res, next, cookie) {
    const authorHeader = req.headers['token'];
    console.log(authorHeader);
    if (authorHeader != undefined) {
        const token = authorHeader.split(" ")[1];
        if (!token) {
            res.sendStatus(401);
        }
        else {
            jwt.verify(token, config.access_token, (err, data) => {
                console.log(err, data);
                if (err) {
                    res.sendStatus(403);
                }
                else {
                    if (cookie === data.dataItem) {
                        next();
                    }
                    else {
                        res.sendStatus(403);
                    }
                }
            });
        }
    }
    else{
        res.sendStatus(403);
    }
}
module.exports = { checkRouterAdmin, checkBinhLuanUser }