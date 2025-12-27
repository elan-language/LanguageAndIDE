# 0121e72f658c6e01e09480b99eea78dcdf9ecc3f3bcd921fc19d5aed679cf9dc Elan 1.9.0 guest default_profile valid

# This code is the start-point for Worksheet 'Merge sort' where the task is to implement the 'sort' function properly, and hence get all tests passing.
def sort(li: List<of String>) -> List<of String>:  # [function ]
  return ["x"]


def sort() -> None:  # [test ]
  # Edge case: empty
  emptyList = empty List<of String> # [variable definition ]
  assertEqual(sort(emptyList), emptyList)  # [assert ]
  # Edge case: one item
  li2 = ["plum"] # [variable definition ]
  assertEqual(sort(li2), li2)  # [assert ]
  # Happy case: odd number of members
  li3 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"] # [variable definition ]
  # Happy case: even number of members
  sorted3 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "plum", "strawberry"] # [variable definition ]
  assertEqual(sort(li3), sorted3)  # [assert ]
  li4 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry"] # [variable definition ]
  sorted4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "plum", "strawberry"] # [variable definition ]
  assertEqual(sort(li4), sorted4)  # [assert ]
  # Edge case: already sorted
  li5 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "strawberry"] # [variable definition ]
  assertEqual(sort(li5), li5)  # [assert ]


def merge(a: List<of String>, b: List<of String>) -> List<of String>:  # [function ]
  result = empty List<of String> # [variable definition ]
  if a.length() is 0 then
    result = b # [assign variable ]
  else if b.length() is 0 then
    result = a # [assign variable ]
  else if a[0].isBefore(b[0]) then
    result = [a[0]].withAppendList(merge(a[1..], b)) # [assign variable ]
  else
    result = [b[0]].withAppendList(merge(a, b[1..])) # [assign variable ]
  return result


def merge() -> None:  # [test ]
  emptyList = empty List<of String> # [variable definition ]
  assertEqual(merge(emptyList, emptyList), emptyList)  # [assert ]
  assertEqual(merge(["orange"], ["melon"]), ["melon", "orange"])  # [assert ]
  l1 = ["apple", "lime", "pear"] # [variable definition ]
  l2 = ["apricot", "lemon", "plum"] # [variable definition ]
  assertEqual(merge(l1, l2), ["apple", "apricot", "lemon", "lime", "pear", "plum"])  # [assert ]
  assertEqual(merge(l2, l1), ["apple", "apricot", "lemon", "lime", "pear", "plum"])  # [assert ]
  assertEqual(merge(l1, emptyList), l1)  # [assert ]
  assertEqual(merge(emptyList, l2), l2)  # [assert ]
  assertEqual(merge(l1, l1), ["apple", "apple", "lime", "lime", "pear", "pear"])  # [assert ]


