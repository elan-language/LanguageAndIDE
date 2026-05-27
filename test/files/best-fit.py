# Python with Elan 2.0.0-alpha5

def bestFitLine(points: list[Point]) -> tuple[float, float]: # function
  sumX = points.reduce(0.0, lambda s: float, p: Point: s + p.x) # let
  sumXsq = points.reduce(0.0, lambda s: float, p: Point: s + pow(p.x, 2)) # let
  sumY = points.reduce(0.0, lambda s: float, p: Point: s + p.y) # let
  sumXY = points.reduce(0.0, lambda s: float, p: Point: s + p.x*p.y) # let
  n = points.length() # let
  a = (sumY*sumXsq - sumX*sumXY)/(n*sumXsq - sumX*sumX) # let
  b = (n*sumXY - sumX*sumY)/(n*sumXsq - sumX*sumX) # let
  return (a, b)

class Point # concrete class

  x: float # property
  y: float # property
  def __init__(self: Point, x: float, y: float) -> None:
    self.x = x # reassign variable
    self.y = y # reassign variable
  def toString(self: Point) -> str: # function method
    return f"Point {self.x}, {self.y}"


def newPoint(x: float, y: float) -> Point: # function
  return Point(x, y)

def test_bestFit(self) -> None:
  l1 = [newPoint(0.71, 1.12), newPoint(3.56, 5.36), newPoint(7.83, 9.04)] # let
  a_b = bestFitLine(l1) # let
  a = a_b.item_0 # let
  b = a_b.item_1 # let
  self.assertEqual(a.round(3), 0.766)
  self.assertEqual(b.round(3), 1.093)

def test_bestFit_empty(self) -> None:
  l1 = list[Point]() # let
  a_b = bestFitLine(l1) # let
  # NaN means 'Not A Number"
  self.assertEqual(a_b.toString(), "(NaN, NaN)")
