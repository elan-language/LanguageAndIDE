# 3066879e89a244ba9008af1e60ca8542fb45ae648570f7f286b282c76073fcf8 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  t = new Turtle() # [variable definition]
  t.placeAt(-50, 30) # [call procedure]}
  t.turn(90) # [call procedure]}
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


side = 100
