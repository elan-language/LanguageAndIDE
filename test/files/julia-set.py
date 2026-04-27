# Python with Elan 2.0.0-alpha1

# After image is displayed, press:  

# - z to zoom in, x to zoom out

# - arrow keys to pan

# - g, j and y, h to change shape

#  

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
      n = onepoint(((((xp - width)/(2)))/(p.scale - p.xoff)), ((((yp - height)/(2)))/(p.scale - p.yoff)), nmax, p) # variable definition
      # colour depends on how many iterations were done for that point
      col = (0xffffff if n == nmax else ((n*0x010201) % 0xffffff)) # variable definition
      rect = (RectangleVG()).withX(((xp)/(2))).withY(((yp)/(2))).withWidth(0.5).withHeight(0.5).withFillColour(col).withStrokeWidth(0.25) # variable definition
      vg2 = (vg2 + [(rect)]) # change variable
  return vg2

def onepoint(x: float, y: float, maxnum: int, p: Coords) -> int: # function
  done = False # variable definition
  a = x # variable definition
  b = y # variable definition
  i = 0 # variable definition
  while not done:
    c = 2*a*b # variable definition
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
    panstep = 10/self.scale # variable definition
    jstep = 0.001 # variable definition
    # save some CPU by not recalculating until a parameter has been changed
    changed = False # variable definition
    while not changed:
      k = getKey() # variable definition
      # loop because more than one key may have been pressed
      while not k == (""):
        if k == ("z"):
          self.scale = self.scale*1.2 # change variable
        elif k == ("x"):
          self.scale = self.scale/1.2 # change variable
        elif k == ("ArrowUp"):
          self.yoff = self.yoff + panstep # change variable
        elif k == ("ArrowDown"):
          self.yoff = self.yoff - panstep # change variable
        elif k == ("ArrowLeft"):
          self.xoff = self.xoff + panstep # change variable
        elif k == ("ArrowRight"):
          self.xoff = self.xoff - panstep # change variable
        elif k == ("g"):
          self.jx = self.jx + jstep # change variable
        elif k == ("j"):
          self.jx = self.jx - jstep # change variable
        elif k == ("y"):
          self.jy = self.jy + jstep # change variable
        elif k == ("h"):
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

main()
