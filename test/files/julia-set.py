# Python with Elan 2.0.0-beta1

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
    displayVectorGraphics(vg) # procedure call
    p.checkkeys() # procedure call
    print(f"x = {p.jx} y = {p.jy}")
  # end while
# end main

def allpoints(p: Coords) -> list[VectorGraphic]: # function
  vg2 = createVectorGraphics() # variable definition
  for xp in range(0, width):
    for yp in range(0, height):
      # scale and centre
      n = onepoint((xp - width/2.0)/p.scale - p.xoff, (yp - height/2.0)/p.scale - p.yoff, nmax, p) # variable definition
      # colour depends on how many iterations were done for that point
      col = if_(n == nmax, 0xffffff, ((n*0x010201) % 0xffffff)) # variable definition
      rect = (RectangleVG()).withX(xp/2.0).withY(yp/2.0).withWidth(0.5).withHeight(0.5).withFillColour(col).withStrokeColour(col).withStrokeWidth(0.25) # variable definition
      vg2 = vg2.withAppend(rect) # assignment
    # end for
  # end for
  return vg2
# end function

def onepoint(x: float, y: float, maxnum: int, p: Coords) -> int: # function
  done = False # variable definition
  a = x # variable definition
  b = y # variable definition
  i = 0 # variable definition
  while not done:
    c = 2*a*b # variable definition
    a = (a*a - b*b) + p.jx # assignment
    b = c + p.jy # assignment
    i = i + 1 # assignment
    if (i >= maxnum) or ((a*a + b*b) > 4):
      done = True # assignment
    # end if
  # end while
  return i
# end function

class Coords: # concrete class

  def __init__(self: Coords) -> None:
    # number of cells per unit distance on complex plane
    self.scale = 100 # assignment
    # centered on the screen to start
    self.xoff = 0 # assignment
    self.yoff = 0 # assignment
    # Julia set parameters
    self.jx = -0.512 # assignment
    self.jy = 0.521 # assignment
  # end constructor

  def toString(self: Coords) -> str: # function method
    return "a Coords"
  # end function method

  scale: float # property

  xoff: float # property

  yoff: float # property

  jx: float # property

  jy: float # property

  # Arrow keys move the virtual camera
  # eg Arrow Up moves the image down
  def checkkeys(self: Coords) -> None: # procedure method
    panstep = 10/self.scale # variable definition
    jstep = 0.001 # variable definition
    # save some CPU by not recalculating until a parameter has been changed
    changed = False # variable definition
    while not changed:
      k = getKey() # variable definition
      # loop because more than one key may have been pressed
      while not k.equals(""):
        if k.equals("z"):
          self.scale = self.scale*1.2 # assignment
        elif k.equals("x"): # else if
          self.scale = self.scale/1.2 # assignment
        elif k.equals("ArrowUp"): # else if
          self.yoff = self.yoff + panstep # assignment
        elif k.equals("ArrowDown"): # else if
          self.yoff = self.yoff - panstep # assignment
        elif k.equals("ArrowLeft"): # else if
          self.xoff = self.xoff + panstep # assignment
        elif k.equals("ArrowRight"): # else if
          self.xoff = self.xoff - panstep # assignment
        elif k.equals("g"): # else if
          self.jx = self.jx + jstep # assignment
        elif k.equals("j"): # else if
          self.jx = self.jx - jstep # assignment
        elif k.equals("y"): # else if
          self.jy = self.jy + jstep # assignment
        elif k.equals("h"): # else if
          self.jy = self.jy - jstep # assignment
        else:
          # ignore erroneous key presses
        # end if
        # there is no harm in recalculating even if an invalid key was pressed
        changed = True # assignment
        # another key may have been pressed
        k = getKey() # assignment
      # end while
      sleep_ms(10) # procedure call
    # end while
  # end procedure method

# end class

class Test_one(unittest.TestCase):
 def test_one(self) -> None:
  p = Coords() # variable definition
  self.assertEqual(onepoint(0, 0, 100, p), 100)
  self.assertEqual(onepoint(0.5, 0.5, 100, p), 3)
# end test

width = 200 # constant

height = 150 # constant

nmax = 360 # constant

main()
