# f03de30dbbf0bdb5c52fbc475c6dee33502a37044bb3d3034a3543394958e12d Elan 1.9.0 guest default_profile valid

# https://en.wikipedia.org/wiki/Barnsley_fern
# Draws a fractal image
def main -> None:  # [main]
  vg = new List<of VectorGraphic>() # [variable definition]
  # coordinates
  x = 0.0 # [variable definition]
  y = 0.16 # [variable definition]
  # random number
  r = new Random() # [variable definition]
  rect = new RectangleVG() # [variable definition]
  count = 0 # [variable definition]
  # don't set the count limit too high
  # or the browser will run out of memory
  while count < 1000
    rect, x, y, r = onepoint(x, y, r) # [assign variable]
    vg.append(rect) # [call procedure]}
    displayVectorGraphics(vg) # [call procedure]}
    count = count + 1 # [assign variable]
  print "Finished"


def onepoint(x: Float, y: Float, r: Random) -> (RectangleVG, Float, Float, Random):  # [function]
  # next pseudo-random number (Grogono parameters)
  rValue, rNext = r.next() # [variable definition]
  nx, ny = onestep(x, y, rValue) # [variable definition]
  rect = new RectangleVG() with x set to nx*scale + 50, y set to 75 - ny*scale, width set to 0.5, height set to 0.5, fillColour set to 0x408040, strokeColour set to 0x408040, strokeWidth set to 0.25 # [variable definition]
  return tuple(rect, nx, ny, rNext)


# r is random Float 0.0 <= r < 1.0
# returns new x and y
# written in a data-driven style
def onestep(x: Float, y: Float, r: Float) -> (Float, Float):  # [function]
  # Currently you can't make the params into one long line
  # as it makes the browser use 100% CPU
  # xx xy yx yy cx cy probablity
  p1 = {0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01} # [variable definition]
  p2 = {0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85} # [variable definition]
  p3 = {0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07} # [variable definition]
  p4 = {-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07} # [variable definition]
  params = {p1, p2, p3, p4} # [variable definition]
  # cumulative probabilty
  cumuprob = 0.0 # [variable definition]
  done = false # [variable definition]
  nx = 0.0 # [variable definition]
  ny = 0.0 # [variable definition]
  for pp in params:  # [each loop]
    cumuprob = cumuprob + pp[6] # [assign variable]
    if (not done) and (r < cumuprob) then
      nx = x*pp[0] + y*pp[1] + pp[4] # [assign variable]
      ny = x*pp[2] + y*pp[3] + pp[5] # [assign variable]
      done = true # [assign variable]
  return tuple(nx, ny)


def test_one() -> None:  # [test]
  assertEqual(roundtuple2(onestep(0.0, 0.16, 0.5)), {0.0064, 1.736})  # [assert]
  assertEqual(roundtuple2(onestep(0.0, 0.16, 0.9)), {-0.0416, 1.6352})  # [assert]


# two approaches to rounding a tuple to N decimal places
def roundtuple1(n: (Float, Float)) -> (Float, Float):  # [function]
  a, b = n # [variable definition]
  return tuple(a.round(8), b.round(8))


def roundtuple2(n: (Float, Float)) -> ListImmutable<of Float>:  # [function]
  a, b = n # [variable definition]
  return {a, b}.map(lambda x: Float => x.round(8))


scale = 7
