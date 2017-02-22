let baseURL = "https://wind-bow.gomix.me/twitch-api/";
var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(function () {

    loadStreamers();
});

function loadStreamers() {
    $.each(users, function (index, item) {        
        console.log(item);

        $.get(baseURL + "/users/" + item, function (data) {
            console.log(data);
            $("#streamers").append("<div class='streamer'><div class='col'><img src=" + data.logo + " class='img-thumbnail' width='75'><div class='col'><h3>" + item + "</h3></div></div>");
        })
        .fail(function () {
            alert("error");
        })
    });
}