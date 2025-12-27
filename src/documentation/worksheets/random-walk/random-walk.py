# a7dcdb287df54e7b8aad015e8fcaab3ba26f5197f89dbdca34eb33b271b8e059 Elan 1.9.0 guest default_profile valid

# 
# 
# 
# 
# 
# Elan 1.9.0
def main -> None:  # [main]
  t = new Turtle() # [variable definition]
  paces = 0 # [variable definition]
  t.hide() # [call procedure]}
  circle(t, 50) # [call procedure]}
  for count in range(1, 20, 1):  # [for loop]
    t.placeAt(0, 0) # [call procedure]}
    colour = randomInt(red, blue) # [variable definition]
    t.penColour(colour) # [call procedure]}
    while sqrt(t.x^2 + t.y^2) < 50
      angle = randomInt(-90, 90) # [variable definition]
      t.turn(angle) # [call procedure]}
      t.move(5) # [call procedure]}
      paces = paces + 1 # [assign variable]
  print "Average number of paces: {paces/20}"


def circle(t: Turtle, radius: Int) -> None:  # [procedure]
  segment = radius*pi*2/360 # [variable definition]
  t.placeAt(-radius, 0) # [call procedure]}
  for count in range(1, 360, 1):  # [for loop]
    t.move(segment) # [call procedure]}
    t.turn(1) # [call procedure]}


