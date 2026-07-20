# Python with Elan 2.0.0-beta2

def main() -> None:
  t = Turtle() # variable definition
  t.placeAt(-100, 75) # procedure call
  t.turnToHeading(90) # procedure call
  for i in rangeInSteps(150, -1, -5):
    t.move(i) # procedure call
    t.turn(90) # procedure call
    sleep_ms(300) # procedure call
  # end for
# end main

main()
