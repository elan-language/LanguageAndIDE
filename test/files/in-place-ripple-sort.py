# Python with Elan 2.0.0-alpha1

def main() -> None:
  li = [7, 1, 0, 4, 8, 3, 6] # variable definition
  print(li)
  inPlaceRippleSort(li) # call procedure
  print(li)

def inPlaceRippleSort(li: list[int]) -> None: # procedure
  hasChanged = True # variable definition
  lastComp = len(li) - 2 # variable definition
  while hasChanged == True:
    hasChanged = False # change variable
    for i in range(0, lastComp + 1):
      if li[i] > li[i + 1]:
        temp = li[i] # variable definition
        li[i] = li[i + 1] # change variable
        li[i + 1] = temp # change variable
        hasChanged = True # change variable
    lastComp = lastComp - 1 # change variable

main()
