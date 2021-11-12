var baseURL = ["", "http://localhost:3000/"][0]

$("#start").val(formatDate(new Date()));

function update() {
$.getJSON(`${baseURL}api/overview/${$("#start").val()}`, function (data) {
    engine(data);
});
}


function showPersonalised() {
  if ($("#name") !== "Overview") {
  $.getJSON(`${baseURL}api/personalised/${$("#name").val()}/${$("#start").val()}`, function (data) {
    engine(data);
});
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

$.getJSON(`${baseURL}api/version`, function (data) {
    $("#versionurl").attr("href", data.releaseNotesURL);
    $("#version").text(data.version);
    $("#updated").text(data.updated);
});

$.getJSON(`${baseURL}api/metadata`, function (data) {
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
});

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