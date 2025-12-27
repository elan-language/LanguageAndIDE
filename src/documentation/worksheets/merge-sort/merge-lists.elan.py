# c219f825ef4a82779b677b9b7fd5d6abcdc64c728ac93bbfff0bede7e7afa9fc Elan 1.9.0 guest default_profile valid

# This code is the start-point for Worksheet 'Merge lists' where the task is to implement the 'merge' function properly, and hence get all tests passing.
def merge(a: List<of String>, b: List<of String>) -> List<of String>:  # [function ]
  return ["x"]


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


