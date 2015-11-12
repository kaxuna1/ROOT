/**
 * Created by kakha on 11/12/2015.
 */
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
            $.getJSON("api/getregions", function (result) {
                if (result) {
                    for (i = 0; i < result.length; i++) {
                        $("#regionIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
                    }
                }
            })
            $.getJSON("api/getZones", function (result) {
                if (result) {
                    for (i = 0; i < result.length; i++) {
                        $("#zoneIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
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
                            if (msg["code"] == 0) {
                                loadUsersData(0, "")
                                $('#myModal').modal("hide");
                            } else {
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