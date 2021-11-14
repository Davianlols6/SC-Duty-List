let inSettings = false;

function menuBarChange(data) {
    if (data === "home") {
        $("#housebox").attr("xlink:href", "#house-fill");
        $("#gearbox").attr("xlink:href", "#gear");
        hideAll();
        $("#homediv").show();
        $("#titleBar").text("SC Duty List");
        inSettings = false;
        localStorage.setItem("menu", "home");
    } else if (data === "settings") {
        localStorage.setItem("menu", "settings");
        $("#housebox").attr("xlink:href", "#house");
        $("#gearbox").attr("xlink:href", "#gear-fill");
        hideAll();
        $("#settingsdiv").show();
        $("#titleBar").text("Settings");

        if (localStorage.getItem("settings") === null) {
            localStorage.setItem("settings", "none");
        }

        if (inSettings) {
            localStorage.setItem("settings", "none");
        } else if (localStorage.getItem("settings") !== "none") {
            settings(localStorage.getItem("settings"));
        }
        inSettings = true;
        
    }
}

function settings(data) {
    hideAll();
    
    if (data === "about") {
        $("#titleBar").text("Settings > About");
        $("#settingsabout").show();
        localStorage.setItem("settings", "about");
    }
}

function hideAll() {
    let a = ["#settingsdiv", "#homediv", "#settingsabout"];

    a.forEach(function(item) {
        $(item).hide();
    });
}

if (localStorage.getItem("menu") === null) {
    localStorage.setItem("menu", "home");
    menuBarChange("home");
} else {
    if (localStorage.getItem("menu") === "settings") {
        inSettings = true;
    }
    menuBarChange(localStorage.getItem("menu"));
}