# Python with Elan 2.0.0-beta2

def main() -> None:
  t = Turtle() # variable definition
  t.placeAt(-50, 30) # procedure call
  t.turn(90) # procedure call
  for i in range(1, 4):
    drawSide(side, t) # procedure call
    t.turn(120) # procedure call
  # end for
# end main

def drawSide(length: float, t: Turtle) -> None: # procedure
  if (length > 1):
    third = length/3 # variable definition
    drawSide(third, t) # procedure call
    t.turn(-60) # procedure call
    drawSide(third, t) # procedure call
    t.turn(120) # procedure call
    drawSide(third, t) # procedure call
    t.turn(-60) # procedure call
    drawSide(third, t) # procedure call
  else:
    t.move(length) # procedure call
  # end if
# end procedure

side = 100 # constant

main()
