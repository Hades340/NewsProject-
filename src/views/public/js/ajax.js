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