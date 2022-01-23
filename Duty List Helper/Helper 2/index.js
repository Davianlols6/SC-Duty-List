var fs = require('fs'); 
var {parse} = require('csv');

var temp = {}
var morningDuty = {
    "main_gate": ["Xin Rong", "Song"],
    "late_coming": ["Roshini", "Gladys"],
    "canteen": ["Tiffany (Sec 3)", "Sabith", "Anaqi"],
    "stairs_to_hall": ["Inshirah", "Ally", "Boon Hiok"],
    "side_gate": ["Clement", "Chang Yi"],
    "lift": ["Chloe Koh", "Nethra"],
    "morning_patrol": ["Danica", "Zachary"],
    "side_gate_pcn": ["Jin Wei", "Lincoln", "Rosanne"]
  }

var dutyData=[];
var dutyReady = false;
var recessData=[];
var recessReady = false;

var nameData = {};
var names = [];

fs.createReadStream("./duty.csv")
.pipe(parse({delimiter: ','}))
.on('data', function(csvrow) {
    
    //do something with csvrow
    dutyData.push(csvrow);        
})
.on('end',function() {
  //do something with csvData
  dutyReady = true;
  go();
});

fs.createReadStream("./recess.csv")
.pipe(parse({delimiter: ','}))
.on('data', function(csvrow) {
    
    //do something with csvrow
    recessData.push(csvrow);        
})
.on('end',function() {
  //do something with csvData
  recessReady = true;
  go();
});

const translater = {"1": "first_recess", "2": "second_recess", "3": "third_recess", "4": "fourth_recess", "5": "fifth_recess", "NB1": "nb1", "NB2": "nb2", "NB3": "nb3", "Stall": "stall", "Pond": "pond", "Lift": "lift", "Central": "central"}

function go() {
    if (dutyReady && recessReady) {

for(var i = 1; i < recessData[0].length; i++) {
    var dutySchema = {
        "exco_morning_duty": {},
        "constant_morning_duty": "morning_duty",
        "recess_duty": {
          "first_recess": {
            "nb1": [],
            "nb2": [],
            "nb3": [],
            "stall": [],
            "pond": [],
            "lift": [],
            "central": [],
            "on_break": []
          },
          "second_recess": {
            "nb1": [],
            "nb2": [],
            "nb3": [],
            "stall": [],
            "pond": [],
            "lift": [],
            "central": [],
            "on_break": []
          },
          "third_recess": {
            "nb1": [],
            "nb2": [],
            "nb3": [],
            "stall": [],
            "pond": [],
            "lift": [],
            "central": [],
            "on_break": []
          },
          "fourth_recess": {
            "nb1": [],
            "nb2": [],
            "nb3": [],
            "stall": [],
            "pond": [],
            "lift": [],
            "central": [],
            "on_break": []
          },
          "fifth_recess": {
            "nb1": [],
            "nb2": [],
            "nb3": [],
            "stall": [],
            "pond": [],
            "lift": [],
            "central": [],
            "on_break": []
          }
}}
    //console.log(recessData[0][i])
    for (var a in recessData) {
        var name = recessData[a][0]
        var day = i
        var recess = translater[recessData[a][i]]
        if (!names.includes(name)) {
            names.push(name);
        }
        if (dutyData[a][i] === "") {
            var duty = "on_break"
        } else {
            var duty = translater[dutyData[a][i]]
        }
        dutySchema["recess_duty"][recess][duty].push(name)
        if (nameData[name] === undefined) {
            nameData[name] = {"morning_duty_check": false, "morning_duty": { "duty": "" }, "1": {}, "2": {}, "3": {}, "4": {}, "5": {}, "6": {}, "7": {}, "8": {}, "9": {}, "10": {}}
        }
        for (i2 in morningDuty) {
            if (morningDuty[i2].includes(name)) {
                nameData[name]["morning_duty_check"] = true;
                nameData[name]["morning_duty"]["duty"] = i2;
            }
        }
        nameData[name][day] = {"recess": parseInt(recessData[a][i]), "duty": duty};
    }
    temp[i] = dutySchema;
}    
    var nameDataFinal = {};
    names.sort();
    for (i in names) {
        nameDataFinal[names[i]] = nameData[names[i]];
    }
    fs.writeFile("./dataoutput.json", JSON.stringify(temp), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

    fs.writeFile("./nameoutput.json", JSON.stringify(nameDataFinal), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
    
    
    }
}
