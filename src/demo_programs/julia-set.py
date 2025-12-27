# 9907bf946ea7ece082d133bc276e63fbb4bc0f296781184c6622c34ed8d5729c Elan 1.9.0 guest default_profile valid

# After image is displayed, press: 
# - z to zoom in, x to zoom out
# - arrow keys to pan
# - g, j and y, h to change shape
# 
# Acknowledgements:
# https://mathworld.wolfram.com/JuliaSet.html
# Implemented in Elan by Charles Wicksteed
def main -> None:  # [main]
  p = new Coords() # [variable definition]
  while true
    vg = allpoints(p) # [variable definition]
    displayVectorGraphics(vg) # [call procedure]}
    p.checkkeys() # [call procedure]}
    print "x = {p.jx} y = {p.jy}"


def allpoints(p: Coords) -> List<of VectorGraphic>:  # [function]
  vg2 = new List<of VectorGraphic>() # [variable definition]
  for xp in range(0, width, 1):  # [for loop]
    for yp in range(0, height, 1):  # [for loop]
      # scale and centre
      n = onepoint((xp - width/2)/p.scale - p.xoff, (yp - height/2)/p.scale - p.yoff, nmax, p) # [variable definition]
      # colour depends on how many iterations were done for that point
      col = if n is nmax then 0xffffff else ((n*0x010201) mod 0xffffff) # [variable definition]
      rect = new RectangleVG() with x set to xp/2, y set to yp/2, width set to 0.5, height set to 0.5, fillColour set to col, strokeColour set to col, strokeWidth set to 0.25 # [variable definition]
      vg2 = vg2.withAppend(rect) # [assign variable]
  return vg2


def onepoint(x: Float, y: Float, maxnum: Int, p: Coords) -> Int:  # [function]
  done = false # [variable definition]
  a = x # [variable definition]
  b = y # [variable definition]
  i = 0 # [variable definition]
  while not done
    c = 2*a*b # [variable definition]
    a = (a*a - b*b) + p.jx # [assign variable]
    b = c + p.jy # [assign variable]
    i = i + 1 # [assign variable]
    if (i >= maxnum) or ((a*a + b*b) > 4) then
      done = true # [assign variable]
  return i


class Coords
  constructor()
    # number of cells per unit distance on complex plane
    property.scale = 100 # [assign variable]
    # centered on the screen to start
    property.xoff = 0 # [assign variable]
    property.yoff = 0 # [assign variable]
    # Julia set parameters
    property.jx = -0.512 # [assign variable]
    property.jy = 0.521 # [assign variable]
  end constructor

  scale: Float = None # [property]

  xoff: Float = None # [property]

  yoff: Float = None # [property]

  jx: Float = None # [property]

  jy: Float = None # [property]

  # Arrow keys move the virtual camera
  # eg Arrow Up moves the image down
  procedure checkkeys()
    panstep = 10/property.scale # [variable definition]
    jstep = 0.001 # [variable definition]
    # save some CPU by not recalculating until a parameter has been changed
    changed = false # [variable definition]
    while not changed
      k = getKey() # [variable definition]
      # loop because more than one key may have been pressed
      while k isnt ""
        if k is "z" then
          property.scale = property.scale*1.2 # [assign variable]
        else if k is "x" then
          property.scale = property.scale/1.2 # [assign variable]
        else if k is "ArrowUp" then
          property.yoff = property.yoff + panstep # [assign variable]
        else if k is "ArrowDown" then
          property.yoff = property.yoff - panstep # [assign variable]
        else if k is "ArrowLeft" then
          property.xoff = property.xoff + panstep # [assign variable]
        else if k is "ArrowRight" then
          property.xoff = property.xoff - panstep # [assign variable]
        else if k is "g" then
          property.jx = property.jx + jstep # [assign variable]
        else if k is "j" then
          property.jx = property.jx - jstep # [assign variable]
        else if k is "y" then
          property.jy = property.jy + jstep # [assign variable]
        else if k is "h" then
          property.jy = property.jy - jstep # [assign variable]
          # for autocomplete in the RHS expression, don't type "property"
        else
          # ignore erroneous key presses
        # there is no harm in recalculating even if an invalid key was pressed
        changed = true # [assign variable]
        # another key may have been pressed
        k = getKey() # [assign variable]
      pause(10) # [call procedure]}

end class

def test_one() -> None:  # [test]
  p = new Coords() # [variable definition]
  assertEqual(onepoint(0, 0, 100, p), 100)  # [assert]
  assertEqual(onepoint(0.5, 0.5, 100, p), 3)  # [assert]


width = 200

height = 150

nmax = 360
