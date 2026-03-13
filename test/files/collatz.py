# Python with Elan 2.0.0-alpha

# A program to investigate the Collatz Conjecture

# https://en.wikipedia.org/wiki/Collatz_conjecture

def main(): None:
  x = 1 # variable
  while x > 0:
    x = inputInt("Enter a starting number (0 to quit)") # set
    # Array of the values we have seen so far
    p = [x] # variable
    # capture the max value so we can scale the graph
    max = x # variable
    while x > 1:
      # Collatz sequence
      if (x % 2) == 0:
        x = divAsInt(x, 2) # set
      else:
        x = x*3 + 1 # set
      if x > max:
        max = x # set
      p.append(x) # call
      # draw what we have got so far, scaled to the canvas
      vg = list[VectorGraphic]() # variable
      for i in range(0, p.length() - 1):
        vg = vg.withAppend((LineVG()).withX1(scx(i, p)).withY1(scy(p[i], max)).withX2(scx(i + 1, p)).withY2(scy(p[i + 1], max)).withStrokeWidth(1)) # set
      displayVectorGraphics(vg) # call
      print(x) # call
      pause(100) # call
  print("Finished") # call

# scale x. &nbsp;We pass in p just to get its length

def scx(i: int, p: list[int]) -> float: # function
  return divAsFloat(i*100, p.length())

# scale y

# subtract from 70 because y increases down the canvas

# subtract 1 so that 1 is always at the same place on the canvas

def scy(pi: int, max: int) -> float: # function
  return 70 - divAsFloat((pi - 1)*65, (max - 1))

+grey = 0x808080 # constant
