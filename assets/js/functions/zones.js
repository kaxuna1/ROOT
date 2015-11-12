/**
 * Created by kakha on 11/12/2015.
 */

function loadZonesData() {
    $.getJSON("api/getZones", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < zoneColumns.length; i++) {
            var currentElement = zoneColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        console.log(result);
        currentData = result;
        for (i = 0; i < currentData.length; i++) {
            var currentElement = currentData[i];

            $("#dataGridBody").append("<tr><td>" + currentElement["name"] + "</td><td>" + currentElement["region"]["name"] + "</td></tr>");

        }
    })
}