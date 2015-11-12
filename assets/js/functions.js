/**
 * Created by KGelashvili on 10/26/2015.
 */



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
        $("#navigationUl").append('<li id="loadZonesButton" class="k">' +
        '<a href="#"><i class="icon-layers"></i><span data-translate="ზონები">ზონები</span></a></li>');
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
        $("#loadZonesButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark"><i class="fa fa-plus"></i>ახალი ზონის დამატება</button>')
            $("#addNewButton").click(function () {

                $("#myModalLabel").html("ახალი ზონის დამატება");
                var modalBody = $("#modalBody");
                modalBody.html(zoneRegistrationFormTemplate);
                $.getJSON("api/getregions", function (result) {
                    if (result) {
                        for (i = 0; i < result.length; i++) {
                            $("#regionIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
                        }
                    }
                })
                $('#myModal').modal("show");
                $("#registrationModalSaveButton").unbind();
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        zoneName: $("#nameField").val().trim(),
                        regionId: $("#regionIdField").val().trim()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "api/createzone",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadZonesData()
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }
                });
            })
            loadZonesData()
        })
    }

    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2" || readCookie("projectUserType") === "3") {
        canCreateUsers = true;
    }
    if (readCookie("projectUserType") === "3" || readCookie("projectUserType") === "4") {
        canCreateParcels = true;
    }


    loadParcelsData(0, "");
});
function formatParcelData(key, value) {
    if(!value){
        return "";
    }
    if (key === "expectedDeliveryDate"||key === "deliveryDate")
        return moment(new Date(value)).locale("ka").format("LL");
    if (key === "format")
        return value["name"];
    if (key === "organisation")
        return value["name"]
    if (key === "status")
        return parcelStatuses[value]
    if(key==="serviceType")
        return value["name"]

    return value;

}

