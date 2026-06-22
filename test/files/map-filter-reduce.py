# Python with Elan 2.0.0-beta-pre1

def test_Map_Filter_Reduce(self) -> None:
  nums = [2.22, 5.37, 8.97, 7.53, 8.2, 9.43, 7.74, 7.03, 9.62, 2.5] # let
  self.assertEqual(nums.filter(lessThan5), [2.22, 2.5])
  self.assertEqual(nums.map(cube), [10.94, 154.85, 721.73, 426.96, 551.37, 838.56, 463.68, 347.43, 890.28, 15.63])
  self.assertEqual(nums.reduce(1.0, product).floor(), 81480107)
  self.assertEqual(nums.filter(lessThan5).map(inverse), [0.45, 0.4])
  self.assertEqual(nums.filter(lessThan5).map(inverse).map(asString).reduce("results: ", concat), "results: 0.45|0.4|")
# end test

def lessThan5(n: float) -> bool: # function
  return n < 5
# end function

def cube(n: float) -> float: # function
  return pow(n, 3).round(2)
# end function

def inverse(n: float) -> float: # function
  return (1/n).round(2)
# end function

def asString(n: float) -> str: # function
  return f"{n}|"
# end function

def product(x: float, y: float) -> float: # function
  return (x*y)
# end function

def concat(a: str, b: str) -> str: # function
  return a + b
# end function
