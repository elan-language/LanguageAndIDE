# Python with Elan 2.0.0-alpha

def main(): None:
  fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"] # variable
  done = False # variable
  while not done:
    wanted = input("What type of fruit do you want ('x' to exit)? ") # variable
    if wanted.equals("x"):
      done = True # set
    else:
      result = binarySearch(fruit, wanted) # variable
      if result:
        print(f"\nWe can supply a {wanted}") # call
      else:
        print(f"\nSorry, we cannot supply a {wanted}") # call

def binarySearch(li: list[str], item: str) -> bool: # function
  result = False # variable
  if li.length() > 0:
    mid = divAsInt(li.length(), 2) # constant
    value = li[mid] # variable
    if item.equals(value):
      result = True # set
    elif item.isBefore(value):
      result = binarySearch(li.subList(0, mid), item) # set
    else:
      result = binarySearch(li.subList(mid + 1, li.length()), item) # set
  return result

def test_binarySearch(self) -> None:
  li1 = ["lemon", "lime", "orange"] # variable
  self.assertEqual(binarySearch(li1, "lemon"), True)
  self.assertEqual(binarySearch(li1, "lime"), True)
  self.assertEqual(binarySearch(li1, "orange"), True)
  self.assertEqual(binarySearch(li1, "pear"), False)
  li2 = ["lemon", "orange"] # variable
  self.assertEqual(binarySearch(li2, "lemon"), True)
  self.assertEqual(binarySearch(li2, "orange"), True)
  self.assertEqual(binarySearch(li2, "pear"), False)
  li3 = ["lemon"] # variable
  self.assertEqual(binarySearch(li3, "lemon"), True)
  self.assertEqual(binarySearch(li3, "lime"), False)
  li4 = list[str]() # variable
  self.assertEqual(binarySearch(li4, "pear"), False)
