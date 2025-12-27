# 2b44fa48d25a17826fca9ce62b49253d15f9338b6c6df663829e7d4dc2f2e034 Elan 1.9.0 guest default_profile valid

# A program to investigate the Collatz Conjecture
# https://en.wikipedia.org/wiki/Collatz_conjecture
def main -> None:  # [main]
  x = 1 # [variable definition]
  while x > 0
    x = inputInt("Enter a starting number (0 to quit)") # [assign variable]
    # Array of the values we have seen so far
    p = [x] # [variable definition]
    # record the max value so we can scale the graph
    max = x # [variable definition]
    while x > 1
      # Collatz sequence
      if (x mod 2) is 0 then
        x = (x/2).floor() # [assign variable]
      else
        x = x*3 + 1 # [assign variable]
      if x > max then
        max = x # [assign variable]
      p.append(x) # [call procedure]}
      # draw what we have got so far, scaled to the canvas
      vg = new List<of VectorGraphic>() # [variable definition]
      for i in range(0, p.length() - 2, 1):  # [for loop]
        vg = vg.withAppend(new LineVG() with x1 set to scx(i, p), y1 set to scy(p[i], max), x2 set to scx(i + 1, p), y2 set to scy(p[i + 1], max), strokeColour set to black, strokeWidth set to 1) # [assign variable]
      displayVectorGraphics(vg) # [call procedure]}
      print x
      pause(100) # [call procedure]}
  print "Finished"


# scale x.  We pass in p just to get its length
def scx(i: Int, p: List<of Int>) -> Float:  # [function]
  return i*100/p.length()


# scale y
# subtract from 70 because y increases down the canvas
# subtract 1 so that 1 is always at the same place on the canvas
def scy(pi: Int, max: Int) -> Float:  # [function]
  return 70 - ((pi - 1)*65/(max - 1))


grey = 0x808080
