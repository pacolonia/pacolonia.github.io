#! /usr/local/bin/python3

# for loop with start, end value
for i in range(5, 10):
    print(i)

print("end")

# for loop with array
favouriteFood = ["pizza", "chocolate", "ice cream"]
for food in favouriteFood:
    print("I like " + food + ".")

# while
x = 0
while x <= 10:
    print(x)
    # x = x + 1
    x += 1

# Dictionary
family = {}
family["Dad"] = 66
family["Mom"] = 65
family["Sis"] = 35
family["Bro"] = 37
for member in family:
    print(member + " is " + str(family[member]) + " years old.")
