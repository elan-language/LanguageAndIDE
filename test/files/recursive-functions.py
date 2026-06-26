# Python with Elan 2.0.0-beta1

def factorial(n: int) -> int: # function
  return if_(n < 2, 1, n*factorial(n - 1))
# end function

class Test_factorial(unittest.TestCase):
 def test_factorial(self) -> None:
  self.assertEqual(factorial(2), 2)
  self.assertEqual(factorial(3), 6)
  self.assertEqual(factorial(7), 5040)
  self.assertEqual(factorial(10), 3628800)
  # edge cases:
  self.assertEqual(factorial(1), 1)
  self.assertEqual(factorial(0), 1)
# end test

def sum(li: list[float]) -> float: # function
  return if_(li.length() == 0, 0.0, li.head() + sum(li.tail()))
# end function

class Test_sum(unittest.TestCase):
 def test_sum(self) -> None:
  li = [3.1, 5.02, 4, 7.73, 9.9] # let
  self.assertEqual(sum(li).round(2), 29.75)
  # edge cases: empty, and one element lists
  le = list[float]() # let
  self.assertEqual(sum(le), 0)
  l1 = [0.6] # let
  self.assertEqual(sum(l1), 0.6)
# end test

def reverse(li: list[float]) -> list[float]: # function
  return if_(li.length() < 2, li, reverse(li.tail()).withAppend(li.head()))
# end function

class Test_reverse(unittest.TestCase):
 def test_reverse(self) -> None:
  l = [3.1, 5.02, 4, 7.73, 9.9] # let
  self.assertEqual(reverse(l), [9.9, 7.73, 4, 5.02, 3.1])
  # edge cases: empty, and one element lists
  le = list[float]() # let
  self.assertEqual(reverse(le), le)
  l1 = [0.6] # let
  self.assertEqual(reverse(l1), l1)
# end test
