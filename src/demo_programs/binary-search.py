# d493825cc4f714719583d0f55923c24fd43d3ac2b8a8455c506ea9b2b6a858ce Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"] # [variable definition]
  exit = false # [variable definition]
  while not exit
    wanted = inputString("What type of fruit do you want ('x' to exit)? ") # [variable definition]
    if wanted is "x" then
      exit = true # [assign variable]
    else
      result = binarySearch(fruit, wanted) # [variable definition]
      if result then
        print "We can supply a {wanted}"
      else
        print "Sorry, we cannot supply a {wanted}"


def binarySearch(li: List<of String>, item: String) -> Boolean:  # [function]
  result = false # [variable definition]
  if li.length() > 0 then
    mid = (li.length()/2).floor() # [variable definition]
    value = li[mid] # [variable definition]
    if item is value then
      result = true # [assign variable]
    else if item.isBefore(value) then
      result = binarySearch(li[..mid], item) # [assign variable]
    else
      result = binarySearch(li[mid + 1..], item) # [assign variable]
  return result


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


