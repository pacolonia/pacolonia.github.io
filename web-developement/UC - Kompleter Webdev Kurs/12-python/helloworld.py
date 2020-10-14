#! /usr/local/bin/python3

# Print in terminal
print('Hello world!')

# Print in HTML
#print('Content-type: text/html')
#print('')
#print('Hello world!')

alter = 36
print(alter)

age = "36"
print(int(age) + 1)

str = "My name is Francisco"
print(str[0])
print(str[11:20])

myList = ["Francisco", "Dennis", "Sissy", "Heidi"]
print(myList)
print(myList[2:4])
myList[0] = "Nisan"
print(myList)

# Tuples
myTuple = (1,2,3,4)
print(myTuple)
print(myTuple[0])
# Cannot change/ overwrite tuples
#myTuple[0] = 5
#print(myTuple)

# Dictionaries
dict = {}
dict["Baba"] = "Yagmur"
dict["Anne"] = "Belgin"
dict[1] = "Nisan"
dict[2] = "Yaprak"
print(dict)
print(dict["Baba"])
print(dict[2])
print(dict.keys())
print(dict.values())