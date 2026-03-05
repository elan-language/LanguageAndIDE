# Python with Elan 2.0.0-alpha

def main(): None:
  fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"] # variable
  done = false # variable
  while not done:
    wanted = inputString("What type of fruit do you want ('x' to exit)? ") # variable
    if wanted.equals("x"):
      done = true # set
    else:
      result = binarySearch(fruit, wanted) # variable
      if result:
        print(f"\nWe can supply a {wanted}") # call
      else:
        print(f"\nSorry, we cannot supply a {wanted}") # call

def binarySearch(li: list[str], item: str) -> bool: # function
  result = false # variable
  if li.length() > 0:
    mid = divAsInt(li.length(), 2) # constant
    value = li[mid] # variable
    if item.equals(value):
      result = true # set
    elif item.isBefore(value):
      result = binarySearch(li.subList(0, mid), item) # set
    else:
      result = binarySearch(li.subList(mid + 1, li.length()), item) # set
  return result

def  test_()-> None:
  li1 = ["lemon", "lime", "orange"] # variable
  assert binarySearch(li1, "lemon") is true 
  assert binarySearch(li1, "lime") is true 
  assert binarySearch(li1, "orange") is true 
  assert binarySearch(li1, "pear") is false 
  li2 = ["lemon", "orange"] # variable
  assert binarySearch(li2, "lemon") is true 
  assert binarySearch(li2, "orange") is true 
  assert binarySearch(li2, "pear") is false 
  li3 = ["lemon"] # variable
  assert binarySearch(li3, "lemon") is true 
  assert binarySearch(li3, "lime") is false 
  li4 = new list[str]() # variable
  assert binarySearch(li4, "pear") is false 
