var baseURL = ["/sc_duty_list/api/", "http://localhost:3000/"][0];
var online = (window.navigator.onLine ? true : false);

var dataData = {};
var dataFlag;
var dataNames;


$.getJSON(`Data/data.json`, function (data) {
    dataData = data;
    one();
    $("#start").val(formatDate(new Date()));
    });

function one() {
  $.getJSON(`Data/flag.json`, function (data) {
    dataFlag = data;
    two();
  });}
  
function two(){
$.getJSON(`Data/names.json`, function (data) {
    dataNames = data;
    metadata();
    version();
  });
}

function update() {
if (online) {
  $.getJSON(`${baseURL}overview/${$("#start").val()}`, function (data) {
    engine(data);
  });
} else {
  engine(offlineOverview($("#start").val()));
}

}

function showPersonalised() {
  if ($("#name") !== "Overview") {

  if (online) {
  $.getJSON(`${baseURL}personalised/${$("#name").val()}/${$("#start").val()}`, function (data) {
    engine(data);
});
  } else {
    engine(offlinePersonalised($("#name").val(), $("#start").val()));
  }

}
localStorage.setItem("name", String($("#name").val()));
}

function nameChecker() {
  if ($("#name").val() === "Overview") {
    localStorage.setItem("name", String($("#name").val()));
    update();
  } else {
    $("#start").attr("onchange", "showPersonalised()");
    showPersonalised();
  }
}

function version() {

  if (online) {
  $.getJSON(`${baseURL}version`, function (data) {
    process(data);
  });
} else {
    process(offlineVersion());
}

  function process(data) {
    $("#versionurl").attr("href", data.releaseNotesURL);
    $("#version").text(data.version);
    $("#updated").text(data.updated);
  }

}

function metadata() {
  if (online) {
  $.getJSON(`${baseURL}metadata`, function (data) {
    process(data);
  });
} else {
  process(offlineMetadata());
}

function process(data) {

$.each(data.names, function (i, v) {
    var a;
    if (localStorage.getItem("name") != null && localStorage.getItem("name") === v) {
      $("option:selected", name_og).remove();
      a = "<option selected value='" + String(v) + "'>" + String(v) + "</option>";
      $(a).appendTo("#name");
    } else {
      a = "<option value='" + String(v) + "'>" + String(v) + "</option>";
      $(a).appendTo("#name");
    }
  });
  $("#start").attr("min", data.minDate);
  $("#start").attr("max", data.maxDate);
  nameChecker();
}

}

function blinkText() {
  blink = true;
  $(".icon-blink").each(function () {
    var elem = $(this);
    setInterval(function () {
      if (elem.css("visibility") === "hidden") {
        elem.css("visibility", "visible");
      } else {
        elem.css("visibility", "hidden");
      }
    }, 700);
  });
}

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

  return [year, month, day].join("-");
}

function checkUpdate() {
  if (online) {
    $.getJSON(`${baseURL}version`, function (data) {
      if (data.version !== $("#version").text()) {
        $("#updateBanner").fadeIn();
      }
  });
  }
}

if (online) {
  $("#offlineBanner").hide();
}

function updateOnlineStatus() {
    online = navigator.onLine ? true : false;
    if (!online) {
      $("#updateBanner").fadeOut();
      $("#offlineBanner").fadeIn();
    } else {
      $("#offlineBanner").fadeOut();
      checkUpdate();
    }
}

checkUpdate();
$("#updateBanner").hide();

setInterval(function(){ checkUpdate(); }, 300000)

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);