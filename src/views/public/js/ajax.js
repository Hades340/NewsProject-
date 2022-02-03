function ajaxFormDataUpdate(url,data,type, message, urlRidirect,messageShow){
    $.ajax({
        type: type,
        url: url,
        data: data,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.message == message) {
                alert(messageShow);
                window.location.replace(urlRidirect);
            }
        },
        statusCode: {
            500: function () {
                // Only if your server returns a 403 status code can it come in this block. :-)
                alert("Server is down. please try again later"),
                 window.location.replace("http://localhost:8081/500")
            }
        }
    });
}
function ajaxUpdate(url,data,type, message, urlRidirect,messageShow){
    $.ajax({
        type: type,
        url: url,
        data: data,
        success: function (response) {
            if (response.message == message) {
                alert(messageShow);
                window.location.replace(urlRidirect);
            }
        },
        statusCode: {
            500: function () {
                // Only if your server returns a 403 status code can it come in this block. :-)
                alert("Server is down. please try again later"),
                 window.location.replace("http://localhost:8081/500")
            }
        }
    });
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function removeCookie(cname) {
    var expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = cname + "=;" + expires;
}