import sys
def greet(var1):
    #var1 +=2
    #print('Hello World!: ', var1)
    return ["item1","item2","item3","item5",var1]
    #sys.stdout.flush(var1)
   
retVar = greet(sys.argv[1])
print(retVar)
