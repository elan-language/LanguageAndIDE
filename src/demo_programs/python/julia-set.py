# 1550fe7048a755e01d349f76fbb0a347834d639c682f22428b2700e91167aeef Python with Elan 3.0.0-alpha valid

# Acknowledgements:

# https://mathworld.wolfram.com/JuliaSet.html

# Implemented in Elan by Charles Wicksteed

def main() -> None:
  p = Coords() # variable definition
  while True:
    vg = allpoints(p) # variable definition
    displayVectorGraphics(vg)
    p.checkkeys()
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
      col = 0xffffff if n == nmax else ((n*0x010201) % 0xffffff) # variable definition
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

class Coords:
  def __init__(self: <el-type>Coords</el-type>, ) -> None:
    # number of cells per unit distance on complex plane
    self.scale = 100 # assignment
    # centered on the screen to start
    self.xoff = 0 # assignment
    self.yoff = 0 # assignment
    # Julia set parameters
    self.jx = -0.512 # assignment
    self.jy = 0.521 # assignment
  # end constructor

  def toString(self: <el-type>Coords</el-type>, ) -> str:
    return "a Coords"
  # end function

  scale: float

  xoff: float

  yoff: float

  jx: float

  jy: float

  # Arrow keys move the virtual camera
  # eg Arrow Up moves the image down
  def checkkeys(self: <el-type>Coords</el-type>, ) -> None:
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
        elif k.equals("x"):
          self.scale = self.scale/1.2 # assignment
        elif k.equals("ArrowUp"):
          self.yoff = self.yoff + panstep # assignment
        elif k.equals("ArrowDown"):
          self.yoff = self.yoff - panstep # assignment
        elif k.equals("ArrowLeft"):
          self.xoff = self.xoff + panstep # assignment
        elif k.equals("ArrowRight"):
          self.xoff = self.xoff - panstep # assignment
        elif k.equals("g"):
          self.jx = self.jx + jstep # assignment
        elif k.equals("j"):
          self.jx = self.jx - jstep # assignment
        elif k.equals("y"):
          self.jy = self.jy + jstep # assignment
        elif k.equals("h"):
          self.jy = self.jy - jstep # assignment
        else:
          # ignore erroneous key presses
        # end if
        # there is no harm in recalculating even if an invalid key was pressed
        changed = True # assignment
        # another key may have been pressed
        k = getKey() # assignment
      # end while
      sleep_ms(10)
    # end while
  # end procedure

# end class

class Test_one(unittest.TestCase):
 def test_one(self: Test_one) -> None:
  p = Coords() # variable definition
  self.assertEqual(onepoint(0, 0, 100, p), 100)
  self.assertEqual(onepoint(0.5, 0.5, 100, p), 3)
# end test

width = 200

height = 150

nmax = 360

main()
