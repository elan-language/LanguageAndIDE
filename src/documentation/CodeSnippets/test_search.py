# c8fbcc16018cec92ed8eb103c4269eb6281fdbd9afb4e4477eee92a845a0694d Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  fruit = example # [variable definition]
  print binarySearch(fruit, "lime")
  print binarySearch(fruit, "orange")


def binarySearch(li: ListImmutable<of String>, item: String) -> Boolean:  # [function]
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
  li1 = {"lemon", "lime", "orange"} # [variable definition]
  assertEqual(binarySearch(li1, "lemon"), true)  # [assert]
  assertEqual(binarySearch(li1, "lime"), true)  # [assert]
  assertEqual(binarySearch(li1, "orange"), true)  # [assert]
  assertEqual(binarySearch(li1, "pear"), false)  # [assert]
  li2 = {"lemon", "orange"} # [variable definition]
  assertEqual(binarySearch(li2, "lemon"), true)  # [assert]
  assertEqual(binarySearch(li2, "orange"), true)  # [assert]
  assertEqual(binarySearch(li2, "pear"), false)  # [assert]
  li3 = {"lemon"} # [variable definition]
  assertEqual(binarySearch(li3, "lemon"), true)  # [assert]
  assertEqual(binarySearch(li3, "lime"), false)  # [assert]
  li4 = empty ListImmutable<of String> # [variable definition]
  assertEqual(binarySearch(li4, "pear"), false)  # [assert]


example = {"apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"}
