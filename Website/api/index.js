const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const url = require('url');

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/o/:day/:class", (req, res) => {
  const { data1 } = require("./odata.json");
  var jsonPath1 = path.join(__dirname, "..", "logs/olog.json");
  const queryObject = url.parse(req.url,true).query;
  const event = new Date();

  fs.readFile(jsonPath1, 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.data.push({"time": event.toISOString(), "day": req.params.day, "class": req.params.class, "userAgent": req.headers['user-agent'], "uuid": queryObject.uuid}); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile(jsonPath1, json, 'utf8', err => {
      if (err) {
       console.error('Failed to write starter kits file: ', err);
      } else console.log('Fetched 1 file: ');
     }); // write it back 
  }});
  res.send(
    JSON.stringify({
      data: data1[req.params.day][req.params.class]
    })
  );
});

app.get("/ologdata", (req, res) => {
  const request = require('request');

let url = "https://www.davianeng.com/sc_duty_list/logs/olog.json";

let options = {json: true};

// Goal of this code is to get 1) Total number of unique visitors all time (excluding null) 2) Total number of unique visitors per day (excluding null) 3) Total number of requests made per day

let tempObject = {};

let finalObject = {};

request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        
        let tempArray1 = [];
        let tempObject2 = {};
        let tempObject3 = {};
        let minObject1 = {};
        let minObject2 = {};
       body.data.forEach( (v, i) => {
           if (v.uuid !== 'null') {
            tempArray1.push(v.uuid);
            let date = `${new Date(v.time).getDate()}-${new Date(v.time).getUTCMonth()+1}-${new Date(v.time).getFullYear()}`;
            let minDate = `${new Date(v.time).getHours()}:00 ${new Date(v.time).getDate()}-${new Date(v.time).getUTCMonth()+1}-${new Date(v.time).getFullYear()}`;
            if (tempObject2[date] === undefined) {
                tempObject2[date] = [];
            }
            if (minObject1[minDate] === undefined) {
                minObject1[minDate] = [];
            }

            tempObject2[date].push(v.uuid);
            minObject1[minDate].push(v.uuid);
            
           }

           let date = `${new Date(v.time).getDate()}-${new Date(v.time).getUTCMonth()+1}-${new Date(v.time).getFullYear()}`;
            if (tempObject3[date] === undefined) {
                tempObject3[date] = 0;
            }

            tempObject3[date] += 1;

            let minDate = `${new Date(v.time).getHours()}:00 ${new Date(v.time).getDate()}-${new Date(v.time).getUTCMonth()+1}-${new Date(v.time).getFullYear()}`;
            if (minObject2[minDate] === undefined) {
                minObject2[minDate] = 0;
            }

            minObject2[minDate] += 1;

       })

       Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
      }

      Date.prototype.subHours = function(h) {
        this.setTime(this.getTime() - (h*60*60*1000));
        return this;
      }

       finalObject['Unique Visitors All Time'] = new Set(tempArray1).size;

       for (i in tempObject2) {
           if (finalObject['Unique Visitors Per Day'] === undefined) {
            finalObject['Unique Visitors Per Day'] = {};
           }

           finalObject['Unique Visitors Per Day'][String(i)] = parseInt(new Set(tempObject2[i]).size);
       }

       let uniqueVisitorObj = {};
       for (i in minObject1) {
        if (finalObject['Unique Visitors Per Hour'] === undefined) {
         finalObject['Unique Visitors Per Hour'] = {};
        }

     uniqueVisitorObj[String(i)] = parseInt(new Set(minObject1[i]).size);
    }

    let tempArray5 = [];
       for (i in uniqueVisitorObj) {
           tempArray5.push(new Date(`${i.split(' ')[1].split('-')[2]}-${i.split(' ')[1].split('-')[1]}-${i.split(' ')[1].split('-')[0]} ${i.split(' ')[0]}:00`))
       }

       let counter4 = tempArray5[0].subHours(1);
       while (String(counter4) !== String(tempArray5[tempArray5.length-1])) {
        let time = new Date(counter4).addHours(1);
           let minDate = `${new Date(time).getHours()}:00 ${new Date(time).getDate()}-${new Date(time).getUTCMonth()+1}-${new Date(time).getFullYear()}`;
           if (uniqueVisitorObj[minDate] === undefined) {
            finalObject['Unique Visitors Per Hour'][minDate] = 0;
           } else {
            finalObject['Unique Visitors Per Hour'][minDate] = uniqueVisitorObj[minDate];
           }
           counter4 = time;
       }

       finalObject['Total Requests Per Day'] = tempObject3;

       let counter1 = 0;
       let counter2 = 0;
       for (i in finalObject['Total Requests Per Day']) {
        counter1 += finalObject['Total Requests Per Day'][i];
       }
       
       finalObject['Total Requests All Time'] = counter1;
       finalObject['Total Requests Per Hour'] = {};


      let tempArray2 = [];
       for (i in minObject2) {
           tempArray2.push(new Date(`${i.split(' ')[1].split('-')[2]}-${i.split(' ')[1].split('-')[1]}-${i.split(' ')[1].split('-')[0]} ${i.split(' ')[0]}:00`))
       }

       let counter3 = tempArray2[0].subHours(1);
       while (String(counter3) !== String(tempArray2[tempArray2.length-1])) {
        let time = new Date(counter3).addHours(1);
           let minDate = `${new Date(time).getHours()}:00 ${new Date(time).getDate()}-${new Date(time).getUTCMonth()+1}-${new Date(time).getFullYear()}`;
           if (minObject2[minDate] === undefined) {
            finalObject['Total Requests Per Hour'][minDate] = 0;
           } else {
            finalObject['Total Requests Per Hour'][minDate] = minObject2[minDate];
           }
           counter3 = time;
       }
      send();
    };
});

function send() {
  res.send(JSON.stringify(finalObject));
}

});

app.get("/version", (req, res) => {
  var jsonPath = path.join(__dirname, "..", "Data", "data.json");
  let rawdata = fs.readFileSync(jsonPath);
  let data = JSON.parse(rawdata);
  const queryObject = url.parse(req.url,true).query;
  const event = new Date();

  var jsonPath1 = path.join(__dirname, "..", "logs/log.json");

fs.readFile(jsonPath1, 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
  obj = JSON.parse(data); //now it an object
  obj.data.push({"time": event.toISOString(), "userAgent": req.headers['user-agent'], "type": queryObject.type, "uuid": queryObject.uuid}); //add some data
  json = JSON.stringify(obj); //convert it back to json
  fs.writeFile(jsonPath1, json, 'utf8', err => {
    if (err) {
     console.error('Failed to write starter kits file: ', err);
    } else console.log('Fetched 1 file: ');
   }); // write it back 
}});

  res.send(
    JSON.stringify({
      version: data.version,
      releaseNotesURL: data.releaseNotesURL,
      updated: data.updated,
    })
  );
});

app.get("/metadata", (req, res) => {
  var jsonPath = path.join(__dirname, "..", "Data", "names.json");
  let rawdata = fs.readFileSync(jsonPath);
  let data = JSON.parse(rawdata);

  let draft = [];
  for (let key in data) {
    draft.push(key);
  }

  var jsonPath1 = path.join(__dirname, "..", "Data", "data.json");
  let rawdata1 = fs.readFileSync(jsonPath1);
  let data1 = JSON.parse(rawdata1);

  res.send(
    JSON.stringify({
      names: draft,
      minDate: Object.keys(data1["dates"])[0],
      maxDate: Object.keys(data1["dates"])[
        Object.keys(data1["dates"]).length - 1
      ],
    })
  );
});

app.get("/overview/:date", (req, res) => {
  var jsonPath = path.join(__dirname, "..", "Data", "data.json");
  let rawdata = fs.readFileSync(jsonPath);
  let jsonData = JSON.parse(rawdata);

  let d = String(req.params.date);

  var dd = new Date(d);
  var firstDate = new Date(Object.keys(jsonData["dates"])[0]);
  var lastDate = new Date(Object.keys(jsonData["dates"])[Object.keys(jsonData["dates"]).length - 1]);

  let draft = {"type": "overview", "data": { "dateText": updateDate(d), "blocks": []}};

  if (dd.getDay() === 6 || dd.getDay() === 0 || jsonData["dates"][String(d)] === 11 || dd < firstDate || dd > lastDate) {
    draft.data.blocks.push(template("nodata"));
    res.send(JSON.stringify(draft));
    return;
  }

  draft.data.blocks.push(template("recessBanner"));

  var recessDuty = jsonData["presets"][jsonData["dates"][String(d)]]["recess_duty"];
  var morningDutyData = jsonData["constants"][jsonData["presets"][jsonData["dates"][String(d)]]["constant_morning_duty"]];
  var flagDuty = overviewFlagDuty(d);

  var recessBadge = {
    1: {"colour": "bg-primary", "text": "First Recess (9:10 - 9:45)"},
    2: {"colour": "bg-secondary", "text": "Second Recess (9:45 - 10:20)"},
    3: {"colour": "bg-success", "text": "Third Recess (10:20 - 10:55)"},
    4: {"colour": "bg-info", "text": "Fourth Recess (10:55 - 11:30)"},
    5: {"colour": "bg-danger", "text": "Fifth Recess (11:30 - 12:10)"}
  };

  var dutyTrans = {
    nb1: "NB1",
    nb2: "NB2",
    nb3: "NB3",
    stall: "Stall",
    pond: "Pond",
    field: "Field",
    parade_square: "Parade Square",
    lift: "Lift",
    central: "Central",
    patrol: "Patrol",
    on_break: "On Break",
    main_gate: "Main Gate",
    late_coming: "Late Coming",
    canteen: "Canteen",
    stairs_to_hall: "Stairs To Hall",
    side_gate: "Side Gate",
    morning_patrol: "Morning Patrol",
    hall: "Hall",
  };

  let counter1 = 1;

  let ongingRecess = 0;

  if (checkTimeValid("09:10:00", "12:10:00") && today(String(d))) {
    if (checkTimeValid("09:10:00", "09:45:00")) {
        ongingRecess = 1;
    } else if (checkTimeValid("09:45:00", "10:20:00")) {
        ongingRecess = 2;
    } else if (checkTimeValid("10:20:00", "10:55:00")) {
        ongingRecess = 3;
    } else if (checkTimeValid("10:55:00", "11:30:00")) {
        ongingRecess = 4;
    } else if (checkTimeValid("11:30:00", "12:10:00")) {
      ongingRecess = 5;
  }
}

  for (const recess in recessDuty){
    let active = false;

    if (ongingRecess !== 0 && counter1 === ongingRecess) {
        active = true;
    }

    let draft1 = {"type": "recessBlock", "active": active, "blocks": []};

    draft1.blocks.push({"type": "recessTitle", "colour": recessBadge[counter1].colour, "text": recessBadge[counter1].text});
    for (const items in recessDuty[recess]) {
        draft1.blocks.push({"type": "dutySpots", "title": dutyTrans[items], "text": listToString(recessDuty[recess][items])});
    }
    counter1 += 1;

    draft.data.blocks.push(draft1);
}

let draft2 = {"type": "morningBlock", "blocks": []};

draft2.blocks.push({"type": "flagRaisingDuty", "singaporeFlag": flagDuty["singapore_flag"], "schoolFlag": flagDuty["school_flag"]});

var morningDutyTrans = {
    "main_gate": "Main Gate",
    "late_coming": "Late Coming",
    "canteen": "Canteen",
    "stairs_to_hall": "Stairs To Hall",
    "side_gate": "Side Gate",
    "lift": "Lift",
    "morning_patrol": "Morning Patrol",
    "hall": "Hall"
};

for (const duty in morningDutyData){
    draft2.blocks.push({"type": "dutySpots", "title": morningDutyTrans[duty], "text": listToString(morningDutyData[duty])});
}

function prepend(value, array) {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
}

if (today(String(d)) && checkTimeValid("07:00:00", "08:30:00")) {
    draft.data.blocks = prepend(draft2, draft.data.blocks);
    draft.data.blocks = prepend({"type": "heading", "text": "Morning Duty"}, draft.data.blocks);
} else {
    draft.data.blocks.push({"type": "heading", "text": "Morning Duty"});
    draft.data.blocks.push(draft2);
}

res.send(JSON.stringify(draft));

});

app.get("/personalised/:name/:date", (req, res) => {
    var jsonPath = path.join(__dirname, "..", "Data", "data.json");
    let rawdata = fs.readFileSync(jsonPath);
    let jsonData = JSON.parse(rawdata);

    var jsonPath1 = path.join(__dirname, "..", "Data", "names.json");
    let rawdata1 = fs.readFileSync(jsonPath1);
    let nameData = JSON.parse(rawdata1);
  
    let day = String(req.params.date);
    let name = String(req.params.name);

    let draft = { "type": "personalised", "data": { "dateText": name, "blocks": [ ] } };

    let week;

    function daysOfWeek(day) {
        for (const v in jsonData.weeks) {
            
            value = jsonData.weeks[v];
            for (var items in jsonData.weeks[v]) {
                if (String(day) === String(jsonData.weeks[v][items])) {
                    week = v;
                }
            }
        }
      }

    daysOfWeek(day);

    var recessBadge = {
        1: {"colour": "bg-primary", "text": "First Recess (9:10 - 9:45)"},
        2: {"colour": "bg-secondary", "text": "Second Recess (9:45 - 10:20)"},
        3: {"colour": "bg-success", "text": "Third Recess (10:20 - 10:55)"},
        4: {"colour": "bg-info", "text": "Fourth Recess (10:55 - 11:30)"},
        5: {"colour": "bg-danger", "text": "Fifth Recess (11:30 - 12:10)"}
    };
    
    var dutyTrans = {
        nb1: "NB1",
        nb2: "NB2",
        nb3: "NB3",
        stall: "Stall",
        pond: "Pond",
        field: "Field",
        parade_square: "Parade Square",
        lift: "Lift",
        central: "Central",
        patrol: "Patrol",
        on_break: "On Break",
        main_gate: "Main Gate",
        late_coming: "Late Coming",
        canteen: "Canteen",
        stairs_to_hall: "Stairs To Hall",
        side_gate: "Side Gate",
        morning_patrol: "Morning Patrol",
        hall: "Hall",
    };

    var counter = 0;

    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    
    var flagData = overviewFlagDuty(day);
    for (const i in jsonData.weeks[week]) {
        let draft1;
        let v = jsonData.weeks[week][i];

        if (today(v)) {
            draft1 = {"type": "personalisedBlock", "today": true, "blocks": []};
        } else {
            draft1 = {"type": "personalisedBlock", "today": false, "blocks": []};
        }

        if (counter < 5) {
          var dd = new Date(v);
          var firstDate = new Date(Object.keys(jsonData["dates"])[0]);
          var lastDate = new Date(Object.keys(jsonData["dates"])[Object.keys(jsonData["dates"]).length - 1]);            
        
        if (flagData !== null) {
            if (name === flagData.singapore_flag) {
            draft1.blocks.push({"type": "personalisedFlagDuty", "text": "Singapore Flag"});
        } else if (name === flagData.school_flag) {
            draft1.blocks.push({"type": "personalisedFlagDuty", "text": "School Flag"});
        }
      }
      var b;
      if (dd.getDay() === 6 || dd.getDay() === 0 || jsonData.dates[v] === 11 || dd < firstDate || dd > lastDate) {
        b = new Date(v);
        draft1.blocks.push({"type": "personalisedBlockTitle", "text": days[b.getDay()] + ", " + String(b.getDate()) + " " + months[b.getMonth()]});
        draft1.blocks.push({"type": "personalisedBlockText", "text": "No data is available for this day"});
      } else {
        b = new Date(v);
        draft1.blocks.push({"type": "personalisedBlockTitle", "text": days[b.getDay()] + ", " + String(b.getDate()) + " " + months[b.getMonth()]});
        draft1.blocks.push({"type": "personalisedRecessDuty", "colour": recessBadge[nameData[name][String(jsonData["dates"][v])]["recess"]].colour, "title": recessBadge[nameData[name][String(jsonData["dates"][v])]["recess"]].text, "text": dutyTrans[nameData[name][String(jsonData["dates"][v])]["duty"]]});
        //console.log(dutyTrans[nameData[name]["morning_duty"]["duty"]]);
        if (nameData[name]["morning_duty_check"]) {
            draft1.blocks.push({"type": "personalisedMorningDuty", "text": dutyTrans[nameData[name]["morning_duty"]["duty"]]});
        }
    }

      draft.data.blocks.push(draft1);  
        }  
           
        counter += 1; 
        }
    
    res.send(JSON.stringify(draft));
});

app.get("/getuuid", (req, res) => {
  res.send(JSON.stringify({"uuid": uuidv4()}));
});

function checkTimeValid(start, end) {
    var startTime = String(start);
    var endTime = String(end);

    let currentDate = new Date();

    let startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);

    let endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);

    var valid = startDate < currentDate && endDate > currentDate;
    return valid;
}

function today(date) {
    var inputDate = new Date(date);
    var todaysDate = new Date();
    if (inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  }

function listToString(list) {
    if (list === "" || list.length === 0) {
      return "-";
    } else {
      return list.join(", ");
    }
  }

function overviewFlagDuty(date) {
    var jsonPath = path.join(__dirname, "..", "Data", "flag.json");
    let rawdata = fs.readFileSync(jsonPath);
    let jsonData = JSON.parse(rawdata);

    return jsonData[date];
}

function template(item) {
    if (item === "nodata") {
        return {"type": "heading", "text": "No data is available for this day"};
    } else if (item === "recessBanner") {
        return {"type": "heading", "text": "Recess Duty"};
    }
}

function updateDate(date) {
  var dtt = new Date(date);
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return "Duty list for " + days[dtt.getDay()] + ", " + String(dtt.getDate()) + " " + months[dtt.getMonth()] + " " + String(dtt.getFullYear());
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));