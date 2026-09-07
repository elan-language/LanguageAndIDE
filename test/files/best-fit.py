# Python with Elan 2.0.0-beta4

def bestFitLine(points: list[Point]) -> tuple[float, float]: # function
  sumX = points.sumBy(lambda p: Point: p.x) # variable definition
  sumXsq = points.sumBy(lambda p: Point: p.x*p.x) # variable definition
  sumY = points.sumBy(lambda p: Point: p.y) # variable definition
  sumXY = points.sumBy(lambda p: Point: p.x*p.y) # variable definition
  n = points.length() # variable definition
  a = (sumY*sumXsq - sumX*sumXY)/(n*sumXsq - sumX*sumX) # variable definition
  b = (n*sumXY - sumX*sumY)/(n*sumXsq - sumX*sumX) # variable definition
  return (a, b)
# end function

class Point: # concrete class

  def __init__(self: Point, x: float, y: float) -> None:
    self.x = x # assignment
    self.y = y # assignment
  # end constructor

  x: float # property

  y: float # property

  def toString(self: Point) -> str: # function method
    return f"Point {self.x}, {self.y}"
  # end function method

# end class

def newPoint(x: float, y: float) -> Point: # function
  return Point(x, y)
# end function

class Test_bestFit(unittest.TestCase):
 def test_bestFit(self) -> None:
  l1 = [newPoint(0.71, 1.12), newPoint(3.56, 5.36), newPoint(7.83, 9.04)] # variable definition
  a_b = bestFitLine(l1) # variable definition
  a = a_b.item_0 # variable definition
  b = a_b.item_1 # variable definition
  self.assertEqual(a.round(3), 0.766)
  self.assertEqual(b.round(3), 1.093)
# end test

class Test_bestFit_empty(unittest.TestCase):
 def test_bestFit_empty(self) -> None:
  l1 = list[Point]() # variable definition
  a_b = bestFitLine(l1) # variable definition
  # NaN means 'Not A Number"
  self.assertEqual(a_b.toString(), "(NaN, NaN)")
# end test
