let baseURL = "https://wind-bow.gomix.me/twitch-api/";
let twitchURL = "https://www.twitch.tv/";

var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

$("#toggleButtons input:radio").change(function () {
    var optionValue = $(this).val();
    loadStreamers(optionValue);
});

$(function () {
    loadStreamers("online");
});

function loadStreamers(optionValue) {
    $("#streamers").html("");

    if (optionValue == "online") {
        $.each(streams, function (index, item) {
            $.get(baseURL + "/streams/" + item, function (data) {

                if (data.stream != null) {
                    var channel = data.stream.channel;

                    if (channel.status == null) {
                        channel.status = "No Description";
                    } else {
                        channel.status = channel.status.slice(0, 45) + " ...";
                    }

                    $("#streamers").append("<div class='streamer row justify-content-center'><div class='col-1'><a href='" + twitchURL + item + "' target='_blank'><img src=" + channel.logo + " class='img-thumbnail' width='75' /></a></div><div class='col-2'><h4 class='text-center'><a href='" + twitchURL + item + "' target='_blank'>" + item + "</a></h4></div><div class='col-5'><p class='text-center'><a href='" + twitchURL + item + "' target='_blank'>" + channel.game + ": " + channel.status + "</a></p></div></div><br />");
                }
                console.log(data);
            })
            .fail(function () {
                alert("error");
            })
        });
    } else if (optionValue == "offline") {
        $.each(streams, function (index, item) {
            $.get(baseURL + "/streams/" + item, function (data) {

                if (data.stream == null) {
                    $.get(baseURL + "/channels/" + item, function (data) {

                        $("#streamers").append("<div class='streamer row justify-content-center'><div class='col-1'><a href='" + twitchURL + item + "' target='_blank'><img src=" + data.logo + " class='img-thumbnail' width='75' /></a></div><div class='col-2'><h4 class='text-center'><a href='" + twitchURL + item + "' target='_blank'>" + item + "</a></h4></div><div class='col-5'><p class='text-center'><a href='" + twitchURL + item + "' target='_blank'>Offline</a></p></div></div><br />");
                    })
                    .fail(function () {
                        alert("error");
                    })
                }
            })
            .fail(function () {
                alert("error");
            })
        });
    } else {
        console.log(optionValue);
    }
}