# 9b4ae9517518461b5c19b4e4fe1f77589363305577f12296ae355cf2d1709c9f Python with Elan 2.0.0-beta5 valid

def main() -> None:
  t = Turtle() # variable definition
  t.placeAt(-100, 75)
  t.turnToHeading(90)
  for i in rangeInSteps(150, -1, -5):
    t.move(i)
    t.turn(90)
    sleep_ms(300)
  # end for
# end main

main()
