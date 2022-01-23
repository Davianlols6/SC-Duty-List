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
        $("#titleBar").text("About");
        $("#settingsabout").show();
        localStorage.setItem("settings", "about");
    } else if (data === "theme") {
        $("#titleBar").text("Settings > Theme");
        $("#settingstheme").show();
        localStorage.setItem("settings", "theme");
    } else if (data === "acknowledgment") {
        $("#titleBar").text("Acknowledgment");
        $("#settingsacknowledgment").show();
        localStorage.setItem("settings", "acknowledgment");
    } else if (data === "update") {
        $("#titleBar").text("Settings > Update");
        $("#settingsupdate").show();
        localStorage.setItem("settings", "update");
    } else if (data === "walkthrough") {
        $("#titleBar").text("Settings > Walkthrough");
        $("#settingswalkthrough").show();
        localStorage.setItem("settings", "walkthrough");
    }
}

function hideAll() {
    let a = ["#settingsdiv", "#homediv", "#settingsabout", "#settingstheme", "#settingsacknowledgment", "#settingsupdate", "#settingswalkthrough"];

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

var pStart = { x: 0, y: 0 };
var pStop = { x: 0, y: 0 };

function swipeStart(e) {
  if (typeof e["targetTouches"] !== "undefined") {
    var touch = e.targetTouches[0];
    pStart.x = touch.screenX;
    pStart.y = touch.screenY;
  } else {
    pStart.x = e.screenX;
    pStart.y = e.screenY;
  }
}

function swipeEnd(e) {
  if (typeof e["changedTouches"] !== "undefined") {
    var touch = e.changedTouches[0];
    pStop.x = touch.screenX;
    pStop.y = touch.screenY;
  } else {
    pStop.x = e.screenX;
    pStop.y = e.screenY;
  }

  swipeCheck();
}

function swipeCheck() {
  var changeY = pStart.y - pStop.y;
  var changeX = pStart.x - pStop.x;
  if (isPullDown(changeY, changeX)) {
    nameChecker();
  }
}

function isPullDown(dY, dX) {
  // methods of checking slope, length, direction of line created by swipe action
  return (
    dY < 0 &&
    ((Math.abs(dX) <= 100 && Math.abs(dY) >= 300) ||
      (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
  );
}

document.addEventListener(
  "touchstart",
  function (e) {
    swipeStart(e);
  },
  false
);
document.addEventListener(
  "touchend",
  function (e) {
    swipeEnd(e);
  },
  false
);