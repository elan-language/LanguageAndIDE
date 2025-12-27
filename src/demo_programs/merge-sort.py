# 95a538016a280ae5ad45a3ec70f614ebbe041f072f3d4e908fb67ab089f493f3 Elan 1.9.0 guest default_profile valid

def sort(li: List<of String>) -> List<of String>:  # [function]
  result = li # [variable definition]
  # Write your implementation here, using the 'mergeSort' algorithm
  return result


def test_sort() -> None:  # [test]
  # 1. Edge case: empty
  l1 = empty List<of String> # [variable definition]
  assertEqual(sort(l1), l1)  # [assert]
  # 2. Edge case: one item
  li2 = ["plum"] # [variable definition]
  assertEqual(sort(li2), li2)  # [assert]
  # 3. Happy case: odd number of members
  li3 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"] # [variable definition]
  sorted3 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "plum", "strawberry"] # [variable definition]
  assertEqual(sort(li3), sorted3)  # [assert]
  # 4. Happy case: even number of members
  li4 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry"] # [variable definition]
  sorted4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "plum", "strawberry"] # [variable definition]
  assertEqual(sort(li4), sorted4)  # [assert]
  # 5. Edge case: already sorted
  li5 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "strawberry"] # [variable definition]
  assertEqual(sort(li5), li5)  # [assert]


# Merges two already-sorted lists (of potentially different lengths) into one sorted list
def merge(a: List<of String>, b: List<of String>) -> List<of String>:  # [function]
  result = empty List<of String> # [variable definition]
  if a.length() is 0 then
    result = b # [assign variable]
  else if b.length() is 0 then
    result = a # [assign variable]
  else if a[0].isBefore(b[0]) then
    result = [a[0]].withAppendList(merge(a[1..], b)) # [assign variable]
  else
    result = [b[0]].withAppendList(merge(a, b[1..])) # [assign variable]
  return result


def test_merge() -> None:  # [test]
  le = empty List<of String> # [variable definition]
  l1 = ["apple", "lime", "pear"] # [variable definition]
  l2 = ["apricot", "lemon", "plum", "watermelon"] # [variable definition]
  assertEqual(merge(le, le), le)  # [assert]
  assertEqual(merge(["orange"], ["melon"]), ["melon", "orange"])  # [assert]
  assertEqual(merge(l1, l2), ["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"])  # [assert]
  assertEqual(merge(l2, l1), ["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"])  # [assert]
  assertEqual(merge(l1, le), l1)  # [assert]
  assertEqual(merge(le, l2), l2)  # [assert]
  assertEqual(merge(l1, l1), ["apple", "apple", "lime", "lime", "pear", "pear"])  # [assert]


