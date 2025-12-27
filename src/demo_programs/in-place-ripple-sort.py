# bd79bef8a225a72396f43b191b7a1fc95cbfef9b444e4701c007d34528b4aaac Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  li = [3, 6, 1, 0, 99, 4, 67] # [variable definition]
  inPlaceRippleSort(li) # [call procedure]}
  print li


def inPlaceRippleSort(li: List<of Int>) -> None:  # [procedure]
  hasChanged = true # [variable definition]
  lastComp = li.length() - 2 # [variable definition]
  while hasChanged is true
    hasChanged = false # [assign variable]
    for i in range(0, lastComp, 1):  # [for loop]
      if li[i] > li[i + 1] then
        temp = li[i] # [variable definition]
        li.put(i, li[i + 1]) # [call procedure]}
        li.put(i + 1, temp) # [call procedure]}
        hasChanged = true # [assign variable]
    lastComp = lastComp - 1 # [assign variable]


