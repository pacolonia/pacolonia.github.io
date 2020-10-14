#! /usr/local/bin/python3
import math

name = "Nisan"

# if 
if name == "Paco" or name == "Nisan":
    print("Hi " + name + "!")
else:
    print("I don't know you.")

# First 50 prime numbers
numberOfPrimes = 50
ctr = 0
num = 2 # 2 is the first prime number
while ctr < numberOfPrimes:
    isPrime = True
    for n in range(2, (int)(math.sqrt(num)) + 1):
        if num % n == 0:
            isPrime = False
            break
    if isPrime:
        print(str(ctr + 1) + ": " + str(num))
        ctr += 1
    num += 1
    
    


    
