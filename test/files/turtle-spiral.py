# Python with Elan 2.0.0-beta

def main() -> None:
  t = Turtle() # variable definition
  t.placeAt(-100, 75) # call procedure
  t.turnToHeading(90) # call procedure
  for i in rangeInSteps(150, -1, -5):
    t.move(i) # call procedure
    t.turn(90) # call procedure
    sleep_ms(300) # call procedure
  # end for
# end main

main()
