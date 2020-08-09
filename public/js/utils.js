function serializeToJson(form) {
    var result = {}
    var data = form.serializeArray()
    data.forEach(function(item) {
        result[item.name] = item.value
    })
    return result
}

function formValidate() {
    $('.form-validate').each(function() {
        $(this).validate({
            errorElement: "div",
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            ignore: ':hidden:not(.summernote, .checkbox-template, .form-control-custom),.note-editable.card-block',
            errorPlacement: function(error, element) {
                error.addClass("invalid-feedback");
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.siblings("label"));
                } else {
                    error.insertAfter(element);
                }
            }
        });
    });
}

/**
 * Parse url parameters to obj.
 * Eg:http://localhost:7171/?buildingKid=9&source=buildcrm#settingProcess
 * Output: {buildingKid: "9", source: "buildcrm"}
 * @returns {{}}
 */
function url_getQueryObj() {
    var searchInfo = location.search;

    if (!searchInfo) {
        return;
    }

    var hrefInfo = decodeURIComponent(location.href);

    if (!hrefInfo) {
        return;
    }

    var infos = hrefInfo.split("?")[1];

    if (!infos) {
        return;
    }

    var urlArray = infos.split("#");

    var urlString = "", obj = {};

    if (urlArray.length > 2) {

        for (var i = 0; i < urlArray.length - 1; i++) {
            urlString = urlString + urlArray[i] + "#";
        }

        urlString = urlString.substring(0, urlString.length - 1);
    } else {
        urlString = urlArray[0];
    }

    try {
        var a = urlString.split("&");

        for (var i = 0; i < a.length; i++) {
            var m = a[i].split("=");
            obj[m[0]] = m[1];
        }
    } catch (e) {
        console.log(e);
    }

    return obj;
}
