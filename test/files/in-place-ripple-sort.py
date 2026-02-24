# Python with Elan 2.0.0-alpha

def main(): None:
  li = [7, 1, 0, 4, 8, 3, 6] # variable
  print(li) # call
  inPlaceRippleSort(li) # call
  print(li) # call

def inPlaceRippleSort(li: list[int]) -> None: # procedure
  hasChanged = true # variable
  lastComp = li.length() - 2 # variable
  while hasChanged == true:
    hasChanged = false # set
    for i in sequence(0, lastComp, 1):
      if li[i] > li[i + 1]:
        temp = li[i] # variable
        li.put(i, li[i + 1]) # call
        li.put(i + 1, temp) # call
        hasChanged = true # set
    lastComp = lastComp - 1 # set
