# 2b1ac69e9fea0ce19dd5f184ea900db699c3dcee382bfcd99a0fc1327452a543 Python with Elan 2.0.0-beta5 valid

# - g, j and y, h to change shape

# 

# Acknowledgements:

# https://mathworld.wolfram.com/JuliaSet.html

# Implemented in Elan by Charles Wicksteed

def main() -> None:
  p = Coords()
  while true:
    vg = allpoints(p)
    displayVectorGraphics(vg)
    p.checkkeys()
    print(f"x = {p.jx} y = {p.jy}")
  # end while 
# end main 

def allpoints(p: Coords) -> list[VectorGraphic]:
  vg2 = createVectorGraphics()
  for xp in range(0, width):
    for yp in range(0, height):
      # scale and centre
      n = onepoint((xp - width/2.0)/p.scale - p.xoff, (yp - height/2.0)/p.scale - p.yoff, nmax, p)
      # colour depends on how many iterations were done for that point
      col = 0xffffff if n == nmax else ((n*0x010201) % 0xffffff)
      rect = (RectangleVG()).withX(xp/2.0).withY(yp/2.0).withWidth(0.5).withHeight(0.5).withFillColour(col).withStrokeColour(col).withStrokeWidth(0.25)
      vg2 = vg2.withAppend(rect)
    # end for 
  # end for 
  return vg2
# end function 

def onepoint(x: float, y: float, maxnum: int, p: Coords) -> int:
  done = false
  a = x
  b = y
  i = 0
  while not done:
    c = 2*a*b
    a = (a*a - b*b) + p.jx
    b = c + p.jy
    i = i + 1
    if (i >= maxnum) or ((a*a + b*b) > 4):
      done = true
    # end if 
  # end while 
  return i
# end function 

class Coords:
  def __init__(self: <el-type>Coords</el-type>, ) -> None:
    # number of cells per unit distance on complex plane
    this.scale = 100
    # centered on the screen to start
    this.xoff = 0
    this.yoff = 0
    # Julia set parameters
    this.jx = -0.512
    this.jy = 0.521
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
    panstep = 10/this.scale
    jstep = 0.001
    # save some CPU by not recalculating until a parameter has been changed
    changed = false
    while not changed:
      k = getKey()
      # loop because more than one key may have been pressed
      while not k.equals(""):
        if k.equals("z"):
          this.scale = this.scale*1.2
        elif k.equals("x"):
          this.scale = this.scale/1.2
         
        elif k.equals("ArrowUp"):
          this.yoff = this.yoff + panstep
         
        elif k.equals("ArrowDown"):
          this.yoff = this.yoff - panstep
         
        elif k.equals("ArrowLeft"):
          this.xoff = this.xoff + panstep
         
        elif k.equals("ArrowRight"):
          this.xoff = this.xoff - panstep
         
        elif k.equals("g"):
          this.jx = this.jx + jstep
         
        elif k.equals("j"):
          this.jx = this.jx - jstep
         
        elif k.equals("y"):
          this.jy = this.jy + jstep
         
        elif k.equals("h"):
          this.jy = this.jy - jstep
         
        else:
          # ignore erroneous key presses
         
        # end if 
        # there is no harm in recalculating even if an invalid key was pressed
        changed = true
        # another key may have been pressed
        k = getKey()
      # end while 
      sleep_ms(10)
    # end while 
  # end procedure 

# end class 

class Test_one(unittest.TestCase): def test_one(self) -> None:
  p = Coords()
  self.assertEqual(onepoint(0, 0, 100, p), 100)
  self.assertEqual(onepoint(0.5, 0.5, 100, p), 3)
# end test 

width = 200

height = 150

nmax = 360

main()
