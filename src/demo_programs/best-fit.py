# 1e6ef74314a4bf3e617d920673977ab24c9928c8c9f8937166ee58495993b114 Elan 1.9.0 guest default_profile valid

def bestFitLine(points: List<of Point>) -> (Float, Float):  # [function]
  sumX = points.reduce(0.0, lambda s: Float, p: Point => s + p.x) # [variable definition]
  sumXsq = points.reduce(0.0, lambda s: Float, p: Point => s + p.x^2) # [variable definition]
  sumY = points.reduce(0.0, lambda s: Float, p: Point => s + p.y) # [variable definition]
  sumXY = points.reduce(0.0, lambda s: Float, p: Point => s + p.x*p.y) # [variable definition]
  n = points.length() # [variable definition]
  a = (sumY*sumXsq - sumX*sumXY)/(n*sumXsq - sumX*sumX) # [variable definition]
  b = (n*sumXY - sumX*sumY)/(n*sumXsq - sumX*sumX) # [variable definition]
  return tuple(a, b)


record Point
  x: Float = None # [property]

  y: Float = None # [property]

end record

def newPoint(x: Float, y: Float) -> Point:  # [function]
  return new Point() with x set to x, y set to y


def test_() -> None:  # [test]
  l1 = [newPoint(0.71, 1.12), newPoint(3.56, 5.36), newPoint(7.83, 9.04)] # [variable definition]
  first, second = bestFitLine(l1) # [variable definition]
  assertEqual(first.round(3), 0.766)  # [assert]
  assertEqual(second.round(3), 1.093)  # [assert]


