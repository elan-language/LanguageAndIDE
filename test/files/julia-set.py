# Python with Elan 2.0.0-alpha1

# After image is displayed, press: &nbsp;

# - z to zoom in, x to zoom out

# - arrow keys to pan

# - g, j and y, h to change shape

# &nbsp;

# Acknowledgements:

# https://mathworld.wolfram.com/JuliaSet.html

# Implemented in Elan by Charles Wicksteed

def main() -> None:
  p = Coords() # variable definition
  while True:
    vg = allpoints(p) # variable definition
    displayVectorGraphics(vg) # call procedure
    p.checkkeys() # call procedure
    print(f"x = {p.jx} y = {p.jy}")

def allpoints(p: Coords) -> list[VectorGraphic]: # function
  vg2 = list[VectorGraphic]() # variable definition
  for xp in range(0, width + 1):
    for yp in range(0, height + 1):
      # scale and centre
      n = onepoint(divAsFloat(divAsFloat(xp - width, 2), p.scale - p.xoff), divAsFloat(divAsFloat(yp - height, 2), p.scale - p.yoff), nmax, p) # constant
      # colour depends on how many iterations were done for that point
      col = if(n == nmax, 0xffffff, ((n*0x010201) % 0xffffff)) # constant
      rect = (RectangleVG()).withX(divAsFloat(xp, 2)).withY(divAsFloat(yp, 2)).withWidth(0.5).withHeight(0.5).withFillColour(col).withStrokeWidth(0.25) # variable definition
      vg2 = vg2.withAppend(rect) # change variable
  return vg2

def onepoint(x: float, y: float, maxnum: int, p: Coords) -> int: # function
  done = False # variable definition
  a = x # variable definition
  b = y # variable definition
  i = 0 # variable definition
  while not done:
    c = 2*a*b # constant
    a = (a*a - b*b) + p.jx # change variable
    b = c + p.jy # change variable
    i = i + 1 # change variable
    if (i >= maxnum) or ((a*a + b*b) > 4):
      done = True # change variable
  return i

class Coords

  def __init__(self: Coords) -> None:
    # number of cells per unit distance on complex plane
    self.scale = 100 # change variable
    # centered on the screen to start
    self.xoff = 0 # change variable
    self.yoff = 0 # change variable
    # Julia set parameters
    self.jx = -0.512 # change variable
    self.jy = 0.521 # change variable
  def toString(self: Coords) -> str: # function
    return ""
  scale: float # property
  xoff: float # property
  yoff: float # property
  jx: float # property
  jy: float # property
  # Arrow keys move the virtual camera
  # eg Arrow Up moves the image down
  def checkkeys(self: Coords) -> None: # procedure
    panstep = 10/self.scale # constant
    jstep = 0.001 # variable definition
    # save some CPU by not recalculating until a parameter has been changed
    changed = False # variable definition
    while not changed:
      k = getKey() # variable definition
      # loop because more than one key may have been pressed
      while not k.equals(""):
        if k.equals("z"):
          self.scale = self.scale*1.2 # change variable
        elif k.equals("x"):
          self.scale = self.scale/1.2 # change variable
        elif k.equals("ArrowUp"):
          self.yoff = self.yoff + panstep # change variable
        elif k.equals("ArrowDown"):
          self.yoff = self.yoff - panstep # change variable
        elif k.equals("ArrowLeft"):
          self.xoff = self.xoff + panstep # change variable
        elif k.equals("ArrowRight"):
          self.xoff = self.xoff - panstep # change variable
        elif k.equals("g"):
          self.jx = self.jx + jstep # change variable
        elif k.equals("j"):
          self.jx = self.jx - jstep # change variable
        elif k.equals("y"):
          self.jy = self.jy + jstep # change variable
        elif k.equals("h"):
          self.jy = self.jy - jstep # change variable
          # for autocomplete in the RHS expression, don't type "property"
        else:
          # ignore erroneous key presses
        # there is no harm in recalculating even if an invalid key was pressed
        changed = True # change variable
        # another key may have been pressed
        k = getKey() # change variable
      sleep_ms(10) # call procedure


def test_one(self) -> None:
  p = Coords() # variable definition
  self.assertEqual(onepoint(0, 0, 100, p), 100)
  self.assertEqual(onepoint(0.5, 0.5, 100, p), 3)

width = 200 # constant

height = 150 # constant

nmax = 360 # constant
