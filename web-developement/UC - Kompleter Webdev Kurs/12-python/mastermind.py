#!/usr/bin/python

#print('Content-type: text/html')
#print('')

# imports
import cgi
form = cgi.FieldStorage()

###
#call function with variable name=something
#PS C:\Users\xBoscF> & python c:/Users/xBoscF/Documents/Projects/Learn/mastermind.py name=Paco
#output
#Paco
####
#if "name" in form:
#    print(form.getvalue("try"))
#else:
#    print("no name")

if "try" in form:
    try = form.getvalue("try")
else:
    try = ""

print('<h1>Mastermind</h1>')    