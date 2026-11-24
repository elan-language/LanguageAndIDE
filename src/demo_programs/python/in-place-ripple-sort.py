# 9f94c14ad7bccec934ad88aa467fabfcc65832cbd7c8949c13fa6255eee77bd6 Python with Elan 3.0.0-alpha valid

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
