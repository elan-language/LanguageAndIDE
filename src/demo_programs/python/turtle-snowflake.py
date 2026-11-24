# 58477de57221ee94e52512e753744f7ef18c641a606a0f701483b7cf958aa1f8 Python with Elan 3.0.0-alpha valid

def main() -> None:
  t = Turtle() # variable definition
  t.placeAt(-50, 30)
  t.turn(90)
  for i in range(1, 4):
    drawSide(side, t)
    t.turn(120)
  # end for
# end main

def drawSide(length: float, t: Turtle) -> None: # procedure
  if (length > 1):
    third = length/3 # variable definition
    drawSide(third, t)
    t.turn(-60)
    drawSide(third, t)
    t.turn(120)
    drawSide(third, t)
    t.turn(-60)
    drawSide(third, t)
  else:
    t.move(length)
  # end if
# end procedure

side = 100

main()
