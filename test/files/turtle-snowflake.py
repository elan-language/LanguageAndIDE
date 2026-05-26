# Python with Elan 2.0.0-alpha5

def main() -> None:
  t = Turtle() # variable definition
  t.placeAt(-50, 30) # call procedure
  t.turn(90) # call procedure
  for i in range(1, 4):
    drawSide(side, t) # call procedure
    t.turn(120) # call procedure

def drawSide(length: float, t: Turtle) -> None: # procedure
  if (length > 1):
    third = length/3 # variable definition
    drawSide(third, t) # call procedure
    t.turn(-60) # call procedure
    drawSide(third, t) # call procedure
    t.turn(120) # call procedure
    drawSide(third, t) # call procedure
    t.turn(-60) # call procedure
    drawSide(third, t) # call procedure
  else:
    t.move(length) # call procedure

side = 100 # constant

main()
