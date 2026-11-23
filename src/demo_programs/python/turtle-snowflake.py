# d03b9fa85bcf336557a8b0af6fb7d9545c00577b9b59c2a62dd20219b8c0b66c Python with Elan 2.0.0-beta5 valid

def main() -> None:
  t = Turtle()
  t.placeAt(-50, 30)
  t.turn(90)
  for i in range(1, 4):
    drawSide(side, t)
    t.turn(120)
  # end for 
# end main 

def drawSide(length: float, t: Turtle) -> None:
  if (length > 1):
    third = length/3
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
