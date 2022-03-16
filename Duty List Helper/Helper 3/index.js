var data = require('./names.json');
const fs = require('fs')

console.log(data)

var outputData = {"oddWeek": [], "evenWeek": []}

for (names in data) {
    var temp1 = {"nb1": 0, "nb2": 0, "nb3": 0, "stall": 0, "pond": 0, "central": 0, "lift": 0, "on_break": 0, "alert": {"tooMuchBreak": false, "tooLittleBreak": false, "tooMuchDuty": {"duty": null, "status": false}}};
    var temp2 = {"nb1": 0, "nb2": 0, "nb3": 0, "stall": 0, "pond": 0, "central": 0, "lift": 0, "on_break": 0, "alert": {"tooMuchBreak": false, "tooLittleBreak": false, "tooMuchDuty": {"duty": null, "status": false}}};
    for (const [key, value] of Object.entries(data[names])) {
        if (key !== "morning_duty" && key !== "morning_duty_check") {
            if (parseInt(key) < 6) {
                temp1[value.duty] += 1
            } else {
                temp2[value.duty] += 1
            }
        }
    }
    if (temp1["on_break"] < 2) {
        temp1.alert.tooLittleBreak = true;
    }
    if (temp1["nb1"] > 2) {
        temp1.alert.tooMuchDuty.status = true;
        temp1.alert.tooMuchDuty.duty = "nb1";
    }
    if (temp1["nb2"] > 2) {
        temp1.alert.tooMuchDuty.status = true;
        temp1.alert.tooMuchDuty.duty = "nb2";
    }
    if (temp1["nb3"] > 2) {
        temp1.alert.tooMuchDuty.status = true;
        temp1.alert.tooMuchDuty.duty = "nb3";
    }
    if (temp1["stall"] > 2) {
        temp1.alert.tooMuchDuty.status = true;
        temp1.alert.tooMuchDuty.duty = "stall";
    }
    if (temp1["pond"] > 2) {
        temp1.alert.tooMuchDuty.status = true;
        temp1.alert.tooMuchDuty.duty = "pond";
    }
    if (temp1["central"] > 2) {
        temp1.alert.tooMuchDuty.status = true;
        temp1.alert.tooMuchDuty.duty = "central";
    }
    if (temp1["lift"] > 2) {
        temp1.alert.tooMuchDuty.status = true;
        temp1.alert.tooMuchDuty.duty = "lift";
    }
    if (temp1["on_break"] > 3) {
        temp1.alert.tooMuchBreak = true;
    }

    if (temp2["on_break"] < 2) {
        temp2.alert.tooLittleBreak = true;
    }
    if (temp2["nb1"] > 2) {
        temp2.alert.tooMuchDuty.status = true;
        temp2.alert.tooMuchDuty.duty = "nb1";
    }
    if (temp2["nb2"] > 2) {
        temp2.alert.tooMuchDuty.status = true;
        temp2.alert.tooMuchDuty.duty = "nb2";
    }
    if (temp2["nb3"] > 2) {
        temp2.alert.tooMuchDuty.status = true;
        temp2.alert.tooMuchDuty.duty = "nb3";
    }
    if (temp2["stall"] > 2) {
        temp2.alert.tooMuchDuty.status = true;
        temp2.alert.tooMuchDuty.duty = "stall";
    }
    if (temp2["pond"] > 2) {
        temp2.alert.tooMuchDuty.status = true;
        temp2.alert.tooMuchDuty.duty = "pond";
    }
    if (temp2["central"] > 2) {
        temp2.alert.tooMuchDuty.status = true;
        temp2.alert.tooMuchDuty.duty = "central";
    }
    if (temp2["lift"] > 2) {
        temp2.alert.tooMuchDuty.status = true;
        temp2.alert.tooMuchDuty.duty = "lift";
    }
    if (temp2["on_break"] > 3) {
        temp2.alert.tooMuchBreak = true;
    }

    outputData.oddWeek.push({[names]: temp1});
    outputData.evenWeek.push({[names]: temp2});
}

fs.writeFile('./output.json', JSON.stringify(outputData), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
