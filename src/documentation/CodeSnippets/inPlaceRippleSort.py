# 91d51aec57cdf1967cadecd7f82616e16591f56bbb20c593e29995b8ae7931e2 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  li = example.asList() # [variable definition]
  inPlaceRippleSort(li) # [call procedure]}
  print li


def inPlaceRippleSort(arr: List<of Int>) -> None:  # [procedure]
  changes = true # [variable definition]
  lastComp = arr.length() - 2 # [variable definition]
  while changes
    changes = false # [assign variable]
    for i in range(0, lastComp, 1):  # [for loop]
      if arr[i] > arr[i + 1] then
        temp = arr[i] # [variable definition]
        arr.putAt(i, arr[i + 1]) # [call procedure]}
        arr.putAt(i + 1, temp) # [call procedure]}
        changes = true # [assign variable]
    lastComp = lastComp - 1 # [assign variable]


example = {3, 6, 1, 0, 99, 4, 67}
