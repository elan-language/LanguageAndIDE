# 8ae06f89ea1cf06e847ea89629cc41f8f1d2e57b29233166f1d4432dca816a43 Python with Elan 2.0.0-beta5 valid

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
