# Python with Elan 2.0.0-beta2

def main() -> None:
  li = [7, 1, 0, 4, 8, 3, 6] # variable definition
  print(li)
  inPlaceRippleSort(li) # procedure call
  print(li)
# end main

def inPlaceRippleSort(li: list[int]) -> None: # procedure
  hasChanged = True # variable definition
  lastComp = li.length() - 2 # variable definition
  while hasChanged == True:
    hasChanged = False # assignment
    for i in range(0, lastComp + 1):
      if li[i] > li[i + 1]:
        temp = li[i] # variable definition
        li[i] = li[i + 1] # assignment
        li[i + 1] = temp # assignment
        hasChanged = True # assignment
      # end if
    # end for
    lastComp = lastComp - 1 # assignment
  # end while
# end procedure

main()
