/**
 * Created by KGelashvili on 10/26/2015.
 */
var currentData;
var parcelColumns = ["მისამართი", "ბარკოდი", "მოსალოდნელი მიტანის დრო", "მიმღები"];
var userColumns = ["სახელი", "გვარი", "მომხმარებლის სახელი", "პირადი ნომერი", "მობილური"];
var organisationColumns = ["სახელი", 'მობილური', 'მისამართი', 'ელ.ფოსტა'];
var regionColumns = ["სახელი"];
var formatColumns = ["სახელი", "ფასი"];
var serviceTypeColumns = ["სახელი", "ფასზე ნამატი"];
var userTypes = {
    "1": "sa",
    "2": "ადმინისტრატორი",
    "3": "ორგანიზაცია",
    "4": "ორგანიზაციის მომხმარებელი",
    "5": "ბუღალტერი",
    "6": "რეგიონის მენეჟერი",
    "7": "ზონის მენეჟერი",
    "8": "კურიერი"
}
var canCreateParcels = false;
var canCreateUsers = false;
function loadParcelsData(index, search) {
    $.getJSON("api/getparcels?index=" + index + "&search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < parcelColumns.length; i++) {
            var currentElement = parcelColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }

        console.log(result);
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr value='"+i+"' class='gridRow'><td>" + currentElement["address"] + "</td><td>"
            + currentElement["barcode"] + "</td><td>"
            + (new Date(currentElement["expectedDeliveryDate"]).toLocaleString()) + "</td><td>"
            + currentElement["reciever"] + "</td>" +
            "</tr>");

        }
        $('.gridRow').css( 'cursor', 'pointer' );
        $(".gridRow").click(function () {
            console.log(dataArray[$(this).attr("value")])
            $('#myModal2').modal("show");
        })
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"<a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadParcelsData($(this).val(), "")

        })
        if (canCreateParcels)
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark"><i class="fa fa-plus"></i>ახალი გზავნილის დამატება </button>')
        else $("#addNewDiv").html('');
        $("#addNewButton").click(function () {
            $("#myModalLabel").html("ახალი გზავნილის დამატება")
            var modalBody = $("#modalBody");
            modalBody.html(parcelRegistrationFormTemplate);
            $.getJSON("api/getformats", function (result) {
                if (result) {
                    for (i = 0; i < result.length; i++) {
                        $("#formatIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
                    }
                }
            })
            $.getJSON("api/getservicetypes", function (result) {
                if (result) {
                    for (i = 0; i < result.length; i++) {
                        $("#serviceTypeIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
                    }
                }
            })
            $("#registrationModalSaveButton").unbind()
            $("#registrationModalSaveButton").click(function () {
                var registerData = {
                    reciever: $("#recieverField").val().trim(),
                    address: $("#addressField").val().trim(),
                    sentFrom: $("#sentFromField").val().trim(),
                    formatId: $("#formatIdField").val().trim(),
                    serviceTypeId: $("#serviceTypeIdField").val().trim(),
                    barcode: $("#barcodeField").val().trim()
                }
                var valid = true;
                for (key in registerData) {
                    if (registerData[key] == "") {
                        valid = false
                    }
                }
                if (valid) {
                    $.ajax({
                        url: "api/createparcel",
                        method: "POST",
                        data: registerData
                    }).done(function (msg) {
                        if (msg) {
                            if(msg["code"]==0){
                                loadParcelsData(0, "")
                                $('#myModal').modal("hide");
                            }else{
                                alert(msg["message"])
                            }
                        } else {
                            $('#myModal').modal("hide");
                            alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                        }
                    })
                } else {
                    alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                }


            })
            $('#myModal').modal("show");

        })

    })
}
function loadUsersData(index, search) {
    $.getJSON("api/getusers?index=" + index + "&search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < userColumns.length; i++) {
            var currentElement = userColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")

        }
        console.log(result);
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append(
                "<tr><td>" + currentElement["name"] + "</td><td>"
                + currentElement["surname"] + "</td><td>"
                + currentElement["username"] + "</td><td>"
                + currentElement["personalNumber"] + "</td>" +
                "<td>" + currentElement["mobile"] + "</td></tr>"
            );

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"<a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadParcelsData($(this).val(), "")

        })
        if (canCreateUsers)
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark"><i class="fa fa-plus"></i>ახალი მომხმარებლის დამატება </button>')
        else $("#addNewDiv").html('');
        $("#addNewButton").click(function () {
            $("#myModalLabel").html("ახალი მომხმარებლის დამატება")
            var modalBody = $("#modalBody");
            modalBody.html(userRegistrationFormTemplate);
            if (readCookie("projectUserType") === "3") {
                $("#organisationIdField").parent().remove();
                $("#typeField").parent().remove();
                $("#regionIdField").parent().remove();
                $("#zoneIdField").parent().remove();
            }
            $("#organisationIdField").append("<option value='" + 0 + "'>შიდა</option>")
            $.getJSON("api/getallorganisations", function (result) {
                if (result) {
                    for (i = 0; i < result.length; i++) {
                        $("#organisationIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
                    }
                }
            })
            for (var key in userTypes) {
                $("#typeField").append("<option value='" + key + "'>" + userTypes[key] + "</option>");
            }
            $("#regionIdField").append("<option value='" + 0 + "'>არცერთი</option>")
            $("#zoneIdField").append("<option value='" + 0 + "'>არცერთი</option>")
            $.getJSON("api/getregions", function (result) {
                if (result) {
                    for (i = 0; i < result.length; i++) {
                        $("#regionIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
                    }
                }
            })
            $('#myModal').modal("show");

            $("#registrationModalSaveButton").unbind()
            $("#registrationModalSaveButton").click(function () {
                var registerData = {
                    username: $("#usernameField").val().trim(),
                    password: $("#passwordField").val().trim(),
                    email: $("#emailField").val().trim(),
                    name: $("#nameField").val().trim(),
                    surname: $("#surnameField").val().trim(),
                    address: $("#addressField").val().trim(),
                    mobile: $("#mobileField").val().trim(),
                    personalNumber: $("#personalNumberField").val().trim()
                }
                if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2") {
                    registerData["organisationId"] = $("#organisationIdField").val();
                    registerData["type"] = $("#typeField").val();
                    registerData["regionId"] = $("#regionIdField").val();
                    registerData["zoneId"] = $("#zoneIdField").val();
                }
                var valid = true;
                for (key in registerData) {
                    if (registerData[key] == "") {
                        valid = false
                    }
                }
                if (valid) {
                    $.ajax({
                        url: "api/createuser",
                        method: "POST",
                        data: registerData
                    }).done(function (msg) {
                        if (msg) {
                            if(msg["code"]==0){
                                loadUsersData(0, "")
                                $('#myModal').modal("hide");
                            }else{
                                alert(msg["message"]);
                            }

                        } else {
                            $('#myModal').modal("hide");
                            alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                        }
                    })
                } else {
                    alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                }

            })
        })

    });


}
function loadOrganisationsData(index, search) {
    $.getJSON("api/getorganisations?index=" + index + "&search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < organisationColumns.length; i++) {
            var currentElement = organisationColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        console.log(result);
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr><td>" + currentElement["name"] + "</td><td>"
            + currentElement["mobileNumber"] + "</td><td>"
            + currentElement["address"] + "</td><td>"
            + currentElement["email"] + "</td>" +
            "</tr>");

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"<a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadOrganisationsData($(this).val(), "")

        })
    })

}
function loadRegionsData() {
    $.getJSON("api/getregions", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < regionColumns.length; i++) {
            var currentElement = regionColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        console.log(result);
        currentData = result;
        for (i = 0; i < currentData.length; i++) {
            var currentElement = currentData[i];

            $("#dataGridBody").append("<tr><td>" + currentElement["name"] + "</td></tr>");

        }

    })
}
function loadFormatsData() {
    $.getJSON("api/getformats", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < formatColumns.length; i++) {
            var currentElement = formatColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        console.log(result);
        currentData = result;
        for (i = 0; i < currentData.length; i++) {
            var currentElement = currentData[i];

            $("#dataGridBody").append("<tr><td>" + currentElement["name"] + "</td><td>" + currentElement["price"] + "</td></tr>");

        }

    })
}
function loadServiceTypesData() {
    $.getJSON("api/getservicetypes", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < serviceTypeColumns.length; i++) {
            var currentElement = serviceTypeColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        console.log(result);
        currentData = result;
        for (i = 0; i < currentData.length; i++) {
            var currentElement = currentData[i];

            $("#dataGridBody").append("<tr><td>" + currentElement["name"] + "</td><td>" + currentElement["pricePlus"] + "</td></tr>");

        }

    })
}
$.getJSON("api/getsessionstatus", function (result) {
    if (!result["isactive"]) {
        eraseCookie("projectSessionId");
        window.location.href = "/login.html";
    }
});
$(document).ready(function () {
    console.log($("#loadParcelsButton"))
    $("#loadParcelsButton").click(function () {
        $(".k").attr("class", "k");
        $(this).attr("class", "k nav-active active");

        loadParcelsData(0, "");
    })
    $("#loadUsersButton").click(function () {
        $(".k").attr("class", "k");
        $(this).attr("class", "k nav-active active");

        loadUsersData(0, "");
    })
    $("#logoutBtn").click(function () {
        $.getJSON("api/logout", function (result) {
            if (result) {
                eraseCookie("projectSessionId");
                window.location.href = "/login.html";
            }
        })

    });
    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2") {
        $("#navigationUl").append('<li id="loadOrganisationsButton" class="k">' +
        '<a href="#"><i class="icon-screen-desktop"></i><span data-translate="ორგანიზაციები">ორგანიზაციები</span></a></li>');
        $("#navigationUl").append('<li id="loadRegionsButton" class="k">' +
        '<a href="#"><i class="icon-picture"></i><span data-translate="რეგიონები">რეგიონები</span></a></li>');
        $("#navigationUl").append('<li id="loadFormatsButton" class="k">' +
        '<a href="#"><i class="icon-note"></i><span data-translate="ფორმატები">ფორმატები</span></a></li>');
        $("#navigationUl").append('<li id="loadServiceTypesButton" class="k">' +
        '<a href="#"><i class="icon-note"></i><span data-translate="სერვისის ტიპები">სერვისის ტიპები</span></a></li>');
        $("#loadOrganisationsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark"><i class="fa fa-plus"></i>ახალი ორგანიზაციის დამატება </button>')
            $("#addNewButton").click(function () {
                $("#myModalLabel").html("ახალი ორგანიზაციის დამატება")
                var modalBody = $("#modalBody");
                modalBody.html(organizationRegistrationFormTemplate);
                $.getJSON("api/getregions", function (result) {
                    if (result) {
                        for (i = 0; i < result.length; i++) {
                            $("#regionIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
                        }
                    }
                })
                $('#myModal').modal("show");
                $("#registrationModalSaveButton").unbind()
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        email: $("#emailField").val().trim(),
                        name: $("#nameField").val().trim(),
                        address: $("#addressField").val().trim(),
                        mobileNumber: $("#mobileField").val().trim(),
                        regionId: $("#regionIdField").val()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "api/createorganisation",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadOrganisationsData(0, "")
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }

                    console.log(registerData);
                })
            })
            loadOrganisationsData(0, "");
        })
        $("#loadRegionsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark"><i class="fa fa-plus"></i>ახალი რეგიონის დამატება </button>')
            $("#addNewButton").click(function () {
                $("#myModalLabel").html("ახალი რეგიონის დამატება");
                var modalBody = $("#modalBody");
                modalBody.html(regionRegistrationFormTemplate);
                $('#myModal').modal("show");
                $("#registrationModalSaveButton").unbind()
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        name: $("#nameField").val().trim()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "api/createregion",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadRegionsData(0, "")
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }


                })
            })
            loadRegionsData(0, "");
        })
        $("#loadFormatsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark"><i class="fa fa-plus"></i>ახალი ფორმატის დამატება </button>')
            $("#addNewButton").click(function () {
                $("#myModalLabel").html("ახალი ფორმატის დამატება");
                var modalBody = $("#modalBody");
                modalBody.html(formatRegistrationFormTemplate);
                $('#myModal').modal("show");
                $("#registrationModalSaveButton").unbind()
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        name: $("#nameField").val().trim(),
                        price: $("#priceField").val().trim()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "api/createformat",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadFormatsData(0, "")
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }


                })
            })
            loadFormatsData();


        })
        $("#loadServiceTypesButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark"><i class="fa fa-plus"></i>ახალი სერვისის ტიპის დამატება</button>')
            $("#addNewButton").click(function () {
                $("#myModalLabel").html("ახალი სერვისის ტიპის დამატება");
                var modalBody = $("#modalBody");
                modalBody.html(serviceTypeRegistrationFormTemplate);
                $('#myModal').modal("show");
                $("#registrationModalSaveButton").unbind()
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        name: $("#nameField").val().trim(),
                        price: $("#priceField").val().trim()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "api/createservicetype",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadServiceTypesData()
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }


                })
            })
            loadServiceTypesData();

        })
    }

    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2" || readCookie("projectUserType") === "3") {
        canCreateUsers = true;
    }
    if (readCookie("projectUserType") === "3" || readCookie("projectUserType") === "4") {
        canCreateParcels = true;
    }


    loadParcelsData(0, "");
})
