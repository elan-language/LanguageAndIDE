# Python with Elan 2.0.0-beta1

# Implementation of the Merge sort algorithm demonstrating

# - Decomposition of the principal function 'sort' into smaller functions,

# - Recursive functions. Note that both 'sort' and 'merge' are indirectly  

#   recursive, because they delegate to other functions that invoke the function

#   they are invoked from

# - Testing. ALL functions are independently unit-tested, with normal ('happy')  

#   cases, and edge cases (where appropriate)

def sort(li: list[str]) -> list[str]: # function
  return if_(li.length() < 2, li, merge(sortedFrontHalf(li), sortedBackHalf(li)))
# end function

def sortedFrontHalf(li: list[str]) -> list[str]: # function
  mid = divAsInt(li.length(), 2) # let
  frontHalf = li.subList(0, mid) # let
  return sort(frontHalf)
# end function

def sortedBackHalf(li: list[str]) -> list[str]: # function
  mid = divAsInt(li.length(), 2) # let
  backHalf = li.subList(mid, li.length()) # let
  return sort(backHalf)
# end function

def merge(a: list[str], b: list[str]) -> list[str]: # function
  oneIsEmpty = (a.length() == 0) or (b.length() == 0) # let
  return if_(oneIsEmpty, a.withAppendList(b), mergeNonEmpty(a, b))
# end function

def mergeNonEmpty(a: list[str], b: list[str]) -> list[str]: # function
  aHead = a.head() # let
  bHead = b.head() # let
  aTail = a.tail() # let
  bTail = b.tail() # let
  return if_(aHead.isBefore(bHead), [aHead].withAppendList(merge(aTail, b)), [bHead].withAppendList(merge(a, bTail)))
# end function

class Test_sort(unittest.TestCase):
 def test_sort(self) -> None:
  # Edge case: empty
  l1 = list[str]() # let
  self.assertEqual(sort(l1), l1)
  # Edge case: one item
  li2 = ["plum"] # let
  self.assertEqual(sort(li2), li2)
  # Happy case: odd number of members
  li3 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"] # let
  sorted3 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "plum", "strawberry"] # let
  self.assertEqual(sort(li3), sorted3)
  # Happy case: even number of members
  li4 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry"] # let
  sorted4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "plum", "strawberry"] # let
  self.assertEqual(sort(li4), sorted4)
  # Edge case: already sorted
  li5 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "strawberry"] # let
  self.assertEqual(sort(li5), li5)
# end test

class Test_sortedFrontHalf(unittest.TestCase):
 def test_sortedFrontHalf(self) -> None:
  # Edge case: one item - so front half is empty
  li1 = ["plum"] # let
  self.assertEqual(sortedFrontHalf(li1), list[str]())
  # Happy case: odd number of members
  li2 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"] # let
  self.assertEqual(sortedFrontHalf(li2), ["apricot", "lemon", "lime", "plum"])
  # Happy case: even number of members
  li3 = ["plum", "apricot", "lemon", "melon", "apple", "orange", "strawberry", "pear"] # let
  self.assertEqual(sortedFrontHalf(li3), ["apricot", "lemon", "melon", "plum"])
  # Edge case: already sorted
  li4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear"] # let
  self.assertEqual(sortedFrontHalf(li4), ["apple", "apricot", "lemon"])
# end test

class Test_sortedBackHalf(unittest.TestCase):
 def test_sortedBackHalf(self) -> None:
  # Edge case: one item - so back half is whole list
  li1 = ["plum"] # let
  self.assertEqual(sortedBackHalf(li1), ["plum"])
  # Happy case: odd number of members
  li2 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"] # let
  self.assertEqual(sortedBackHalf(li2), ["apple", "melon", "orange", "pear", "strawberry"])
  # Happy case: even number of members
  li3 = ["plum", "apricot", "lemon", "melon", "apple", "orange", "strawberry", "pear"] # let
  self.assertEqual(sortedBackHalf(li3), ["apple", "orange", "pear", "strawberry"])
  # Edge case: already sorted
  li4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear"] # let
  self.assertEqual(sortedBackHalf(li4), ["lime", "melon", "orange", "pear"])
# end test

class Test_merge(unittest.TestCase):
 def test_merge(self) -> None:
  # Happy cases:
  l1 = ["apple", "lime", "pear"] # let
  l2 = ["apricot", "lemon", "plum", "watermelon"] # let
  self.assertEqual(merge(["orange"], ["melon"]), ["melon", "orange"])
  self.assertEqual(merge(l1, l2), ["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"])
  self.assertEqual(merge(l2, l1), ["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"])
  # Edge cases - empty list(s)
  le = list[str]() # let
  self.assertEqual(merge(le, le), le)
  self.assertEqual(merge(l1, le), l1)
  self.assertEqual(merge(le, l2), l2)
  # Edge case - duplication
  self.assertEqual(merge(l1, l1), ["apple", "apple", "lime", "lime", "pear", "pear"])
  # Error case lists not sorted will not produce correct result
  lu = ["lime", "pear", "apple"] # let
  self.assertEqual(merge(lu, l2), ["apricot", "lemon", "lime", "pear", "apple", "plum", "watermelon"])
  self.assertEqual(merge(lu, le), ["lime", "pear", "apple"])
# end test

class Test_mergeNonEmpty(unittest.TestCase):
 def test_mergeNonEmpty(self) -> None:
  l1 = ["apple", "lime", "pear"] # let
  l2 = ["apricot", "lemon", "plum", "watermelon"] # let
  self.assertEqual(mergeNonEmpty(["orange"], ["melon"]), ["melon", "orange"])
  self.assertEqual(mergeNonEmpty(l1, l2), ["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"])
  self.assertEqual(mergeNonEmpty(l2, l1), ["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"])
  self.assertEqual(mergeNonEmpty(l1, l1), ["apple", "apple", "lime", "lime", "pear", "pear"])
  #  Edge case: duplication
  self.assertEqual(mergeNonEmpty(l1, l1), ["apple", "apple", "lime", "lime", "pear", "pear"])
  # Edge cases: single elements
  self.assertEqual(mergeNonEmpty(l1, ["lemon"]), ["apple", "lemon", "lime", "pear"])
  self.assertEqual(mergeNonEmpty(["melon"], l1), ["apple", "lime", "melon", "pear"])
  # Error case - pass empty list
  self.assertEqual(mergeNonEmpty(list[str](), l1), "Out of range index: 0 size: 0")
  #  Error case unsorted list
  lu = ["lime", "pear", "apple"] # let
  self.assertEqual(merge(lu, l2), ["apricot", "lemon", "lime", "pear", "apple", "plum", "watermelon"])
# end test
