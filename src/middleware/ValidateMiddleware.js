const messageNull = "Please fill all require field to accept this actions";
const messgaeKey = "Please don't wirte special text like +, -, @, #, $, ...";
const messageParams = "This params is not defined";
const messgaeBody = "Server is not defined your value";
const checkValue = "This value is not defined";
function checkFileUpload(req, res) {
    if (req.file == undefined) {
        return res.status(404).send({ message: "Please upload a file!" });
    }
    else {
        return true;
    }
}
function checkLoaiTin(req, res) {
    console.log(Object.keys(req.body).length);
    let count = 0;
    if (!isBody(req, res)) {
        count++;
        return res.status(404).send({
            message: messgaeBody
        })
    }
    else {
        let messsage = checkAllBody(req, [req.body.loaibaiviet]);
        console.log(messsage);
        if (isNullEmpty(messsage)) {
            count++;
            console.log(messsage);
            return res.status(404).send({
                message: messsage
            })
        }
    }
    if (count === 0) {
        return true;
    }

}
function checkBinhLuan(req, res) {
    let count = 0;
    if (!isBody(req, res)) {
        count++;
        return res.status(404).send({
            message: messgaeBody
        })
    }
    else {
        let messsage = checkAllBody(req, [req.body.idBaiViet, req.body.binhLuan]);
        console.log(messsage);
        if (isNullEmpty(messsage)) {
            count++;
            console.log(messsage);
            return res.status(404).send({
                message: messsage
            })
        }
        else {
            if (!isNumber(req.body.idBaiViet)) {
                count++;
                return res.status(404).send({
                    message: checkValue
                })
            }
        }
    }
    if (count === 0) {
        return true;
    }
}

function checkCTTintuc(req, res) {
    let count = 0;
    if (!isBody(req, res)) {
        count++;
        return res.send({
            message: messgaeBody
        })
    }
    else {
        console.log(req.body);
        let messsage = checkAllBody(req, [req.body.idBaiViet, req.body.chitietbaiviet]);
        if (isNullEmpty(messsage)) {
            count++;
            console.log(messsage);
            return res.status(404).send({
                message: messsage
            })
        }
        else {
            if (!isNumber(req.body.idBaiViet)) {
                count++;
                return res.status(404).send({
                    message: checkValue
                })
            }
        }
    }
    if (count === 0) {
        return true;
    }
}

function checkNguoiDung(req, res) {
    let count = 0;
    if (!isBody(req, res)) {
        count++;
        return res.status(404).send({
            message: messgaeBody
        })
    }
    else {
        let messsage = checkAllBody(req, [req.body.username, req.body.password, req.body.ten, req.body.diachi, req.body.sdt]);
        if (isNullEmpty(messsage)) {
            count++;
            console.log(messsage);
            return res.status(404).send({
                message: messsage
            })
        }
    }
    if (count === 0) {
        return true;
    }
}

function checkNguoiDungNotKey(req, res) {
    let count = 0;
    if (!isBody(req, res)) {
        count++;
        return res.status(404).send({
            message: messgaeBody
        })
    }
    else {
        let messsage = checkAllBodyNotKey(req, [req.body.username, req.body.password, req.body.ten, req.body.diachi, req.body.sdt]);
        if (isNullEmpty(messsage)) {
            count++;
            console.log(messsage);
            return res.status(404).send({
                message: messsage
            })
        }
    }
    if (count === 0) {
        return true;
    }
}

function checkTinTuc(req, res) {
    let count = 0;
    if (!isBody(req, res)) {
        count++;
        return res.status(404).send({
            message: messgaeBody
        })
    }
    else {
        let messsage = checkAllBodyNotKey(req, [req.body.idloai, req.body.tenbaiviet, req.body.mieuta]);
        if (isNullEmpty(messsage)) {
            count++;
            console.log(messsage);
            return res.status(404).send({
                message: messsage
            })
        }
        else {
            if (!isNumber(req.body.idloai)) {
                count++;
                return res.status(404).send({
                    message: checkValue
                })
            }
        }
    }
    if (count === 0) {
        return true;
    }
}

function checkParamaterURL(reqID, res) {
    if (!isSpecialKey(reqID)) {
        return res.status(404).send({
            message: messageParams
        });
    }
    else {
        return true;
    }
}
function isNullEmpty(value) {
    if (value != null && value != '') {
        return true;
    }
    else {
        return false;
    }
}
function isSpecialKey(value) {
    let count = 0;
    var format = `~!@#$%^&*()_+=":';,.<>|\?/[]{}`;
    let item = value.toString();
    for (let i = 0; i < item.length; i++) {
        console.log("location" + format.search(item[i]) + "----- length" + item.length + "------- index" + i + "---- char" + item[i]);
        if (format.search(item[i]) != -1) {
            count++;
        }
    }
    if (count == 0) {
        return true;
    }
    else {
        return false;
    }
}
function isNumber(value) {
    console.log(parseInt(value));
    if (parseInt(value)) {
        return true;
    }
    else {
        return false;
    }
}
function isBody(req, res) {
    if (!req.body) {
        return false;
    }
    else {
        return true;
    }
}
function checkAllBody(req, value) {
    let valueArray = value;
    let totalBody = Object.keys(req.body).length;
    let mesgae = '';

    valueArray.forEach(element => {
        if (!isNullEmpty(element)) {
            mesgae = messageNull;
        }
        else {
            if (!isSpecialKey(element)) {
                mesgae = messgaeKey;
            }
        }
    });

    return mesgae;
}

function checkAllBodyNotKey(req, value) {
    let valueArray = value;
    let totalBody = Object.keys(req.body).length;
    let mesgae = '';

    valueArray.forEach(element => {
        if (!isNullEmpty(element)) {
            mesgae = messageNull;
        }
    });

    return mesgae;
}

function checkLogin(req, res, value) {
    let count = 0;
    if (!isBody(req, res)) {
        count++;
        return res.send({
            message: messgaeBody
        })
    } else {
        let messgae = checkAllBodyNotKey(req, value);
        if (isNullEmpty(messgae)) {
            count++;
            return res.send({
                message: messageNull
            })
        }
    }
    if (count == 0) {
        return true;
    }
}
module.exports = { checkFileUpload, checkLoaiTin, checkParamaterURL, checkBinhLuan, checkCTTintuc, checkNguoiDung, checkLogin, checkTinTuc,checkNguoiDungNotKey }