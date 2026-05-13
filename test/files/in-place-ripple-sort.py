# Python with Elan 2.0.0-alpha4

def main() -> None:
  li = [7, 1, 0, 4, 8, 3, 6] # variable definition
  print(li)
  inPlaceRippleSort(li) # call procedure
  print(li)

def inPlaceRippleSort(li: list[int]) -> None: # procedure
  hasChanged = True # variable definition
  lastComp = li.length() - 2 # variable definition
  while hasChanged == True:
    hasChanged = False # re-assign variable
    for i in range(0, lastComp + 1):
      if li[i] > li[i + 1]:
        temp = li[i] # variable definition
        li[i] = li[i + 1] # re-assign variable
        li[i + 1] = temp # re-assign variable
        hasChanged = True # re-assign variable
    lastComp = lastComp - 1 # re-assign variable

main()
