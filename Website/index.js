var jsonData;
var flagData;
var nameData;

function show_personalised() {
    $("#updated").text(jsonData["updated"]);
    $("#date2").remove();

    $("#personalised").empty();

    function DaysOfWeek(day) {
        $(Object.keys(jsonData["weeks"])).each(function (i, v) {

            $(jsonData["weeks"][v]).each(function (b, value) {
                var a = new Date(value);

                if (String(day) == String(a)) {
                    week = jsonData["weeks"][v];
                }

            });

        });
    }

    var day = new Date(String($("#start").val()));
    DaysOfWeek(day);
    var week;

    var per_dict = {
        0: {
            "id": "day_1",
            "h4": "Monday",
        },
        1: {
            "id": "day_2",
            "h4": "Tuesday",
        },
        2: {
            "id": "day_3",
            "h4": "Wednesday",
        },
        3: {
            "id": "day_4",
            "h4": "Thursday",
        },
        4: {
            "id": "day_5",
            "h4": "Friday"
        }
    }

    var recessBadge = {
        1: "<span class='badge bg-primary mb-1'>First Recess (9:10 - 9:45)</span>",
        2: "<span class='badge bg-secondary mb-1'>Second Recess (9:45 - 10:20)</span>",
        3: "<span class='badge bg-success mb-1'>Third Recess (10:20 - 10:55)</span>",
        4: "<span class='badge bg-info mb-1'>Fourth Recess (10:55 - 11:30)</span>"
    }

    var duty_trans = {
        "nb1": "NB1",
        "nb2": "NB2",
        "nb3": "NB3",
        "stall": "Stall",
        "pond": "Pond",
        "field": "Field",
        "parade_square": "Parade Square",
        "lift": "Lift",
        "central": "Central",
        "patrol": "Patrol",
        "on_break": "On Break",
        "main_gate": "Main Gate",
        "late_coming": "Late Coming",
        "canteen": "Canteen",
        "stairs_to_hall": "Stairs To Hall",
        "side_gate": "Side Gate",
        "morning_patrol": "Morning Patrol",
        "hall": "Hall"
    }

    var counter = 0;
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $(week).each(function (i, v) {
        if (counter < 5) {
        var dd = new Date(v);
        var first_date = new Date(Object.keys(jsonData["dates"])[0])
        var lastDate = new Date(Object.keys(jsonData["dates"])[Object.keys(jsonData["dates"]).length - 1]);
        
        var flagDuty = "";

        if (flagData[v] != null) {

            if (String($("#name").val()) == flagData[v]["singapore_flag"]) {
                flagDuty = "<p><span class='fw-bold'></span><span class='badge bg-warning mb-1'>Flag Duty</span><br><span class='fw-bold'>Duty: </span><span id=''>Singapore Flag</span></p>";
            } else if (String($("#name").val()) == flagData[v]["school_flag"]) {
                flagDuty = "<p><span class='fw-bold'></span><span class='badge bg-warning mb-1'>Flag Duty</span><br><span class='fw-bold'>Duty: </span><span id=''>School Flag</span></p>";
            }

        }
        if (dd.getDay() === 6 || dd.getDay() === 0 || jsonData["dates"][v] === 11 || dd < first_date || dd > lastDate) {
            var b = new Date(v);
            var a = '<div id="' + per_dict[i]["id"] + '" class="container shadow pt-3 pb-3 mb-3 bg-white rounded-3"><h4>' + days[b.getDay()] + ", " + String(b.getDate()) + " " + months[b.getMonth()] + '</h4><p><span class="fw-bold"></span>No data is available for this day</span></p></div>';
            $(a).appendTo("#personalised");
        } else {
            $("#weekend").hide();
            var b = new Date(v);
            var a = '<div id="' + per_dict[i]["id"] + '" class="container shadow pt-3 pb-3 mb-3 bg-white rounded-3"><h4>' + days[b.getDay()] + ", " + String(b.getDate()) + " " + months[b.getMonth()] + '</h4>' + flagDuty + '<p><span class="fw-bold"></span>' + recessBadge[nameData[String($("#name").val())][String(jsonData["dates"][v])]["recess"]] + '<br><span class="fw-bold">Duty: </span><span id="">' + duty_trans[nameData[String($("#name").val())][String(jsonData["dates"][v])]["duty"]] + '</span></p></div>';
            var c = '<div id="' + per_dict[i]["id"] + '" class="container shadow pt-3 pb-3 mb-3 bg-white rounded-3"><h4>' + days[b.getDay()] + ", " + String(b.getDate()) + " " + months[b.getMonth()] + '</h4>' + flagDuty + '<p><span class="fw-bold"></span><span class="badge bg-warning mb-1">Morning Duty</span><br><span class="fw-bold">Duty: </span><span id="">' + duty_trans[nameData[String($("#name").val())]["morning_duty"]["duty"]] + '</span></p><p><span class="fw-bold"></span>' + recessBadge[nameData[String($("#name").val())][String(jsonData["dates"][v])]["recess"]] + '<br><span class="fw-bold">Duty: </span><span id="">' + duty_trans[nameData[String($("#name").val())][String(jsonData["dates"][v])]["duty"]] + '</span></p></div>';                    

            if (nameData[String($("#name").val())]["morning_duty_check"]) {
                $(c).appendTo("#personalised");
            } else {
                $(a).appendTo("#personalised");
            }

        }
    }
        counter += 1
    })

    localStorage.setItem("name", String($("#name").val()));
    $("<div id='date2' class='text-center'><h4>Hello " + String($("#name").val()) + "!</h4><p>Here is your duty for the week you selected</p></div>").insertBefore("#date");
    $("#personalised").show();
        $(["#date", "#date2", "#day_1", "#day_2", "#day_3", "#day_4", "#day_5"]).each(function (i,v) {$(v).hide()});
        var eT = 0;
    $.each(["#date2", "#day_1", "#day_2", "#day_3", "#day_4", "#day_5"], function (i, v) {
        $(v).delay(eT).fadeIn("slow");
        eT += 200;
    });

}

function nameChecker() {
    if ($("#name").val() === "Overview") {
        localStorage.setItem("name", String($("#name").val()));
        $("#personalised").hide();
        $("#date2").remove();

        
        $.each(["#weekend", "#recess_duty_text", "#first_recess", "#second_recess", "#third_recess", "#fourth_recess", "#morning_duty_text", "#morning_duty_block"], function (i, v) {
            $(v).hide();
        });
        $("#overview").show();
        $("#start").attr("onchange", "update()");
        update();
    } else {
        $("#overview").hide();
        $("#start").attr("onchange", "show_personalised()")
        show_personalised();
    }
}

$.each(["#weekend", "#date", "overview"], function (i, v) {
    $(v).hide();
});

$.getJSON("Data/data.json?time=" + new Date().getTime(),
    function (data) {
        var dt = new Date();
        const monthFixer = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

        var date = String(dt.getFullYear()) + "-" + String(monthFixer[dt.getMonth()]) + "-" + String(dt.getDate());
        $("#start").attr("min", Object.keys(data["dates"])[0]);
        $("#start").attr("max", Object.keys(data["dates"])[Object.keys(data["dates"]).length - 1]);

        function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = "0" + month;
        }
        if (day.length < 2) {
            day = "0" + day;
        }

        return [year, month, day].join('-');
        }
        $("#start").val(formatDate(dt));

        jsonData = data;
        getFlagsData();

    }
);

function getFlagsData() {

    $.getJSON("Data/flag.json?time=" + new Date().getTime(),
        function (data) {
            flagData = data;
            getNameData();
        }
    );
}

function getNameData() {

    $.getJSON("Data/names.json?time=" + new Date().getTime(),
        function (data) {
            nameData = data;

            $.each(Object.keys(nameData), function (i, v) {
                
            if (localStorage.getItem("name") != null && localStorage.getItem("name") == v) {
                $('option:selected', name_og).remove();
                var a = '<option selected value="' + String(v) + '">' + String(v) + '</option>'
                $(a).appendTo("#name");
            } else {
                var a = '<option value="' + String(v) + '">' + String(v) + '</option>'
                $(a).appendTo("#name");
            }
                
            });

            nameChecker();
        }
    );
}

var blink = false;

function recess_time(period) {
    var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-circle mx-1 icon-blink" style="fill: #ff0000" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /><path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>'

    function blink_text() {
        blink = true
        $('.icon-blink').each(function () {
            var elem = $(this);
            setInterval(function () {
                if (elem.css('visibility') == 'hidden') {
                    elem.css('visibility', 'visible');
                } else {
                    elem.css('visibility', 'hidden');
                }
            }, 700);
        });
    }

    if (period == 1) {
        $(icon).prependTo("#first_recess");
    } else if (period == 2) {
        $(icon).prependTo("#second_recess");
        $("#first_recess").insertAfter("#fourth_recess");
    } else if (period == 3) {
        $(icon).prependTo("#third_recess");
        $("#first_recess").insertAfter("#fourth_recess");
        $("#second_recess").insertAfter("#first_recess");
    } else if (period == 4) {
        $(icon).prependTo("#fourth_recess");
        $("#first_recess").insertAfter("#fourth_recess");
        $("#second_recess").insertAfter("#first_recess");
        $("#third_recess").insertAfter("#second_recess");
    }

    blink_text();
}

function update() {
    $("#updated").text(jsonData["updated"]);

    $("#weekend").hide();
    var d = String($("#start").val())
    var dd = new Date(d);
    var first_date = new Date(Object.keys(jsonData["dates"])[0])
    var lastDate = new Date(Object.keys(jsonData["dates"])[Object.keys(jsonData["dates"]).length - 1]);
    if (dd.getDay() == 6 || dd.getDay() == 0 || jsonData["dates"][String($("#start").val())] == 11 || dd < first_date || dd > lastDate) {
        $("#date").hide();
        $.each(["#weekend", "#recess_duty_text", "#first_recess", "#second_recess", "#third_recess", "#fourth_recess", "#morning_duty_text", "#morning_duty_block"], function (i, v) {
            $(v).hide();
        });
        update_date();
        $("#date").fadeIn('slow');
        $("#weekend").delay(500).fadeIn('slow');
        return
    }

    $.each(["#date", "#recess_duty_text", "#first_recess", "#second_recess", "#third_recess", "#fourth_recess", "#morning_duty_text", "#morning_duty_block"], function (i, v) {
        $(v).hide();
    });

    function today(date) {
        var inputDate = new Date(date);
        var todaysDate = new Date();
        if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
            return true
        } else {
            return false
        }
    }

    function update_block_arrangement() {
        var startTime = '06:00:00';
        var endTime = '08:00:00';

        currentDate = new Date();

        startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);


        valid = startDate < currentDate && endDate > currentDate
        if (valid && today(String($("#start").val()))) {
            $("#recess_duty_block").insertAfter("#morning_duty_block");
        } else {
            $("#recess_duty_block").insertBefore("#morning_duty_block");
        }

    }

    function list_to_string(list) {
        if (list == "") {
            return "-"
        } else {
            return list.join(", ");
        }
    }

    function update_morning_duty() {
        morning_duty_data = jsonData["constants"][jsonData["presets"][jsonData["dates"][String($("#start").val())]]["constant_morning_duty"]];
        $("#morning_main_gate").text(list_to_string(morning_duty_data["main_gate"]));
        $("#morning_late_coming").text(list_to_string(morning_duty_data["late_coming"]));
        $("#morning_canteen").text(list_to_string(morning_duty_data["canteen"]));
        $("#morning_stairs_to_hall").text(list_to_string(morning_duty_data["stairs_to_hall"]));
        $("#morning_side_gate").text(list_to_string(morning_duty_data["side_gate"]));
        $("#morning_lift").text(list_to_string(morning_duty_data["lift"]));
        $("#morning_morning_patrol").text(list_to_string(morning_duty_data["morning_patrol"]));
        $("#morning_hall").text(list_to_string(morning_duty_data["hall"]));

    }
    function update_flag_duty() {
        data = flagData[String($("#start").val())]

        if (data == null) {
            $("#morning_flag_singapore").text("Data is unavailable");
            $("#morning_flag_school").text("Data is unavailable");
        } else {
            $("#morning_flag_singapore").text(data["singapore_flag"]);
            $("#morning_flag_school").text(data["school_flag"]);
        }
    }

    function update_date() {
        var dtt = new Date(String($("#start").val()));
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $("#date").text("Duty list for " + days[dtt.getDay()] + ", " + String(dtt.getDate()) + " " + months[dtt.getMonth()] + " " + String(dtt.getFullYear()));
    }

    function update_recess_duty() {

        function first_recess() {
            data = jsonData["presets"][jsonData["dates"][String($("#start").val())]]["recess_duty"]["first_recess"]
            $("#first_nb1").text(list_to_string(data["nb1"]));
            $("#first_nb2").text(list_to_string(data["nb2"]));
            $("#first_nb3").text(list_to_string(data["nb3"]));
            $("#first_stall").text(list_to_string(data["stall"]));
            $("#first_pond").text(list_to_string(data["pond"]));
            $("#first_lift").text(list_to_string(data["lift"]));
            $("#first_central").text(list_to_string(data["central"]));
            $("#first_on_break").text(list_to_string(data["on_break"]));
        }

        function second_recess() {
            data = jsonData["presets"][jsonData["dates"][String($("#start").val())]]["recess_duty"]["second_recess"]
            $("#second_nb1").text(list_to_string(data["nb1"]));
            $("#second_nb2").text(list_to_string(data["nb2"]));
            $("#second_nb3").text(list_to_string(data["nb3"]));
            $("#second_stall").text(list_to_string(data["stall"]));
            $("#second_pond").text(list_to_string(data["pond"]));
            $("#second_lift").text(list_to_string(data["lift"]));
            $("#second_central").text(list_to_string(data["central"]));
            $("#second_on_break").text(list_to_string(data["on_break"]));
        }

        function third_recess() {
            data = jsonData["presets"][jsonData["dates"][String($("#start").val())]]["recess_duty"]["third_recess"]
            $("#third_nb1").text(list_to_string(data["nb1"]));
            $("#third_nb2").text(list_to_string(data["nb2"]));
            $("#third_nb3").text(list_to_string(data["nb3"]));
            $("#third_stall").text(list_to_string(data["stall"]));
            $("#third_pond").text(list_to_string(data["pond"]));
            $("#third_lift").text(list_to_string(data["lift"]));
            $("#third_central").text(list_to_string(data["central"]));
            $("#third_on_break").text(list_to_string(data["on_break"]));
        }

        function fourth_recess() {
            data = jsonData["presets"][jsonData["dates"][String($("#start").val())]]["recess_duty"]["fourth_recess"]
            $("#fourth_nb1").text(list_to_string(data["nb1"]));
            $("#fourth_nb2").text(list_to_string(data["nb2"]));
            $("#fourth_nb3").text(list_to_string(data["nb3"]));
            $("#fourth_stall").text(list_to_string(data["stall"]));
            $("#fourth_pond").text(list_to_string(data["pond"]));
            $("#fourth_lift").text(list_to_string(data["lift"]));
            $("#fourth_central").text(list_to_string(data["central"]));
            $("#fourth_on_break").text(list_to_string(data["on_break"]));
        }

        first_recess();
        second_recess();
        third_recess();
        fourth_recess();
    }

    function check_time_valid(start, end) {
        var startTime = String(start);
        var endTime = String(end);

        currentDate = new Date();

        startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);


        valid = startDate < currentDate && endDate > currentDate
        return valid;
    }

    if (check_time_valid("09:10:00", "11:30:00") && today(String($("#start").val()))) {
        if (check_time_valid("09:10:00", "09:45:00") && check1 == false) {
            recess_time(1)
            check1 = true;
        } else if (check_time_valid("09:45:00", "10:20:00") && check1 == false) {
            recess_time(2)
            check1 = true;
        } else if (check_time_valid("10:20:00", "10:55:00") && check1 == false) {
            recess_time(3)
            check1 = true;
        } else if (check_time_valid("10:55:00", "11:30:00") && check1 == false) {
            recess_time(4)
            check1 = true;
        }
    } else if (blink == true) {
        $('.icon-blink').each(function () {
            $(this).remove();
        });
        $("#second_recess").insertAfter("#first_recess");
        $("#third_recess").insertAfter("#second_recess");
        $("#fourth_recess").insertAfter("#third_recess");
    }

    update_morning_duty();
    update_flag_duty();
    update_date();
    update_block_arrangement();
    update_recess_duty();

    var eT = 0;
    $.each(["#date", "#recess_duty_text", "#first_recess", "#second_recess", "#third_recess", "#fourth_recess", "#morning_duty_text", "#morning_duty_block"], function (i, v) {
        $(v).delay(eT).fadeIn('slow');
        eT += 200;
    });
}

var check1 = false;