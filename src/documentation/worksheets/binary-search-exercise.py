# a6bb540b2383df5197222ffe69072a0f742992100f30e1d4cb4c6a057b2502ec Elan 1.9.0 guest default_profile valid

# Exercise: implement a function to search for an item in a sorted list, 
# using the 'binary search' algorithm
# The code below defines the signature for the 'binarySearch' function,
# with just enough code to compile, but it fails multiple tests.
# Your task is to implement binarySearch sufficient to get all the tests passing.
# You can then run the main program, which applies the function.
# 
# Hints:
# - Use a recursive implementation, but as with any recursive function think first
#   about the 'termination' condition
# - Find the mid-point of ths list using integer division ('div')
# - To compare strings alphabetically use the .isBefore or .isAfter dot-methods 
# - To extract the lists before and after the mid-point use the range indexes:
#    'li[..mid]' and 'li[mid+1..]'
# - You can implement the whole algorithm just by adding a new 'if' statement between the
#   first and last lines, containing 'else if/else' clauses as needed. Each clause should
#   set the result.
# - Use 'let' statements to calculate any sub-expression that will be used more than once
#   in your logic and/or to improve readability.
def binarySearch(li: List<of String>, item: String) -> Boolean:  # [function]
  result = false # [variable definition]
  return result


def main -> None:  # [main]
  fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"] # [variable definition]
  exit = false # [variable definition]
  while exit is false
    wanted = inputString("What type of fruit do you want ('x' to exit)? ") # [variable definition]
    if wanted isnt "x" then
      result = binarySearch(fruit, wanted) # [variable definition]
      if result then
        print "We can supply a {wanted}"
      else
        print "Sorry, we cannot supply a {wanted}"
    else
      exit = true # [assign variable]


def test_() -> None:  # [test]
  li1 = ["lemon", "lime", "orange"] # [variable definition]
  assertEqual(binarySearch(li1, "lemon"), true)  # [assert]
  assertEqual(binarySearch(li1, "lime"), true)  # [assert]
  assertEqual(binarySearch(li1, "orange"), true)  # [assert]
  assertEqual(binarySearch(li1, "pear"), false)  # [assert]
  li2 = ["lemon", "orange"] # [variable definition]
  assertEqual(binarySearch(li2, "lemon"), true)  # [assert]
  assertEqual(binarySearch(li2, "orange"), true)  # [assert]
  assertEqual(binarySearch(li2, "pear"), false)  # [assert]
  li3 = ["lemon"] # [variable definition]
  assertEqual(binarySearch(li3, "lemon"), true)  # [assert]
  assertEqual(binarySearch(li3, "lime"), false)  # [assert]
  li4 = empty List<of String> # [variable definition]
  assertEqual(binarySearch(li4, "pear"), false)  # [assert]


