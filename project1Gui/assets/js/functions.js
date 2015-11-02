/**
 * Created by KGelashvili on 10/26/2015.
 */
var currentData;
var parcelColumns = ["მისამართი", "ბარკოდი", "მოსალოდნელი მიტანის დრო", "მიმღები"];
var userColumns = ["სახელი", "გვარი", "მომხმარებლის სახელი", "პირადი ნომერი", "მობილური"];
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

            $("#dataGridBody").append("<tr><td>" + currentElement["address"] + "</td><td>"
            + currentElement["barcode"] + "</td><td>"
            + (new Date(currentElement["expectedDeliveryDate"]).toLocaleString()) + "</td><td>"
            + currentElement["reciever"] + "</td></tr>");

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"<a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadParcelsData($(this).val(), "")

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
                "<td>"+currentElement["mobile"]+"</td></tr>"
            );

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"<a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadParcelsData($(this).val(), "")

        })
    });


}
loadParcelsData(0, "");
$(document).ready(function () {
    console.log($("#loadParcelsButton"))
    $("#loadParcelsButton").click(function () {
        $("#loadParcelsButton").attr("class", "nav-active active");
        $("#loadUsersButton").attr("class", "");
        loadParcelsData(0, "");
    })
    $("#loadUsersButton").click(function () {
        $("#loadUsersButton").attr("class", "nav-active active");
        $("#loadParcelsButton").attr("class", "");
        loadUsersData(0, "");
    })
})