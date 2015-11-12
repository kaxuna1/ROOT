/**
 * Created by kakha on 11/12/2015.
 */

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