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

function updateThemeClass() {
  if (localStorage.getItem("bs.prefers-color-scheme") === "dark") {
    $(".bg-white").addClass( "bg-black" ).removeClass("bg-white");
    $(".symb").css("fill", "#ffffff");
    $(".dark-class").css("background-color", "#000000");
    $(".list-group-item").css("border", "1px solid rgba(256,256,256,0.4)");
    $("#titleBarHead").css("background-color", "#222222");
    document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#222222');
  } else if (localStorage.getItem("bs.prefers-color-scheme") === "light") {
  $(".bg-black").addClass( "bg-white" ).removeClass("bg-black");
  $(".symb").css("fill", "#000000");
  $(".dark-class").css("background-color", "#ffffff");
  $(".list-group-item").css("border", "1px solid rgba(0,0,0,.125)");
  $("#titleBarHead").css("background-color", "#ffffff");
  document.querySelector('meta[name="theme-color"]').setAttribute('content',  'white');
  }
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
  if ($("#name").val() !== "Overview") {

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
    $("#start").attr("onchange", "update();");
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
    $.getJSON(`Data/data.json`, function (data1) {
      data = data1;
      $("#versionurl").text("");
      $(`<span>View the latest release details </span><a style="color: inherit;" target="_blank" href="${data.releaseNotesURL}">here</a><span></span>`).prependTo("#versionurl");
      $("#version").text(data.version);
      $("#updated").text(data.updated);
      checkUpdate();
    });
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
    let realData;
    let cacheData;

    $.getJSON(`${baseURL}version?type=${type}&uuid=${localStorage.getItem("uuid")}`, function (data) {
      realData = data;
      two();
  });

  function two() {
  $.getJSON(`Data/data.json`, function (data) {
      cacheData = data;
      process();
    });
  }

    function process() {
      if (realData.version !== cacheData.version) {
        $("#updateBanner").fadeIn();
        $("#version").text(`${cacheData.version} (Outdated)`);
      } else {
        $("#checkUpdateButton").text("No updates available");
        $("#checkUpdateButton").css("background-color", "red");
        $("#checkUpdateButton").css("color", "white");
        $("#checkUpdateButton").addClass("disabled");
        setTimeout(
          function() 
          {
            $("#checkUpdateButton").text("Check for updates");
            $("#checkUpdateButton").css("background-color", "");
            $("#checkUpdateButton").css("color", "");
            $("#checkUpdateButton").removeClass("disabled");
          }, 1000);
      }
      var a = new Date();
      $("#lastCheckText").text(a.toString());
    }

  }
}

if (online) {
  $("#offlineBanner").hide();
  if (localStorage.getItem("uuid") === null) {
    $.getJSON(`${baseURL}getuuid`, function (data) {
      localStorage.setItem("uuid", data.uuid);
      });
  }
}

if (localStorage.getItem("bs.prefers-color-scheme") === null) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    localStorage.setItem("bs.prefers-color-scheme", "dark");
  } else {
    localStorage.setItem("bs.prefers-color-scheme", "light");
  }
}

if (localStorage.getItem("themeAuto") === null) {
  localStorage.setItem("themeAuto", "true");
} else {
  if (localStorage.getItem("themeAuto") === "true") {
    $("#themeDevice").addClass("active");
  } else if (localStorage.getItem("themeAuto") === "light") {
    $("#themeLight").addClass("active");
  } else if (localStorage.getItem("themeAuto") === "dark") {
    $("#themeDark").addClass("active");
  }
}

function changeThemeSettings(data) {
  $("#themeDevice").removeClass("active");
  $("#themeLight").removeClass("active");
  $("#themeDark").removeClass("active");

  var sd = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

  if (data === "auto") {
    localStorage.setItem("themeAuto", "true");
    if (sd === "dark") {
      darkmode.inDarkMode = true;
    } else {
      darkmode.inDarkMode = false;
    }
    localStorage.setItem("bs.prefers-color-scheme", sd);
    updateThemeClass();
    $("#themeDevice").addClass("active");
  } else if (data === "light") {
    localStorage.setItem("themeAuto", "light");
    darkmode.inDarkMode = false;
    localStorage.setItem("bs.prefers-color-scheme", "light");
    updateThemeClass();
    $("#themeLight").addClass("active");
  } else if (data === "dark") {
    localStorage.setItem("themeAuto", "dark");
    darkmode.inDarkMode = true;
    localStorage.setItem("bs.prefers-color-scheme", "dark");
    updateThemeClass();
    $("#themeDark").addClass("active");
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newColorScheme = e.matches ? "dark" : "light";
  if (localStorage.getItem("themeAuto") === "true") {
    if (newColorScheme === "dark") {
      darkmode.inDarkMode = true;
    } else {
      darkmode.inDarkMode = false;
    }
    localStorage.setItem("bs.prefers-color-scheme", newColorScheme);
    updateThemeClass();
  }

});

function updateOnlineStatus() {
    online = navigator.onLine ? true : false;
    if (!online) {
      $("#updateBanner").fadeOut();
      $("#offlineBanner").fadeIn();
      $("#checkUpdateButton").addClass("disabled");
      $("#forceUpdateButton").addClass("disabled");
    } else {
      $("#offlineBanner").fadeOut();
      $("#checkUpdateButton").removeClass("disabled");
      $("#forceUpdateButton").removeClass("disabled");
      checkUpdate();
    }
}

$("#updateBanner").hide();

setInterval(function(){ checkUpdate(); }, 300000)

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);