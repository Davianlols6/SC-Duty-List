from datetime import datetime, timedelta
import json

startDate = datetime.strptime(input("Input Start Date (YYYY-MM-DD): "), "%Y-%m-%d")
endDate = datetime.strptime(input("Input End Date (YYYY-MM-DD): "), "%Y-%m-%d")
holiday = input("Is it holiday? (true/false): ")
startFromWeek = int(input("Start from which week? (Default is 0): "))

normalDays = ["1", "2", "3", "4", "5", "11", "11", "6", "7", "8", "9", "10"]

if endDate < startDate:
    print("End date cannot be earlier than start date.")
    exit()

if holiday == "true":
    holiday = True
elif holiday == "false":
    holiday = False
else:
    print("Invalid input for holiday")
    exit()

data = {"weeks": {}, "dates": {}}

startDate -= timedelta(days=1)
counter1 = 0
counter2 = 0
counter3 = startFromWeek
while startDate != endDate:
    if counter1 == 12:
        counter1 = 0

    if holiday:
        data["dates"][datetime.strftime(startDate + timedelta(days=1), "%Y-%m-%d")] = 11
        print(holiday)
    else:
        data["dates"][datetime.strftime(startDate + timedelta(days=1), "%Y-%m-%d")] = int(normalDays[counter1])
        counter1 += 1

    if counter2 == 7:
        counter3 += 1
        counter2 = 0

    try:
        bool(data["weeks"][str(counter3)])
    except Exception as e:
        print(e)
        data["weeks"][str(counter3)] = []

    data["weeks"][str(counter3)].append(datetime.strftime(startDate + timedelta(days=1), "%Y-%m-%d"))
    counter2 += 1

    startDate += timedelta(days=1)

with open("./helper1output.json", 'w') as f:
    f.write(json.dumps(data))