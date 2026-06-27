# Python with Elan 2.0.0-beta1

def main() -> None:
  fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"] # variable definition
  done = False # variable definition
  while not done:
    wanted = input("What type of fruit do you want ('x' to exit)? ") # input statement
    if wanted.equals("x"):
      done = True # assignment
    else:
      result = binarySearch(fruit, wanted) # variable definition
      if result:
        print(f"\nWe can supply a {wanted}")
      else:
        print(f"\nSorry, we cannot supply a {wanted}")
      # end if
    # end if
  # end while
# end main

def binarySearch(li: list[str], item: str) -> bool: # function
  result = False # variable definition
  if li.length() > 0:
    mid = divAsInt(li.length(), 2) # variable definition
    value = li[mid] # variable definition
    if item.equals(value):
      result = True # assignment
    elif item.isBefore(value): # else if
      result = binarySearch(li.subList(0, mid), item) # assignment
    else:
      result = binarySearch(li.subList(mid + 1, li.length()), item) # assignment
    # end if
  # end if
  return result
# end function

class Test_binarySearch(unittest.TestCase):
 def test_binarySearch(self) -> None:
  li1 = ["lemon", "lime", "orange"] # variable definition
  self.assertEqual(binarySearch(li1, "lemon"), True)
  self.assertEqual(binarySearch(li1, "lime"), True)
  self.assertEqual(binarySearch(li1, "orange"), True)
  self.assertEqual(binarySearch(li1, "pear"), False)
  li2 = ["lemon", "orange"] # variable definition
  self.assertEqual(binarySearch(li2, "lemon"), True)
  self.assertEqual(binarySearch(li2, "orange"), True)
  self.assertEqual(binarySearch(li2, "pear"), False)
  li3 = ["lemon"] # variable definition
  self.assertEqual(binarySearch(li3, "lemon"), True)
  self.assertEqual(binarySearch(li3, "lime"), False)
  li4 = list[str]() # variable definition
  self.assertEqual(binarySearch(li4, "pear"), False)
# end test

main()
