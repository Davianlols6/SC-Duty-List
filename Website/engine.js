function engine(data) {
    $("#top").empty();
    $("#main").empty();
    $("#top").hide();
    $("#main").hide();
    let ab = {"scroll": false};
    let ao = {"scroll": false};
    if (data.type === "overview") {
        ao = overview(data.data);
    } else if (data.type === "personalised") {
        ab = personalised(data.data);
    }
    $("#main").children().each(function () { 
        $(this).hide();
    });

    updateThemeClass();

    $("#main").show();
    $("#top").fadeIn("slow");

    let eT = 0;
    $("#main").children().each(function () { 
        $(this).delay(eT).fadeIn("slow");
        eT += 200;
    });

    scrollTo(ab, eT);
    scrollTo(ao, eT);
}

function scrollTo(ab, et) {
    if (ab.scroll) {
        setTimeout(function(){ document.getElementById("day" + String(ab.data)).scrollIntoView(); }, et);
    }
}

function personalisedBlockTitle(data) {
    let draft = `<h4>${data.text}</h4>`;
    return draft;
}

function personalisedFlagDuty(data) {
    let draft = `<p><span class="fw-bold"></span><span class="badge bg-warning mb-1">Flag Duty</span><br><span class="fw-bold">Duty: </span><span id="">${data.text}</span></p>`;
    return draft;
}

function personalisedMorningDuty(data) {
    let draft = `<p><span class="fw-bold"></span><span class="badge bg-warning mb-1">Morning Duty</span><br><span class="fw-bold">Duty: </span><span id="">${data.text}</span></p>`;
    return draft;
}

function personalisedRecessDuty(data) {
    let draft = `<p><span class="fw-bold"></span><span class="badge ${data.colour} mb-1">${data.title}</span><br><span class="fw-bold">Duty: </span><span id="">${data.text}</span></p>`;
    return draft;
}

function personalisedBlockText(data) {
    let draft = `<p>${data.text}</p>`;
    return draft;
}

function personalised(data) {

    let date = `<h4>Hello ${data.dateText}!</h4><p>Here is your duty for the week you selected</p>`;
    $(date).appendTo("#top");

    let counter = 1;
    let today;
    $(data.blocks).each((i, v) => {
        if (v.type === "personalisedBlock") {

            let personalisedBlockTitleStore = [];
            let personalisedFlagDutyStore = [];
            let personalisedMorningDutyStore = [];
            let personalisedRecessDutyStore = [];
            let personalisedBlockTextStore = [];

            $(v.blocks).each((i,a) => {
                if (a.type === "personalisedBlockTitle"){
                    personalisedBlockTitleStore.push(personalisedBlockTitle(a));
                } else if (a.type === "personalisedFlagDuty") {
                    personalisedFlagDutyStore.push(personalisedFlagDuty(a));
                } else if (a.type === "personalisedMorningDuty") {
                    personalisedMorningDutyStore.push(personalisedMorningDuty(a));
                } else if (a.type === "personalisedRecessDuty") {
                    personalisedRecessDutyStore.push(personalisedRecessDuty(a));
                } else if (a.type === "personalisedBlockText") {
                    personalisedRecessDutyStore.push(personalisedBlockText(a));
                }
            });

            let draft = `<div id="day${String(counter)}" class="container shadow pt-3 pb-3 mb-3 bg-white" style='border-radius: 1rem;'>${personalisedBlockTextStore.join("") + personalisedBlockTitleStore.join("") + personalisedFlagDutyStore.join("") + personalisedMorningDutyStore.join("") + personalisedRecessDutyStore.join("")}</div>`;
            $(draft).appendTo("#main");
           if (v.today) {
               today = counter;
           }

           counter += 1;
        }
    });

    if (today !== null) {
        return {"scroll": true, "data": today};
    } else {
        return {"scroll": false};
    }
    
}

function overview(data) {
    let date = "<h5 class='text-center'>" + data.dateText + "</h5>";
    $(date).appendTo("#top");
    let num = null;
    $(data.blocks).each((i, v) => {
        if (v.type === "heading") {
            heading(v);
        } else if (v.type === "recessBlock") {
            let s = recessBlock(v);
            if (s !== null) {
                num = s;
            }

        } else if (v.type === "morningBlock") {
            morningBlock(v);
        }
    });
    if (num !== null) {
        return {"scroll": true, "data": num};
    } else {
        return {"scroll": false};
    }
}

function recessTitle(data, active) {
    let icon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-record-circle mx-1 icon-blink' style='fill: #ff0000' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' /><path d='M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' /></svg>";
    let draft = "<span class='badge " + data.colour + " mb-3'>" + data.text + "</span>";

    if (active) {
        return icon + draft;
    } else {
        return draft;
    }
    
}

function dutySpots(data) {
    let draft = "<p><span class='fw-bold'>" + data.title + "</span><br><span>" + data.text + "</span></p>";
    return draft;
}

let counter1 = 1;
function recessBlock(data) {
    let recessTitleStore = [];
    let dutySpotsStore = [];

    $(data.blocks).each((i,v) => {
        if (v.type === "recessTitle") {
            if (data.active) {
                recessTitleStore.push(recessTitle(v, true));
            } else {
                recessTitleStore.push(recessTitle(v, false));
            }
        } else if (v.type === "dutySpots") {
            dutySpotsStore.push(dutySpots(v));
        }
    });
    
    let draft = "<div id='day" + String(counter1) + "' class='container shadow pt-3 pb-3 mb-3 bg-white' style='border-radius: 1rem;'>" + recessTitleStore.join("") + dutySpotsStore.join("") + "</div>";
    $(draft).appendTo("#main");
    counter1 += 1;
    if (data.active) {
        blinkText();
        return counter1-1;
    }
    return null;
}

function flagRaisingDuty(data) {
    let draft = "<p><span class='fw-bold'>Flag Raising</span><br><span>Singapore Flag: </span>" + data.singaporeFlag + "<span><br><span>School Flag: </span>" + data.schoolFlag + "<span></span></span></p>";
    return draft;
}

function morningBlock(data) {
    let flagRaisingDutyStore = [];
    let dutySpotsStore = [];

    $(data.blocks).each((i,v) => {
        if (v.type === "flagRaisingDuty") {
            flagRaisingDutyStore.push(flagRaisingDuty(v));
        } else if (v.type === "dutySpots") {
            dutySpotsStore.push(dutySpots(v));
        }
    });

    let draft = "<div class='container shadow pt-3 pb-3 mb-5 bg-white' style='border-radius: 1rem;'>" + flagRaisingDutyStore.join("") + dutySpotsStore.join("") + "</div>";
    $(draft).appendTo("#main");
}

function heading(data) {
    let draft = "<h4 class='container shadow pt-3 pb-3 bg-white rounded-pill text-center'>" + data.text + "</h4>";
    $(draft).appendTo("#main");
}