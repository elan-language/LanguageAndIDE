# Python with Elan 2.0.0-alpha1

def main(): None:
  li = [7, 1, 0, 4, 8, 3, 6] # variable definition 
  print(li) # call procedure
  inPlaceRippleSort(li) # call procedure
  print(li) # call procedure

def inPlaceRippleSort(li: list[int]) -> None: # procedure
  hasChanged = True # variable definition 
  lastComp = li.length() - 2 # variable definition 
  while hasChanged == True:
    hasChanged = False # set
    for i in range(0, lastComp + 1):
      if li[i] > li[i + 1]:
        temp = li[i] # variable definition 
        li[i] = li[i + 1] # set
        li[i + 1] = temp # set
        hasChanged = True # set
    lastComp = lastComp - 1 # set
