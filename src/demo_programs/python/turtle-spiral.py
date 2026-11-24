# 377db035bd7c981d60cc6230316d34864480d6a66664cf4e417014036704a872 Python with Elan 3.0.0-alpha valid

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
