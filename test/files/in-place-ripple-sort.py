# 755fd95d8f4550ec47ce937aa4678c32eb1f44ba88e5f24e5c9153fb26b4642a Python with Elan 2.0.0-beta5 valid

def main() -> None:
  li = [7, 1, 0, 4, 8, 3, 6]
  print(li)
  inPlaceRippleSort(li)
  print(li)
# end main 

def inPlaceRippleSort(li: list[int]) -> None:
  hasChanged = true
  lastComp = li.length() - 2
  while hasChanged == true:
    hasChanged = false
    for i in range(0, lastComp + 1):
      if li[i] > li[i + 1]:
        temp = li[i]
        li[i] = li[i + 1]
        li[i + 1] = temp
        hasChanged = true
      # end if 
    # end for 
    lastComp = lastComp - 1
  # end while 
# end procedure 

main()
