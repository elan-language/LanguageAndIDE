# d4a66278d78b0a976921e3767d4b68fdd50e036a36b7362d72538f8055b82e11 Python with Elan 2.0.0-beta5 valid

def main() -> None:
  li = [7, 1, 0, 4, 8, 3, 6] # variable definition
  print(li)
  inPlaceRippleSort(li)
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
