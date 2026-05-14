# Python with Elan 2.0.0-alpha4

# https://en.wikipedia.org/wiki/Barnsley_fern

# Draws a fractal image

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  # coordinates
  x = 0.0 # variable definition
  y = 0.16 # variable definition
  # random number
  r = Random() # variable definition
  r.initialiseFromClock() # call procedure
  rect = RectangleVG() # variable definition
  count = 0 # variable definition
  # don't set the count limit too high
  # or the browser will run out of memory
  while count < 1000:
    point = onepoint(x, y, r) # variable definition
    rect = point.item_0 # re-assign variable
    x = point.item_1 # re-assign variable
    y = point.item_2 # re-assign variable
    r = point.item_3 # re-assign variable
    vg.append(rect) # call procedure
    displayVectorGraphics(vg) # call procedure
    count = count + 1 # re-assign variable
  print("Finished")

def onepoint(x: float, y: float, r: Random) -> tuple[RectangleVG, float, float, Random]: # function
  # next pseudo-random number (Grogono parameters)
  rValue = r.asFloat() # variable definition
  rNext = r.nextGen() # variable definition
  nx_ny = onestep(x, y, rValue) # variable definition
  nx = nx_ny.item_0 # variable definition
  ny = nx_ny.item_1 # variable definition
  rect = (RectangleVG()).withX(nx*scale + 50).withY(75 - ny*scale).withWidth(0.5).withHeight(0.5).withFillColour(0x408040).withFillColour(0x408040).withStrokeWidth(0.25) # variable definition
  return (rect, nx, ny, rNext)

# r is random Float 0.0 <= r < 1.0

# returns new x and y

# written in a data-driven style

def onestep(x: float, y: float, r: float) -> tuple[float, float]: # function
  # Currently you can't make the params into one long line
  # as it makes the browser use 100% CPU
  # xx xy yx yy cx cy probablity
  p1 = [0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01] # variable definition
  p2 = [0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85] # variable definition
  p3 = [0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07] # variable definition
  p4 = [-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07] # variable definition
  allPs = [p1, p2, p3, p4] # variable definition
  # cumulative probabilty
  cumuprob = 0.0 # variable definition
  done = False # variable definition
  nx = 0.0 # variable definition
  ny = 0.0 # variable definition
  for pp in allPs:
    cumuprob = cumuprob + pp[6] # re-assign variable
    if (not done) and (r < cumuprob):
      nx = x*pp[0] + y*pp[1] + pp[4] # re-assign variable
      ny = x*pp[2] + y*pp[3] + pp[5] # re-assign variable
      done = True # re-assign variable
  return (nx, ny)

def test_one(self) -> None:
  self.assertEqual(roundtuple2(onestep(0.0, 0.16, 0.5)), [0.0064, 1.736])
  self.assertEqual(roundtuple2(onestep(0.0, 0.16, 0.9)), [-0.0416, 1.6352])

# two approaches to rounding a tuple to N decimal places

def roundtuple1(n: tuple[float, float]) -> tuple[float, float]: # function
  a = n.item_0 # variable definition
  b = n.item_1 # variable definition
  return (a.round(8), b.round(8))

def roundtuple2(n: tuple[float, float]) -> list[float]: # function
  a = n.item_0 # variable definition
  b = n.item_1 # variable definition
  return [a, b].map(lambda x: float: x.round(8))

scale = 7 # constant

main()
