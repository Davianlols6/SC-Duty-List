import csv
import random
import json

#names = ['Ally','Amelia','Anaqi','Carissa','Chang Yi','Charlene','Cheslyn','Chloe Koh','Chloe','Clement','Cristian','Danica','Daryll','Denise','Firdaus','Gerald','Gerris','Gladys','Hong Wei','Inshirah','Jerome','Jerric','Jervis','Jin Wei','Jing Ting','Kah Sin','Kristine','Li Xuan','Lincoln','Megan','Qian Wen','Rachel','Ramesh','Rosanne','Roshini','Sabith','Shannen','Song','Tiffany (Sec 2)','Tiffany (Sec 3)','Vera','Xin Hui','Xin Rong','Yu Herng','Yun Ji','Zachary']
names = ["Chloe","Li Xuan","Daryll","Firdaus","Vera","Hong Wei","Kristine","Clement","Sabith","Jin Wei","Megan","Yun Ji","Tiffany (Sec 2)","Rachel","Qian Wen","Gerald","Cheslyn","Denise","Jerome","Shannen","Cristian","Chloe Koh","Jerric","Ramesh","Xin Hui","Song","Gladys","Yu Herng","Jervis","Danica","Carissa","Anaqi","Jing Ting","Gerris","Lincoln","Charlene","Tiffany (Sec 3)","Kah Sin","Zachary","Roshini","Inshirah","Ally","Chang Yi","Amelia","Rosanne","Xin Rong"]
recess = []

num_recess_converter = {
    1: "first_recess",
    2: "second_recess",
    3: "third_recess",
    4: "fourth_recess"
}

presets = {}

temp_dict = {}


recess1 = csv.reader(open('/website/Data/recess.csv', 'r'))
recess = []
for row in recess1:
        recess.append(row)

counter = 1
while counter < 11:
    for items in recess:
        if items[0] in names:
            try: 
                presets[counter]
            except:
                presets[counter] = dict()

            try: 
                presets[counter][items[counter]]
            except:
                presets[counter][items[counter]] = list()

            presets[counter][items[counter]].append(items[0])
    
    counter += 1


# print(presets)

# NB1, Pond, NB2, NB3, NB1, Lift, Central, Pond, Lift, Central, Stall, NB3, NB1, Stall

presets1 = {"1":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"2":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"3":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"4":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"5":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"6":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"7":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"8":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"9":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}},"10":{"exco_morning_duty":{},"constant_morning_duty":"morning_duty","recess_duty":{"first_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"second_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"third_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]},"fourth_recess":{"nb1":[],"nb2":[],"nb3":[],"stall":[],"pond":[],"lift":[],"central":[],"on_break":[]}}}}

counter1 = 1
while counter1 < 11:
    counter2 = 1
    while counter2 < 5:
        try:
            people = presets[counter1][str(counter2)]
            duty = presets1[str(counter1)]['recess_duty'][num_recess_converter[counter2]]

            if people != []:
                ran1 = random.randint(0, len(people)-1)
                duty['nb1'].append(people[ran1])
                people.remove(people[ran1])
            
            if people != []:
                ran2 = random.randint(0, len(people)-1)
                duty['pond'].append(people[ran2])
                people.remove(people[ran2])

            if people != []:
                ran3 = random.randint(0, len(people)-1)
                duty['nb2'].append(people[ran3])
                people.remove(people[ran3])

            if people != []:
                ran4 = random.randint(0, len(people)-1)
                duty['nb3'].append(people[ran4])
                people.remove(people[ran4])

            if people != []:
                ran5 = random.randint(0, len(people)-1)
                duty['nb1'].append(people[ran5])
                people.remove(people[ran5])

            if people != []:
                ran6 = random.randint(0, len(people)-1)
                duty['lift'].append(people[ran6])
                people.remove(people[ran6])

            if people != []:
                ran7 = random.randint(0, len(people)-1)
                duty['central'].append(people[ran7])
                people.remove(people[ran7])

            if people != []:
                ran8 = random.randint(0, len(people)-1)
                duty['pond'].append(people[ran8])
                people.remove(people[ran8])

            if people != []:
                ran9 = random.randint(0, len(people)-1)
                duty['lift'].append(people[ran9])
                people.remove(people[ran9])

            if people != []:
                ran10 = random.randint(0, len(people)-1)
                duty['central'].append(people[ran10])
                people.remove(people[ran10])

            if people != []:
                ran11 = random.randint(0, len(people)-1)
                duty['stall'].append(people[ran11])
                people.remove(people[ran11])

            if people != []:
                ran12 = random.randint(0, len(people)-1)
                duty['nb3'].append(people[ran12])
                people.remove(people[ran12])

            if people != []:
                ran13 = random.randint(0, len(people)-1)
                duty['nb1'].append(people[ran13])
                people.remove(people[ran13])

            if people != []:
                ran14 = random.randint(0, len(people)-1)
                duty['stall'].append(people[ran14])
                people.remove(people[ran14])

            if people != []:
                for items in people:
                    duty['on_break'].append(items)
            
            with open('output.json', 'w') as e:
                e.write(json.dumps(presets1))
            print(duty)
        except Exception as e:
            print("Error:", e)

            # print(counter2, people)
        counter2 += 1


    
    counter1 += 1

convert = {
    "central": "Central",
    "nb1": "NB1",
    "nb2": "NB2",
    "nb3": "NB3",
    "pond": "Pond",
    "on_break": "",
    "lift": "Lift",
    "stall": "Stall"
}

for name in names:
    a = 1
    while a < 11:
        for recess in presets1[str(a)]["recess_duty"]:
            for spots in presets1[str(a)]["recess_duty"][recess]:
                for namess in presets1[str(a)]["recess_duty"][recess][spots]:
                    if namess == name:
                        try:
                            temp_dict[name]
                        except:
                            temp_dict[name] = list()

                        try:
                            temp_dict[name][0]
                        except:
                            temp_dict[name].append(name)

                        temp_dict[name].append(convert[str(spots)])

                        #temp_dict[name][str(a)]["recess"]=int(num_recess_converter[recess])
        a += 1

temp_list = []
for items in names:
    temp_list.append(temp_dict[items])

with open('output2.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)

    # write multiple rows
    writer.writerows(temp_list