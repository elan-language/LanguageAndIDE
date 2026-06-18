# Python with Elan 2.0.0-beta

# https://en.wikipedia.org/wiki/Barnsley_fern

# Draws a fractal image

def main() -> None:
  vg = createVectorGraphics() # variable definition
  s = State(RectangleVG(), 0.0, 0.16, Random()) # variable definition
  # can't call s.r.initialiseFromClock() directly
  t = s.r # variable definition
  t.initialiseFromClock() # call procedure
  # don't set the count limit too high
  # or the browser will run out of memory
  for count in range(0, 1000):
    s = onepoint(s) # reassign variable
    vg.append(s.rect) # call procedure
    displayVectorGraphics(vg) # call procedure
  print("Finished")

# The State class is used as a convenient way to pass multiple

# items in and out.

# The RectangleVG s.rect is ignored when passed in;

# it is just the RectangleVG from last time.

def onepoint(s: State) -> State: # function
  # s.r.asFloat() is the current random number between 0 and 1
  nx_ny = onestep(s.x, s.y, s.r.asFloat()) # let
  nx = nx_ny.item_0 # let
  ny = nx_ny.item_1 # let
  rect = (RectangleVG()).withX(nx*scale + 50).withY(75 - ny*scale).withWidth(0.5).withHeight(0.5).withFillColour(0x408040).withFillColour(0x408040).withStrokeWidth(0.25) # let
  # s.r.nextGen() moves the random number generator on to the next number
  return (State(rect, nx, ny, s.r.nextGen()))

# r is random Float 0.0 <= r < 1.0

# returns new x and y

# written in a data-driven style

def onestep(x: float, y: float, r: float) -> tuple[float, float]: # function
  # Currently you can't make the params into one long line
  # as it makes the browser use 100% CPU
  # xx xy yx yy cx cy probablity
  p1 = [0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01] # let
  p2 = [0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85] # let
  p3 = [0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07] # let
  p4 = [-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07] # let
  allPs = [p1, p2, p3, p4] # let
  # use the random number r to select one of p1 to p4
  # weighted by the probabilities and put it in pp
  pp = getparams(r, allPs, 0.0) # let
  return (x*pp[0] + y*pp[1] + pp[4], x*pp[2] + y*pp[3] + pp[5])

# select a parameter set depending on random number

# check the first element, cumulate the probability

# return the element when the cumulative probability reaches r

# otherwise recurse with the rest of the list of params

def getparams(r: float, prms: list[list[float]], cumuprob: float) -> list[float]: # function
  head = prms.head() # let
  cp2 = cumuprob + head[6] # let
  return if_(r < cp2, head, getparams(r, prms.tail(), cp2))

# class to hold the working data passed in and out of onepoint()

class State: # concrete class

  def __init__(self: State, rect: RectangleVG, x: float, y: float, r: Random) -> None:
    self.rect = rect # reassign variable
    self.x = x # reassign variable
    self.y = y # reassign variable
    self.r = r # reassign variable

  rect: RectangleVG # property

  x: float # property

  y: float # property

  r: Random # property

  def toString(self: State) -> str: # function method
    return f"rect at {self.rect.x}, {self.rect.y}"



def test_one(self) -> None:
  self.assertEqual(roundtuple2(onestep(0.0, 0.16, 0.5)), [0.0064, 1.736])
  self.assertEqual(roundtuple2(onestep(0.0, 0.16, 0.9)), [-0.0416, 1.6352])
  s = onepoint(State(RectangleVG(), 0.0, 0.16, Random())) # let
  self.assertEqual(s.toString(), "rect at 50.0448, 62.848")
  p1 = [0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01] # let
  p2 = [0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85] # let
  self.assertEqual(getparams(0.005, [p1, p2], 0.0), p1)
  self.assertEqual(getparams(0.03, [p1, p2], 0.0), p2)
  self.assertEqual(getparams(0.03, [p2], 0.01), p2)

# two approaches to rounding a tuple to N decimal places

def roundtuple1(n: tuple[float, float]) -> tuple[float, float]: # function
  return (n.item_0.round(8), n.item_1.round(8))

def roundtuple2(n: tuple[float, float]) -> list[float]: # function
  return [n.item_0, n.item_1].map(lambda x: float: x.round(8))

scale = 7 # constant

main()
