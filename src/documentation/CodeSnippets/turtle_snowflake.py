# 4357039f58c42ea585de2bc56af7aa9399fae7086652ebd4b59eddeaa3053112 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  t = new Turtle() # [variable definition]
  t.placeAt(-50, 30) # [call procedure]}
  t.turn(90) # [call procedure]}
  t.show() # [call procedure]}
  for i in range(1, 3, 1):  # [for loop]
    drawSide(side, t) # [call procedure]}
    t.turn(120) # [call procedure]}


def drawSide(length: Float, t: Turtle) -> None:  # [procedure]
  if (length > 1) then
    third = length/3 # [variable definition]
    drawSide(third, t) # [call procedure]}
    t.turn(-60) # [call procedure]}
    drawSide(third, t) # [call procedure]}
    t.turn(120) # [call procedure]}
    drawSide(third, t) # [call procedure]}
    t.turn(-60) # [call procedure]}
    drawSide(third, t) # [call procedure]}
  else
    t.move(length) # [call procedure]}


side = 60
