# eb52b2e22238f76ccb9d3f6481f33b382d95e4f9f1ff77d4086fa4dd28df4f4d Python with Elan 2.0.0-beta5 valid

def main() -> None:
  fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"] # variable definition
  done = False # variable definition
  while not done:
    wanted = input("What type of fruit do you want ('x' to exit)? ") # variable definition
    if wanted.equals("x"):
      done = True # assignment
    else:
      result = binarySearch(fruit, wanted) # variable definition
      if result:
        print(f" {wanted}")
      else:
        print(f" {wanted}")
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
    elif item.isBefore(value):
      result = binarySearch(li.subList(0, mid), item) # assignment
    else:
      result = binarySearch(li.subList(mid + 1, li.length()), item) # assignment
    # end if
  # end if
  return result
# end function

class Test_binarySearch(unittest.TestCase): def test_binarySearch(self) -> None:

# end test

main()
