#! /usr/local/bin/python3

# define a function()
def sayHello():
    print("Hello!")

sayHello()

# function with parameter
def saySomething(st):
    print(str(st) + "!")

saySomething("Paco")

def multiply(a, b):
    return a * b

result = multiply(3, 5)
print("3 x 5 = " + str(result))

# function for max common divider
def MCD(a, b):
    if a == 0:
        return b
    if b == 0:
        return a
    if a > b:
        rem = a % b
        minim = b
    else:
        rem = b % a
        minim = a
    while rem > 0:
        rem2 = minim % rem
        minim = rem
        rem = rem2
    return minim

print(MCD(2366, 273))
print(MCD(273, 2366))
print(MCD(48, 60))
print(MCD(60, 48))
print(MCD(15,10))
print(MCD(2512, 1232))